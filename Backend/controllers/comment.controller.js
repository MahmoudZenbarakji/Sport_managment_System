const Comment = require('../models/comment.model');
const Blog = require('../models/blog.model');

const addComment = async (req, res) => {
    try {
        const { content, user, blog } = req.body;
        if (!content || !user || !blog) return res.status(400).json({ message: 'content, user and blog are required' });

        const comment = await Comment.create({ content, user, blog });

        // push comment to blog.comments
        await Blog.findByIdAndUpdate(blog, { $push: { comments: comment._id } });

        const populated = await Comment.findById(comment._id).populate('user', 'name email');
        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getCommentsByBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId }).populate('user', 'name email');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.content = content || comment.content;
        comment.updatedAt = Date.now();
        await comment.save();

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        // remove from blog.comments
        await Blog.findByIdAndUpdate(comment.blog, { $pull: { comments: comment._id } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const likeComment = async (req, res) => {
    try {
        const { id } = req.params; // comment id
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: 'userId is required' });

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const alreadyLiked = comment.likes.some(u => u.toString() === userId);
        if (alreadyLiked) {
            comment.likes = comment.likes.filter(u => u.toString() !== userId);
        } else {
            comment.likes.push(userId);
        }

        await comment.save();
        res.status(200).json({ likesCount: comment.likes.length, liked: !alreadyLiked });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    addComment,
    getCommentsByBlog,
    updateComment,
    deleteComment,
    likeComment
};
