const mongoose = require('mongoose');

/**
 * Schema for a single answer within an attempt.
 */
const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuizQuestion',
      required: true,
    },
    selectedOption: {
      // 0-based index of the chosen option; -1 means skipped
      type: Number,
      required: true,
      min: -1,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    pointsEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    timeTakenSeconds: {
      // Time taken on this specific question, for analytics
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

/**
 * QuizAttempt schema.
 * Records each time a user submits answers for a lesson's quiz.
 */
const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    answers: {
      type: [answerSchema],
      required: true,
    },
    score: {
      // Percentage score (0–100)
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    totalPoints: {
      // Total XP-eligible points earned in this attempt
      type: Number,
      default: 0,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    passed: {
      // True if score >= passingThreshold (default 60%)
      type: Boolean,
      required: true,
    },
    durationSeconds: {
      // Total wall-clock time the attempt took
      type: Number,
      default: 0,
      min: 0,
    },
    attemptNumber: {
      // Tracks how many times the user has tried this quiz
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

// Compound index: quickly find all attempts by a user for a specific lesson
quizAttemptSchema.index({ userId: 1, lessonId: 1 });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
