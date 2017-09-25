const R = require('ramda')
const {
    Failure,
    Success
} = require('../../matrix-lib/utils')

const returnFailure = () => new Failure('Hello prop missing from action body :(')
const returnSuccess = hello => new Success(hello)

const getHello = R.compose(
    R.ifElse(
        R.isNil,
        returnFailure,
        returnSuccess),
    R.prop('hello'))

module.exports = getHello