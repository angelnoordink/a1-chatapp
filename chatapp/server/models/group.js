const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// Group Schema
const GroupSchema = mongoose.Schema({
    group_name: {
        type: String,
        required: true
    }
});

const Group = module.exports = mongoose.model('Group', GroupSchema);

// Retrieves specific group from database by ID.
module.exports.getGroupById = function(id, callback){
    Group.findById(id, callback);
}

// Retrieves specific group from database by Group Name.
module.exports.getGroupByGroupName= function(group_name, callback){
    const query = {group_name: group_name};
    Group.findOne(query, callback);
}
