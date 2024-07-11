const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const params = {
        Destination: {
            ToAddresses: [event.to],
        },
        Message: {
            Body: {
                Text: { Data: event.body },
            },
            Subject: { Data: event.subject },
        },
        Source: 'jsordonez12@utpl.edu.ec.com',
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