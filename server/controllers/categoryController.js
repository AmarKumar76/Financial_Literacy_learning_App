const Category = require('../models/Category');

// Get all published categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ published: true }).sort({ createdAt: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon, level, published } = req.body;

    const newCategory = new Category({
      name,
      description,
      icon,
      level,
      published
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
