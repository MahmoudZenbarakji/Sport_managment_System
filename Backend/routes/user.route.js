const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

// Admin-only: create users with roles (including coach)
router.route('/')
    .post(userController.registerUser)
    .get( userController.getUsers);

// Admin helper to directly create a coach
router.post('/create-coach',  userController.createCoach);

// Public: list coaches for frontend pages
router.get('/coaches', userController.getCoaches);

router.route('/:id')
    .get(  userController.getUserById)
    .put(verifyToken,  userController.updateUser)
    .delete(verifyToken, userController.deleteUser);

module.exports = router;
