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

module.exports.getGroupById = function(id, callback){
    Group.findById(id, callback);
}

module.exports.getGroupByGroupName= function(group_name, callback){
    const query = {group_name: group_name};
    Group.findOne(query, callback);
}
