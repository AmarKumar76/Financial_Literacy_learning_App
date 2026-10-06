import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lightbulb,
  FileCheck,
  Play,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

export default function LessonView() {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallbackLesson = {
    _id: lessonId || '1',
    title: 'What is Income Tax & How Does TDS Work?',
    duration: '5 min read',
    summary:
      'Income tax is a direct tax levied by the government on your income. TDS (Tax Deducted at Source) ensures tax is collected right when income is generated.',
    objectives: [
      'Tax is charged based on income slabs defined by the government.',
      'TDS is deducted automatically by employers or banks on interest/salary.',
      'Filing an ITR (Income Tax Return) allows you to claim refunds for extra TDS paid.',
      'Section 80C allows tax savings up to ₹1.5 Lakh through investments like ELSS & PPF.',
    ],
    content:
      'If your salary is ₹50,000/month and your company deducts ₹2,000 as TDS, you receive ₹48,000 in your account. At the end of the year, filing ITR proves your total tax liability and gets you a refund if extra was deducted!',
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (lessonId && lessonId.length === 24) {
          const res = await api.get(`/lessons/${lessonId}`);
          setLessonData(res.data);
          setIsCompleted(!!res.data.isCompleted);
        } else {
          setLessonData(fallbackLesson);
        }
      } catch (err) {
        setLessonData(fallbackLesson);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonId]);

  const currentLesson = lessonData || fallbackLesson;
  const lessonTitle = currentLesson.title || fallbackLesson.title;
  const time = currentLesson.duration ? `${currentLesson.duration} min read` : '5 min read';
  const overview = currentLesson.summary || fallbackLesson.summary;
  const keyPoints = Array.isArray(currentLesson.objectives) && currentLesson.objectives.length > 0
    ? currentLesson.objectives
    : fallbackLesson.objectives;
  const realWorldExample = currentLesson.content || fallbackLesson.content;

  const handleCompleteAndQuiz = async () => {
    setSubmitting(true);
    try {
      if (currentLesson._id && currentLesson._id.length === 24) {
        await api.post(`/lessons/${currentLesson._id}/complete`);
        setIsCompleted(true);
      }
    } catch (err) {
      console.warn('Lesson completion API call error:', err);
    } finally {
      setSubmitting(false);
      const quizTargetId = currentLesson._id || lessonId || '1';
      navigate(`/courses/${id}/quiz/${quizTargetId}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-6xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/courses" className="hover:text-blue-600 transition-colors">
              Modules
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900">Module Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-600 font-bold">{lessonTitle}</span>
          </div>

          <Link
            to="/courses"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Modules</span>
          </Link>
        </div>

        {/* Main Lesson Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-2xs flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{time} {isCompleted && '• ✅ Completed'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {lessonTitle}
              </h1>
            </div>

            {/* Visual Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md shadow-blue-600/15">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
                  Core Educational Concept
                </span>
                <h3 className="text-xl font-extrabold leading-snug">
                  {lessonTitle}
                </h3>
                <p className="text-xs text-blue-100 mt-1 max-w-sm">
                  Understanding money principles step by step to build your financial literacy.
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 fill-white text-white ml-0.5" />
              </div>
            </div>

            {/* Overview Section */}
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {overview}
            </div>

            {/* Key Points Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500 stroke-none" />
                <span>Key Takeaways & Learning Objectives</span>
              </div>
              <ul className="flex flex-col gap-2.5">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real-World Scenario Box */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Practical Financial Context</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {realWorldExample}
              </p>
            </div>

            {/* Footer Lesson Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-2">
              <button
                onClick={() => navigate('/courses')}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Previous Module
              </button>

              <button
                onClick={handleCompleteAndQuiz}
                disabled={submitting}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>{submitting ? 'Saving Progress...' : 'Mark as Complete & Take Quiz'}</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col gap-4">
            <h3 className="font-extrabold text-sm text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              Module Key Highlights
            </h3>
            <div className="text-xs text-slate-600 space-y-2">
              <p>• Estimated completion time: {time}</p>
              <p>• Quiz reward: +20 XP upon 60%+ score</p>
              <p>• Perfect Quiz Bonus: +50 XP</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
