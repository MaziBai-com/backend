const mongoose = require('mongoose'); 
const OTPSCHEMA = new mongoose.Schema({
    email:{
        type:String,
        required:true 
    },
    code:{
        type:String,
        required:true 
    }, 
    date:{
        type:Date,
        default: Date.now
    }
})
module.exports = mongoose.model('otp',OTPSCHEMA);