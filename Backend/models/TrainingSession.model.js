const mongoose = require('mongoose');

const trainingSessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    durationMinutes: { type: Number, default: 60 },
    capacity: { type: Number, default: 20 },
    location: { type: String },
    price: { type: Number, default: 0 },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrainingSession', trainingSessionSchema);
