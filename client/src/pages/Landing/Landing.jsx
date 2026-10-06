import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  BookOpen,
  Trophy,
  Shield,
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp,
  Brain,
  Award,
  Sparkles,
  BarChart3,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CourseCard from '../../components/dashboard/CourseCard';
import Footer from '../../components/layout/Footer';
import { recommendedCourses } from '../../data/dashboard';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* ── TOP NAVBAR ── */}
      <header className="h-18 md:h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white stroke-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FinLearn
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-sm font-semibold text-slate-600">
            <Link to="/" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link to="/courses" className="hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <Link to="/leaderboard" className="hover:text-blue-600 transition-colors">
              Leaderboard
            </Link>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-slate-900 font-semibold px-4 py-2 text-xs sm:text-sm transition-colors rounded-xl hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 active:scale-[0.98]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="bg-gradient-to-b from-[#EEF5FF] via-[#F8FAFC] to-[#F8FAFC] pt-10 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subtitle, Action Buttons */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Learn Personal Finance. <br />
              <span className="text-slate-900">Build a Better Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-lg mb-8">
              Short lessons, AI quizzes, badges and real-world knowledge to help you make smart money decisions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to={user ? '/dashboard' : '/register'}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl active:scale-[0.99]"
              >
                <span>Start Learning</span>
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200/90 text-blue-600 font-semibold px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span>Watch Demo</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Style Graphic Illustration matching Screenshot */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background Soft Glow Backdrop */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-blue-200/50 blur-3xl absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Main Interactive Graphic Canvas Card */}
            <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5 flex flex-col items-center">
              
              {/* Floating Badge 1: Green Trend Icon (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:left-2 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center animate-bounce duration-[3000ms]">
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* Floating Badge 2: Green Checkmark (Top Right) */}
              <div className="absolute top-2 right-4 sm:right-8 bg-emerald-400 text-white p-2.5 rounded-full shadow-md shadow-emerald-400/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* Floating Badge 3: Gold Coin (Far Right) */}
              <div className="absolute top-1/3 -right-5 bg-amber-400 text-amber-950 w-12 h-12 rounded-full shadow-lg shadow-amber-400/40 flex items-center justify-center font-extrabold text-xl border-2 border-white">
                <DollarSign className="w-6 h-6 stroke-[3]" />
              </div>

              {/* Avatar Illustration Graphic */}
              <div className="relative w-full h-64 sm:h-72 bg-gradient-to-tr from-blue-50 via-indigo-50/50 to-white rounded-2xl flex flex-col items-center justify-center p-6 border border-blue-100 overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-blue-600/10 border-4 border-white shadow-md flex items-center justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-extrabold">
                    👨‍💻
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-xl px-4 py-2 shadow-sm text-center">
                  <p className="font-extrabold text-slate-900 text-sm">Smart Financial Learner</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Mastering Budgeting & Investing</p>
                </div>

                {/* 3D Pillar Chart Graphics Bottom Right */}
                <div className="absolute bottom-3 right-4 flex items-end gap-1.5">
                  <div className="w-4 h-8 bg-blue-400/70 rounded-t-md" />
                  <div className="w-4 h-12 bg-blue-500/80 rounded-t-md" />
                  <div className="w-4 h-16 bg-blue-600 rounded-t-md shadow-md shadow-blue-600/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS HIGHLIGHT BAR (Floating Card below Hero matching Screenshot) ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-20 mb-20">
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">10+</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Learning Modules</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">AI</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">AI-Powered Quizzes</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Trophy className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Earn Certificates</span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Shield className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Join Leaderboard</span>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED COURSES SECTION (Matching Image 1) ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Learning Modules
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Explore bite-sized financial lessons designed for real-world impact.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[2]" />
          </Link>
        </div>

        {/* 4 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* ── HOW FINLEARN WORKS ── */}
      <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How FinLearn Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            A structured step-by-step approach designed to turn complex money concepts into practical everyday habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col items-start shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mb-2">1. Short Lessons</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read bite-sized, practical modules on budgeting, taxes, credit scores, and investing.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col items-start shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mb-2">2. AI Quizzes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Test your understanding with Gemini AI generated questions & immediate explanations.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col items-start shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mb-2">3. Badges & XP</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlock achievements, earn XP points, maintain daily streaks, and rank on the leaderboard.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col items-start shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mb-2">4. Scam Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learn to spot online phishing scams, fake loan apps, and secure your UPI & banking.
            </p>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION & FOOTER ── */}
      <section className="bg-slate-900 text-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join thousands of learners building financial independence with short, easy-to-understand lessons.
          </p>
          <Link
            to={user ? '/dashboard' : '/register'}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-blue-600/30"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-5 h-5 stroke-[2]" />
          </Link>
        </div>
      </section>

      <Footer variant="landing" />
    </div>
  );
}
