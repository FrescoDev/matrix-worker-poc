const execPipe = fnlist => {
    return async(action) => {
        if (!action) throw Error('Worker requires action object on request body to perform operations on... duh!')
        const numberOfFns = fnlist.length
        let i = numberOfFns - 1
        let dto = action
        for (i; i >= 0; i--) {
            if (fnlist[i].constructor.name === 'Function') {
                const fn = fnlist[i]
                const operation = fn(dto)

                if (!operation || operation.outcome === undefined) return {
                    failed: true,
                    details: 'No operation outcome was specfifed!',
                    outcome: null
                }

                if (operation.failed) throw Error(operation.details)

                dto = operation.outcome
            } else if (fnlist[i].constructor.name === 'AsyncFunction') {
                const fnAsync = fnlist[i]
                try {
                    const operation = await fnAsync(dto)

                    if (!operation || operation.outcome === undefined) return {
                        failed: true,
                        details: 'No operation outcome was specfifed!',
                        outcome: null
                    }

                } catch (error) {
                    throw Error(error)
                }
            } else throw Error('Not a fn!')
        }
        return dto
    }
}

module.exports = execPipe