const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const params = {
        Destination: {
            ToAddresses: ['jsordonez12@utpl.edu.ec'],
        },
        Message: {
            Body: {
                Text: { 'Envío de notificacion' },
            },
            Subject: { Data: 'Test envío e-mail' },
        },
        Source: 'sebastian.ordz@gmail.com',
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