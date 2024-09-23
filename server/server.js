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
const collection = require("./mongo")

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

const Course = require("./models/Course.js");


app.post('/get_courses', async (req, res) => {
  console.log("getting courses")
  let {cl_reg, cl_recomm} = req.body
  if (cl_reg !== undefined) {
  cl_reg = cl_reg.split(", ")
  cl_recomm = cl_recomm.split(", ")
  const registered = []
  const recommended = []
  const getc = async () => {
    console.log("I'm here")
    for (const course of cl_reg) {
      try {
        const c = await Course.findOne({ _id: course })
        if (c) {
          registered.push(c)
          }
        else{
          console.log(course, "not found reg")
        }
        }
      catch {
        console.log("wrong id")
      }
    }
    try {
      const all_courses = await Course.find({})
      let n = 0
      while ((recommended.length !== 4) || (n !== all_courses.length())) {
        const c = all_courses[(Math.floor(Math.random() * all_courses.length))]
        if ((!recommended.includes(c)) && (!registered.includes(c))) {
          recommended.push(c)
        }
        n += 1
      }
    }
    catch {
      console.log("wrong id")
    }
      const data = {
        registered: registered,
        recommended: recommended
      }
      return data
    }
    const data = await getc()
    res.send(data)
  }
    
})

app.post('/get_all_courses', async (req, res) => {
  const getc = async () => {
      return await Course.find({})
  }
  const data = await getc()
  res.send(data)
})


app.post('/register-class', async (req, res) => {
  const {course_id, user_email} = req.body;
  try {
    const user = await User.findOne({ email: user_email});
    const list_courses = user["classes"].split(", ")
    if (list_courses.includes(course_id)) {
      res.send("success")
    }
    const updated_classes = user["classes"] + ", " + course_id; 
    await User.updateOne({email: user_email}, {$set: {classes: updated_classes}})
    try {
      const course = await Course.findOne({ _id:course_id });
      const updated_emails = course["Emails"] + ", " + user["email"] + " " + user["name"]
      await Course.updateOne({_id: course_id}, {$set: {Emails: updated_emails}})
      res.send("success")
    }
    catch {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
})

app.post('/check-class', async (req, res) => {
  console.log(req.body)
  let {user_email} = req.body;
  if (user_email !== undefined) {
  try {
    console.log(user_email)
    const user = await User.findOne({ email: user_email});
    const list_courses = user["classes"].split(", ")
    console.log(list_courses)
    res.send(list_courses)
  }
  catch {
    console.log("error")
    res.status(500).json({ success: false, message: "Server error" });
  }
}
})

  
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: "Email not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ userId: user._id }, keys.secretOrKey);
        res.cookie("token", token, { httpOnly: true});
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

  app.post("/delete", async (req, res) => {
    User.deleteOne({ email:req.body.email})
    .then(console.log("deleted"))
    .catch(function(error){
      console.log("delete error:", error)
    });
    res.clearCookie("token");
    res.json({ success: true, message: "Deleted successfully" });
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
    console.log("backend", req.userId)
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
          classes: user.classes,
          recommend: user.recommend
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
          password: req.body.password,
          role: req.body.role, // Store the role (teacher/student)
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
              .then((user) => 
                res.json({
                  password: req.body.password, 
                  email: req.body.email, 
                  message: "New User Created"}))
              .catch(err => console.log(err));
          });
        });
      }
    });
});


app.use(express.static(path.join(__dirname, '../build')));