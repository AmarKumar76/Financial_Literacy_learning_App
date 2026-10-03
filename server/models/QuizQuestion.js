const mongoose = require('mongoose');

/**
 * Schema for a single quiz option.
 */
const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

/**
 * QuizQuestion schema.
 * Stores MCQ and True/False questions linked to a lesson.
 */
const quizQuestionSchema = new mongoose.Schema(
  {
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
      index: true,
    },
    type: {
      type: String,
      enum: ['MCQ', 'TrueFalse'],
      required: true,
      default: 'MCQ',
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      // For MCQ: array of 4 options; for TrueFalse: ['True', 'False']
      type: [optionSchema],
      validate: {
        validator: function (opts) {
          if (this.type === 'TrueFalse') return opts.length === 2;
          if (this.type === 'MCQ') return opts.length >= 2 && opts.length <= 6;
          return false;
        },
        message: 'Options count is invalid for the question type.',
      },
    },
    correctOption: {
      // 0-based index into options[]
      type: Number,
      required: true,
      min: 0,
    },
    explanation: {
      // Shown after the user answers
      type: String,
      default: '',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Draft',
    },
    source: {
      // 'Manual' or 'AI-Generated'
      type: String,
      enum: ['Manual', 'AI-Generated'],
      default: 'Manual',
    },
    points: {
      // XP/score points awarded for a correct answer
      type: Number,
      default: 10,
      min: 1,
    },
  },
  { timestamps: true }
);

// Compound index for efficient lesson quiz fetching
quizQuestionSchema.index({ lessonId: 1, status: 1 });

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
