import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
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
import Profile from './pages/Dashboard/Profile';
import Progress from './pages/Dashboard/Progress';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AIDraftReview from './pages/Admin/AIDraftReview';
import Landing from './pages/Landing/Landing';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-900 text-white font-sans" style={{ display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div className="container mx-auto px-4 py-8" style={{ flexGrow: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<ModulesList />} />
                <Route path="/courses/:id/lesson/:lessonId" element={<LessonView />} />
                <Route path="/courses/:id/quiz/:quizId" element={<QuizAttempt />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/progress" element={<Progress />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/ai-review" element={<AIDraftReview />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
