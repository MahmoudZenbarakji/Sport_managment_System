const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.route('/')
    .post(blogController.createBlog)
    .get(blogController.getBlogs);

router.route('/:id')
    .get(blogController.getBlogById)
    .put(blogController.updateBlog)
    .delete(blogController.deleteBlog);

router.post('/:id/like', blogController.likeBlog);

module.exports = router;
