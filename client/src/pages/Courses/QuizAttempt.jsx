import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(263); // 04:23 timer

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const question = {
    moduleName: 'Tax Basics',
    currentQuestionIndex: 2,
    totalQuestions: 5,
    text: 'What does TDS stand for in personal taxation?',
    options: [
      { id: 'A', text: 'Total Deduction System' },
      { id: 'B', text: 'Tax Deducted at Source' },
      { id: 'C', text: 'Tax Direct Scheme' },
      { id: 'D', text: 'Total Income Statement' },
    ],
    correctId: 'B',
    aiExplanation:
      'TDS stands for Tax Deducted at Source. It is a method through which tax is collected directly at the time income is generated (like salary, interest, rent, etc.) rather than waiting for the end of the financial year.',
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  const isCorrect = selectedOption === question.correctId;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-5xl mx-auto">
        {/* Top Quiz Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Brain className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Quiz — {question.moduleName}
              </h1>
              <p className="text-xs text-slate-500">
                Question {question.currentQuestionIndex} of {question.totalQuestions}
              </p>
            </div>
          </div>

          {/* Progress Bar & Timer */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full w-[40%]" />
              </div>
              <span className="text-xs font-bold text-slate-600">40%</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Main Quiz Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question & Options Area (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2 block">
                Question {question.currentQuestionIndex}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
                {question.text}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {question.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  let optionStyle =
                    'border-slate-200 bg-white text-slate-800 hover:border-purple-300 hover:bg-slate-50';

                  if (submitted) {
                    if (opt.id === question.correctId) {
                      optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-500 bg-red-50/70 text-red-900';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-purple-600 bg-purple-50 text-purple-900 font-bold ring-2 ring-purple-600/10';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !submitted && setSelectedOption(opt.id)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {submitted && opt.id === question.correctId && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit & Next Actions */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={() => navigate('/courses')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                Previous
              </button>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-purple-600/20"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: AI Explanation Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  AI Explanation (Gemini)
                </h3>
                <p className="text-[11px] text-slate-400">Instant learning feedback</p>
              </div>
            </div>

            {!submitted ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Brain className="w-12 h-12 stroke-[1.5] text-slate-300 mb-3" />
                <p className="text-xs font-medium text-slate-500">
                  Select an option and submit your answer to unlock the AI explanation.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-fadeInUp">
                {/* Result Feedback Banner */}
                <div
                  className={`p-4 rounded-xl border flex items-center gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-xs">
                      {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
                    </p>
                    <p className="text-[11px] opacity-80">
                      {isCorrect ? 'You earned +10 XP' : 'Review the concept below'}
                    </p>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-700 leading-relaxed font-normal">
                  {question.aiExplanation}
                </div>

                {/* XP Reward Card */}
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-amber-800 font-bold text-xs">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Reward Earned</span>
                  </div>
                  <span>+{isCorrect ? 10 : 2} XP</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
