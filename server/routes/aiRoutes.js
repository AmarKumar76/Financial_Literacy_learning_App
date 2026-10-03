const express = require('express');
const router  = express.Router();

const {
  generateDrafts,
  improveExplanation,
  listDraftsByLesson,
} = require('../controllers/aiController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// All AI routes require Admin role
router.use(verifyToken, isAdmin);

/**
 * POST /api/ai/quiz-drafts
 * Generate AI quiz draft questions for a lesson.
 * Body: { lessonId, count?, difficulty? }
 */
router.post('/quiz-drafts', generateDrafts);

/**
 * GET /api/ai/drafts/:lessonId
 * List all AI-generated Draft questions pending review for a lesson.
 */
router.get('/drafts/:lessonId', listDraftsByLesson);

/**
 * POST /api/ai/improve-explanation
 * Ask Gemini to rewrite the explanation for a specific question.
 * Body: { questionId }
 */
router.post('/improve-explanation', improveExplanation);

module.exports = router;
