const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { verifyToken: protect, optionalAuth } = require('../middleware/authMiddleware');

router.get('/me', protect, progressController.getMyProgress);
router.get('/leaderboard', optionalAuth, progressController.getLeaderboard);

module.exports = router;
