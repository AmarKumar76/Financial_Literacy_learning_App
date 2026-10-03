# SOFTWARE REQUIREMENTS SPECIFICATION
**FIN-08 — Financial Literacy Learning App**
MERN + Gemini AI
Version 1.0 | October 2026

## Document Control
| Item | Value |
| --- | --- |
| Project ID | FIN-08 |
| Project | Financial Literacy Learning App |
| Document | Software Requirements Specification (SRS) |
| Version | 1.0 |
| Primary Stack | MERN + Gemini AI |
| Audience | Learners, first-time earners, administrators, developers, testers |
| Status | Development Baseline |

## 1. Introduction
### 1.1 Purpose
This SRS defines the functional, non-functional, technical, data, security, UI, testing and deployment requirements for FIN-08, a responsive web application that teaches financial literacy through short lessons, Gemini-powered quizzes, practical scenarios and gamification.

### 1.2 Vision
Make financial education simple, practical and engaging for beginners. The product is educational and informational; it does not execute trades or provide personalized investment/tax advice.

### 1.3 Target Users
* Students and beginners
* First-time earners
* Administrators/content managers

## 2. Problem Statement
* Beginners find terms such as tax, TDS, budgeting, investment, credit and insurance difficult.
* New earners often do not know how to structure their learning or manage basic money concepts.
* Long/static financial content can be boring and difficult to complete.
* Users may not recognize fake investment offers, phishing, OTP or loan scams.
* Traditional resources often lack immediate quizzes, explanations and progress feedback.
* Users may not know which topics they understand or need to practice.

### 2.1 Real-Life Example
A first-time employee receives a salary but does not understand budgeting, TDS, emergency funds or investment risk. FIN-08 gives the learner a short lesson, a real-life scenario, a Gemini-generated quiz, an explanation for the answer, XP/badges and a progress dashboard. If the learner repeatedly scores low in Tax or Investing, those topics are recommended.

### 2.2 Objectives
* Provide structured beginner-friendly lessons.
* Generate useful draft quizzes with Gemini.
* Give instant educational feedback.
* Track lessons, scores, streaks and weak areas.
* Use badges/XP/leaderboards to improve learning engagement.
* Teach practical scam/fraud awareness.

## 3. Scope
### 3.1 In Scope
* Registration/login and RBAC
* Financial learning modules
* Lesson completion tracking
* MCQ and True/False quizzes
* Gemini quiz generation and explanations
* Admin review of AI-generated drafts
* XP, badges, streaks and leaderboard
* Progress dashboard and recommendations
* Admin content management
* MongoDB persistence
* Responsive web UI
* Production-ready deployment structure

### 3.2 Out of Scope for V1
* Stock/crypto trading
* Personalized investment recommendations
* Automated tax filing
* Bank-account/UPI transaction access
* Guaranteed financial outcomes
* Automatic publication of unreviewed AI content

## 4. Stakeholders and Roles
| Role | Capabilities |
| --- | --- |
| Learner | Learn, quiz, see explanations, earn XP/badges, view progress and leaderboard. |
| Administrator | Manage users, categories, lessons, quizzes, badges and analytics. |
| Content Manager (optional) | Review/edit/approve AI-generated educational questions. |
| System | Authentication, scoring, progress, AI requests, audit logs and analytics. |

