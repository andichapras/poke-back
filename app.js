const express = require('express')

const indexRoutes = require('./routes/index-routes')
const mineRoutes = require('./routes/mine-routes')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})

app.use('/index', indexRoutes)
app.use('/mine', mineRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
})

app.listen(5000)