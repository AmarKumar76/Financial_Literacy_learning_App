const { GoogleGenerativeAI } = require("@google/generative-ai");

// ============================================================
// GEMINI CONFIGURATION
// ============================================================

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is not configured.");
}

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const MODEL_NAME =
  process.env.GEMINI_MODEL || "gemini-1.5-flash";


// ============================================================
// QUIZ MODEL
// Used for AI-generated quiz questions
// ============================================================

const getQuizModel = () => {
  return genAI.getGenerativeModel({
    model: MODEL_NAME,

    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 4096,

      // Quiz generation must return JSON
      responseMimeType: "application/json",
    },
  });
};


// ============================================================
// CHAT MODEL
// Used by FinBuddy chatbot
// ============================================================

const getChatModel = () => {
  return genAI.getGenerativeModel({
    model: MODEL_NAME,

    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 1024,
    },
  });
};


// ============================================================
// VALIDATE GEMINI CONFIGURATION
// ============================================================

const validateGeminiConfig = () => {
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
  ) {
    throw new Error(
      "GEMINI_API_KEY is not configured in the environment."
    );
  }
};


// ============================================================
// QUIZ PROMPT BUILDER
// ============================================================

const buildQuizPrompt = (
  lessonTitle,
  lessonContent,
  categoryName,
  count = 5,
  difficulty = "Medium"
) => {
  return `
You are an expert financial literacy educator.

Your task is to generate exactly ${count} quiz questions
for the following lesson.

Lesson Title:
${lessonTitle}

Category:
${categoryName}

Difficulty:
${difficulty}

Lesson Content:
---
${lessonContent}
---

OUTPUT RULES:

1. Return ONLY a valid JSON object.
2. Do not return markdown.
3. Do not return code fences.
4. Do not add any text outside the JSON object.
5. The JSON must contain exactly one key:
   "questions"
6. "questions" must contain exactly ${count} objects.

Each question object must contain:

{
  "type": "MCQ" or "TrueFalse",
  "questionText": "string",
  "options": ["string"],
  "correctOption": 0,
  "explanation": "string",
  "difficulty": "${difficulty}",
  "points": number
}

Rules for options:

- MCQ must contain exactly 4 options.
- TrueFalse must contain exactly:
  ["True", "False"]

Rules for correctOption:

- It must be a zero-based index.
- It must point to the correct answer.

Rules for questions:

- Questions must be directly based on the lesson content.
- Wrong options must be plausible.
- Do not repeat questions.
- Explanations should be 1–2 sentences.
- Do not introduce information unrelated to the lesson.

Points:

Easy = 5
Medium = 10
Hard = 15

Return ONLY the JSON object.
`;
};


// ============================================================
// GENERATE QUIZ DRAFTS
// ============================================================

const generateQuizDrafts = async ({
  lessonTitle,
  lessonContent,
  categoryName,
  count = 5,
  difficulty = "Medium",
}) => {
  validateGeminiConfig();

  // Validate count
  if (count < 1 || count > 10) {
    throw new Error("Question count must be between 1 and 10.");
  }

  // Validate difficulty
  if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
    throw new Error(
      "Difficulty must be Easy, Medium, or Hard."
    );
  }

  const prompt = buildQuizPrompt(
    lessonTitle,
    lessonContent,
    categoryName,
    count,
    difficulty
  );

  try {
    const model = getQuizModel();

    const result = await model.generateContent(prompt);

    const rawText = result.response.text();

    // --------------------------------------------------------
    // Parse JSON
    // --------------------------------------------------------

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch (error) {
      throw new Error(
        `Gemini returned invalid JSON: ${rawText.slice(0, 300)}`
      );
    }

    // --------------------------------------------------------
    // Validate questions array
    // --------------------------------------------------------

    if (!Array.isArray(parsed.questions)) {
      throw new Error(
        'Gemini response does not contain a valid "questions" array.'
      );
    }

    if (parsed.questions.length !== count) {
      throw new Error(
        `Expected ${count} questions but Gemini returned ${parsed.questions.length}.`
      );
    }

    // --------------------------------------------------------
    // Validate every question
    // --------------------------------------------------------

    const validatedQuestions = parsed.questions.map(
      (question, index) => {
        const questionNumber = index + 1;

        // Question text
        if (
          typeof question.questionText !== "string" ||
          !question.questionText.trim()
        ) {
          throw new Error(
            `Question ${questionNumber}: questionText is missing.`
          );
        }

        // Type
        if (
          !["MCQ", "TrueFalse"].includes(question.type)
        ) {
          throw new Error(
            `Question ${questionNumber}: invalid question type.`
          );
        }

        // Options
        if (!Array.isArray(question.options)) {
          throw new Error(
            `Question ${questionNumber}: options must be an array.`
          );
        }

        // MCQ validation
        if (
          question.type === "MCQ" &&
          question.options.length !== 4
        ) {
          throw new Error(
            `Question ${questionNumber}: MCQ must have exactly 4 options.`
          );
        }

        // True/False validation
        if (
          question.type === "TrueFalse" &&
          question.options.length !== 2
        ) {
          throw new Error(
            `Question ${questionNumber}: TrueFalse must have exactly 2 options.`
          );
        }

        // Correct option
        if (
          typeof question.correctOption !== "number" ||
          question.correctOption < 0 ||
          question.correctOption >= question.options.length
        ) {
          throw new Error(
            `Question ${questionNumber}: correctOption is invalid.`
          );
        }

        // Explanation
        if (
          typeof question.explanation !== "string"
        ) {
          question.explanation = "";
        }

        // Points
        let points = question.points;

        if (typeof points !== "number") {
          if (difficulty === "Easy") {
            points = 5;
          } else if (difficulty === "Hard") {
            points = 15;
          } else {
            points = 10;
          }
        }

        return {
          type: question.type,

          questionText:
            question.questionText.trim(),

          options: question.options.map((option) =>
            String(option).trim()
          ),

          correctOption: question.correctOption,

          explanation:
            question.explanation.trim(),

          difficulty:
            question.difficulty || difficulty,

          points,

          source: "AI-Generated",
        };
      }
    );

    return validatedQuestions;

  } catch (error) {
    console.error(
      "❌ Gemini Quiz Generation Error:",
      error.message
    );

    throw error;
  }
};


