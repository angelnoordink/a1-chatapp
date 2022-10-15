const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const UserGroup = require('../models/user_group');

// Register/Create User.
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

// Authenticate user details.
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
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Get specific User Profile from Auth token.
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    const user = User.aggregate([
        {
            $lookup:
            {
                from: "groups",
                localField: "groupList.group_id",
                foreignField: "_id",
                as: "groupList"
            }
        }
    ]).then(function (users) { res.json(users[0]); console.log('user', users[0]); });
});

// Get all users.
router.get('/users', (req, res, next) => {
    User.find({}, function(err, users) {
        res.send(users);
    });
});

// Get user details for specific user.
router.get('/user/:userId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    user = UserGroup.aggregate([
        { $match:{
                user_id: ObjectId(req.params.userId)
            }
        },
        {"$lookup": { 
            from: "groups", 
            localField: "group_id", 
            foreignField: "_id", 
            as: "group" 
        }},
        {"$unwind":"$group"},
    ]).then(function (usergroups) { res.json(usergroups); console.log('groups', usergroups); });
});

// Update user details.
router.patch('/user/:userId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    if (!req.body) {
        return res.sendStatus(400);
    }

    User.findOneAndUpdate({_id:ObjectId(req.params.userId)},{$set:{username:req.body.username,email:req.body.email,role:req.body.role}},(err, user)=>{
        if(err){
            res.json({success: false, msg: 'Failed to update user'});
        } else {
            res.json({success: true, msg: 'User Updated'});
        }
    });

});

// Delete user.
router.delete('/user/:userId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    User.findOneAndDelete({_id:ObjectId(req.params.userId)}, function(err, user) {
        if(err){
            res.json({success: false, msg: 'Failed to delete user'});
        } else {
            res.json({success: true, msg: 'User deleted'});
        }
    });
});

// Assign user to group.
router.post('/assign', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 
    groupId = ObjectId(req.body.group_id);
    userId = ObjectId(req.body.user_id);

    let newUserGroup = {
        group_id: groupId,
        user_id: userId
    }

    UserGroup.create(newUserGroup, (err, usergroup) => {
        if(err){
            res.json({success: false, msg: 'Failed to assign user to group'});
        } else {
            res.json({success: true, msg: 'User assigned to group'});
        }
    });
});

// Remove user from group.
router.delete('/:userGroupId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    UserGroup.findOneAndDelete({_id:ObjectId(req.params.userGroupId)}, function(err, usergroup) {
        if(err){
            res.json({success: false, msg: 'Failed to remove user from group'});
        } else {
            res.json({success: true, msg: 'User removed from group'});
        }
    });
});

module.exports = router;