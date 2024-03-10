const mongoose = require("mongoose")
//const uri = "mongodb+srv://martalaska141:Marta!2706@cluster0.0gv91bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//const uniqueValidator = require('mongoose-unique-validator');
//const crypto = require('crypto');

//mongoose.connect("mongodb://127.0.0.1:27017/stemz-learning")
mongoose.connect("mongodb+srv://stemzlearning:stemz123@stemz.ae0vefg.mongodb.net/?retryWrites=true&w=majority&appName=STEMz")
.then(() => {
    console.log("mongodb connected")
})
.catch((e) => {
    console.log(e)
})

const newSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "can't be blank"]
        //required:true
    },
    email:{
        type:String,
        required: [true, "can't be blank"],
        unique: true
        //required:true
    },
    password:{
        type:String,
        required: [true, "can't be blank"]
        //required:true
    },
    grade: {
        type:Number,
    }
})

const collection = new mongoose.model("collection", newSchema)
//const user = new mongoose.model("user", newSchema)

module.exports = collection
//module.exports = user