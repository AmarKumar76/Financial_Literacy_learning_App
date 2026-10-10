const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

/**
 * GET /api/progress/me
 * Returns overall completion %, weak topics, quiz statistics and XP metrics
 */
exports.getMyProgress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const completedLessonsCount = await Progress.countDocuments({ userId, completed: true });
    const totalLessonsCount = await Lesson.countDocuments({ status: 'Published' });
    const overallProgress = totalLessonsCount > 0
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
      : Math.min(100, Math.round((user.XP || 0) / 10));

    // Fetch quiz attempts to calculate averages and weak topics
    const attempts = await QuizAttempt.find({ userId }).populate('categoryId');

    let totalScore = 0;
    const categoryScores = {};

    attempts.forEach(attempt => {
      totalScore += attempt.score;
      const catId = attempt.categoryId?._id?.toString() || attempt.categoryId?.toString();
      const catName = attempt.categoryId?.name || 'General';
      if (catId) {
        if (!categoryScores[catId]) {
          categoryScores[catId] = { total: 0, count: 0, name: catName };
        }
        categoryScores[catId].total += attempt.score;
        categoryScores[catId].count += 1;
      }
    });

    const quizAvg = attempts.length > 0 ? Math.round(totalScore / attempts.length) : 0;

    const weakTopics = [];
    for (const catId in categoryScores) {
      const avg = categoryScores[catId].total / categoryScores[catId].count;
      if (avg < 60) {
        weakTopics.push(categoryScores[catId].name);
      }
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        learningGoal: user.learningGoal,
      },
      overall: overallProgress,
      completedLessons: completedLessonsCount,
      totalLessons: totalLessonsCount,
      quizAvg,
      quizAttemptsCount: attempts.length,
      streak: user.streak || 1,
      weakTopics: weakTopics.length ? weakTopics : ['None! Keep up the great work.'],
      XP: user.XP || 0,
      level: user.level || 1,
    });
  } catch (error) {
    console.error('Progress Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * GET /api/leaderboard
 * Returns top users by XP
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({ role: 'Learner' })
      .sort({ XP: -1 })
      .limit(10)
      .select('name XP level');
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
