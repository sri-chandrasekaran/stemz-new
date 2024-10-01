const mongoose = require("mongoose")


const newSchema = new mongoose.Schema({
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
    grade:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection