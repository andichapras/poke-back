const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    name: { type: String, require: true },
    pokemon: { type: String, require: true }
})

module.exports = mongoose.model('Pokemon', pokemonSchema)