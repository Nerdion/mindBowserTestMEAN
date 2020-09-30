const mongoose = require('mongoose')
const Schema = mongoose.Schema

manager = new Schema({
    email:String,
    firstName:String,
    lastName:String,
    password:String,
    address:String,
    dob:Date,
    company:String,
})

module.exports = mongoose.model('Manager', manager)