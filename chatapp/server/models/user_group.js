const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Group Schema
// References group_id and user_id to allow for aggregation.
// Used as a joining table to solve complex Many-to-Many relationship between User and Group.
const UserGroupSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    },
    group_id: {
        type: mongoose.Types.ObjectId, 
        ref: 'Group'
    }
});

const UserGroup = module.exports = mongoose.model('UserGroup', UserGroupSchema);

