const mongoose = require('mongoose')
const Schema = mongoose.Schema

//firstname,lastname,password,address,dob,company
employee = new Schema({
    empID:Number,
    firstname:String,
    lastName:String,
    address:String,
    dob:Date,
    mobile:Number,
    city: String,
})

module.exports = mongoose.model('Employee',employee)