## 5. Functional Requirements
| ID | Requirement | Description | Priority |
| --- | --- | --- | --- |
| FR-01 | Registration | User can register with validated name, email and password. | High |
| FR-02 | Authentication | System authenticates users and creates secure sessions/tokens. | High |
| FR-03 | RBAC | Only authorized roles can access admin/content functions. | High |
| FR-04 | Profile | Learner can manage basic profile and learning preference. | Medium |
| FR-05 | Categories | System displays financial categories and progress. | High |
| FR-06 | Lessons | Learner can open and complete published lessons. | High |
| FR-07 | Quiz | Learner can attempt MCQ/True-False quizzes. | High |
| FR-08 | Scoring | System automatically scores objective questions. | High |
| FR-09 | Feedback | System shows correct/incorrect status and educational explanation. | High |
| FR-10 | Gemini Drafts | Backend can generate structured draft questions from approved lesson context. | High |
| FR-11 | AI Validation | System validates AI response structure before saving. | High |
| FR-12 | Human Review | AI questions require review/edit/approval before publication. | High |
| FR-13 | XP | System awards configurable XP for learning activities. | Medium |
| FR-14 | Badges | System unlocks badges using deterministic rules. | Medium |
| FR-15 | Leaderboard | System provides weekly/all-time rankings based on XP. | Medium |
| FR-16 | Progress | System calculates lesson, quiz and category progress. | High |
| FR-17 | Recommendations | System recommends incomplete/weak topics. | Medium |
| FR-18 | Admin Content | Admin can create, edit, publish, unpublish and archive content. | High |
| FR-19 | Analytics | Admin can view aggregate learning and quiz metrics. | Medium |
| FR-20 | Responsive UI | Application works across desktop, tablet and mobile layouts. | High |
| FR-21 | Search | Learner can search/filter modules. | Medium |
| FR-22 | Audit | Important admin/AI content actions are logged. | Medium |

## 6. Non-Functional Requirements
| Area | Requirement |
| --- | --- |
| Performance | Normal screens/APIs should feel responsive; AI generation may be asynchronous. |
| Security | Hash passwords, protect secrets, enforce server-side authorization and HTTPS. |
| Privacy | Collect only required data; do not expose private user information on public leaderboards. |
| Scalability | Keep frontend, API, database and AI integration modular. |
| Maintainability | Use reusable components, controllers, services and clear naming. |
| Usability | Beginner should reach a lesson within a few intuitive steps. |
| Accessibility | Readable contrast, semantic controls, labels and keyboard-friendly interactions. |
| Compatibility | Current Chrome/Edge/Firefox/Safari and responsive mobile browsers. |
| Reliability | Prevent duplicate quiz scoring and preserve progress consistently. |
| AI Safety | AI output is draft educational content and is reviewed before publication. |
| Observability | Log errors, important events and key performance metrics. |

## 7. Main Application Modules
### 7.1 Authentication
Register, login, logout, password hashing, JWT and role-based route protection.

### 7.2 Onboarding
Ask learner type/goal such as Student or First-time Earner and personalize starting modules.

### 7.3 Learning Modules
Money Basics, Banking & Payments, Budgeting, Tax Basics, Investing Basics, Credit & Loans, Insurance, Scam & Fraud Awareness.

### 7.4 Lesson Engine
Short lessons with summary, examples, key points, estimated time and completion state.

### 7.5 Quiz Engine
MCQ/True-False, optional timer, scoring, answer review and attempt history.

### 7.6 Gemini AI
Draft questions, explanations and optional simplified content using backend-only API calls.

### 7.7 Gamification
XP, levels, badges, streaks, achievements and leaderboard.

### 7.8 Progress
Overall/category progress, quiz average, weak topics and recommendations.

### 7.9 Admin
Users, categories, lessons, quizzes, AI drafts, badges and analytics.

### 7.10 Notifications
Optional reminders for streaks, completed badges and recommended learning.

## 8. User Workflow
Landing → Register/Login → Onboarding → Dashboard → Select Topic → Lesson → Quiz → AI Feedback → XP/Badge → Progress → Recommended Learning

### 8.1 Example Workflow
1. User selects Tax Basics.
2. Reads a 3–5 minute lesson.
3. Starts a five-question quiz.
4. Submits answers.
5. System scores the attempt.
6. Gemini-generated explanation is shown where configured.
7. XP and badge rules are evaluated.
8. Dashboard updates progress.
9. If performance is weak, Tax Basics is recommended again.

