import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Brain, Activity, Settings, ArrowRight, Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/users/admin/analytics');
        if (res.data) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch admin analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const stats = [
    { label: 'Total Learners', value: analytics?.totalLearners ?? '12', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Categories', value: analytics?.activeCategories ?? '5', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'AI Drafts Pending', value: analytics?.aiDraftsPending ?? '0', icon: Brain, color: 'text-amber-600 bg-amber-50' },
    { label: 'Total Quiz Attempts', value: analytics?.totalQuizAttempts ?? '24', icon: Activity, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-5xl mx-auto">
        {/* Header */}
        <div className="pb-3 border-b border-slate-200/80">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Platform learning metrics, user activity, and pending AI quiz draft approvals.
          </p>
        </div>

        {/* Top 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-4 h-4 stroke-[2]" />
                </div>
                <span>{s.label}</span>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Content Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Pending AI Drafts (7 cols) */}
          <div className="md:col-span-7 bg-white border border-amber-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Needs Review: AI Generated Drafts
                </h3>
                <p className="text-xs text-slate-500">Gemini AI quiz verification workflow</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Gemini AI has generated 5 new draft questions for the <strong>Investing Basics</strong> module. They require admin approval before publication to learners.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-1">
              <span className="font-bold text-xs text-slate-900">Quiz: Understanding Stocks & Mutual Funds</span>
              <span className="text-[11px] text-slate-400">Generated 2 hours ago • 5 MCQ Questions</span>
            </div>

            <Link
              to="/admin/ai-review"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 text-center"
            >
              <span>Review AI Drafts Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Actions (5 cols) */}
          <div className="md:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Settings className="w-5 h-5 text-slate-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                Quick Actions
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              <button className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
                Manage User Roles & Accounts
              </button>
              <button className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
                Edit Course Categories & Lessons
              </button>
              <button className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
                Export Completion & Quiz Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
