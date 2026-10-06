import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Flame, Crown } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { leaderboardData as mockLeaderboardData } from '../../data/dashboard';
import api from '../../services/api';

export default function Leaderboard() {
  const [filter, setFilter] = useState('Weekly');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/leaderboard');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((u, index) => ({
            rank: index + 1,
            name: u.name || 'Anonymous Learner',
            xp: u.XP || 0,
            points: `${u.XP || 0} XP`,
            level: u.level ? `Level ${u.level}` : 'Learner',
            avatar: `https://images.unsplash.com/photo-${1534528741775 + (index % 5)}?auto=format&fit=crop&w=150&q=80`,
            streak: u.streak || 1,
          }));
          setLeaderboard(mapped);
        } else {
          setLeaderboard(mockLeaderboardData);
        }
      } catch (err) {
        setLeaderboard(mockLeaderboardData);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [filter]);

  const activeData = leaderboard.length > 0 ? leaderboard : mockLeaderboardData;
  const firstPlace = activeData[0] || { name: 'Learner 1', xp: 100, level: 'Level 1', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' };
  const secondPlace = activeData[1] || { name: 'Learner 2', xp: 80, level: 'Level 1', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' };
  const thirdPlace = activeData[2] || { name: 'Learner 3', xp: 50, level: 'Level 1', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-5xl mx-auto">
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Trophy className="w-7 h-7 text-amber-500 fill-amber-400 stroke-amber-600" />
              <span>Leaderboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Compete with fellow learners, earn XP points, and climb the rankings.
            </p>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
            {['Weekly', 'Monthly', 'All-Time'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TOP 3 PODIUM SECTION */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end my-2 pt-6">
          {/* 2nd Place (Silver) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-2xs relative order-1">
            <div className="absolute -top-4 w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              2
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-slate-300 shadow-xs mb-2">
              <img
                src={secondPlace.avatar}
                alt={secondPlace.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
              {secondPlace.name}
            </span>
            <span className="text-[11px] font-bold text-slate-500 mt-0.5">
              {secondPlace.xp} XP
            </span>
          </div>

          {/* 1st Place (Gold) */}
          <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-md relative order-2 -mt-4">
            <div className="absolute -top-6 w-9 h-9 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center ring-4 ring-white shadow-xs">
              <Crown className="w-5 h-5 fill-slate-900 stroke-none" />
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-amber-400 shadow-md mb-2">
              <img
                src={firstPlace.avatar}
                alt={firstPlace.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-sm sm:text-base text-slate-900 line-clamp-1">
              {firstPlace.name}
            </span>
            <span className="text-xs font-extrabold text-amber-700 mt-0.5 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {firstPlace.xp} XP
            </span>
          </div>

          {/* 3rd Place (Bronze) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-2xs relative order-3">
            <div className="absolute -top-4 w-7 h-7 rounded-full bg-amber-800/10 text-amber-800 flex items-center justify-center text-xs font-bold ring-4 ring-white">
              3
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-700/30 shadow-xs mb-2">
              <img
                src={thirdPlace.avatar}
                alt={thirdPlace.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
              {thirdPlace.name}
            </span>
            <span className="text-[11px] font-bold text-slate-500 mt-0.5">
              {thirdPlace.xp} XP
            </span>
          </div>
        </div>

        {/* RANKINGS TABLE LIST */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="col-span-2 sm:col-span-1 text-center">Rank</span>
            <span className="col-span-6 sm:col-span-6">Learner</span>
            <span className="col-span-2 sm:col-span-3 text-center">Streak</span>
            <span className="col-span-2 sm:col-span-2 text-right">XP Points</span>
          </div>

          <div className="divide-y divide-slate-100">
            {activeData.map((item, idx) => (
              <div
                key={item.rank || idx}
                className="px-5 py-3.5 grid grid-cols-12 items-center transition-colors hover:bg-slate-50 text-slate-800"
              >
                {/* Rank Number */}
                <span className="col-span-2 sm:col-span-1 text-center font-extrabold text-sm text-slate-600">
                  #{item.rank || idx + 1}
                </span>

                {/* User Info */}
                <div className="col-span-6 sm:col-span-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {item.level || 'Learner'}
                    </span>
                  </div>
                </div>

                {/* Streak Badge */}
                <div className="col-span-2 sm:col-span-3 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold border border-orange-100">
                    <Flame className="w-3.5 h-3.5 fill-orange-500 stroke-none" />
                    {item.streak || 1}d
                  </span>
                </div>

                {/* XP Score */}
                <span className="col-span-2 sm:col-span-2 text-right font-extrabold text-xs sm:text-sm text-slate-900">
                  {item.xp || 0} <span className="text-[10px] text-slate-400 font-normal">XP</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
