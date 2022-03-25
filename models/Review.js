const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    }, 
    review:{
        type:String,
        required:true 
    },
    rating:{
        type:Number,
        max:5,
    }, 
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Reviews',ReviewSchema);