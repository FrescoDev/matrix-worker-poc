const {
    Failure
} = require('./utils')

const execPipe = fnlist => {
    return async(action) => {
        if (!action) return new Failure('Worker requires action object on request body to perform operations on... duh!')
        const numberOfFns = fnlist.length
        if (!numberOfFns || numberOfFns < 1) throw Error('Fn array needs at least 1 fn ...dudh!')
        let i = numberOfFns - 1
        let dto = action
        for (i; i >= 0; i--) {
            if (fnlist[i].constructor.name === 'Function') {
                const fn = fnlist[i]
                try {
                    const operation = fn(dto)

                    if (!operation) return new Failure('No operation outcome was specfifed!')
                    if (operation.failed === undefined || operation.outcome === undefined) return new Failure('Invalid operation outcome')
                    if (operation.failed) return new Failure(operation.details)

                    dto = operation.outcome
                } catch (error) {
                    return new Failure(error.message)
                }
            } else if (fnlist[i].constructor.name === 'AsyncFunction') {
                const fnAsync = fnlist[i]
                try {
                    const operation = await fnAsync(dto)

                    if (!operation) return new Failure('No operation outcome was specfifed!')
                    if (operation.failed === undefined || operation.outcome === undefined) return new Failure('Invalid operation outcome')
                    if (operation.failed) throw Error(operation.details)

                    dto = operation.outcome
                } catch (error) {
                    return new Failure(error.message)
                }
            } else return new Failure('Not a fn!')
        }
        return dto
    }
}

module.exports = execPipe