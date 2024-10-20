const mongoose = require("mongoose")

const dbConnect = async () => {
    const db = require("./config/keys.js").mongoURI;
    mongoose.connect(db, { useNewUrlParser: true })
      .then(() => console.log("MongoDB successfully connected"))
      .catch(err => console.log(err));
}

module.exports = dbConnect;