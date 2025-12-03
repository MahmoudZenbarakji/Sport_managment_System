const TrainingSession = require('../models/TrainingSession.model');
const User = require('../models/user.model');

// Coach creates a training session
const createSession = async (req, res) => {
    try {
        const { title, description, date, durationMinutes, capacity, location, price } = req.body;
        const coachId = req.user && req.user.id;
        if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

        if (!title || !description || !date) return res.status(400).json({ message: 'title, description and date are required' });

        const session = await TrainingSession.create({
            title,
            description,
            coach: coachId,
            date,
            durationMinutes: durationMinutes || 60,
            capacity: capacity || 20,
            location,
            price: price || 0
        });

        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Public: list sessions (optional filters)
const getSessions = async (req, res) => {
    try {
        const sessions = await TrainingSession.find({ isActive: true }).populate('coach', 'name email');
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await TrainingSession.findById(id).populate('coach', 'name email');
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// User applies to session
const applyToSession = async (req, res) => {
    try {
        const { id } = req.params; // session id
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const session = await TrainingSession.findById(id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (!session.isActive) return res.status(400).json({ message: 'Session is not active' });
        if (session.applicants.includes(userId)) return res.status(400).json({ message: 'Already applied' });
        if (session.applicants.length >= session.capacity) return res.status(400).json({ message: 'Session is full' });

        session.applicants.push(userId);
        session.updatedAt = Date.now();
        await session.save();

        res.status(200).json({ message: 'Applied successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Coach: get sessions created by this coach
const getSessionsByCoach = async (req, res) => {
    try {
        const coachId = req.user && req.user.id;
        if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

        const sessions = await TrainingSession.find({ coach: coachId }).populate('applicants', 'name email');
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Coach: get applicants for a session
const getApplicants = async (req, res) => {
    try {
        const coachId = req.user && req.user.id;
        const { id } = req.params; // session id
        if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

        const session = await TrainingSession.findById(id).populate('applicants', 'name email');
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.coach.toString() !== coachId) return res.status(403).json({ message: 'Forbidden' });

        res.status(200).json(session.applicants);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Coach: update a training session (only the coach who created it can update)
const updateSession = async (req, res) => {
    try {
        const coachId = req.user && req.user.id;
        const { id } = req.params;
        const { title, description, date, durationMinutes, capacity, location, price, isActive } = req.body;

        if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

        const session = await TrainingSession.findById(id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.coach.toString() !== coachId) return res.status(403).json({ message: 'Forbidden: You can only edit your own sessions' });

        // Update fields if provided
        if (title !== undefined) session.title = title;
        if (description !== undefined) session.description = description;
        if (date !== undefined) session.date = date;
        if (durationMinutes !== undefined) session.durationMinutes = durationMinutes;
        if (capacity !== undefined) session.capacity = capacity;
        if (location !== undefined) session.location = location;
        if (price !== undefined) session.price = price;
        if (isActive !== undefined) session.isActive = isActive;
        session.updatedAt = Date.now();

        await session.save();

        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Coach: delete a training session (only the coach who created it can delete)
const deleteSession = async (req, res) => {
    try {
        const coachId = req.user && req.user.id;
        const { id } = req.params;

        if (!coachId) return res.status(401).json({ message: 'Unauthorized' });

        const session = await TrainingSession.findById(id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.coach.toString() !== coachId) return res.status(403).json({ message: 'Forbidden: You can only delete your own sessions' });

        await TrainingSession.findByIdAndDelete(id);

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createSession,
    getSessions,
    getSessionById,
    applyToSession,
    getSessionsByCoach,
    getApplicants,
    updateSession,
    deleteSession
};
