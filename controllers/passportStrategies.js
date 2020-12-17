const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../models/user');

//here i am adding 2 strtegies: one for authenticating that the user exists, and another to authenticate  the json web token
//disclaimer: this is my first time using a jwt

//await pauses an async function until a promise is settled; looks more like familiar sync code and i like that
passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    }, async (email, password, done) => {
        try {
            console.log(email, password)
            const user = await Users.findOne({email: email}).exec(); //finds the user with a matching email in the db as the input one
            if(!user) {
                return done(null, false, { message: 'Email does not exist.' });
            }
            const correctPassword = await bcrypt.compare(password, user.password); //checks to see if the passwords match 
            if(!correctPassword) {
                return done(null, false, { message: 'Password is incorrect.' });
            }
            return done(null, user);
        }
        catch(error) {
            console.dir(error);
        }
    }
));

//using this strategy to extract jwt from cookie and make sure it hasn't expired
//storing web token in cookie for safety - makes it so it doesnt live in our local storage
passport.use(new JWTStrategy ({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: 'jdosien20493opa', 
    }, (payload, done, err) => {
        console.log(req.cookies);
        if(err) {
            return done(err);
        }
        if(Date.now() > payload.exp) {
            return done(null, false, { message: 'login expired! please reenter your credentials.' });
        }
        return done(null, payload);
    }
));