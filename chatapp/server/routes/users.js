const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Group = require('../models/group');
const UserGroup = require('../models/user_group');

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

// Get all users
router.get('/users', (req, res, next) => {
    User.find({}, function(err, users) {
        res.send(users);
    });
});

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

router.patch('/user/:userId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    User.findOneAndUpdate({"_id": ObjectId(req.params.userIf)}, {$set: req.body })
    .then((user)=> res.send(user))
    .catch((error) => console.log(error));
});


router.delete('/user/:userId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    User.findByIdAndDelete({"_id": ObjectId(req.params.userIf)})
    .then((user)=> res.send(user))
    .catch((error) => console.log(error));
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


module.exports = router;