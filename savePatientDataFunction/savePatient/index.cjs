
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'LumoFitPatients', // replace with your DynamoDB table name
        Item: {
            patientId: data.patientId,
            name: data.name,
            age: data.age,
            photo: data.photo || null,
            deviceId: data.deviceId,
            createdAt: new Date().toISOString(),
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Patient saved successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
