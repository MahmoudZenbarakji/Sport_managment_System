const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/', commentController.addComment);
router.get('/blog/:blogId', commentController.getCommentsByBlog);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
router.post('/:id/like', commentController.likeComment);

module.exports = router;
