const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: Buffer, 
        required: true
    },
    salt: {
        type: Buffer,
        required: true
    }
});

module.exports = mongoose.model('User', mongooseSchema)