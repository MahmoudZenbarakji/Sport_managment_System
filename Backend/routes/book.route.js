const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// All routes require authentication

// Create a booking (user only)
router.post('/', verifyToken,bookController.createBooking);

// Get user's own bookings (must come before /:id)
router.get('/my-bookings', bookController.getUserBookings);

// Get all bookings (admin can filter by status)
router.get('/', bookController.getBookings);

// Get booking by ID
router.get('/:id', bookController.getBookingById);

// Update booking status (admin only)
router.patch('/:id/status', bookController.updateBookingStatus);

// Delete booking
router.delete('/:id', bookController.deleteBooking);

module.exports = router;

