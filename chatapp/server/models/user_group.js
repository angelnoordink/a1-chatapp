const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Group Schema
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

