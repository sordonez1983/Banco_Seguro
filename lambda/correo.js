const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const params = {
        Destination: {
            ToAddresses: ['racorrea2@utpl.edu.ec'],
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Envío de notificación',
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Test envío e-mail',
                Charset: 'UTF-8'
            }
        },
        Source: 'sebastian_ordonez@hotmail.com',
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log(result);
        return {
            statusCode: 200,
            body: JSON.stringify('Email enviado correctamente!'),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Fallo envio de email.'),
        };
    }
};