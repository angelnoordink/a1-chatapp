const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Schema
const GroupSchema = mongoose.Schema({
    group_name: {
        type: String,
        required: true
    },
    userList: [
        {
            user_id: { type: mongoose.Types.ObjectId, ref: 'User' }
        }
    ],
    roomList: [
        {
           room_id: { type: mongoose.Types.ObjectId, ref: 'Room' }
        }
    ],

});

const Group = module.exports = mongoose.model('Group', GroupSchema);

module.exports.getGroupById = function(id, callback){
    Group.findById(id, callback);
}

module.exports.getGroupByGroupName= function(group_name, callback){
    const query = {group_name: group_name};
    Group.findOne(query, callback);
}
