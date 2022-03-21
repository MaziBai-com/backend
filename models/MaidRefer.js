const mongoose = require('mongoose'); 
const MaidRefer = new mongoose.Schema({
    referee_name:{
        type:String,
        required:true 
    },
    referee_phone:{
        type:String,
        required:true
    },
    referer_name:{
        type:String,
        required:true 
    },
    referer_phone:{
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default: Date.now
    }
})
module.exports = mongoose.model('referals',MaidRefer);