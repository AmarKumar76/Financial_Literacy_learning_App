const User = require('../models/User');
const Category = require('../models/Category');
const Lesson = require('../models/Lesson');
const QuizQuestion = require('../models/QuizQuestion');
const QuizAttempt = require('../models/QuizAttempt');

// Update user onboarding preferences
exports.updateOnboarding = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences, learningGoal } = req.body;

    // Ensure the user updating the profile is the authenticated user or an admin
    if (req.user.id !== id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized to update this user' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { preferences, learningGoal } },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Onboarding preferences updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Aggregate platform analytics
exports.getAdminAnalytics = async (req, res) => {
  try {
    const totalLearners = await User.countDocuments({ role: 'Learner' });
    const activeCategories = await Category.countDocuments({ published: true });
    const totalLessons = await Lesson.countDocuments({ status: 'Published' });
    const aiDraftsPending = await QuizQuestion.countDocuments({ status: 'Draft' });
    const totalQuizAttempts = await QuizAttempt.countDocuments();

    res.status(200).json({
      totalLearners,
      activeCategories,
      totalLessons,
      aiDraftsPending,
      totalQuizAttempts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
