import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function CourseCard({ course }) {
  const { title, difficulty, lessonsCount, duration, image } = course;

  // Exact solid badge colors matching reference screenshot (Image 1)
  const getBadgeStyle = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 'bg-[#064E3B] text-emerald-100 border-[#047857]';
      case 'intermediate':
        return 'bg-[#3730A3] text-indigo-100 border-[#4338CA]';
      case 'advanced':
        return 'bg-[#581C87] text-purple-100 border-[#6B21A8]';
      default:
        return 'bg-slate-900 text-slate-100 border-slate-700';
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer">
      {/* Top Cover Image with Level Badge */}
      <div className="relative w-full h-40 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Difficulty Badge on Top Right */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide shadow-xs border ${getBadgeStyle(
            difficulty
          )}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-4">
        <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3.5 text-xs text-slate-500 font-semibold">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-400 stroke-[1.8]" />
              <span>{lessonsCount} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400 stroke-[1.8]" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Round Circle Arrow Button */}
          <div className="w-8 h-8 rounded-full border border-slate-200 bg-white shadow-2xs text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all shrink-0">
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>
      </div>
    </div>
  );
}
