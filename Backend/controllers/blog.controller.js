const Blog = require('../models/blog.model');
const Comment = require('../models/comment.model');

const createBlog = async (req, res) => {
    try {
        const { title, content, author, image } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content and author are required' });
        }

        const blog = await Blog.create({
            title,
            content,
            author,
            image: image || undefined
        });

        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', '-password')
            .populate({ path: 'comments', populate: { path: 'user', select: 'name email' } });

        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id)
            .populate('author', '-password')
            .populate({ path: 'comments', populate: { path: 'user', select: 'name email' } });

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.image = image || blog.image;
        blog.updatedAt = Date.now();

        await blog.save();

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // remove related comments
        await Comment.deleteMany({ blog: id });

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Toggle like by user id in req.body.userId
const likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: 'userId is required' });

        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const alreadyLiked = blog.likes.some(u => u.toString() === userId);
        if (alreadyLiked) {
            blog.likes = blog.likes.filter(u => u.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();
        res.status(200).json({ likesCount: blog.likes.length, liked: !alreadyLiked });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    likeBlog
};
