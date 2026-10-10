const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Protected route for updating onboarding preferences
router.patch('/:id/onboarding', verifyToken, userController.updateOnboarding);

// Admin Analytics route
router.get('/admin/analytics', verifyToken, isAdmin, userController.getAdminAnalytics);

module.exports = router;
