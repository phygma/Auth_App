const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
// signup route handler

exports.signup = async (req, res) => {
      try{
            //get data 
            const {name, email, password, role} = req.body
            //check if user already exists
            const existingUser = await User.findOne({email});
            if(existingUser){
                  return res.status(400).json({
                        success:false,
                        message: 'User already exists',
                  })
            }

            //secure password
            let hashedPassword;
            try{
                  hashedPassword = await bcrypt.hash(password, 10)
                  
            }
            catch(err){
                  return res.status(500).json({
                        success:false,
                        message:"Error in hashing the password"
                  })
            }

            //create entry for a user

            const user = await User.create({
                  name,email,password:hashedPassword,role
            })

            return res.status(200).json({
                  success:true,
                  message:"user created successfully"
            })
      }
      catch(error){
            console.error(error)
            return res.status(500).json({
                  success:false,
                  message: "user cannot be registered please try again later"
            })

      }
}

//login

exports.login = async ( req, res) => {
      try{
            //data fetch
            const {email, password} =req.body;
            //validation on email and password
            if(!email || !password){
                  return res.status(400).json({
                        success:false,
                        message: "fill the complete details"
                  })
            }
            //check for registered user
            const user = await User.findOne({email});
            //if not resistered user
            if(!user){
                  res.status(401).json({
                        success:false,
                        message:"User does not exist"
                  })
            }

            const payload = {
                  email:user.email,
                  id:user._id,
                  role:user.role
            }
            
            //verify the password & generate JWT token
            if(await bcrypt.compare(password, user.password)){
                  //if password match
                  let token = jwt.sign(payload, process.env.JWT_SECRET, {
                        expiresIn:"2h"

                  });
                  
                  //user = user.toObject();//explicitly object mein convert karna padega
                  user.token = token;
                  
                  user.password = undefined;
                  
                  const options = {
                        expires: new Date( Date.now() + 3*24*60*60*1000),
                        httpOnly:true

                  }
                  res.cookie("token", token, options).status(200).json({
                        success:true,
                        token,
                        user,
                        message:"User logged in successfully"
                  })
            }
            else{
                  //passwrod doesn't match
                  return res.status(403).json({
                        success:false,
                        message:"Password incorrect"
                  })
            }

      }
      catch(error){
            console.log(error);
            res.status(500).json({
                  success:false,
                  message:"login failure"
            })

      }
}