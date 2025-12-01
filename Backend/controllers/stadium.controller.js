const Stadium = require('../models/Stadium.model');

const createStadium = async (req, res) => {
    try {
        const { name, description, category, Image } = req.body;

        if (!name || !description || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const stadium = await Stadium.create({
            name,
            description,
            
            category,
            Image: Image || 'https://via.placeholder.com/150'
        });

        res.status(201).json(stadium);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getStadiums = async (req, res) => {
    try {
        const stadiums = await Stadium.find()
            .populate('owner')
            .populate('category');
        res.status(200).json(stadiums);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getStadiumById = async (req, res) => {
    try {
        const { id } = req.params;
        const stadium = await Stadium.findById(id)
            .populate('owner')
            .populate('category');

        if (!stadium) {
            return res.status(404).json({ message: "Stadium not found" });
        }

        res.status(200).json(stadium);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateStadium = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, Image } = req.body;

        const existingStadium = await Stadium.findById(id);
        if (!existingStadium) {
            return res.status(404).json({ message: "Stadium not found" });
        }

        const updatedStadium = await Stadium.findByIdAndUpdate(
            id,
            {
                name: name || existingStadium.name,
                description: description || existingStadium.description,
                
                category: category || existingStadium.category,
                Image: Image || existingStadium.Image
            },
            { new: true }
        ).populate('category');

        res.status(200).json(updatedStadium);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteStadium = async (req, res) => {
    try {
        const { id } = req.params;
        const stadium = await Stadium.findByIdAndDelete(id);

        if (!stadium) {
            return res.status(404).json({ message: "Stadium not found" });
        }

        res.status(200).json({ message: 'Stadium deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createStadium,
    getStadiums,
    getStadiumById,
    updateStadium,
    deleteStadium
};
