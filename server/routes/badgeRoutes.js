const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, badgeController.getBadges);

module.exports = router;
