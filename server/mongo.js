const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://stemzlearning:stemz123@stemz.ae0vefg.mongodb.net/")
.then(() => {
    console.log("mongodb connected")
})
.catch((e) => {
    console.log(e)
})

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