const { GoogleGenerativeAI } = require('@google/generative-ai');

// ---------------------------------------------------------------------------
// Initialise the Gemini client (singleton)
// ---------------------------------------------------------------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

/**
 * Returns a configured GenerativeModel instance.
 * Temperature 0.4 gives creative-yet-consistent JSON output.
 */
const getModel = () =>
  genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json', // Force JSON output
    },
  });

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

/**
 * Builds the strict prompt for quiz question generation.
 *
 * @param {string} lessonTitle   - Title of the lesson
 * @param {string} lessonContent - Full text content of the lesson
 * @param {string} categoryName  - Name of the parent category (e.g. "Budgeting")
 * @param {number} count         - Number of questions to generate
 * @param {string} difficulty    - 'Easy' | 'Medium' | 'Hard'
 * @returns {string}             - Prompt string
 */
const buildQuizPrompt = (lessonTitle, lessonContent, categoryName, count = 5, difficulty = 'Medium') => `
You are an expert financial literacy educator. Your task is to generate exactly ${count} quiz questions for a lesson.

**Lesson Title:** ${lessonTitle}
**Category:** ${categoryName}
**Difficulty:** ${difficulty}
**Lesson Content:**
---
${lessonContent}
---

**Output Rules (STRICTLY follow):**
1. Return ONLY a valid JSON object — no markdown, no code fences, no extra text.
2. The JSON must have a single key "questions" containing an array of exactly ${count} objects.
3. Each question object must have these exact keys:
   - "type": either "MCQ" or "TrueFalse"
   - "questionText": string (the question)
   - "options": array of strings (4 options for MCQ, exactly ["True","False"] for TrueFalse)
   - "correctOption": integer (0-based index of the correct option in the options array)
   - "explanation": string (1–2 sentences explaining why the answer is correct)
   - "difficulty": "${difficulty}"
   - "points": integer (Easy=5, Medium=10, Hard=15)
4. All questions must be directly based on the lesson content.
5. Ensure distractors (wrong options) are plausible but clearly incorrect upon reflection.
6. Do NOT repeat questions.

Return only the JSON object.
`;

// ---------------------------------------------------------------------------
// Core generation function
// ---------------------------------------------------------------------------

/**
 * Generate quiz question drafts using Gemini AI.
 *
 * @param {object} params
 * @param {string} params.lessonTitle
 * @param {string} params.lessonContent
 * @param {string} params.categoryName
 * @param {number} params.count         - Desired number of questions (1–10)
 * @param {string} params.difficulty    - 'Easy' | 'Medium' | 'Hard'
 * @returns {Promise<Array>}            - Array of validated question objects
 */
const generateQuizDrafts = async ({
  lessonTitle,
  lessonContent,
  categoryName,
  count = 5,
  difficulty = 'Medium',
}) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }

  const prompt = buildQuizPrompt(lessonTitle, lessonContent, categoryName, count, difficulty);

  const model    = getModel();
  const result   = await model.generateContent(prompt);
  const rawText  = result.response.text();

  // --- Parse JSON ---
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error(`Gemini returned non-JSON output: ${rawText.slice(0, 300)}`);
  }

  if (!Array.isArray(parsed.questions)) {
    throw new Error('Gemini response missing "questions" array.');
  }

  // --- Validate each question ---
  const validated = parsed.questions.map((q, idx) => {
    if (typeof q.questionText !== 'string' || !q.questionText.trim()) {
      throw new Error(`Question ${idx + 1}: missing or empty "questionText".`);
    }
    if (!['MCQ', 'TrueFalse'].includes(q.type)) {
      throw new Error(`Question ${idx + 1}: invalid type "${q.type}".`);
    }
    if (!Array.isArray(q.options) || q.options.length < 2) {
      throw new Error(`Question ${idx + 1}: "options" must be an array with ≥ 2 items.`);
    }
    if (
      typeof q.correctOption !== 'number' ||
      q.correctOption < 0 ||
      q.correctOption >= q.options.length
    ) {
      throw new Error(`Question ${idx + 1}: "correctOption" index ${q.correctOption} is out of range.`);
    }

    return {
      type:          q.type,
      questionText:  q.questionText.trim(),
      options:       q.options.map((o) => (typeof o === 'string' ? o.trim() : String(o))),
      correctOption: q.correctOption,
      explanation:   (q.explanation || '').trim(),
      difficulty:    q.difficulty || difficulty,
      points:        typeof q.points === 'number' ? q.points : (difficulty === 'Easy' ? 5 : difficulty === 'Hard' ? 15 : 10),
      source:        'AI-Generated',
    };
  });

  if (validated.length !== count) {
    throw new Error(
      `Expected ${count} questions but Gemini returned ${validated.length}.`
    );
  }

  return validated;
};

// ---------------------------------------------------------------------------
// Explanation regeneration helper
// ---------------------------------------------------------------------------

/**
 * Ask Gemini to rewrite or improve the explanation for a single question.
 *
 * @param {string} questionText
 * @param {string} correctAnswer  - Text of the correct option
 * @returns {Promise<string>}     - Improved explanation string
 */
const improveExplanation = async (questionText, correctAnswer) => {
  const prompt = `
You are a financial literacy tutor. A student answered the following quiz question incorrectly.
Write a clear, friendly, 2–3 sentence explanation of why "${correctAnswer}" is the correct answer.

Question: "${questionText}"
Correct Answer: "${correctAnswer}"

Return ONLY a plain text explanation. No JSON, no bullet points.
`;

  const model  = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

module.exports = { generateQuizDrafts, improveExplanation };
