const mongoose = require("mongoose");


const UserCollection = new mongoose.Schema({
 name:{type:String},
 email:{type:String,unique:true, require:true},
 password:{type:String,minLength:8,require:true},
 token:String 
})


exports.USERS =  mongoose.model("user", UserCollection)