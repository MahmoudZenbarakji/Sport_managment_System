const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;