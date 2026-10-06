import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart } from 'lucide-react';

export default function Footer({ variant = 'dashboard' }) {
  const isDashboard = variant === 'dashboard';

  return (
    <footer className={`w-full border-t border-slate-200/90 ${isDashboard ? 'bg-white mt-12' : 'bg-slate-950 text-slate-400 mt-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand Info Column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                <Zap className="w-5 h-5 fill-white stroke-white" />
              </div>
              <span className={`font-extrabold text-xl tracking-tight ${isDashboard ? 'text-slate-900' : 'text-white'}`}>
                FinLearn
              </span>
            </Link>
            <p className={`text-xs leading-relaxed max-w-sm ${isDashboard ? 'text-slate-500' : 'text-slate-400'}`}>
              Production-grade financial literacy learning app. Master budgeting, taxes, credit scores, investing, and fraud protection with short AI-powered lessons.
            </p>
          </div>

          {/* Quick Links 1 */}
          <div className="md:col-span-3 flex flex-col gap-2.5 text-xs">
            <p className={`font-extrabold uppercase tracking-wider text-[11px] ${isDashboard ? 'text-slate-900' : 'text-white'}`}>
              Learning & Tools
            </p>
            <Link to="/courses" className="hover:text-blue-600 transition-colors">Learning Modules</Link>
            <Link to="/simulator" className="hover:text-blue-600 transition-colors">50/30/20 Budget Simulator</Link>
            <Link to="/leaderboard" className="hover:text-blue-600 transition-colors">Global Leaderboard</Link>
            <Link to="/badges" className="hover:text-blue-600 transition-colors">Badges & Achievements</Link>
          </div>

          {/* Quick Links 2 */}
          <div className="md:col-span-4 flex flex-col gap-2.5 text-xs">
            <p className={`font-extrabold uppercase tracking-wider text-[11px] ${isDashboard ? 'text-slate-900' : 'text-white'}`}>
              Account & Navigation
            </p>
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard Overview</Link>
            <Link to="/progress" className="hover:text-blue-600 transition-colors">Progress Analytics</Link>
            <Link to="/profile" className="hover:text-blue-600 transition-colors">Profile Settings</Link>
            <Link to="/onboarding" className="hover:text-blue-600 transition-colors">Learning Preferences</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 border-t ${isDashboard ? 'border-slate-100 text-slate-400' : 'border-slate-800 text-slate-500'} flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium`}>
          <p>© 2026 FinLearn Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Empowering smart money habits</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
