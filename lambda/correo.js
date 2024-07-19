//lambda/email
const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const params = {
        Destination: {
            ToAddresses: ['racorrea2@utpl.edu.ec'],
        },
        Message: {
            Body: {
                Text: { 'Envío de notificacion' },
            },
            Subject: { Data: 'Test envío e-mail' },
        },
        Source: 'sebastian_ordonez@hotmail.com',
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log(result);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};