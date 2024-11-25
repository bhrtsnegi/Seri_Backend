const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const router = express.Router();

//Register User
router.post('/signup', async(req, res)=>{
    try{
        const{username, email, name, password, dateOfBirth} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            username,
            email,
            name,
            password: hashedPassword,
            dateOfBirth
        });
        await user.save();
        res.status(201).json({message: "User Registered Successfullly"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

//login user
router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User Not Found"});
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(404).json({message: "Invalid Credentials"});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV = 'production',
        });

        res.status(200).json({
            message: "User logged in successfully"
        });
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
})

module.exports = router;