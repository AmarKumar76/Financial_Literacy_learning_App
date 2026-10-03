const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Public/Learner routes
router.get('/', lessonController.getLessons);
router.get('/:id', lessonController.getLessonById);

// Protected learner route for completing a lesson
router.post('/:id/complete', verifyToken, lessonController.completeLesson);

// Admin routes for managing lessons
router.post('/', verifyToken, isAdmin, lessonController.createLesson);
router.patch('/:id', verifyToken, isAdmin, lessonController.updateLesson);

module.exports = router;
