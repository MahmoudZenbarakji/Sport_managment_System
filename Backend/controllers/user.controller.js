const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Register / Create user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, profilePicture, bio, location, phoneNumber, address, city, state } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'name, email and password are required' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already in use' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
            profilePicture,
            bio,
            location,
            phoneNumber,
            address,
            city,
            state
        });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json(userObj);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin helper: create a coach user
const createCoach = async (req, res) => {
    try {
        const { name, email, password, bio, location, phoneNumber, address, city, state } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'name, email and password are required' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already in use' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        // Determine profile picture path if an image was uploaded
        let profilePicture;
        if (req.file) {
            // store relative path so frontend can prefix with API base URL
            profilePicture = `/${req.file.path.replace(/\\/g, '/')}`;
        } else {
            profilePicture = undefined;
        }

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: 'coach',
            profilePicture,
            bio,
            location,
            phoneNumber,
            address,
            city,
            state
        });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json(userObj);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Public: get list of coaches with optional pagination and search
const getCoaches = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const search = req.query.search || '';

        const filter = { role: 'coach' };
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { bio: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } }
            ];
        }

        const total = await User.countDocuments(filter);
        const coaches = await User.find(filter)
            .select('-password')
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({ data: coaches, page, limit, total });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { ...req.body };

        // If profile picture was uploaded, use the file path
        if (req.file) {
            payload.profilePicture = `/${req.file.path.replace(/\\/g, '/')}`;
        }

        // If password provided, hash it
        if (payload.password) {
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
        }

        payload.updatedAt = Date.now();

        const user = await User.findByIdAndUpdate(id, payload, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    registerUser,
    createCoach,
    getUsers,
    getCoaches,
    getUserById,
    updateUser,
    deleteUser
};
