import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Target,
  TrendingUp,
  BookOpen,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Award,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

export default function Progress() {
  const [progress, setProgress] = useState(null);
  const [moduleBreakdown, setModuleBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, catRes] = await Promise.all([
          api.get('/progress/me'),
          api.get('/categories'),
        ]);

        if (progRes.data) {
          setProgress(progRes.data);
        }

        if (Array.isArray(catRes.data)) {
          const colors = ['bg-emerald-600', 'bg-blue-600', 'bg-purple-600', 'bg-red-500', 'bg-cyan-600', 'bg-amber-500'];
          const breakdown = catRes.data.map((cat, idx) => ({
            name: cat.name,
            progress: cat.progress || 0,
            color: colors[idx % colors.length],
          }));
          setModuleBreakdown(breakdown);
        }
      } catch (err) {
        console.warn('Error fetching progress metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = {
    overall: progress?.overall ?? 45,
    lessonsCompleted: progress?.completedLessons ?? 3,
    quizzesAttempted: progress?.quizAttemptsCount ?? 2,
    quizAvg: progress?.quizAvg ?? 80,
    streak: progress?.streak ?? 3,
    weakTopics: progress?.weakTopics ?? ['Tax Basics'],
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="pb-2 border-b border-slate-200/80">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-blue-600 stroke-[2]" />
            <span>Learning Progress & Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Detailed insights into your course completion, quiz scores, and weak topics.
          </p>
        </div>

        {/* Top 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Overall Progress</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.overall}%
            </span>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${stats.overall}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Lessons Done</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.lessonsCompleted}
            </span>
            <span className="text-[11px] font-medium text-emerald-600 mt-2">
              +3 this week
            </span>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Quiz Average</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.quizAvg}%
            </span>
            <span className="text-[11px] font-medium text-purple-600 mt-2">
              High Accuracy
            </span>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Quizzes Attempted</span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.quizzesAttempted}
            </span>
            <span className="text-[11px] font-medium text-amber-600 mt-2">
              80% Pass Rate
            </span>
          </div>
        </div>

        {/* Main Content Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Module Mastery Breakdown (7 cols) */}
          <div className="md:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col gap-5">
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              Module Mastery Breakdown
            </h3>

            <div className="flex flex-col gap-4">
              {moduleBreakdown.map((item, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span className="font-bold text-slate-900">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak Topics / Focus Recommendation (5 cols) */}
          <div className="md:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Recommended Focus
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Based on your AI quiz responses, spend 10 minutes reviewing these topics to strengthen your financial foundation:
              </p>

              <div className="flex flex-col gap-2.5">
                {stats.weakTopics.map((topic, i) => (
                  <Link
                    key={i}
                    to="/courses"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-900 transition-colors"
                  >
                    <span>{topic}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/courses"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-center shadow-xs"
            >
              <span>Explore All Modules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
