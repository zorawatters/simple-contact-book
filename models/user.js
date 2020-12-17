const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { //makes sure that email is unique
        type: String,
        unique: true,
        required: true,
    },
    password: { //will be encrypted by bcrypt
        type: String,
        required: true
    }
    //if contacts were not stored in firebase i would put them here
});


module.exports = mongoose.model('Users', userSchema);