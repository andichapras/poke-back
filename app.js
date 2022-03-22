const express = require('express')
const https = require('https')
const axios = require('axios')

const indexRoutes = require('./routes/index-routes')
const mineRoutes = require('./routes/mine-routes')

const app = express()

app.use(express.json())

app.use('/index', indexRoutes)
// app.use('/mine', mineRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error
})


app.listen(5000)