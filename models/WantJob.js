const mongoose = require('mongoose'); 
const MaidRefer = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:Object,
        required:true 
    }
})
module.exports = mongoose.model('jobs',MaidRefer);