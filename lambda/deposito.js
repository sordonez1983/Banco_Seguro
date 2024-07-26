const mysql = require('mysql');
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

//Creamos la conexion con la base de datos
const con = mysql.createConnection({
  host: '0.tcp.sa.ngrok.io',
  user: 'root',
  port: "19346",
  password: '12345678',
  database: 'api_bancaria',
});

exports.handler = (event, context, callback) => {
  const numeroCuenta = mysql.escape(event.numeroCuenta); // Usar mysql.escape para evitar inyecciones SQL
  const saldo = parseFloat(event.saldo); // Asegúrate de convertir el saldo a un número
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;

  const updateSql = "UPDATE cuentabancaria SET saldo = saldo + "+saldo+" WHERE (numeroCuenta = "+numeroCuenta+")";
  con.query(updateSql, (err, res) => {
    if (err) {
      throw err;
    }

    const insertSql = "INSERT INTO transaccion (tipo, monto, fecha, idCuenta) VALUES ('Deposito', "+saldo+", now(),'1')";
    con.query(insertSql, (err, res) => {
      if (err) {
        throw err;
      }
      
      const params = {
        FunctionName: 'Correo', // Nombre de la Lambda B
        InvocationType: 'RequestResponse'
      };
      lambda.invoke(params, (err, data) => {
        if (err) {
          throw err;
        }
        callback(null, 'Se registró el valor.');
      });
    });
  });
};