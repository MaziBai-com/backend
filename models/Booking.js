const mongoose = require('mongoose')
const BookingSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    name:{
        type:String, 
        required:true
    }, 
    preferGender:{
        type:String
    },
    phone:{
        type:String,
        required:true 
    },
    status:{
        type:String,
        required:true
    },
    service:{
        type:Array,
        required:true 
    },
    zipcode:{
        type:Number
    }, 
    text:{
        type:String
    }, 
    place:{
        type:String
    }, 
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Bookings',BookingSchema);