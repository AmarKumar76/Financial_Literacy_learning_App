import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function LearningProgress({ percentage = 74, completed = 8, total = 12 }) {
  // SVG Circle calculation
  const radius = 32;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
      {/* Header Label + Icon */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <BookOpen className="w-4 h-4 stroke-[2]" />
        </div>
        <span className="font-semibold text-xs text-slate-500 uppercase tracking-wide">
          Learning Progress
        </span>
      </div>

      {/* Main Stats Row */}
      <div className="flex items-center gap-4 my-1">
        {/* Circular Progress Indicator */}
        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
          <svg className="w-20 h-20 transform -rotate-90">
            {/* Background Circle */}
            <circle
              stroke="#EEF2FF"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx="40"
              cy="40"
            />
            {/* Progress Circle */}
            <circle
              stroke="#4F46E5"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx="40"
              cy="40"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <span className="absolute font-extrabold text-base text-slate-900">
            {percentage}%
          </span>
        </div>

        {/* Text Description */}
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-600 leading-snug">
            {completed} of {total} modules completed
          </span>
          <a
            href="#continue"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-2 transition-colors group"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
