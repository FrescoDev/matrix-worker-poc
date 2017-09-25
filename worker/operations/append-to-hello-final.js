const {
    Failure,
    Success
} = require('../../matrix-lib/utils')


const appendToHelloFinalAsync = async input => {
    // validate input
    if (!input) return new Failure('Worker operation requires a hello value but did not find one :(')

    // Perform operation           
    const operation = new Success({
        hello: input.hello + 'and finally append this',
    })

    // return operation outcome
    const failureCondition = false
    if (failureCondition) {
        return new Failure('Inavlid payload')
    }

    return operation
}

module.exports = appendToHelloFinalAsync