const Category = require('../models/category.model');

 const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "name and description are required" });
        }

        // Prefer image url from body -> uploaded file -> placeholder
        let imageUrl = 'https://via.placeholder.com/150';
        if (image && typeof image === 'string' && image.trim() !== '') {
            imageUrl = image;
        } else if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const category = await Category.create({
            name,
            description,
            image: imageUrl
        });

        res.status(201).json(category);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate({
                path: 'stadiums',
                select: 'name description owner Price Image',
                populate: {
                    path: 'owner',
                    select: 'name email'
                }
            });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

 const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Find existing category
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Prefer image URL from body -> uploaded file -> existing
        const { image } = req.body;
        let imageUrl = existingCategory.image;
        if (image && typeof image === 'string' && image.trim() !== '') {
            imageUrl = image;
        } else if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name: name || existingCategory.name,
                description: description || existingCategory.description,
                image: imageUrl
            },
            { new: true }
        );

        res.status(200).json(updatedCategory);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id)
            .populate({
                path: 'stadiums',
                select: 'name description owner Price Image',
                populate: {
                    path: 'owner',
                    select: 'name email'
                }
            });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
};      
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
};