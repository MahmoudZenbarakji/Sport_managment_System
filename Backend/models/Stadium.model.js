const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    Price:{
        type: Number,
        required:true,
    },
    Image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },

    
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;