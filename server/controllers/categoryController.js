const Category = require('../models/Category');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

// Get all published categories with dynamic lesson & completion metrics
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ published: true }).sort({ createdAt: 1 });

    const userProgress = req.user ? await Progress.find({ userId: req.user._id }) : [];
    const completedLessonIds = new Set(userProgress.map(p => p.lessonId.toString()));

    const enrichedCategories = await Promise.all(
      categories.map(async (cat) => {
        const catLessons = await Lesson.find({ categoryId: cat._id, status: 'Published' }).select('_id');
        const totalLessons = catLessons.length;
        const completedLessons = catLessons.filter(l => completedLessonIds.has(l._id.toString())).length;
        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        return {
          ...cat.toObject(),
          totalLessons,
          completedLessons,
          progress,
        };
      })
    );

    res.status(200).json(enrichedCategories);
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
