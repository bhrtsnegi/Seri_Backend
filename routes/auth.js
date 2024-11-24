const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

//Register User
router.post('/signup', async(req, res)=>{
    try{
        const{username, email, name, password, dateOfBirth} = req.body;
        const user = new User({
            username,
            email,
            name,
            password,
            dateOfBirth
        });
        await user.save();
        res.status(201).json({message: "User Registered Successfullly"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;