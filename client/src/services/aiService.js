import api from './api';

/**
 * Send message to FinBuddy AI Chatbot
 * @param {string} message - User query text
 * @returns {Promise<{ success: boolean, reply: string }>}
 */
export const sendChatMessage = async (message) => {
  const response = await api.post('/ai/chat', { message });
  return response.data;
};

/**
 * Request AI-generated quiz drafts for a lesson (Admin)
 */
export const generateQuizDrafts = async (data) => {
  const response = await api.post('/ai/quiz-drafts', data);
  return response.data;
};

/**
 * Ask AI to improve explanation for a question (Admin)
 */
export const improveExplanation = async (data) => {
  const response = await api.post('/ai/improve-explanation', data);
  return response.data;
};

export default {
  sendChatMessage,
  generateQuizDrafts,
  improveExplanation,
};
