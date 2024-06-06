//server.js
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
const cors = require("cors")
const path = require('path');
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Enable sending cookies across domains
}));
app.use(cookieParser());

// Load input validation
const validateRegisterInput = require("./validation/register");
const validateLoginInput = require("./validation/login");

// Load User model
const User = require("./models/User.js");

// DB Config
const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//Start Server
app.listen(3001, ()=>{
    console.log("port connected", 3001)
})

// Serve homepage for the root path
app.get('/', (req, res) => {
    console.log(`Serving homepage`);
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//LOGIN PROCESSING
// app.post("/login", async(req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//   // Find user by email
//     User.findOne({ email }).then(user => {
//       // Check if user exists
//       if (!user) {
//         return res.json("Email Not Found");
//       }
//   // Check password
//       bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//           // User matched
//           // Create JWT Payload
//           const payload = {
//             id: user.id,
//             name: user.name
//           };
//   // Sign token
//           jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json("Correct Password");
//             }
//           );
//         } else {
//           return res.json("Incorrect Password");
//         }
//       });
//     });
// });
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: "Email not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ userId: user._id }, keys.secretOrKey, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 1000 });
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Incorrect password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/signout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Signed out successfully" });
  });

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ success: false, message: "Token not found" });
  }
};

// Dashboard route handler
app.get("/dashboard", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      // Fetch personalized dashboard data based on the user
      // ...
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const dashboardData = {
        user: {
          name: user.name,
          email: user.email,
          // Include other relevant user data
        },
      };
      res.json({ success: true, dashboardData });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

//SIGN UP PROCESSING
app.post("/sign-up", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.json("Email Already Exists");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json("New User Created"))
              .catch(err => console.log(err));
          });
        });
      }
    });
});


app.use(express.static(path.join(__dirname, '../build')));

