exports.handler = async (event) => {

    // Conectarse a mysql
    const mysql = require('mysql');

    const connection = mysql.createConnection({
        host: '127.0.0.1',   
        user: 'root',
        password: 'Admin12345*',
        database: 'api_bancaria',
        port: 3306
    });

    const transaccion = JSON.parse(event.body.numeroCuenta);
    const objCuenta = connection.query(
        'SELECT * FROM cuentabancaria WHERE numeroCuenta = ?',
        [transaccion.cuenta],
        
    );

    const monto = objCuenta.monto;

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Deposito por realizar" })
    }
}