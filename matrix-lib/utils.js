const Failure = function Failure(details) {
    this.details = details
    this.failed = true
    this.outcome = null
}
const Success = function Success(outcome) {
    this.details = null
    this.failed = false
    this.outcome = outcome
}

module.exports = {
    Failure,
    Success
}