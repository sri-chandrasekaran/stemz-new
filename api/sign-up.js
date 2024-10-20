import dbConnect from './dbConnect.js';
const express = require('express');
const app = express();
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");


export default async function handler(req, res) {
    await dbConnect(); // Connect to the database

    if (req.method === 'POST') {
        const { email, name, password } = req.body;

        try {
            // Check if the user already exists
            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: "Email Already Exists" });
            }

            // Create a new user
            const newUser = new User({
                name,
                email,
                password,
                classes: "placeholder",
                recommend: "placeholder"
            });

            // Hash password before saving in database
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);

            // Save the new user to the database
            await newUser.save();

            return res.status(201).json({ password, email, message: "New User Created" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        // Handle any method that is not POST
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
      

module.exports = app();