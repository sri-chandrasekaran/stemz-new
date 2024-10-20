const dbConnect = require('./dbConnect.js'); // No change
const User = require("./models/User.js"); // No change
const bcrypt = require("bcryptjs"); // No change

module.exports = async (req, res) => {
  await dbConnect(); // Connect to the database

  if (req.method === 'POST') {
    try { // Added try/catch block for error handling
      // Changed from User.findOne(...).then(...) to await for better readability and error handling
      const existingUser = await User.findOne({ email: req.body.email });
      
      if (existingUser) {
        return res.status(400).json({ message: "Email Already Exists" }); // Changed response to use status code
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        classes: "placeholder",
        recommend: "placeholder"
      });

      // Hash password before saving in database
      const salt = await bcrypt.genSalt(10); // Changed to use await for better readability
      newUser.password = await bcrypt.hash(newUser.password, salt); // Changed to use await for better readability
      await newUser.save(); // Changed to use await for better readability

      return res.status(201).json({ message: "New User Created", email: newUser.email }); // Changed response to use status code
    } catch (err) {
      console.error(err); // Added error logging
      return res.status(500).json({ error: "Internal Server Error" }); // Changed response for server error
    }
  } else {
    // Handle any method that is not POST
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
