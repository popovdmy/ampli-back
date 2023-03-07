import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import { app } from './app'

const server = awsServerlessExpress.createServer(app);

export const lambdaHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

