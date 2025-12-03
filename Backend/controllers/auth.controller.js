const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const register = async (req, res) => {
    try {
        const { name, email, password, role, profilePicture, bio, location, phoneNumber, address, city, state } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password are required' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already in use' });

        // If role is provided and is not 'user', require an admin token
        let finalRole = 'user';
        if (role && role !== 'user') {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(403).json({ message: 'Only admin can assign roles' });
            }
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                if (decoded.role !== 'admin') return res.status(403).json({ message: 'Only admin can assign roles' });
                finalRole = role;
            } catch (e) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role: finalRole,
            profilePicture,
            bio,
            location,
            phoneNumber,
            address,
            city,
            state
        });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({ token, user: userObj });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ token, user: userObj });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// note: token verification middleware moved to `middleware/auth.middleware.js`

const me = async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const logout = async (req, res) => {
    try {
        // Since JWT is stateless, logout is mainly client-side
        // But we can log the logout event or perform any server-side cleanup here
        // For now, just return success
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    register,
    login,
    me,
    logout
};
