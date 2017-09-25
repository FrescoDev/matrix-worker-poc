const createWorker = require('../local-env/worker-host/createWorker')
const appendToHello = require('./operations/append-to-hello')
const appendToHelloAgain = require('./operations/append-to-hello-again')
const appendToHelloFinalAsync = require('./operations/append-to-hello-final')
const getHello = require('./operations/getHello')

const executionSteps = [
    appendToHelloFinalAsync,
    appendToHelloAgain,
    appendToHello,
    getHello
]

const worker = createWorker(executionSteps)

module.exports = worker