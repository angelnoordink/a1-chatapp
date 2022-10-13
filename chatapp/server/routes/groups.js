const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Group = require('../models/group');


// get all groups
router.get('/groups', (req, res, next) => {
    Group.find({}, function(err, groups) {
        res.send(groups);
    });
});

router.post('/addgroup', (req, res, next) => {
    let newGroup = new Group({
        group_name: req.body.group_name,
        roomList: req.body.rooms,
        userList: [{user_id: req.body.user_id}]
    });

    (new Group(newGroup))
        .save()
        .then((group) => res.send(group))
        .catch((error) => console.log(error));

    // Maybe also assign new group tp current user.
});


// UserGroup
router.get('/group', (req, res, next) => {
    const group = req.body.group;

    group = Group.aggregate([
        {
            $lookup:
            {
                from: "rooms",
                localField: "roomList.room_id",
                foreignField: "_id",
                as: "roomList"
            }
        }
    ]).then(function (groups) { res.json(groups[0]); console.log('group', groups[0]); });
});

router.get('/group/:groupId', (req, res, next) => {
    var ObjectId = require('mongodb').ObjectId; 

    Group.find({"_id": ObjectId(req.params.groupId)}, function(err, group) {
        res.send(group);
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
// router.get('/groups', (req, res, next) => {
//     Group.find({}, function(err, groups) {
//         res.send(groups);
//     });
// });


module.exports = router;