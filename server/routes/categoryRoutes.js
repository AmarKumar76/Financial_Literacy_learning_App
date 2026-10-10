const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, optionalAuth, isAdmin } = require('../middleware/authMiddleware');

// Public route with optional user token to get categories & user progress
router.get('/', optionalAuth, categoryController.getCategories);

// Admin routes for managing categories
router.post('/', verifyToken, isAdmin, categoryController.createCategory);
router.patch('/:id', verifyToken, isAdmin, categoryController.updateCategory);

module.exports = router;
