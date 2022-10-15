const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require("../config/database");

// User Schema
// References group_id to allow for aggregation.
// Creates 1-to-Many relationship between Group and Room.
const RoomSchema = mongoose.Schema({
    room_name: {
        type: String,
        required: true
    },
    group_id: {
        type: mongoose.Types.ObjectId, 
        ref: 'Group'
    }
});

const Room = module.exports = mongoose.model('Room', RoomSchema);

