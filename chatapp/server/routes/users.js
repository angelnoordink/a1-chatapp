const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Group = require('../models/group');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        groupList: user.groupList
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// Get all users
router.get('/users', (req, res, next) => {
    
    User.find({}, function(err, users) {
        res.send(users);
    });
});

router.get('/group', (req, res, next) => {
    const group_name = req.body.group_name;
    
    User.find({}, function(err, users) {
        res.send(users);
    });
});



// Add group to user
// router.post('/addgrouptouser', (req, res, next) => {
//     const user_id = req.body.user_id;
//     const group_id = req.body.group_id;
    
//     User.updateOne({_id: user_id}, {
//         $push: {
//             groupList: {group: group_id}
//         }
//     })
//     Group.updateOne({_id: group_id}, {
//         $push: {
//             userList: {user_id}
//         }
//     })
// });

// all groups
router.get('/groups', (req, res, next) => {
    Group.find({}, function(err, groups) {
        res.send(groups);
    });
});


module.exports = router;