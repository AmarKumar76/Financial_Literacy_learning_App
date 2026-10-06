import React from 'react';
import { Quote } from 'lucide-react';

export default function QuoteCard() {
  return (
    <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-2xl p-4 lg:p-5 flex items-start gap-3.5 max-w-lg shrink-0 shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-indigo-600/10 flex items-center justify-center shrink-0 mt-0.5">
        <Quote className="w-4 h-4 text-indigo-600 fill-indigo-600 stroke-none" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
          &ldquo;A little progress each day adds up to big results.&rdquo;
        </p>
        <span className="text-[11px] font-medium text-slate-400 mt-1">
          — Unknown
        </span>
      </div>
    </div>
  );
}
