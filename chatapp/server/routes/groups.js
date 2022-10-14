const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Group = require('../models/group');
const UserGroup = require('../models/user_group');
const Room = require('../models/room');

// Add group
router.post('/add', (req, res, next) => {
    let newGroup = new Group({
        group_name: req.body.group_name
    });

    Group.create(newGroup, (err, group) => {
        if(err){
            res.json({success: false, msg: 'Failed to create group'});
        } else {
            res.json({success: true, msg: 'Group created'});
        }
    });
});

// Get all groups
router.get('/groups', (req, res, next) => {
    Group.find({}, function(err, groups) {
        res.send(groups);
    });
});


// Get group from ID
router.get('/group/:groupId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    Group.find({"_id": ObjectId(req.params.groupId)}, function(err, group) {
        res.send(group);
    });
});

// Delete Group
router.delete('/group/:groupId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    Group.findOneAndDelete({_id:ObjectId(req.params.groupId)}, function(err, group) {
        if(err){
            res.json({success: false, msg: 'Failed to delete user'});
        } else {
            res.json({success: true, msg: 'User deleted'});
        }
    });
});

// Get group users
router.get('/groupusers/:groupId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    group = UserGroup.aggregate([
        { $match:{
                group_id: ObjectId(req.params.groupId)
            }
        },
        {"$lookup": { 
            from: "users", 
            localField: "user_id", 
            foreignField: "_id", 
            as: "user" 
        }},
        {"$unwind":"$user"},
    ]).then(function (usergroups) { res.json(usergroups); console.log('users', usergroups); });
});

// Get rooms
router.get('/room/:groupId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    Room.find({"group_id": ObjectId(req.params.groupId)}, function(err, room) {
        res.send(room);
    });
});

// Create room
router.post('/room', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 
    roomName = req.body.room_name;
    groupId = ObjectId(req.body.group_id);

    let newRoom = {
        room_name: roomName,
        group_id: groupId
    }

    Room.create(newRoom, (err, room) => {
        if(err){
            res.json({success: false, msg: 'Failed to create room'});
        } else {
            res.json({success: true, msg: 'Room created'});
        }
    });
});

// Delete Room
router.delete('/room/:roomId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    Room.findOneAndDelete({_id:ObjectId(req.params.roomId)}, function(err, room) {
        if(err){
            res.json({success: false, msg: 'Failed to delete user'});
        } else {
            res.json({success: true, msg: 'User deleted'});
        }
    });
});

module.exports = router;