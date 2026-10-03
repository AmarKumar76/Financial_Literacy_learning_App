const Lesson = require('../models/Lesson');
const User = require('../models/User');
// Optionally, const Progress = require('../models/Progress'); could be used if there is a separate progress collection.
// For now, we update the user's XP directly based on the SRS Gamification rules (Complete lesson = 10 XP)

// Get all published lessons (optionally filtered by categoryId)
exports.getLessons = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = { status: 'Published' };
    if (categoryId) filter.categoryId = categoryId;

    const lessons = await Lesson.find(filter).sort({ createdAt: 1 });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson || lesson.status !== 'Published') {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark a lesson as complete
exports.completeLesson = async (req, res) => {
  try {
    const userId = req.user.id;
    const lessonId = req.params.id;

    // Check if lesson exists
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // In a full implementation, you'd check a Progress model to ensure we don't award XP twice.
    // For now, we simply update the User's XP (assuming 10 XP per lesson based on SRS Gamification Rules).
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { XP: 10 } },
      { new: true }
    ).select('-passwordHash');

    res.status(200).json({
      message: 'Lesson completed successfully. You earned 10 XP!',
      XP: updatedUser.XP,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Create a new lesson
exports.createLesson = async (req, res) => {
  try {
    const newLesson = new Lesson(req.body);
    await newLesson.save();
    res.status(201).json({ message: 'Lesson created successfully', lesson: newLesson });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Update a lesson
exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Auto-increment version if content changes
    const updates = { ...req.body };
    if (updates.content) {
      updates.$inc = { version: 1 };
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.status(200).json({ message: 'Lesson updated successfully', lesson: updatedLesson });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
