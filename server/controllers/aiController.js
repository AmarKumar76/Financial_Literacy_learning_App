const { generateQuizDrafts, improveExplanation, generateFinancialResponse } = require('../services/gemini/geminiService');
const Lesson = require('../models/Lesson');
const Category = require('../models/Category');
const QuizQuestion = require('../models/QuizQuestion');

// ---------------------------------------------------------------------------
// POST /api/ai/quiz-drafts
// ---------------------------------------------------------------------------
/**
 * Generate AI draft quiz questions for a given lesson.
 * The drafts are saved to the DB with status="Draft" and source="AI-Generated".
 * An Admin must then review and publish them via the Quiz admin routes.
 *
 * Body: { lessonId, count?, difficulty? }
 */
exports.generateDrafts = async (req, res) => {
  try {
    const { lessonId, count = 5, difficulty = 'Medium' } = req.body;

    // --- Validate count ---
    const numCount = parseInt(count, 10);
    if (isNaN(numCount) || numCount < 1 || numCount > 10) {
      return res.status(400).json({ message: 'count must be an integer between 1 and 10.' });
    }

    // --- Validate difficulty ---
    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be Easy, Medium, or Hard.' });
    }

    // --- Fetch lesson ---
    if (!lessonId) {
      return res.status(400).json({ message: 'lessonId is required.' });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    // --- Fetch category for context ---
    const category = await Category.findById(lesson.categoryId);
    const categoryName = category ? category.name : 'Financial Literacy';

    // --- Call Gemini service ---
    const drafts = await generateQuizDrafts({
      lessonTitle: lesson.title,
      lessonContent: lesson.content,
      categoryName,
      count: numCount,
      difficulty,
    });

    // --- Persist drafts to DB (status = Draft, source = AI-Generated) ---
    const toInsert = drafts.map((d) => ({
      ...d,
      lessonId: lesson._id,
      categoryId: lesson.categoryId,
      status: 'Draft',
      source: 'AI-Generated',
      // Convert options from string[] to { text } objects for the schema
      options: d.options.map((text) => ({ text })),
    }));

    const saved = await QuizQuestion.insertMany(toInsert);

    res.status(201).json({
      message: `${saved.length} AI-generated draft question(s) created. Review and publish via the admin quiz routes.`,
      lessonId: lesson._id,
      lessonTitle: lesson.title,
      difficulty,
      draftsCreated: saved.length,
      drafts: saved,
    });
  } catch (err) {
    console.error('generateDrafts error:', err);

    // Surface Gemini-specific errors clearly
    if (err.message?.includes('GEMINI_API_KEY')) {
      return res.status(503).json({
        message: 'AI service is not configured. Please set GEMINI_API_KEY in your .env file.',
        error: err.message,
      });
    }
    if (err.message?.includes('Expected') || err.message?.includes('Gemini returned')) {
      return res.status(502).json({
        message: 'AI returned an unexpected response. Please try again.',
        error: err.message,
      });
    }

    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// ---------------------------------------------------------------------------
// POST /api/ai/improve-explanation
// ---------------------------------------------------------------------------
/**
 * Ask Gemini to rewrite the explanation for a specific question.
 * Body: { questionId }
 */
exports.improveExplanation = async (req, res) => {
  try {
    const { questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: 'questionId is required.' });
    }

    const question = await QuizQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    const correctAnswerText = question.options[question.correctOption]?.text || '';
    const improvedText = await improveExplanation(question.questionText, correctAnswerText);

    // Update the question's explanation in DB
    question.explanation = improvedText;
    await question.save();

    res.status(200).json({
      message: 'Explanation improved successfully.',
      questionId: question._id,
      explanation: improvedText,
    });
  } catch (err) {
    console.error('improveExplanation error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// ---------------------------------------------------------------------------
// GET /api/ai/drafts/:lessonId
// ---------------------------------------------------------------------------
/**
 * List all AI-generated Draft questions for a lesson.
 * Useful for the AIDraftReview admin page.
 */
exports.listDraftsByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    const drafts = await QuizQuestion.find({
      lessonId,
      source: 'AI-Generated',
      status: 'Draft',
    }).sort({ createdAt: -1 });

    res.status(200).json({
      lessonId,
      lessonTitle: lesson.title,
      totalDrafts: drafts.length,
      drafts,
    });
  } catch (err) {
    console.error('listDraftsByLesson error:', err);
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

//chatbot controller
// exports.chatWithAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || !message.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required",
//       });
//     }

//     const reply = await generateFinancialResponse(message);

//     res.status(200).json({
//       success: true,
//       reply,
//     });

//   } catch (error) {
//     console.error("Gemini Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "AI assistant is temporarily unavailable.",
//     });
//   }
// };

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await generateFinancialResponse(message);

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Response:", error.response);
    console.error("==================================");

    return res.status(500).json({
      success: false,
      message: "AI assistant is temporarily unavailable.",
      // TEMPORARY: remove this after debugging
      error: error.message,
    });
  }
};