## 9. UI/UX Requirements
The UI should be modern, friendly and educational—not a trading terminal. Use clean cards, readable typography, clear progress bars, simple icons and restrained gamification.

| Screen | UI Requirements |
| --- | --- |
| Landing Page | Hero, Start Learning CTA, benefits, topics, AI quiz highlight and footer. |
| Login/Register | Simple forms, validation and clear error messages. |
| Onboarding | User type and learning goal selection. |
| Dashboard | Progress, streak, XP, badges, continue-learning and recommended cards. |
| Module Page | Topic cards, search/filter and completion percentage. |
| Lesson Page | Title, estimated time, short content, examples, key points, Complete and Next buttons. |
| Quiz Page | Question, options, progress bar, optional timer, next/submit and feedback. |
| Result Page | Score, correct/incorrect count, explanations and next recommendation. |
| Leaderboard | Weekly/all-time filter and privacy-friendly display name. |
| Badges | Unlocked/locked badges with achievement criteria. |
| Profile | User info, XP, streak and category-wise progress. |
| Admin | Content CRUD, AI draft review, users and analytics. |

## 10. Technology Stack
| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React.js | Pages, components, routing and state. |
| Styling | Tailwind CSS | Responsive visual system. |
| Backend | Node.js + Express.js | REST APIs and business logic. |
| Database | MongoDB + Mongoose | Persistent application data. |
| AI | Gemini API | Quiz generation and educational explanations. |
| Authentication | JWT + bcrypt/Argon2 | Authentication and password security. |
| Optional Cache | Redis | Caching/rate limiting/background state. |
| Storage | S3/Cloudinary (optional) | Future lesson images/media. |
| DevOps | GitHub Actions + Docker (optional) | CI/CD and repeatable deployment. |
| Monitoring | Logs + Prometheus/Grafana (optional) | Production health/performance. |

## 11. System Architecture
Recommended logical architecture:

```text
React Frontend
      ↓
Node.js + Express REST API
  ↙       ↓          ↘
MongoDB  Auth/RBAC  Gemini Service
                     ↓
                 Gemini API
```
Optional: Redis for caching/rate limiting; S3/Cloudinary for media.
Important: Gemini credentials must remain on the backend and never be embedded in React code.

## 12. Database Design
| Collection | Key Data |
| --- | --- |
| users | name, email, passwordHash, role, XP, level, preferences, status, timestamps |
| categories | name, description, icon, level, published |
| lessons | categoryId, title, summary, content, objectives, duration, status, version |
| quiz_questions | quizId, question, options, correctOption, explanation, difficulty, source |
| quizzes | lesson/category, title, questions, timer, status |
| quiz_attempts | userId, quizId, answers, score, duration, submittedAt |
| progress | userId, lessonId/categoryId, completion, lastAccessed |
| badges | name, description, icon, unlockRule |
| user_badges | userId, badgeId, earnedAt |
| streaks | userId, activeDates, currentStreak, longestStreak |
| ai_generation_logs | lessonId, status, model metadata, reviewer status, timestamps |
| audit_logs | actor, action, entity, timestamp, metadata |

### 12.1 Example Question JSON
```json
{
  "question": "What does TDS stand for?",
  "options": [
    "Total Deduction System",
    "Tax Deducted at Source",
    "Tax Direct Scheme",
    "Total Income Statement"
  ],
  "correctOption": 1,
  "explanation": "TDS means Tax Deducted at Source.",
  "difficulty": "easy"
}
```

