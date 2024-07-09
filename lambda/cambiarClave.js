const mysql = require('mysql');

const con = mysql.createConnection({
  host: '0.tcp.sa.ngrok.io',
  user: 'root',
  port: "15470",
  password: '12345678',
  database: 'bd_banco_seguro',
});

exports.handler = (event, context, callback) => {
  const numeroCuenta = JSON.stringify(event.numeroCuenta);
  const claveTarjeta = JSON.stringify(event.claveTarjeta);
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "UPDATE cuentabancaria SET claveTarjeta = "+claveTarjeta+" WHERE (numeroCuenta = "+numeroCuenta+")";
  con.query(sql, (err, res) => {
    if (err) {
      throw err
    }
    callback(null, 'Se registro valor.');
  });
    
};