const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    pokemon: { type: String, require: true },
    picture: { type: String, require: true },
    name: { type: String, require: true },
    rename: { type: Number, require: true },
    modal: { type: Boolean, require: true }
})

module.exports = mongoose.model('Pokemon', pokemonSchema)