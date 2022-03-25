const mongoose = require('mongoose')
const MaidSchema = new mongoose.Schema({
    maid_id:{
        type:String,
        unique:true,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
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
    state:{
        type:String
    },
    zipcode:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Maids',MaidSchema);