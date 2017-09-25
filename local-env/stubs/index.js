const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/some-external-dependency', (req, res) => {
    res.send({
        stub: 'response'
    })
})

app.listen(3000, () => {
    console.log('Stub server listening on port 3000!')
})