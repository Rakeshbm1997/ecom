require("dotenv").config()
const express = require('express')
const formidable = require('express-formidable')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const nodemailer = require('nodemailer');
require('./config/database').connect()
const User=require('./model/user')


const app=express()
const PORT = process.env.API_PORT




const emailTransporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'bmrakesh04@gmail.com',
     pass: 'bm7795216932',
   },
 });


 const resetTokens = {};

 const authenticateUser = (req, res, next) => {
   const token = req.headers.authorization;
 
   if (!token) {
     return res.status(401).json({ error: 'Unauthorized: Missing token' });
   }
 
   try {
     // Verify the token and extract user data
     const userData = jwt.verify(token, process.env.TOKEN_KEY);
     req.user = userData;
     next();
   } catch (error) {
     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
   }
 };






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





app.post('/forgot-password', formidable(), async function(req,res){
   let{email}=req.fields
 
   const user1 = await User.findOne({ email });

   if (!user1) {
     return res.status(404).json({ error: 'User not found' });
   }
 
   const resetToken = await crypto.randomBytes(20).toString('hex');
 
   user1.resetToken = resetToken;
 
   const resetLink = `http://localhost:3001/reset-password?token=${resetToken}`;
 
   const mailOptions = {
     from: 'bmrakesh04@gmail.com',
     to: email,
     subject: 'Password Reset',
     text: `Click the following link to reset your password: ${resetLink}`,
   };
 
   emailTransporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       console.error('Error sending email:', error);
       return res.status(500).json({ error: 'Error sending email' });
     }
 
     console.log('Email sent:', info.response);
     res.status(200).json({ message: 'Password reset email sent successfully' });
   });
 });



 app.get('/reset-password/:token', (req, res) => {
   const { token } = req.params;
 
  
   if (!resetTokens[token]) {
     return res.status(400).json({ error: 'Invalid reset token' });
   }
 res.redirect(`http://localhost:3001/reset-password?token=${token}`);
 });












app.listen(PORT, ()=> console.log(`Project is running at ${PORT} port`))