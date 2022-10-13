const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Schema
const RoomSchema = mongoose.Schema({
    room_name: {
        type: String,
        required: true
    }
});

const Room = module.exports = mongoose.model('Room', RoomSchema);
