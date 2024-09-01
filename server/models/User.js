const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  classes: {
    type: String,
    required: true
  },
  recommend: {
    type: String,
    required: true
  }
});
module.exports = User = mongoose.model("users", UserSchema);