import React, { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  Calculator,
  Trophy,
  Shield,
  TrendingUp,
  FileText,
  Flame,
  Star,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { badgesData as mockBadgesData } from '../../data/dashboard';
import api from '../../services/api';

const iconMap = {
  BookOpen,
  Calculator,
  Trophy,
  Shield,
  TrendingUp,
  FileText,
  Flame,
  Star,
};

export default function Badges() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await api.get('/badges');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBadges(res.data);
        } else {
          setBadges(mockBadgesData);
        }
      } catch (err) {
        setBadges(mockBadgesData);
      } finally {
        setLoading(false);
      }
    };
    fetchBadges();
  }, []);

  const categories = [
    'All',
    'Beginner',
    'Learner',
    'Money Smart',
    'Investor',
    'Scam Aware',
    'Finance Master',
  ];

  const currentBadges = badges.length > 0 ? badges : mockBadgesData;

  const filteredBadges = currentBadges.filter(
    (b) => selectedFilter === 'All' || b.category === selectedFilter
  );

  const unlockedCount = currentBadges.filter((b) => b.unlocked).length;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-6xl mx-auto">
        {/* Header Title & Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Award className="w-7 h-7 text-blue-600 stroke-[2]" />
              <span>Badges & Achievements</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Earn badges by completing modules, taking AI quizzes, and maintaining streaks.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>
              {unlockedCount} of {currentBadges.length} Unlocked
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredBadges.map((badge) => {
            const IconComponent = iconMap[badge.icon] || Award;
            const displayDate = badge.earnedDate || (badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : 'Recently Unlocked');

            return (
              <div
                key={badge.id || badge.name}
                className={`bg-white border rounded-2xl p-5 flex flex-col justify-between shadow-2xs transition-all relative overflow-hidden ${
                  badge.unlocked
                    ? 'border-slate-200 hover:shadow-md'
                    : 'border-slate-200/60 bg-slate-50/50 opacity-80'
                }`}
              >
                <div>
                  {/* Top Row Icon & Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        badge.unlocked
                          ? 'bg-blue-50 text-blue-600 shadow-xs'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {badge.unlocked ? (
                        <IconComponent className="w-6 h-6 stroke-[2]" />
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400 stroke-[2]" />
                      )}
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        badge.unlocked
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {badge.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>

                  {/* Badge Title & Description */}
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-snug mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-4">
                    {badge.desc || badge.description}
                  </p>
                </div>

                {/* Progress or Earned Date Footer */}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  {badge.unlocked ? (
                    <span className="text-[11px] font-medium text-slate-400">
                      Earned on {displayDate}
                    </span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[10px] font-medium text-slate-500">
                        <span>Reward</span>
                        <span className="font-bold text-amber-600">+{badge.xpReward || 50} XP</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${badge.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
