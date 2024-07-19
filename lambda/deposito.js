const mysql = require('mysql');

const con = mysql.createConnection({
  host: '0.tcp.sa.ngrok.io',
  user: 'root',
  port: "10120",
  password: 'Casa19901984$',
  database: 'api_bancaria',
});

exports.handler = (event, context, callback) => {
  const numeroCuenta = JSON.stringify(event.body.numeroCuenta);
  const saldo = JSON.parse(event.saldo);
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "UPDATE cuentabancaria SET saldo = saldo + "+saldo+" WHERE (numeroCuenta = "+numeroCuenta+")";
  con.query(sql, (err, res) => {
    if (err) {
      throw err
    }

    invocaremail();


    callback(null, 'Se registro valor.');
  });


  function async invocaremail(){
  const params = {
    FunctionName: 'LambdaCorreo', // Nombre de la lambda
    InvocationType: 'RequestResponse' // Esperar la respuesta
};

try {
    const response = await lambda.invoke(params).promise();


    if(response){
// Armar la respuesta para el API Gateway
const apiResponse = {
  statusCode: 200,
  body: JSON.stringify(transactionResponse)
};
    }

    

    return apiResponse;
} catch (error) {
    // Manejar errores
    console.error("Error:", error);
    return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error interno del servidor" })
    };
}
}    
};