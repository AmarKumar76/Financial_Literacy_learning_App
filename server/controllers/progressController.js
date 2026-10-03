const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');

/**
 * GET /api/progress/me
 * Returns overall completion %, weak topics, recommended next lesson
 */
exports.getMyProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch quiz attempts to calculate averages and weak topics
    const attempts = await QuizAttempt.find({ userId }).populate('categoryId');

    let totalScore = 0;
    const categoryScores = {};

    attempts.forEach(attempt => {
      totalScore += attempt.score;
      const catId = attempt.categoryId?.toString();
      if (catId) {
        if (!categoryScores[catId]) {
          categoryScores[catId] = { total: 0, count: 0, name: attempt.categoryId.name };
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
      overall: Math.min(100, (user.XP / 100)), // Simplified overall progress logic
      quizAvg,
      streak: user.streak,
      weakTopics: weakTopics.length ? weakTopics : ['None! Keep up the good work.'],
      XP: user.XP,
      level: user.level
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
