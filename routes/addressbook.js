const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const User = require('../models/user.js');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.body);
});

module.exports = router;