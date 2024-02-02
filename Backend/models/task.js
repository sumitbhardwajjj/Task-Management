const mongoose = require("mongoose");


const TasksCollection = new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    dueDate:{type:String,required:true},
})


exports.TASKS =mongoose.model("tasks", TasksCollection)