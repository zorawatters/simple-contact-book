const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/user');

router.get('/', (req, res) => {
    res.send('this is the login page')
});

router.post('/', (req, res, next) => {
    console.log(req.body) //making sure we get the request
    passport.authenticate( //this isnt working rn
      'local',

      
      (error, user, info) => { //if there is an error
        if (error || !user) { //if the user is not authenticated
          res.status(400).json({ error: error });
        }
  
        //setting up for token
        const payload = {
          username: user.email,
          expires: Date.now() + 60,
        };

        //signing in user with token

        req.login(payload, {session: false}, (error) => {
          if (error) {
            res.status(400).send({ error });
          }
  
          /** generate a signed json web token and return it in the response */
          const token = jwt.sign({
            email: user.email,
            id: user._id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) }, //expires in 1 hour
            'jdosien20493opa');
  
          /** assign our jwt to the cookie */
          res.cookie('jwt', jwt, { httpOnly: true, secure: true });
          res.status(200).json({ user: user.email, id: user._id, token: token }); //send ok status
        });
      },
    )(req, res, next);
  });

module.exports = router;