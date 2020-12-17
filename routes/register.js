const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', (req, res) => {
    res.send('this is the registration page')
});

//using POST to create a new user
//side note: does the word user ever look super odd to you? we need some synonyms...
router.post('/', async (req, res) => {
    const {email, password} = req.body; //remember that req.body is in json format!
    const isEmail = await validator.isEmail(email);
    if(isEmail && password) { //if is valid email and if password is not blank
        try {
            //hashing entered password
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds).catch((error) => {
                res.status(501).json({ error: 'hash not completed' }),
                console.error(err) 
            }); //did this here because we wanna make sure the hash is correct
            //create new user object
            const newUser = new userModel({
                email: email,
                password: passwordHash
            });
            //add new user to db and log them in
            await newUser.save();
            
            req.login(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/login');
            });
        } catch(error) {
            res.status(500).json({
                error: error
            });
        }
    }
    else {
        res.status(400).json({
            error: 'invalid email or password'
        });
    }
})

module.exports = router;