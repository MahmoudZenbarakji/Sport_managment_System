const Category = require('../models/category.model');

 const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        if (!name || !description || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const category = await Category.create({
            name,
            description,
            image
        });

        res.status(201).json(category);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


 const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
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

        // If user uploaded a new image, use it
        let imageUrl = existingCategory.image;
        if (req.file) {
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

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
};      
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};