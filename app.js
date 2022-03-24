const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const indexRoutes = require('./routes/index-routes')
const mineRoutes = require('./routes/mine-routes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization, x-token')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     next()
// })

app.use('/index', indexRoutes)
app.use('/mine', mineRoutes)

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route', 404)
//     throw error
// })

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'an unknown error occured'})
})

mongoose
    .connect('mongodb+srv://belajar:senyuman25@mern.tr8rx.mongodb.net/pokeapp?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT)
    })
    .catch(err => {
        console.log(err)
    })