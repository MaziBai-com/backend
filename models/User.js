const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true 
    }, 
    password:{
        type:String,
        required:true 
    },
    userImg:{
        type:String
    },
    gender:{
        type:String
    },
    place:{
        type:String 
    }, 
    zipcode:{
        type:Number   
    },
    phone:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Users',UserSchema);
