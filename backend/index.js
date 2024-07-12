require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose'); 
mongoose.connect(config.connectionString)
const User =require("./models/user.model");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt= require("jsonwebtoken");
const { authenticateToken }= require("./utilities");

app.use(express.json());

app.use(
    cors({
            origin: "*",
        })
)

app.get("/",(req, res)=>{
    res.json({data:"hello"})
})




// create a new account
app.post("/create",async(req, res)=>{

    const {fullName, email, password} = req.body;

    if(!fullName){
        return res.status(400).json({error:true, message:"Full Name is required"})  
    }

    if(!email){
        return res.status(400).json({error:true, message:"email is required"})  
    }

    if(!password){
        return res.status(400).json({error:true, message:"password is required"})  
    }

    const isUser = await User.findOne({email:email});

    if(isUser){
        return res.json({error:true, message:"user already exists"})
    }

    const user = new User({
        fullName,
        email,
        password
    });

    await user.save();

    const acessToken = await jwt.sign({user},
        process.env.ACESS_TOCKEN_SECRET,
        { expiresIn: '36000m' });
    
return res.json({error:false,
                 user,
                 acessToken,
                 message:"User created successfully"
                });
});

app.post("/login", async(req, res)=>{

    const { email, password } = req.body;

    if(!email){
        return res.status(400).json({message:"email is required"})  
    }

    if(!password){
        

    }




});




app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
  

  module.exports = app;