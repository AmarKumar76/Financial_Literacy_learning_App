const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Public route to get all published learning categories
router.get('/', categoryController.getCategories);

// Admin routes for managing categories
router.post('/', verifyToken, isAdmin, categoryController.createCategory);
router.patch('/:id', verifyToken, isAdmin, categoryController.updateCategory);

module.exports = router;
