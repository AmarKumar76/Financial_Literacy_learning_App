const express = require('express');
const router  = express.Router();

const {
  getQuizByLesson,
  submitQuizAttempt,
  getMyAttempts,
  getAttemptById,
  createQuestion,
  listQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizAnalytics,
} = require('../controllers/quizController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// ---------------------------------------------------------------------------
// LEARNER ROUTES  (authenticated)
// ---------------------------------------------------------------------------

/**
 * GET /api/quizzes/:lessonId
 * Fetch published quiz questions for a lesson (answers hidden).
 */
router.get('/:lessonId', verifyToken, getQuizByLesson);

/**
 * POST /api/quizzes/:lessonId/attempts
 * Submit a quiz attempt.
 * Body: { answers: [{ questionId, selectedOption, timeTakenSeconds? }], durationSeconds? }
 */
router.post('/:lessonId/attempts', verifyToken, submitQuizAttempt);

/**
 * GET /api/quizzes/:lessonId/attempts
 * Get the current user's attempt history for a lesson.
 */
router.get('/:lessonId/attempts', verifyToken, getMyAttempts);

/**
 * GET /api/quizzes/attempts/:attemptId
 * Get the full detail of a single attempt.
 * Learners can only view their own; Admins can view any.
 */
router.get('/attempts/:attemptId', verifyToken, getAttemptById);

// ---------------------------------------------------------------------------
// ADMIN ROUTES  (authenticated + Admin role)
// ---------------------------------------------------------------------------

/**
 * POST /api/admin/quizzes
 * Create a new quiz question.
 */
router.post('/admin', verifyToken, isAdmin, createQuestion);

/**
 * GET /api/admin/quizzes
 * List all questions (supports ?lessonId, ?categoryId, ?status, ?type filters).
 */
router.get('/admin', verifyToken, isAdmin, listQuestions);

/**
 * GET /api/admin/quizzes/analytics/:lessonId
 * Get aggregated attempt statistics for a lesson's quiz.
 */
router.get('/admin/analytics/:lessonId', verifyToken, isAdmin, getQuizAnalytics);

/**
 * GET /api/admin/quizzes/:questionId
 * Get a single question (with correct answer exposed).
 */
router.get('/admin/:questionId', verifyToken, isAdmin, getQuestion);

/**
 * PATCH /api/admin/quizzes/:questionId
 * Update a question's fields (text, options, status, etc.).
 */
router.patch('/admin/:questionId', verifyToken, isAdmin, updateQuestion);

/**
 * DELETE /api/admin/quizzes/:questionId
 * Hard-delete a Draft question.
 */
router.delete('/admin/:questionId', verifyToken, isAdmin, deleteQuestion);

module.exports = router;
