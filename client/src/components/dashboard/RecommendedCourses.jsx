import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { recommendedCourses as mockCourses } from '../../data/dashboard';
import api from '../../services/api';

export default function RecommendedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.get('/categories');
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((cat, idx) => ({
            id: cat._id,
            title: cat.name,
            lessonsCount: cat.totalLessons || 4,
            duration: '15 mins',
            xp: 50,
            progress: cat.progress || 0,
            icon: cat.icon || 'BookOpen',
            color: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][idx % 5],
          }));
          setCourses(mapped.slice(0, 4));
        } else {
          setCourses(mockCourses);
        }
      } catch (err) {
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, []);

  const displayCourses = courses.length > 0 ? courses : mockCourses;

  return (
    <section className="flex flex-col gap-4 mt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
          Recommended for You
        </h2>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2]" />
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {displayCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
