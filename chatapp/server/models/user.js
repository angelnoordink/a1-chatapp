const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'member'
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Retrieves specific user from database by ID.
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

// Retrieves specific user from database by username.
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

// Encrypts user password before adding to database for data protection.
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null,isMatch);
    });
}
