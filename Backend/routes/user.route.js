const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

// Admin-only: create users with roles (including coach)
router.route('/')
    .post(verifyToken, requireRole('admin'), userController.registerUser)
    .get(verifyToken, requireRole('admin'), userController.getUsers);

// Public: list coaches for frontend pages
router.get('/coaches', userController.getCoaches);

router.route('/:id')
    .get(verifyToken, requireRole('admin'), userController.getUserById)
    .put(verifyToken, requireRole('admin'), userController.updateUser)
    .delete(verifyToken, requireRole('admin'), userController.deleteUser);

module.exports = router;
