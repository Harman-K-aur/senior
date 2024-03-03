const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    CompanyName: { type: String, required: true },
    Job_Location: { type: String, required: true, },
    Role: { type: String, required: true },
    Link: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)