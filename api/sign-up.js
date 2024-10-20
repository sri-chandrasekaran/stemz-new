import dbConnect from './dbConnect.js';
const express = require('express');
const app = express();
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");


export default async function handler(req, res) {
    await dbConnect(); // Connect to the database

    if (req.method === 'POST') {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.json("Email Already Exists");
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            classes: "placeholder",
            recommend: "placeholder"
          });
    // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json({password: req.body.password, email: req.body.email, message: "New User Created"}))
                .catch(err => console.log(err));
            });
          });}})
    } else {
        // Handle any method that is not POST
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
      

module.exports = app();