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
  const numeroCuenta = mysql.escape(event.numeroCuenta); // Usar mysql.escape para evitar inyecciones SQL
  const saldo = parseFloat(event.saldo); // Asegúrate de convertir el saldo a un número
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;

  // Consulta para obtener el saldo actual
  const selectSql = "SELECT saldo, id FROM cuentabancaria WHERE numeroCuenta = "+numeroCuenta+"";
  con.query(selectSql, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    
    const saldoActual = result[0].saldo;
    const idActual = result[0].id;

    if (saldo > saldoActual) {
      callback(null, 'No tiene suficiente saldo');
      return;
    }

    const updateSql = "UPDATE cuentabancaria SET saldo = saldo - "+saldo+" WHERE (numeroCuenta = "+numeroCuenta+")";
    con.query(updateSql, (err, res) => {
      if (err) {
        callback(err);
        return;
      }

      const insertSql = "INSERT INTO transaccion (tipo, monto, fecha, idCuenta) VALUES ('retiro', "+saldo+", now(), "+idActual+")";
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
          callback(null, 'Se registró el valor Correctamente.');
        });
      });
    });
  });
};