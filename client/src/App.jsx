import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Onboarding from './pages/Onboarding/Onboarding';
import Dashboard from './pages/Dashboard/Dashboard';
import ModulesList from './pages/Courses/ModulesList';
import LessonView from './pages/Courses/LessonView';
import QuizAttempt from './pages/Courses/QuizAttempt';
import Leaderboard from './pages/Dashboard/Leaderboard';
import Badges from './pages/Dashboard/Badges';
import Profile from './pages/Dashboard/Profile';
import Progress from './pages/Dashboard/Progress';
import BudgetSimulator from './pages/Courses/BudgetSimulator';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AIDraftReview from './pages/Admin/AIDraftReview';
import Landing from './pages/Landing/Landing';

import FinBuddyChatbot from './components/chatbot/FinBuddyChatbot';

function AppContent() {
  const location = useLocation();

  // SaaS Dashboard routes that use the full-screen light dashboard layout
  const isDashboardRoute = [
    '/dashboard',
    '/courses',
    '/leaderboard',
    '/badges',
    '/profile',
    '/progress',
    '/simulator',
  ].some((path) => location.pathname.startsWith(path));

  return (
    <>
      {isDashboardRoute ? (
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<ModulesList />} />
            <Route path="/courses/:id/lesson/:lessonId" element={<LessonView />} />
            <Route path="/courses/:id/quiz/:quizId" element={<QuizAttempt />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/simulator" element={<BudgetSimulator />} />
          </Route>
        </Routes>
      ) : (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col antialiased">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Other Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/ai-review" element={<AIDraftReview />} />
            </Route>
          </Routes>
        </div>
      )}
      <FinBuddyChatbot />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
