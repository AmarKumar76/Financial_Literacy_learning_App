const QuizQuestion = require('../models/QuizQuestion');
const QuizAttempt  = require('../models/QuizAttempt');
const Lesson       = require('../models/Lesson');

/** Passing threshold as a percentage */
const PASSING_THRESHOLD = 60;

// ---------------------------------------------------------------------------
// Helper – strip correctOption + explanation before sending to learner
// ---------------------------------------------------------------------------
const sanitizeQuestion = (q) => {
  const obj = q.toObject ? q.toObject() : { ...q };
  delete obj.correctOption;
  delete obj.explanation;
  return obj;
};

// ===========================================================================
// PUBLIC / LEARNER ROUTES
// ===========================================================================

/**
 * GET /api/quizzes/:lessonId
 * Returns all PUBLISHED questions for a lesson (without answers).
 */
exports.getQuizByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    const questions = await QuizQuestion.find({
      lessonId,
      status: 'Published',
    }).select('-correctOption -explanation');

    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No published quiz questions found for this lesson.' });
    }

    res.status(200).json({
      lessonId,
      totalQuestions: questions.length,
      questions,
    });
  } catch (err) {
    console.error('getQuizByLesson error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * POST /api/quizzes/:lessonId/attempts
 * Submit answers for a quiz.
 * Body: { answers: [{ questionId, selectedOption, timeTakenSeconds? }], durationSeconds? }
 */
exports.submitQuizAttempt = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user._id;
    const { answers, durationSeconds = 0 } = req.body;

    // --- Validate request body ---
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'answers array is required and cannot be empty.' });
    }

    // --- Verify lesson exists ---
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    // --- Fetch the published questions for this lesson ---
    const questions = await QuizQuestion.find({ lessonId, status: 'Published' });
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No published questions found for this lesson.' });
    }

    // Build a map for O(1) lookups
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    // --- Grade each submitted answer ---
    let totalPoints        = 0;
    let correctAnswersCount = 0;
    const gradedAnswers = [];

    for (const submission of answers) {
      const { questionId, selectedOption, timeTakenSeconds = 0 } = submission;

      const question = questionMap.get(questionId?.toString());
      if (!question) {
        // Skip answers for non-existent / unpublished questions
        continue;
      }

      const isCorrect    = selectedOption === question.correctOption;
      const pointsEarned = isCorrect ? question.points : 0;

      if (isCorrect) correctAnswersCount++;
      totalPoints += pointsEarned;

      gradedAnswers.push({
        questionId: question._id,
        selectedOption,
        isCorrect,
        pointsEarned,
        timeTakenSeconds,
      });
    }

    const totalQuestions  = questions.length;
    const score           = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed          = score >= PASSING_THRESHOLD;

    // --- Determine attempt number ---
    const previousAttempts = await QuizAttempt.countDocuments({ userId, lessonId });
    const attemptNumber    = previousAttempts + 1;

    // --- Persist the attempt ---
    const attempt = await QuizAttempt.create({
      userId,
      lessonId,
      categoryId: lesson.categoryId,
      answers:    gradedAnswers,
      score,
      totalPoints,
      totalQuestions,
      correctAnswers: correctAnswersCount,
      passed,
      durationSeconds,
      attemptNumber,
    });

    // --- Module 8: Gamification XP & Level Update ---
    let xpEarned = 0;
    if (passed) xpEarned += 20; // Complete quiz bonus
    if (score === 100) xpEarned += 50; // Perfect score bonus
    
    let updatedUser = null;
    if (xpEarned > 0) {
      const User = require('../models/User');
      const user = await User.findById(userId);
      if (user) {
        user.XP += xpEarned;
        // Level up formula: 1 level per 500 XP
        user.level = Math.floor(user.XP / 500) + 1;
        await user.save();
        updatedUser = user;
      }
    }

    // --- Build a detailed result response (including explanations) ---
    const detailedResults = questions.map((q) => {
      const submission = gradedAnswers.find(
        (a) => a.questionId.toString() === q._id.toString()
      );
      return {
        questionId:     q._id,
        questionText:   q.questionText,
        options:        q.options,
        correctOption:  q.correctOption,
        explanation:    q.explanation,
        selectedOption: submission ? submission.selectedOption : null,
        isCorrect:      submission ? submission.isCorrect : false,
        pointsEarned:   submission ? submission.pointsEarned : 0,
      };
    });

    res.status(201).json({
      message:        passed ? 'Congratulations! You passed the quiz.' : 'Quiz submitted. Keep practicing!',
      attemptId:      attempt._id,
      attemptNumber,
      score,
      totalPoints,
      totalQuestions,
      correctAnswers: correctAnswersCount,
      passed,
      passingThreshold: PASSING_THRESHOLD,
      durationSeconds,
      results:        detailedResults,
    });
  } catch (err) {
    console.error('submitQuizAttempt error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * GET /api/quizzes/:lessonId/attempts
 * Returns the current user's attempt history for a lesson.
 */
exports.getMyAttempts = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user._id;

    const attempts = await QuizAttempt.find({ userId, lessonId })
      .sort({ createdAt: -1 })
      .select('-answers');  // Omit per-question detail for the list view

    res.status(200).json({
      lessonId,
      totalAttempts: attempts.length,
      bestScore: attempts.length
        ? Math.max(...attempts.map((a) => a.score))
        : 0,
      attempts,
    });
  } catch (err) {
    console.error('getMyAttempts error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * GET /api/quizzes/attempts/:attemptId
 * Returns the full detail of a single attempt (including per-question breakdown).
 * A learner may only view their own attempt; admins can view any.
 */
exports.getAttemptById = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const attempt = await QuizAttempt.findById(attemptId)
      .populate('lessonId', 'title')
      .populate('categoryId', 'name')
      .populate('answers.questionId', 'questionText options explanation correctOption');

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found.' });
    }

    // Learners may only see their own attempts
    if (
      req.user.role !== 'Admin' &&
      attempt.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    res.status(200).json(attempt);
  } catch (err) {
    console.error('getAttemptById error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// ===========================================================================
// ADMIN ROUTES
// ===========================================================================

/**
 * POST /api/admin/quizzes
 * Create a new quiz question (manual entry).
 * Body: { lessonId, categoryId, type, questionText, options, correctOption, explanation, difficulty, points }
 */
exports.createQuestion = async (req, res) => {
  try {
    const {
      lessonId, categoryId, type = 'MCQ', questionText,
      options, correctOption, explanation, difficulty, points,
    } = req.body;

    // Basic validation
    if (!lessonId || !categoryId || !questionText || !options || correctOption === undefined) {
      return res.status(400).json({ message: 'lessonId, categoryId, questionText, options, and correctOption are required.' });
    }

    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: 'options must be an array with at least 2 items.' });
    }

    if (correctOption < 0 || correctOption >= options.length) {
      return res.status(400).json({ message: 'correctOption index is out of range.' });
    }

    const question = await QuizQuestion.create({
      lessonId, categoryId, type, questionText,
      options: options.map((text) => ({ text })),
      correctOption, explanation, difficulty, points,
    });

    res.status(201).json({ message: 'Question created.', question });
  } catch (err) {
    console.error('createQuestion error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * GET /api/admin/quizzes
 * List all questions (with filters: lessonId, status, type).
 */
exports.listQuestions = async (req, res) => {
  try {
    const filter = {};
    if (req.query.lessonId)   filter.lessonId   = req.query.lessonId;
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    if (req.query.status)     filter.status     = req.query.status;
    if (req.query.type)       filter.type       = req.query.type;

    const questions = await QuizQuestion.find(filter)
      .sort({ createdAt: -1 })
      .populate('lessonId', 'title')
      .populate('categoryId', 'name');

    res.status(200).json({ total: questions.length, questions });
  } catch (err) {
    console.error('listQuestions error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * GET /api/admin/quizzes/:questionId
 * Get a single question (with answers visible).
 */
exports.getQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.questionId)
      .populate('lessonId', 'title')
      .populate('categoryId', 'name');

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json(question);
  } catch (err) {
    console.error('getQuestion error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * PATCH /api/admin/quizzes/:questionId
 * Update a question (e.g., publish a draft, fix an option).
 */
exports.updateQuestion = async (req, res) => {
  try {
    const allowedFields = [
      'type', 'questionText', 'options', 'correctOption',
      'explanation', 'difficulty', 'status', 'points',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Normalise options if provided as plain strings
    if (updates.options && Array.isArray(updates.options)) {
      updates.options = updates.options.map((o) =>
        typeof o === 'string' ? { text: o } : o
      );
    }

    const question = await QuizQuestion.findByIdAndUpdate(
      req.params.questionId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    res.status(200).json({ message: 'Question updated.', question });
  } catch (err) {
    console.error('updateQuestion error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * DELETE /api/admin/quizzes/:questionId
 * Hard-delete a question (only Draft questions can be deleted; Published must be Archived first).
 */
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    if (question.status === 'Published') {
      return res.status(400).json({
        message: 'Cannot delete a Published question. Archive it first.',
      });
    }

    await question.deleteOne();
    res.status(200).json({ message: 'Question deleted.' });
  } catch (err) {
    console.error('deleteQuestion error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

/**
 * GET /api/admin/quizzes/analytics/:lessonId
 * Aggregate attempt statistics for a lesson's quiz.
 */
exports.getQuizAnalytics = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const [stats] = await QuizAttempt.aggregate([
      { $match: { lessonId: new (require('mongoose').Types.ObjectId)(lessonId) } },
      {
        $group: {
          _id:           '$lessonId',
          totalAttempts: { $sum: 1 },
          avgScore:      { $avg: '$score' },
          passRate:      { $avg: { $cond: ['$passed', 1, 0] } },
          minScore:      { $min: '$score' },
          maxScore:      { $max: '$score' },
          uniqueUsers:   { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          totalAttempts: 1,
          avgScore:      { $round: ['$avgScore', 2] },
          passRate:      { $round: [{ $multiply: ['$passRate', 100] }, 2] },
          minScore:      1,
          maxScore:      1,
          uniqueUsers:   { $size: '$uniqueUsers' },
        },
      },
    ]);

    if (!stats) {
      return res.status(200).json({ lessonId, totalAttempts: 0, message: 'No attempts yet.' });
    }

    res.status(200).json({ lessonId, ...stats });
  } catch (err) {
    console.error('getQuizAnalytics error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
