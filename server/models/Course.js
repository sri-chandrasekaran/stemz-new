const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
    Class:{
        type: String,
        required: true
    },
    Image:{
        type: String,
        required: true
    },
    Dates:{
        type: String,
        required: true
    },
    Teachers:{
        type: String,
        required: true
    },
    Zoom:{
        type: String,
        required: false
    },
    Worksheet:{
        type: String,
        required: false
    },
    Description:{
        type: String,
        required: false
    },
    Grade:{
        type: String,
        required: false
    },
    Emails:{
        type: String,
        required: false
    }
})

module.exports = Course = mongoose.model("courses", CoursesSchema);