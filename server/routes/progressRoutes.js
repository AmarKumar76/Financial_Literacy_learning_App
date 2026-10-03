const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { verifyToken: protect } = require('../middleware/authMiddleware');

router.get('/me', protect, progressController.getMyProgress);
router.get('/leaderboard', protect, progressController.getLeaderboard);

module.exports = router;
