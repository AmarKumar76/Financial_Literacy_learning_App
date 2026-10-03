# FIN-08 Edge Cases & Error Handling

This document details the edge cases, potential failures, and expected error handling strategies for every module in the FIN-08 Financial Literacy Learning App.

---

## 1. Authentication Module
- **Duplicate Registration:** User tries to register with an email that already exists. (Expected: Return a generic validation error, avoiding specific account existence disclosure to prevent enumeration).
- **Weak Passwords:** User submits a password shorter than the required length. (Expected: Frontend validation blocks submission; backend rejects and returns a 400 Bad Request).
- **Expired/Invalid JWT:** A user attempts an action with an expired session token. (Expected: Intercept with a 401 Unauthorized, gracefully redirect to the login screen without losing local state).
- **Malformed Email:** User enters a non-standard email string. (Expected: Regex validation on both frontend and backend).

## 2. Onboarding Module
- **Skipped Onboarding:** A user forces a URL bypass to go straight to the dashboard without setting preferences. (Expected: A global layout wrapper checks if onboarding is complete; if not, redirects back to the onboarding route).
- **Network Failure During Save:** User clicks "Complete" but connection drops. (Expected: Show a toast error message and allow retry).
- **Invalid Data Sent:** A malicious user sends unknown preference values via API. (Expected: Backend strictly sanitizes and validates against a predefined enum).

## 3. Learning Modules (Topics)
- **Empty Category:** A published category has zero lessons assigned to it. (Expected: Show a friendly "Coming Soon" placeholder rather than an empty screen).
- **Unpublished Content Access:** A user tries to directly access a module ID that is marked as unpublished. (Expected: Return a 404 or 403 response; do not leak content).
- **Deleted Category:** A category is deleted but a user has bookmarked the URL. (Expected: Handle gracefully with a custom 404 page redirecting to the modules list).

## 4. Lesson Engine
- **Double Completion Submission:** A user rapid-clicks the "Complete" button, sending multiple API requests. (Expected: Backend should use an upsert or check if already completed to prevent duplicate XP/progress).
- **Extremely Long Content:** A lesson has excessively long text or broken markdown formatting. (Expected: Frontend uses responsive CSS `overflow-wrap` and standard markdown parsing with strict sanitization).
- **Missing Media:** An image in the lesson fails to load from S3/Cloudinary. (Expected: Include proper `alt` tags and a styled fallback placeholder).

## 5. Quiz Engine
- **Page Refresh During Quiz:** User reloads the page halfway through a timed quiz. (Expected: State is lost, or optionally saved in `localStorage`. Default to resetting the attempt).
- **Double Quiz Submission:** User clicks submit twice, potentially scoring XP twice. (Expected: Backend locks the quiz attempt upon the first valid submission).
- **No Answers Selected:** User submits without choosing an option. (Expected: Frontend disables the submit button until an option is selected).
- **Late Submission:** User submits answers after the optional timer expires. (Expected: Backend verifies timestamp and rejects the submission, marking the quiz as failed).

## 6. Gemini AI Integration
- **Gemini API Timeout/Failure:** Google Generative AI service is down or rate-limited. (Expected: Gracefully fall back to manually authored questions or display a retry prompt to the Admin).
- **Malformed AI Response:** Gemini returns standard text instead of the strictly requested JSON format. (Expected: Backend validation catches the parsing error, rejects the draft, and potentially retries the prompt automatically).
- **Inappropriate Content:** AI generates non-educational or restricted financial advice. (Expected: Human-in-the-loop requirement catches this in the Draft Review stage before publication).
- **Too Few Questions:** AI returns 3 questions instead of the requested 5. (Expected: Backend validation rejects the set or flags it as incomplete for the Content Manager).

## 7. Gamification Module
- **Max Level Reached:** A highly active user surpasses the maximum predefined XP level. (Expected: Logic should gracefully handle infinite leveling with a standard formula, or cap at a "Max Level" without breaking).
- **Concurrent Badge Unlocks:** A single action triggers multiple badges (e.g., "Complete first quiz" and "Perfect Quiz"). (Expected: Backend logic must evaluate and award all eligible badges simultaneously, pushing an array of unlock notifications to the frontend).
- **Negative XP:** An unforeseen bug tries to deduct XP. (Expected: Database schema enforces a minimum XP of 0).

## 8. Progress Module
- **Stale Progress Cache:** The progress dashboard relies on cached data and doesn't reflect a just-completed lesson. (Expected: Invalidate cache or optimistic UI updates so the user immediately sees 100% completion).
- **Divide by Zero:** A category has 0 quizzes, but the system tries to calculate average score. (Expected: Handle NaN or Infinity values gracefully, defaulting to 0% or N/A).

## 9. Admin Module
- **Self-Demotion:** An admin accidentally changes their own role to Learner. (Expected: The system should prevent the last remaining admin from changing their role).
- **Accidental Deletion of Live Content:** Admin tries to delete a lesson that thousands of users have already completed. (Expected: Implement "soft deletes" (archiving) so historical analytics and user progress don't crash).
- **Unauthorized Privilege Escalation:** A Learner attempts to hit `/api/admin/lessons` via Postman. (Expected: `roleMiddleware` firmly rejects with a 403 Forbidden).

## 10. Notifications
- **Spamming Notifications:** A cron job bug queues the same streak reminder 50 times. (Expected: Include a `lastNotifiedAt` timestamp on the user record to throttle outgoing alerts to max 1 per day).
- **Timezone Mismatch:** A reminder is sent at 3 AM in the user's local time. (Expected: Either standard UTC sending times or store the user's local timezone during onboarding to send at optimal hours).
