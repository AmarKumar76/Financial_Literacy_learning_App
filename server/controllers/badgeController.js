const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const User = require('../models/User');
const Progress = require('../models/Progress');
const QuizAttempt = require('../models/QuizAttempt');

// Seed default SRS Badges if none exist
const defaultBadges = [
  {
    name: 'First Step Beginner',
    description: 'Complete your first financial literacy lesson.',
    icon: 'BookOpen',
    category: 'Beginner',
    unlockRule: 'LESSON_1',
    xpReward: 20,
  },
  {
    name: 'Budget Master',
    description: 'Complete 3 budgeting or money basics lessons.',
    icon: 'Calculator',
    category: 'Money Smart',
    unlockRule: 'LESSON_3',
    xpReward: 50,
  },
  {
    name: 'Quiz Champion',
    description: 'Score 100% on any financial quiz.',
    icon: 'Trophy',
    category: 'Learner',
    unlockRule: 'PERFECT_QUIZ',
    xpReward: 50,
  },
  {
    name: 'Scam Shield',
    description: 'Complete the Scam & Fraud Awareness module.',
    icon: 'Shield',
    category: 'Scam Aware',
    unlockRule: 'SCAM_MODULE',
    xpReward: 100,
  },
  {
    name: 'Smart Investor',
    description: 'Reach 100 total learning XP points.',
    icon: 'TrendingUp',
    category: 'Investor',
    unlockRule: 'XP_100',
    xpReward: 75,
  },
  {
    name: 'Finance Guru',
    description: 'Reach Level 2 in learning progression.',
    icon: 'Star',
    category: 'Finance Master',
    unlockRule: 'LEVEL_2',
    xpReward: 150,
  },
];

exports.seedBadgesIfEmpty = async () => {
  try {
    const count = await Badge.countDocuments();
    if (count === 0) {
      await Badge.insertMany(defaultBadges);
      console.log('✅ Seeded default badges successfully');
    }
  } catch (err) {
    console.error('Badge seeding error:', err.message);
  }
};

// Evaluate rules and award new badges to a user
exports.evaluateUserBadges = async (userId) => {
  try {
    await exports.seedBadgesIfEmpty();

    const user = await User.findById(userId);
    if (!user) return [];

    const lessonsCompletedCount = await Progress.countDocuments({ userId, completed: true });
    const perfectQuizCount = await QuizAttempt.countDocuments({ userId, score: 100 });
    const allBadges = await Badge.find();
    const existingUserBadges = await UserBadge.find({ userId });
    const unlockedBadgeIds = new Set(existingUserBadges.map((ub) => ub.badgeId.toString()));

    const newlyEarned = [];

    for (const badge of allBadges) {
      if (unlockedBadgeIds.has(badge._id.toString())) continue;

      let shouldUnlock = false;

      switch (badge.unlockRule) {
        case 'LESSON_1':
          if (lessonsCompletedCount >= 1) shouldUnlock = true;
          break;
        case 'LESSON_3':
          if (lessonsCompletedCount >= 3) shouldUnlock = true;
          break;
        case 'PERFECT_QUIZ':
          if (perfectQuizCount >= 1) shouldUnlock = true;
          break;
        case 'XP_100':
          if ((user.XP || 0) >= 100) shouldUnlock = true;
          break;
        case 'LEVEL_2':
          if ((user.level || 1) >= 2) shouldUnlock = true;
          break;
        case 'SCAM_MODULE':
          if (lessonsCompletedCount >= 5) shouldUnlock = true;
          break;
        default:
          if (lessonsCompletedCount >= 1) shouldUnlock = true;
      }

      if (shouldUnlock) {
        await UserBadge.create({ userId, badgeId: badge._id });
        newlyEarned.push(badge);
      }
    }

    return newlyEarned;
  } catch (err) {
    console.error('evaluateUserBadges error:', err);
    return [];
  }
};

// GET /api/badges - Get all badges with unlocked status for req.user
exports.getBadges = async (req, res) => {
  try {
    await exports.seedBadgesIfEmpty();

    const userId = req.user ? req.user._id : null;
    if (userId) {
      await exports.evaluateUserBadges(userId);
    }

    const allBadges = await Badge.find().sort({ createdAt: 1 });
    const userBadges = userId ? await UserBadge.find({ userId }) : [];
    const unlockedMap = new Map(userBadges.map((ub) => [ub.badgeId.toString(), ub.earnedAt]));

    const responseData = allBadges.map((badge) => {
      const isUnlocked = unlockedMap.has(badge._id.toString());
      return {
        id: badge._id,
        name: badge.name,
        desc: badge.description,
        category: badge.category,
        icon: badge.icon,
        unlocked: isUnlocked,
        earnedAt: isUnlocked ? unlockedMap.get(badge._id.toString()) : null,
        xpReward: badge.xpReward,
      };
    });

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