## 13. API Requirements
| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/categories | List published categories |
| GET | /api/lessons | Search/list lessons |
| GET | /api/lessons/:id | Lesson details |
| POST | /api/lessons/:id/complete | Complete lesson |
| GET | /api/quizzes/:id | Get quiz |
| POST | /api/quizzes/:id/attempts | Submit quiz |
| GET | /api/progress/me | Current learner progress |
| GET | /api/leaderboard | Leaderboard |
| GET | /api/badges | Badges |
| POST | /api/ai/quiz-drafts | Generate AI draft |
| POST | /api/ai/explain | Generate explanation |
| GET | /api/admin/ai-drafts | Review AI drafts |
| PATCH | /api/admin/ai-drafts/:id | Approve/reject/edit |
| POST | /api/admin/lessons | Create lesson |
| PATCH | /api/admin/lessons/:id | Update lesson |
| DELETE | /api/admin/lessons/:id | Archive lesson |

## 14. Gemini AI Requirements
### 14.1 Generation Workflow
1. Admin selects an approved lesson/topic.
2. Backend sends constrained lesson context to Gemini.
3. Gemini returns structured JSON questions.
4. Backend validates question count, options and answer indexes.
5. Draft is stored with AI metadata.
6. Content manager reviews and edits.
7. Approved questions are published.

### 14.2 AI Rules
* AI output must not be published automatically in V1.
* AI must not be used to make personalized investment/tax decisions.
* Malformed or unsafe output must be rejected.
* Use educational source context whenever possible.
* Rate-limit AI requests and handle API failures gracefully.
* Do not log API keys or other secrets.

## 15. Security Requirements
* Hash passwords with bcrypt/Argon2.
* Use HTTPS in production.
* Store JWT/Gemini secrets in environment variables or a secret manager.
* Never return password hashes or secrets.
* Enforce RBAC on the server.
* Validate/sanitize request bodies and query parameters.
* Rate-limit login, registration and AI endpoints.
* Configure CORS to trusted origins.
* Protect admin APIs.
* Use privacy-friendly leaderboard names.
* Keep audit logs for privileged actions.
* Use least-privilege database/cloud credentials.

## 16. Gamification Rules
| Activity | Example XP | Configurable |
| --- | --- | --- |
| Complete lesson | 10 | Yes |
| Complete quiz | 20 | Yes |
| Perfect quiz | 50 bonus | Yes |
| Daily learning | 10 | Yes |
| Achievement | Variable | Yes |

Example badges: Beginner, Learner, Money Smart, Investor Explorer, Scam Aware and Finance Master. XP values are configurable and should reward learning activity, not real-world financial transactions.

## 17. Analytics
* Registered users and active learners
* Lesson completion
* Quiz attempts and average scores
* Category performance
* Most/least completed modules
* Question correctness
* AI draft approval rate
* XP/badge distribution
* Weekly/monthly learning activity

### 17.1 Learner Metrics
* Overall progress
* Quiz average
* Current/longest streak
* XP and level
* Badges
* Weak topics
* Recommended lessons

## 18. Error Handling and Edge Cases
| Scenario | Expected Behavior |
| --- | --- |
| Duplicate registration | Clear validation; avoid unnecessary account disclosure. |
| Wrong login | Generic authentication failure. |
| Expired token | Unauthorized response; require re-authentication. |
| Double quiz submission | Prevent duplicate scoring and preserve one authoritative attempt. |
| Gemini unavailable | Friendly retry/fallback to manually authored quiz. |
| Malformed AI response | Reject and log; do not publish. |
| Deleted lesson with history | Archive rather than hard-delete when analytics depend on it. |
| Unauthorized admin request | Forbidden response; log security event where appropriate. |
| Leaderboard privacy | Display only allowed display name/anonymized identity. |

## 19. Testing Strategy
* Unit tests for scoring, XP, progress and validation.
* API tests for authentication, lessons, quizzes, admin and AI endpoints.
* Frontend tests for forms, navigation, quiz interaction and responsive states.
* Integration tests for MongoDB and Gemini service handling.
* Security tests for RBAC, validation, rate limiting and secret exposure.
* End-to-end test: register → lesson → quiz → result → XP/badge → progress.

