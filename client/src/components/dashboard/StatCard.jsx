import React from 'react';
import { Star, Trophy, ArrowUp, Info } from 'lucide-react';

export default function StatCard({ type = 'points', value, subtext, label }) {
  if (type === 'points') {
    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Star className="w-4 h-4 fill-emerald-500 stroke-emerald-500" />
          </div>
          <span className="font-semibold text-xs text-slate-500 uppercase tracking-wide">
            {label || 'Total Points'}
          </span>
        </div>

        <div className="flex flex-col mt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value || '4,850 XP'}
          </span>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md w-fit">
            <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            <span>{subtext || '+120 this week'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
          <Trophy className="w-4 h-4 fill-amber-500 stroke-amber-500" />
        </div>
        <span className="font-semibold text-xs text-slate-500 uppercase tracking-wide">
          {label || 'Current Rank'}
        </span>
      </div>

      <div className="flex flex-col mt-1">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value || 'Learner'}
        </span>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-medium">
          <span>{subtext || 'Top 35% of all users'}</span>
          <div className="group relative inline-block">
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] rounded-md py-1 px-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-36 text-center pointer-events-none z-10 shadow-md">
              Based on global XP rankings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
