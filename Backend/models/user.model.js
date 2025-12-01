const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'coach'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    bio: {
        type: String,
        default: 'No bio yet'
    },
    location: {
        type: String,
        default: 'No location yet'
    },
    phoneNumber: {
        type: String,
        default: 'No phone number yet'
    },
    address: {
        type: String,
        default: 'No address yet'
    },
    city: {
        type: String,
        default: 'No city yet'
    },
    state: {
        type: String,
        default: 'No state yet'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;