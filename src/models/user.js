const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    fcmToken:{
        type:String,
        default:null
    },
    deviceType:{
        type :String,
        default:null
    },
    token:{
        type:String,
        default:null
    }
  })
   
  
  module.exports =mongoose.model("User",userSchema)