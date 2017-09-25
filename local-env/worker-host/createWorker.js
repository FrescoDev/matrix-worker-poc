const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('errorhandler')
const express = require('express')
const helmet = require('helmet')
const methodOverride = require('method-override')
const morgan = require('morgan')
const settings = require('./settings')
const Router = require('express').Router
const bunyanMiddleware = require('bunyan-middleware')
const bunyan = require('bunyan')
const execPipe = require('../../matrix-lib/execPipe')
const {
    Failure
} = require('../../matrix-lib/utils')

const createWorker = steps => {

    // Define bunyan logger
    const logger = bunyan.createLogger({
        name: '__API_NAME__',
        serializers: bunyan.stdSerializers,
        streams: [{
            level: settings.logging.level,
            stream: process.stdout
        }]
    })

    const requestLogger = bunyanMiddleware({
        logger: logger,
        headerName: '__API_NAME__-Request-Id',
        obscureHeaders: ['authorization', 'token', 'access_token'],
        level: (process.env.NODE_ENV === 'development') ? 'debug' : 'info'
    })

    // Define HTTP req handler
    const executeAction = async (req, res) => {
        try {
            const {
                action
            } = req.body

            const execute = execPipe(steps)
            const operation = await execute(action)

            res.send({
                operation
            })

        } catch (error) {
            res.json(new Failure('Unable to process action')).status(500)
        }
    }

    const retrieveHostStatus = (req, res) => {
        res.send({
            status : 'ok'
        })
    }

    // Specify handler route
    const routes = new Router()
        .use(requestLogger)
        .post('/worker/action', executeAction)
        .get('/worker/host-status', retrieveHostStatus)


    // Create http server application using express
    const app = express()

    // Adds some security best practices
    app.use(helmet())
    app.use(cors())

    // Logger
    app.use(morgan('dev'))

    // Properly Decode JSON
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    // Add all HTTP methods
    app.use(methodOverride())

    // Mount API routes
    app.use('/', routes)

    // Use error handler in development
    app.use(errorHandler())

    // Start HTTP req listener
    app.listen(settings.port, () => {
        console.log(`
        === Local Env App Server ===

        Connected on:
        
        Port: ${settings.port}
        Env: ${app.get('env')}
        
    `)
    })
}

module.exports = createWorker