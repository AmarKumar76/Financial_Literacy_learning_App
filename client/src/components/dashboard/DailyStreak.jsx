import React from 'react';
import { Flame, Check } from 'lucide-react';

export default function DailyStreak({ streakCount = 3 }) {
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday
  const adjustedToday = todayIndex === 0 ? 6 : todayIndex - 1;

  const activeDays = daysOfWeek.map((day, idx) => {
    // A day is completed if it's today or within recent streak count
    const isCompleted = idx <= adjustedToday && (adjustedToday - idx) < streakCount;
    return { day, completed: isCompleted };
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
          <Flame className="w-5 h-5 fill-orange-500 stroke-orange-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Daily Streak
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {streakCount} Days Active
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-500 font-medium my-3">
        Complete a lesson today to keep your streak going!
      </p>

      {/* Days of Week Progress Circle Grid */}
      <div className="flex items-center justify-between gap-1 pt-1">
        {activeDays.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                item.completed
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 border border-slate-200 text-slate-400'
              }`}
            >
              {item.completed ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : null}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-semibold ${
                item.completed ? 'text-slate-700' : 'text-slate-400'
              }`}
            >
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
