import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Star,
  TrendingUp,
  Shield,
  FileText,
  Calculator,
  PiggyBank,
  ShieldAlert,
  Target,
  ArrowRight,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { categoriesFilter, allModulesData } from '../../data/dashboard';
import api from '../../services/api';

const iconMap = {
  Calculator,
  TrendingUp,
  FileText,
  Shield,
  Star,
  PiggyBank,
  ShieldAlert,
  Target,
  BookOpen,
};

export default function ModulesList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((cat, idx) => ({
            id: cat._id,
            title: cat.name,
            desc: cat.description || 'Master key money concepts with bite-sized lessons and quizzes.',
            category: cat.name,
            difficulty: cat.level || 'Beginner',
            lessonsCount: cat.totalLessons || 5,
            progress: cat.progress || 0,
            xp: 50,
            icon: cat.icon || 'BookOpen',
            color: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][idx % 5],
          }));
          setCategories(mapped);
        } else {
          setCategories(allModulesData);
        }
      } catch (err) {
        setCategories(allModulesData);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const displayList = categories.length > 0 ? categories : allModulesData;

  const filteredModules = displayList.filter((mod) => {
    const matchesCategory =
      selectedCategory === 'All' || mod.category === selectedCategory || mod.title === selectedCategory;
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mod.desc && mod.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Learning Modules
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Choose a topic and start learning. Build your money skills step by step.
            </p>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2]" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesFilter.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map((mod) => {
            const IconComponent = iconMap[mod.icon] || BookOpen;

            return (
              <div
                key={mod.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div>
                  {/* Top Row: Icon + Difficulty Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                    >
                      <IconComponent className="w-5.5 h-5.5 stroke-[2]" />
                    </div>

                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                      {mod.difficulty}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors mb-1.5">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2 mb-4">
                    {mod.desc}
                  </p>
                </div>

                {/* Progress & Footer Actions */}
                <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
                  {/* Progress Bar */}
                  {mod.progress > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[11px] font-medium text-slate-500">
                        <span>Progress</span>
                        <span className="font-bold text-slate-700">{mod.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${mod.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Lessons Count & XP */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      {mod.lessonsCount} lessons
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      +{mod.xp} XP
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/courses/${mod.id}/lesson/1`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs mt-1"
                  >
                    <span>{mod.progress > 0 ? 'Continue Module' : 'Start Module'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-6">
            <p className="font-bold text-slate-700 text-base">No modules found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
