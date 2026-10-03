const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// Protected route for updating onboarding preferences
router.patch('/:id/onboarding', verifyToken, userController.updateOnboarding);

module.exports = router;
