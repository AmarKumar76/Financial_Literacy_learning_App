const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    duration: {
      type: Number, // Estimated duration in minutes
      required: true,
      default: 5,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Draft',
    },
    version: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
