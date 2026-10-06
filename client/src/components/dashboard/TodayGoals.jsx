import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { initialGoals } from '../../data/dashboard';

export default function TodayGoals() {
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('finlearn_today_goals');
      return saved ? JSON.parse(saved) : initialGoals;
    } catch (e) {
      return initialGoals;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('finlearn_today_goals', JSON.stringify(goals));
    } catch (e) {}
  }, [goals]);

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = Math.round((completedCount / goals.length) * 100);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow h-full">
      <div>
        {/* Header Title & Counter */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
            Today&apos;s Goals
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {completedCount}/{goals.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-3">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              {/* Custom Checkbox Circle */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                  goal.completed
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'border-slate-300 bg-white group-hover:border-indigo-400'
                }`}
              >
                {goal.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              {/* Goal Text */}
              <span
                className={`text-xs md:text-sm font-medium transition-colors ${
                  goal.completed
                    ? 'text-slate-400 line-through'
                    : 'text-slate-700 group-hover:text-slate-900'
                }`}
              >
                {goal.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
