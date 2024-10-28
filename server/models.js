const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Add any additional fields for the Board here
});

const recruitSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Add any additional fields for the Recruit here
});

// Create models
const Board = mongoose.model('Board', boardSchema);
const Recruit = mongoose.model('Recruit', recruitSchema);

module.exports = { Board, Recruit };
