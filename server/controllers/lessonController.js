const Lesson = require('../models/Lesson');
const User = require('../models/User');
const Progress = require('../models/Progress');

// Get all published lessons (optionally filtered by categoryId)
exports.getLessons = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = { status: 'Published' };
    if (categoryId) filter.categoryId = categoryId;

    const lessons = await Lesson.find(filter).sort({ createdAt: 1 });
    
    // If user is authenticated, attach completion state
    let completedLessonIds = new Set();
    if (req.user) {
      const userProgress = await Progress.find({ userId: req.user._id });
      completedLessonIds = new Set(userProgress.map(p => p.lessonId.toString()));
    }

    const lessonsWithCompletion = lessons.map(l => ({
      ...l.toObject(),
      isCompleted: completedLessonIds.has(l._id.toString()),
    }));

    res.status(200).json(lessonsWithCompletion);
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

    let isCompleted = false;
    if (req.user) {
      const p = await Progress.findOne({ userId: req.user._id, lessonId: lesson._id });
      isCompleted = !!p;
    }

    res.status(200).json({ ...lesson.toObject(), isCompleted });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark a lesson as complete
exports.completeLesson = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const lessonId = req.params.id;

    // Check if lesson exists
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if user has already completed this lesson
    let existingProgress = await Progress.findOne({ userId, lessonId });
    if (existingProgress) {
      const user = await User.findById(userId).select('-passwordHash');
      return res.status(200).json({
        message: 'Lesson already completed.',
        alreadyCompleted: true,
        XP: user.XP,
        level: user.level,
      });
    }

    // Save new progress
    await Progress.create({
      userId,
      lessonId,
      categoryId: lesson.categoryId,
      completed: true,
      completedAt: new Date(),
    });

    // SRS Gamification rule: Complete lesson = +10 XP
    const user = await User.findById(userId);
    const newXP = (user.XP || 0) + 10;
    const newLevel = Math.floor(newXP / 100) + 1;

    user.XP = newXP;
    user.level = newLevel;
    await user.save();

    res.status(200).json({
      message: 'Lesson completed successfully! You earned 10 XP.',
      alreadyCompleted: false,
      earnedXP: 10,
      XP: user.XP,
      level: user.level,
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
