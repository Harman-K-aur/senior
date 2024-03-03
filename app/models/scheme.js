const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
})

module.exports = mongoose.model('Scheme', schemeSchema)