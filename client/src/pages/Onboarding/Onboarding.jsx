import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitOnboarding } from '../../services/userService';

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    preferences: {
      userType: 'Student',
    },
    learningGoal: 'Budgeting',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userType') {
      setFormData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, userType: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await submitOnboarding(user?._id || user?.id, formData);
      updateUser({
        preferences: formData.preferences,
        learningGoal: formData.learningGoal,
        isOnboarded: true,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save onboarding data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans text-slate-900 antialiased">
      <div className="w-full max-w-md animate-fadeInUp flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome, {user?.name || 'Learner'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Let&apos;s personalize your financial learning path
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Which best describes you?</span>
              </label>
              <select
                name="userType"
                value={formData.preferences.userType}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium cursor-pointer"
              >
                <option value="Student">Student</option>
                <option value="First-time Earner">First-time Earner</option>
                <option value="Experienced Professional">Experienced Professional</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>What is your primary learning goal?</span>
              </label>
              <select
                name="learningGoal"
                value={formData.learningGoal}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium cursor-pointer"
              >
                <option value="Budgeting">Mastering Budgeting</option>
                <option value="Investing">Understanding Investing</option>
                <option value="Taxes">Navigating Taxes</option>
                <option value="General">General Financial Literacy</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Saving...' : 'Start Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
