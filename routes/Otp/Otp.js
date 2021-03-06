const express = require("express");
const router = express.Router();

const bcrypt =require('bcryptjs'); 
const { body, validationResult } = require('express-validator');

// importing models : user & otp
const Users = require("../../models/User");
const Otps = require("../../models/Otp");

// config files
const config = require('../../config'); 

const nodemailer = require("nodemailer");




// ROUTE : send otp
router.get("/request",
[
    body('email', 'Invalid Email').isEmail()
],
    // here comes the validation
    async (req, res) => {
        // if not validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ success:false , msg: "Email or Password Error" })
        }
        try {
            // search user for existance
            let user = await Users.findOne({ email: req.body.email });
            if (!user) {
                res.status(400).json({
                    success: false,
                    msg: "User Not found with this email",
                });
                return 
            }
            // user found
            let generatedOtp = Math.floor(Math.random() * (9999 - 1000) + 1000);
            
            let otp = new Otps({
                email: req.body.email,
                code: generatedOtp,
            });
            
            // save otp in database for checking
            let newOtp = await otp.save();
              

              // mail otp to the email address provided
              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                service: "gmail",
                auth: {
                    user: config.NODEMAILER_EMAIL,
                    pass: config.NODEMAILER_PASSWORD
                },
            });

              let info = await transporter.sendMail({
                  from:"mazibaiteam@gmail.com",
                  to:newOtp.email, 
                  subject:"OTP from Mazibai for Password Reset",
                  text:`
                  Thanks for using MaziBai Services 
                  Your password reset OTP  : ${newOtp.code}
                  `,
                  html:""
                }, function (error, info) {
                    if (error) {
                        res.status(400).json({success:false,msg:"Error in sending email",error:error.message})
                    } else {
                        res.status(200).json({success:true , info:info.response})
                    }
                });
                
            } catch (error) {
            res.status(401).json({success:false , msg:"Internal Server Error"}); 
        }
    }
);

// validate otp & change password
// ROUTE 2 : 
router.post('/validate',
[
    body('email', 'Invalid Email').isEmail(),
    body('password','Password Must be greater than 5 characters').isLength({ min: 5 })
],
// email validation & otp validation & password validation 
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success:false , msg: "Email or Password Error" })
    }
    try {
        let {email,code,password,confirmPassword} = req.body ; 
        let otpRequest = await Otps.find({email:email}); 
        if(otpRequest.length == 0){
            return res.status(400).json({success:false , msg:"invalid email"}); 
        }
        // find user with the email 
        let user = await Users.findOne({email:email}); 
        if(!user){
            return res.status(400).json({success:false,msg:"user with this email doesn't exists"}); 
        }
        let found=0; 
        otpRequest.forEach((otp)=>{
            if(otp.code===code){
                found = 1 ;
            }
        })
        if(found){
            // password match 
            if(password !== confirmPassword && code===otpRequest.code){
                return res.status(400).json({success:false,msg:"check your password"})
            }
            // password hashing 
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(password,salt); 
            
            // update the password 
            user.password = hashedPassword ; 
            let updatedUser = await user.save(); 
            res.status(200).json({success:true,msg:`Updated Password : ${password}`})
        }else{
            return res.status(400).json({success:false,msg:"Invalid Otp"})
        }
        // validate the  otp given 
        
    } catch (error) {
        res.status(200).json({success:false,msg:"Internal Server Error"})
    }
})

module.exports = router; 
