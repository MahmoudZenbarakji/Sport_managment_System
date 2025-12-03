const Book = require('../models/Book.model');
const Stadium = require('../models/Stadium.model');

const createBooking = async (req, res) => {
    try {
        const { stadium, date, time } = req.body;
        
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized. Please login." });
        }
        
        const userId = req.user.id;

        if (!stadium || !date || !time) {
            return res.status(400).json({ message: "stadium, date, and time are required" });
        }

        // Validate and parse date format
        // Handle both YYYY-MM-DD format and ISO strings
        let bookingDate;
        if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // YYYY-MM-DD format - create date at midnight UTC
            bookingDate = new Date(date + 'T00:00:00.000Z');
        } else {
            bookingDate = new Date(date);
        }
        
        if (isNaN(bookingDate.getTime())) {
            return res.status(400).json({ message: `Invalid date format: ${date}. Expected YYYY-MM-DD` });
        }

        // Normalize date to start of day for comparison (UTC)
        const startOfDay = new Date(bookingDate);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(bookingDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Check if stadium exists and get its price
        const stadiumData = await Stadium.findById(stadium);
        if (!stadiumData) {
            return res.status(404).json({ message: "Stadium not found" });
        }
        
        if (!stadiumData.Price && stadiumData.Price !== 0) {
            return res.status(400).json({ message: "Stadium price is not set" });
        }

        // Check if there's already a booking for this stadium at the same date and time
        const existingBooking = await Book.findOne({
            stadium,
            time,
            status: { $in: ['pending', 'approved'] },
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (existingBooking) {
            return res.status(400).json({ message: "This time slot is already booked" });
        }

        // Create booking with stadium price
        const bookingData = {
            user: userId,
            stadium,
            date: bookingDate,
            time,
            payment: stadiumData.Price,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const booking = await Book.create(bookingData);

        // Populate the booking data
        const populatedBooking = await Book.findById(booking._id)
            .populate('user', 'name email')
            .populate('stadium', 'name description Price Image');

        res.status(201).json(populatedBooking);
    } catch (err) {
        console.error('Booking creation error:', err);
        res.status(500).json({ message: "Server error", error: err.message, stack: err.stack });
    }
};

const getBookings = async (req, res) => {
    try {
        const { status } = req.query;
        let query = Book.find();

        // Filter by status if provided
        if (status) {
            query = query.where('status').equals(status);
        }

        const bookings = await query
            .populate('user', 'name email phoneNumber')
            .populate('stadium', 'name description Price Image')
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Book.findById(id)
            .populate('user', 'name email phoneNumber')
            .populate('stadium', 'name description Price Image category')
            .populate('stadium.category', 'name');

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Book.find({ user: userId })
            .populate('stadium', 'name description Price Image')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be: pending, approved, or rejected" });
        }

        const booking = await Book.findByIdAndUpdate(
            id,
            { status, updatedAt: Date.now() },
            { new: true }
        )
            .populate('user', 'name email phoneNumber')
            .populate('stadium', 'name description Price Image');

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const booking = await Book.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Only allow user to delete their own booking, or admin can delete any
        if (booking.user.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: "You can only delete your own bookings" });
        }

        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    getUserBookings,
    updateBookingStatus,
    deleteBooking
};

