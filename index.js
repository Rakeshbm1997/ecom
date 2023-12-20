require("dotenv").config()
const express = require('express')
const formidable = require('express-formidable')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('./config/database').connect()
const User=require('./model/user')


const app=express()
const PORT = process.env.API_PORT



app.post('/register', formidable(), async function(req,res){

     let{email, password, usertype}=req.fields

     if(!(email && password && usertype)){
        res.status(400).send('Provide all the inputs')
     }

     else{
           if(await User.findOne({email})){
            res.send("user already exist")
           }
     
     else{
           let enc_password = await bcrypt.hash(password , 10)   

        let user = User.create({
         email:email,
         password:enc_password,
         usertype:usertype});

         res.json(user)

         const userWithoutPassword = { email: user.email };
         res.status(200).json(userWithoutPassword);

     }
   }


});

app.post('/login', formidable(), async function(req,res){

   let{email, password}=req.fields

   const loginuser = await User.findOne({ email });
  

  if (loginuser) {
    const passwordMatch = await bcrypt.compare(password, loginuser.password);

    if (passwordMatch) {
      const token = jwt.sign({ email }, process.env.TOKEN_KEY , { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid' });
    }
  } else {
    res.status(402).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, ()=> console.log(`Project is running at ${PORT} port`))