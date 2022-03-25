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
    zipcode:{
        type:String,
    },
    place:{
        type:String 
    }
})
module.exports = mongoose.model('jobs',MaidRefer);