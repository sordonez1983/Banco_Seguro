const mysql = require('mysql');
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// Creamos la conexión con la base de datos
const con = mysql.createConnection({
  host: '0.tcp.sa.ngrok.io',
  user: 'root',
  port: "15603",
  password: '12345678',
  database: 'api_bancaria',
});

exports.handler = (event, context, callback) => {
  const numeroCuenta = JSON.stringify(event.numeroCuenta);
  const claveTarjeta = JSON.stringify(event.claveTarjeta);
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;

  // Consulta para obtener el saldo actual
  const selectSql = "SELECT claveTarjeta, id FROM cuentabancaria WHERE numeroCuenta = "+numeroCuenta+"";
  con.query(selectSql, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    
    const claveTarjetaActual = result[0].claveTarjeta;
    const idActual = result[0].id;

    if (claveTarjeta === claveTarjetaActual) {
      callback(null, 'No tiene que ser igual a la clave anterior');
      return;
    }

    const updateSql = "UPDATE cuentabancaria SET claveTarjeta = "+claveTarjeta+" WHERE (numeroCuenta = "+numeroCuenta+")";
    con.query(updateSql, (err, res) => {
      if (err) {
        callback(err);
        return;
      }

      const insertSql = "INSERT INTO transaccion (tipo, monto, fecha, idCuenta) VALUES ('Cambio de Clave', "+claveTarjeta+", now(), "+idActual+")";
      con.query(insertSql, (err, res) => {
        if (err) {
          callback(err);
          return;
        }

        const params = {
          FunctionName: 'Correo', // Nombre de la Lambda B
          InvocationType: 'RequestResponse'
        };
        lambda.invoke(params, (err, data) => {
          if (err) {
            callback(err);
            return;
          }
          callback(null, 'Se actualizo la clave Correctamente.');
        });
      });
    });
  });
};