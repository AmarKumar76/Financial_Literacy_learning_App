require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes   = require('./routes/quizRoutes');
const aiRoutes     = require('./routes/aiRoutes');
const progressRoutes = require('./routes/progressRoutes');
const badgeRoutes    = require('./routes/badgeRoutes');
const progressController = require('./controllers/progressController');
const { optionalAuth } = require('./middleware/authMiddleware');
const { initCronJobs } = require('./cron/streakReminder');

const app = express();
initCronJobs();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/ai',      aiRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/badges',   badgeRoutes);
app.get('/api/leaderboard', optionalAuth, progressController.getLeaderboard);

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ status: 'ok', database: dbStatus, message: 'FIN-08 Backend is running' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI ;

// Start Server immediately so port 5000 stays active
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

const { seedDatabase } = require('./utils/seedDatabase');

// Attempt MongoDB Connection with automatic in-memory fallback
const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ Connected to MongoDB database successfully');
    await seedDatabase();
  } catch (err) {
    console.warn('⚠️  Primary MongoDB Connection Error:', err.message);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      console.log('⚡ Launching automatic In-Memory MongoDB server for instant testing...');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('🚀 Connected to In-Memory MongoDB successfully! You can register & login now.');
      await seedDatabase();
    } catch (fallbackErr) {
      console.error('👉 Make sure MongoDB service is running locally on port 27017 OR set a MongoDB Atlas URI in server/.env');
    }
  }
};

connectDatabase();
