const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String, // URL or an icon name (e.g., from lucide-react or heroicons)
      default: 'Book',
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    published: {
      type: Boolean,
      default: false, // Draft by default until admin publishes it
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