### 19.1 Acceptance Criteria
1. User can register and log in.
2. User can browse and complete a lesson.
3. Progress persists after completion.
4. User can attempt and submit a quiz.
5. Score and feedback are displayed correctly.
6. Gemini can generate a valid draft from approved lesson context.
7. AI draft cannot become public without approval.
8. XP/badges update according to rules.
9. Dashboard reflects current progress.
10. Unauthorized users cannot access admin features.
11. Application works on desktop and mobile.
12. Gemini failure does not crash the learning system.

## 20. Deployment and DevOps
### 20.1 Environments
* Development
* Testing/Staging
* Production

### 20.2 Environment Variables
```env
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
CLIENT_URL=
PORT=
REDIS_URL= # optional
```

### 20.3 CI/CD
1. Push to GitHub.
2. Install dependencies and run lint/tests.
3. Build frontend/backend.
4. Build Docker images if used.
5. Deploy to staging.
6. Run smoke tests.
7. Promote to production.

### 20.4 Monitoring
* API errors and latency
* Database health
* Gemini failures/latency
* Authentication failures
* Application uptime
* Optional Prometheus/Grafana dashboards

## 21. Risks and Mitigation
| Risk | Mitigation |
| --- | --- |
| Incorrect AI content | Human review, approved context and validation. |
| Gemini limits/cost | Rate limits, quotas, caching and manual fallback. |
| Security breach | HTTPS, hashing, RBAC, validation and secret management. |
| Gamification distraction | Reward learning completion, not financial actions. |
| Outdated content | Admin review dates and versioning. |
| Mobile usability | Responsive-first design and device testing. |
| Data loss | Managed database backups and recovery testing. |
| Leaderboard privacy | Display-name/anonymization and optional opt-out. |

## 22. Future Enhancements
* Multilingual learning
* Voice/text-to-speech lessons
* Adaptive difficulty
* Budgeting simulator
* Emergency-fund calculator
* Scenario-based fraud simulations
* Institution/classroom mode
* Offline learning with synchronization
* Advanced analytics
* Background AI jobs with Redis
* Container orchestration
* Advanced monitoring and observability

## 23. Recommended Project Folder Structure
```text
financial-literacy-app/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── services/
│       ├── hooks/
│       └── utils/
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   └── gemini/
│   ├── utils/
│   └── server.js
├── tests/
├── .env.example
└── README.md
```

## 24. MVP Development Roadmap
| Phase | Deliverable |
| --- | --- |
| Phase 1 | React UI + routing + responsive design |
| Phase 2 | Node/Express + MongoDB setup |
| Phase 3 | JWT authentication + RBAC |
| Phase 4 | Categories + lessons + admin CRUD |
| Phase 5 | Quiz engine + scoring + attempts |
| Phase 6 | Gemini quiz generation + explanation |
| Phase 7 | XP + badges + streak + leaderboard |
| Phase 8 | Progress + recommendations + analytics |
| Phase 9 | Testing + security hardening |
| Phase 10 | Deployment + CI/CD + monitoring |

## 25. Glossary
| Term | Meaning |
| --- | --- |
| MERN | MongoDB, Express.js, React and Node.js. |
| Gemini | Google generative AI model/API used for educational assistance. |
| JWT | JSON Web Token used for authentication. |
| RBAC | Role-Based Access Control. |
| XP | Experience points used for learning gamification. |
| MCQ | Multiple Choice Question. |
| API | Application Programming Interface. |
| CRUD | Create, Read, Update and Delete. |
| SRS | Software Requirements Specification. |

## Executive Summary
FIN-08 is a MERN-based financial literacy learning platform enhanced with Gemini AI. It solves the beginner's difficulty in understanding budgeting, taxes, investing, credit, banking and scams by combining short lessons, practical examples, AI-generated quizzes, explanations, progress tracking and gamification. The system uses a human-review workflow for AI-generated educational content and is explicitly designed as an educational application rather than a financial transaction or personalized-advice system.
