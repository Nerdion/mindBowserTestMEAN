const mongoose = require('mongoose')
const Schema = mongoose.Schema

employee = new Schema({
    empID:Number,
    firstName:String,
    lastName:String,
    address:String,
    dob:Date,
    mobile:Number,
    city: String,
    managerId:String
})

module.exports = mongoose.model('Employee',employee)
