const R = require('ramda')
const {
    Failure,
    Success
} = require('../../matrix-lib/utils')

const returnFailure = () => new Failure('Worker operation requires a hello value but did not find one :(')
const returnSuccess = helloValue => new Success({
    hello: helloValue + ' first append this '
})

const appendToHello = R.ifElse(R.isNil, returnFailure, returnSuccess)

module.exports = appendToHello