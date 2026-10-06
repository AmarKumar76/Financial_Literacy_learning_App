import React from 'react';
import QuoteCard from './QuoteCard';

export default function WelcomeHeader({ userName = 'AMAR' }) {
  // Format current date or fallback to screenshot reference date style
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      {/* Left Greeting */}
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-400 tracking-wide mb-1">
          {todayDate || 'Wednesday, 2 Oct'}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Good evening, {userName} <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-normal mt-1">
          Keep learning today. Small steps lead to big financial freedom.
        </p>
      </div>

      {/* Right Quote Card */}
      <QuoteCard />
    </div>
  );
}
