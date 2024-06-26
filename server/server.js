const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const path = require('path');
const app = express()

// middleware setup
app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(cors())

// Serve homepage for the root path
app.get('/', (req, res) => {
    console.log(`Serving homepage`);
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// login code
app.get("/login", cors(), (req, res) => {


})

app.post("/login", async(req, res) => {
    console.log("Handling login request");
    const {email, password} = req.body
    console.log("Request Body:", req.body);

    try{
        const check = await collection.findOne({ email: email, password: password })

        if(check){
            res.json("exist")
        }
        else{
            res.json("not exist")
        }
    } catch(e){
        res.json("not exist")
    }
});

//signup

app.post("/sign-up", async(req, res) => {
    console.log("Handling signup request");
    const {name, grade, email, password} = req.body
    console.log("Request Body:", req.body);

    const data={
        name:name,
        email:email,
        password:password
    }

    try{
        const check = await collection.findOne({email:email})

        if(check){
            res.json("exist")
        } else {
            await collection.insertMany([data])
            res.json("not exist")
        }
        }catch(e){
        res.json("not exist")
    }
});

app.use(express.static(path.join(__dirname, '../build')));

// route for serving index.html
// app.get('*', (req, res) => {
//     console.log(`Serving index.html`);
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
//   });

app.listen(3001, ()=>{
    console.log("port connected on 3001")
})



