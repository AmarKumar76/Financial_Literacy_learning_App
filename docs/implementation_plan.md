# FIN-08 Implementation Plan

This document outlines the detailed development and implementation plan for every module defined in the FIN-08 Financial Literacy Learning App SRS.

---

## 1. Authentication Module
**Goal:** Securely register, authenticate, and authorize users.

### Backend Implementation
- **Models:** Create `User` schema in `server/models/User.js` with fields for `name`, `email`, `passwordHash`, `role` (Admin/Learner), and timestamps.
- **Controllers:** Implement `register` (hash password with bcrypt) and `login` (verify password, sign JWT).
- **Middleware:** Create `authMiddleware.js` to verify JWT tokens and `roleMiddleware.js` to protect Admin routes.
- **Routes:** `POST /api/auth/register`, `POST /api/auth/login`.

### Frontend Implementation
- **Pages:** Create `Register.jsx` and `Login.jsx` inside `client/src/pages/Auth/`.
- **State Management:** Use a React Context (`AuthContext.js`) to store the current user profile and JWT token globally.
- **Routing:** Implement `ProtectedRoute.jsx` to restrict access to authenticated routes and `AdminRoute.jsx` for admin-only pages.

---

## 2. Onboarding Module
**Goal:** Gather user preferences to personalize the learning experience.

### Backend Implementation
- **Models:** Add `preferences` and `learningGoal` to the `User` schema.
- **Routes:** `PATCH /api/users/:id/onboarding` to save user selections.

### Frontend Implementation
- **Pages:** Create `Onboarding.jsx` that prompts the user (e.g., "Are you a Student or First-time Earner?").
- **Flow:** Automatically redirect newly registered users to the onboarding screen before taking them to the dashboard.

---

## 3. Learning Modules (Topics)
**Goal:** Manage and display financial literacy topics (e.g., Budgeting, Taxes).

### Backend Implementation
- **Models:** Create `Category` schema in `server/models/Category.js` (fields: `name`, `description`, `icon`, `published`).
- **Controllers:** CRUD operations for categories.
- **Routes:** `GET /api/categories` (public list).

### Frontend Implementation
- **Pages:** Create `ModulesList.jsx` to display a grid of financial topics as cards.
- **Components:** `CategoryCard.jsx` showing the icon, title, and completion progress.

---

## 4. Lesson Engine
**Goal:** Deliver short educational lessons within a category.

### Backend Implementation
- **Models:** Create `Lesson` schema in `server/models/Lesson.js` (fields: `categoryId`, `title`, `summary`, `content`, `objectives`, `duration`).
- **Controllers:** Fetch lessons by category, track when a user completes a lesson.
- **Routes:** `GET /api/lessons`, `GET /api/lessons/:id`, `POST /api/lessons/:id/complete`.

### Frontend Implementation
- **Pages:** `LessonView.jsx` to display lesson content sequentially.
- **Components:** Progress indicator, "Next" and "Complete" buttons, estimated read time.

---

## 5. Quiz Engine
**Goal:** Test user knowledge with MCQs and True/False questions.

### Backend Implementation
- **Models:** Create `QuizQuestion` schema and `QuizAttempt` schema to log user submissions.
- **Controllers:** Validate answers against the correct options, compute the score, and return explanations.
- **Routes:** `GET /api/quizzes/:id`, `POST /api/quizzes/:id/attempts`.

### Frontend Implementation
- **Pages:** `QuizAttempt.jsx` to display one question at a time.
- **Components:** `QuizOptions.jsx`, `QuizResults.jsx` (showing correct/incorrect state and explanations).
- **State:** Manage quiz timer and selected answers locally before final submission.

---

## 6. Gemini AI Integration
**Goal:** Automatically generate draft questions and explanations using Google Gemini AI.

### Backend Implementation
- **Service:** Create `server/services/gemini/geminiService.js` to handle API calls to the Google Generative AI SDK.
- **Controllers:** Formulate prompts combining the lesson content and strict JSON output requirements. Send to Gemini, parse the JSON response.
- **Validation:** Validate that the AI returned exactly the required number of questions and valid indices for `correctOption`.
- **Routes:** `POST /api/ai/quiz-drafts`.

### Frontend Implementation
- **Admin Pages:** `AIDraftReview.jsx` where Content Managers can review, edit, and approve AI-generated quizzes before they go live.

---

## 7. Gamification Module
**Goal:** Motivate learners using XP, streaks, levels, and badges.

### Backend Implementation
- **Models:** Create `Badge` and `UserBadge` schemas. Update `User` schema with `XP`, `level`, and `streak` data.
- **Logic:** During lesson/quiz completion (in the respective controllers), check if XP thresholds are met or badge unlocking rules are triggered (e.g., "Perfect Quiz" badge).
- **Routes:** `GET /api/badges`, `GET /api/leaderboard`.

### Frontend Implementation
- **Components:** `BadgeShowcase.jsx` to display unlocked and locked badges. `LeaderboardTable.jsx` to show top users by XP.
- **Animations:** Implement celebration modals or confetti when a user levels up or unlocks a badge.

---

## 8. Progress Module
**Goal:** Track and recommend weak topics based on user performance.

### Backend Implementation
- **Models:** Create `Progress` schema to store completion states per lesson/category.
- **Controllers:** Aggregate quiz scores to identify weak topics (e.g., if average score in "Taxes" is < 50%).
- **Routes:** `GET /api/progress/me` (returns overall completion %, weak topics, recommended next lesson).

### Frontend Implementation
- **Pages:** `Dashboard.jsx`.
- **Components:** Progress bars for overall course completion, a "Continue Learning" card, and a "Recommended for You" section targeting weak areas.

---

## 9. Admin Module
**Goal:** Manage users, content, AI drafts, and view analytics.

### Backend Implementation
- **Controllers:** Full CRUD operations for Users, Categories, Lessons, Quizzes, and Badges. Aggregate MongoDB pipelines to calculate platform-wide analytics.
- **Routes:** All routes prefixed with `/api/admin/*` and protected by `roleMiddleware`.

### Frontend Implementation
- **Pages:** Create an Admin Dashboard layout (`AdminLayout.jsx`). Include views like `ContentManager.jsx`, `UserManagement.jsx`, and `AnalyticsDashboard.jsx`.
- **Components:** Data tables, forms for creating/editing lessons, and charts for analytics.

---

## 10. Notifications
**Goal:** Provide optional reminders for streaks and learning recommendations.

### Backend Implementation
- **Logic:** Optional CRON jobs (using `node-cron`) to check user streaks. If a user's streak is at risk of expiring, queue a reminder.
- **API:** Simple notification endpoints to fetch unread in-app alerts.

### Frontend Implementation
- **Components:** `NotificationBell.jsx` in the navigation bar to display drop-down alerts.
