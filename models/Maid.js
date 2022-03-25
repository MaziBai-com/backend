const mongoose = require('mongoose')
const MaidSchema = new mongoose.Schema({
    maid_id:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String, 
        required:true 
    }, 
    gender:{
        type:String,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    place:{
        type:String
    },
    zipcode:{
        type:Number 
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Maids',MaidSchema);