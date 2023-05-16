const express = require('express');
const { findOne } = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


require("../db/conn");
const User = require("../model/userSchema");
const Mail = require('nodemailer/lib/mailer');


router.get('/', (req, res) => {
    res.send(`Welcome, Team 12`);
});



// otp logic  .. 

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        
    }
});
// otp logic  .. 

varsotp = "696969";
//register logic
router.post('/register', async (req, res) => {
    
    const { name, email, entryNo, role, password, cpassword, otp, mssg } = req.body;
    // var sotp = "696969";
    try {
        // otp logic
        if (mssg === "otp") {
            
            sotp = Math.random();
            sotp = sotp * 1000000;
            sotp = parseInt(sotp);
            console.log("OTP: " + sotp);
            
            
            if (!email || !name || !entryNo || !mssg) {
                return res.status(422).json({ error: "Please fill properly.." });
            }
            
            let info = await transporter.sendMail({
                from: 'your email id',
                to: email,
                subject: "Otp for registration is: ",
                html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + sotp + "</h1>" // html body
            });
            // console.log(info);
            // console.log("\n\n\ hello \n\n")
            
            return res.status(200).json({ message: "Done" });
        }
        //register logic  ......
        else {
            // console.log(name); console.log(email); console.log(entryNo); console.log(role); console.log(password); console.log(cpassword);
            // if any of field is empty.. || ERROR 
            if (!name || !email || !role || !password || !cpassword || !entryNo || !otp) {
                return res.status(422).json({ error: "Please fill all field properly.." });
            }
            /* 
            Alt Logic    
            if( !name || !email || !role || !password || !cpassword || (role === "student" && !entryNo) ) {
                */
               
               
               // is email is already registered.  || DO LOGIN
               const userExist = await User.findOne({ email: email });
               
               if (userExist) {
                   return res.status(422).json({ error: "Email Already Registered." })
                }
                
                if (sotp == otp && password === cpassword) {
                    const user = new User({ name, email, entryNo, role, password, cpassword });
                    
                    await user.save();
                    console.log("dsta sent to db");
                    res.status(201).json({ message: "User data send to DB" });
                }
                else {
                    return res.status(422).json({ error: "Wrong OTP Entered.." });
                }
        }
    } catch (err) {
        console.log(err);
    }
    
});

const ltransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        
    }
});

var lotp = "696969";
// signin logic
router.post('/login', async (req, res) => {


    const { email, password, mssg, otp } = req.body;
    console.log(email);
    if (mssg == "otp") {
        lotp = Math.random();
        lotp = lotp * 1000000;
        lotp = parseInt(lotp);
        console.log("OTP: " + lotp);


        if (!email || !mssg) {
            return res.status(422).json({ error: "Please fill properly.." });
        }
        try {
            
            let info = await ltransporter.sendMail({
                from: 'icpc.team7@gmail.com',
                to: email,
                subject: "Otp for registration is: ",
                html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + lotp + "</h1>" // html body
            });
            // console.log(info);
            // console.log("\n\n\ hello \n\n")
            
            return res.status(200).json({ message: "Done" });
        } catch (error) {
            return res.status(422).json({ message: "Sorry" });
            
        }
    }
    else {
        try {

            if (!email || !password || !otp) {
                return res.status(422).json({ error: "Please fill the data." });
            }

            const loginuser = await User.findOne({ email: email });
            if (!loginuser) {
                return res.status(422).json({ error: "Invalid Credientials." });
            }
            const token = await loginuser.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            });


            const ismatch = await bcrypt.compare(password, loginuser.password);

            if (!ismatch || lotp != otp) {
                return res.status(422).json({ error: "Invalid Credientials." });
            }

            if (loginuser.role == "Student") {
                return res.status(200).json({ message: "Login Success." });
            }
            else if (loginuser.role == "Advisor") {
                return res.status(201).json({ message: "Login Success." });
            }
            else {
                return res.status(202).json({ message: "Login Success." });
            }

        } catch (err) {
            console.log(err);
        }
    }
})


router.get('/about', (req, res) => {
    res.send(`Hi qwdebfeb`);
})

module.exports = router;

