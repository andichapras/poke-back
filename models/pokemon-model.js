const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paketSchema = new Schema({
    name: { type: String, require: true },
    nickname: { Type: String },
    picture: { type: String, require: true },
    move : { type: String },
    modal: { type: Boolean, require: true }
})

module.exports = mongoose.model('Mine', paketSchema)