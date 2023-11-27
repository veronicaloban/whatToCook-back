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
    },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

module.exports = mongoose.model('User', mongooseSchema)