// ============================================================
// IMPROVE QUIZ EXPLANATION
// ============================================================

const improveExplanation = async (
  questionText,
  correctAnswer
) => {
  validateGeminiConfig();

  const prompt = `
You are a financial literacy tutor.

A student answered the following quiz question incorrectly.

Explain clearly and simply why the provided answer
is correct.

Question:
"${questionText}"

Correct Answer:
"${correctAnswer}"

Requirements:

1. Use beginner-friendly language.
2. Explain the concept clearly.
3. Give a small example if useful.
4. Keep the explanation to 2–3 sentences.
5. Do not provide personalized financial advice.
6. Return only the explanation.
7. Do not use JSON.
8. Do not use markdown.
`;

  try {
    const model = getChatModel();

    const result = await model.generateContent(prompt);

    return result.response.text().trim();

  } catch (error) {
    console.error(
      "❌ Gemini Explanation Error:",
      error.message
    );

    throw error;
  }
};


// ============================================================
// FINBUDDY CHATBOT
// ============================================================

const generateFinancialResponse = async (question) => {
  validateGeminiConfig();

  if (
    typeof question !== "string" ||
    !question.trim()
  ) {
    throw new Error(
      "A valid question is required."
    );
  }

  const prompt = `
You are FinBuddy, the AI financial education assistant
inside the FIN-08 Financial Literacy Learning App.

Your purpose is to help beginners understand financial
concepts in a simple, practical and educational way.

IMPORTANT RULES:

1. Explain financial concepts in simple beginner-friendly
   language.

2. Use practical examples whenever useful.

3. Keep answers educational and informational.

4. Do NOT provide personalized investment advice.

5. Do NOT provide personalized tax advice.

6. Do NOT tell users which stock, cryptocurrency,
   mutual fund, insurance product or financial product
   they should buy.

7. Do NOT guarantee financial returns or outcomes.

8. If a user asks for personalized financial advice,
   explain the relevant concept generally and recommend
   consulting a qualified financial professional.

9. Do not pretend to be a financial advisor.

10. For scam, fraud, phishing, OTP or fake loan questions,
    provide safety-focused educational guidance.

11. If the question is unrelated to financial education,
    politely redirect the user toward topics such as:
    budgeting, banking, taxes, investing basics,
    credit, loans, insurance and scam awareness.

12. Keep answers concise and easy to understand.

13. Use INR/Indian examples when a currency example
    is necessary.

14. Do not use unnecessary technical terminology.

USER QUESTION:
${question.trim()}
`;

  try {
    const model = getChatModel();

    const result = await model.generateContent(prompt);

    const responseText =
      result.response.text();

    if (!responseText || !responseText.trim()) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    return responseText.trim();

  } catch (error) {
    console.error(
      "❌ FinBuddy Gemini Error:",
      error.message
    );

    throw error;
  }
};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  generateQuizDrafts,
  improveExplanation,
  generateFinancialResponse,
};