const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {
    console.log(
        `API: ${JSON.stringify(event.path)}, BODY: ${JSON.stringify(
            event.body
        )}, HEADERS: ${JSON.stringify(event.headers)}}`
    )

    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
}
