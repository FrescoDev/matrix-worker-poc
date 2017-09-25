const R = require('ramda')
const {
    Failure,
    Success
} = require('../../matrix-lib/utils')

const returnFailure = () => new Failure('Worker operation requires a hello value but did not find one :(')
const returnSuccess = input => new Success({
    hello: input.hello + 'then append this '
})

const appendToHelloAgain = R.ifElse(R.isNil, returnFailure, returnSuccess)

module.exports = appendToHelloAgain