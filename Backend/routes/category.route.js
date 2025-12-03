const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const upload = require('../middleware/uploadImage');

router.route('/')
.post(upload.single('image'), categoryController.createCategory)
.get(categoryController.getCategories)

router.route("/:id")
.put(upload.single('image'), categoryController.updateCategory)
.delete(categoryController.deleteCategory)
.get(categoryController.getCategoryById);


module.exports = router;