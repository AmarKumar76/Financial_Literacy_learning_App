const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'BookOpen',
    },
    category: {
      type: String,
      enum: ['Beginner', 'Learner', 'Money Smart', 'Investor', 'Scam Aware', 'Finance Master'],
      default: 'Learner',
    },
    unlockRule: {
      type: String,
      required: true, // e.g., 'LESSON_1', 'PERFECT_QUIZ', 'XP_100', 'STREAK_3'
    },
    xpReward: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Badge', badgeSchema);
