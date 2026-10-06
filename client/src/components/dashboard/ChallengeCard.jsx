import React from 'react';
import { Trophy } from 'lucide-react';

export default function ChallengeCard() {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
          <Trophy className="w-5 h-5 fill-amber-400 stroke-amber-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
            Upcoming Challenge
          </span>
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
            Savings Challenge
          </h4>
        </div>
      </div>

      <p className="text-xs text-slate-500 font-normal my-2">
        Save ₹1,000 in the simulator this week.
      </p>

      <button className="w-full mt-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer shadow-2xs hover:border-slate-300 text-center">
        Start Challenge
      </button>
    </div>
  );
}
