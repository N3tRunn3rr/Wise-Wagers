//User.js
const mongoose = require('mongoose');

//TODO: add user schema info for account balance, bets placed, etc.

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;