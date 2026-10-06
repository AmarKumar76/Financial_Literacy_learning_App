import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContinueLearning() {
  return (
    <div className="bg-indigo-50/50 border border-indigo-100/90 rounded-2xl md:rounded-3xl p-5 md:p-7 flex flex-col md:flex-row items-stretch justify-between gap-6 overflow-hidden shadow-2xs hover:shadow-xs transition-shadow">
      {/* Left Content Area */}
      <div className="flex flex-col justify-between flex-1 max-w-xl py-1">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-indigo-600 tracking-wide uppercase mb-1.5">
            Continue Learning
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Master Budgeting Basics
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed max-w-md">
            Learn how to create a personal budget, track expenses, and build better money habits.
          </p>
        </div>

        {/* Action Row & Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 pt-2">
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-slate-900/10 hover:shadow-lg active:scale-[0.99] shrink-0">
            <span>Continue Lesson</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </button>

          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
              25 min left
            </span>
            <div className="w-full bg-indigo-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
            <span className="text-xs font-bold text-indigo-600">60%</span>
          </div>
        </div>
      </div>

      {/* Right Image Container */}
      <div className="w-full md:w-64 lg:w-80 h-48 md:h-auto rounded-xl md:rounded-2xl overflow-hidden shrink-0 relative border border-slate-200/50 shadow-xs">
        <img
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
          alt="Budget Plan"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
