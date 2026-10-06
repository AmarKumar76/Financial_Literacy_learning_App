import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Shield,
  BookOpen,
  Sparkles,
  Flame,
  Star,
  LogOut,
  ChevronRight,
  Check,
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const [progress, setProgress] = useState(null);
  const [editing, setEditing] = useState(false);
  const [learningGoal, setLearningGoal] = useState(user?.learningGoal || 'Master Budgeting & Income Tax Savings');
  const [userType, setUserType] = useState(user?.preferences?.userType || 'Student / First-time Earner');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get('/progress/me');
        if (res.data) {
          setProgress(res.data);
          if (res.data.user?.learningGoal) setLearningGoal(res.data.user.learningGoal);
        }
      } catch (err) {
        console.warn('Profile fetch error:', err);
      }
    };
    fetchProfileData();
  }, []);

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      if (user?.id || user?._id) {
        const userId = user.id || user._id;
        await api.patch(`/users/${userId}/onboarding`, {
          learningGoal,
          preferences: { ...user?.preferences, userType },
        });
      }
      setEditing(false);
    } catch (err) {
      console.error('Error saving profile preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  const userName = user?.name || progress?.user?.name || 'Learner';
  const userEmail = user?.email || progress?.user?.email || 'learner@finlearn.com';
  const levelNum = progress?.level || user?.level || 1;
  const xpNum = progress?.XP || user?.XP || 0;
  const streakNum = progress?.streak || user?.streak || 1;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-5xl mx-auto">
        {/* Profile Card Header */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-3xl font-extrabold ring-4 ring-blue-50 border-2 border-white shrink-0 shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {userName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                {userEmail} • {userType}
              </p>

              {/* Badges pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  Level {levelNum} Learner
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {xpNum} XP Points
                </span>
                <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  {streakNum}-Day Streak
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings & Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Preferences */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Learning Preferences
                </h3>
              </div>

              {editing ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      User Persona / Type
                    </label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                    >
                      <option value="Student / Beginner">Student / Beginner</option>
                      <option value="First-time Earner">First-time Earner</option>
                      <option value="Experienced Professional">Experienced Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Primary Learning Goal
                    </label>
                    <input
                      type="text"
                      value={learningGoal}
                      onChange={(e) => setLearningGoal(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">
                      User Persona
                    </label>
                    <p className="text-sm font-semibold text-slate-800">{userType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">
                      Primary Learning Goal
                    </label>
                    <p className="text-sm font-semibold text-slate-800">
                      {learningGoal}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {editing ? (
              <button
                onClick={handleSavePreferences}
                disabled={saving}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="mt-6 w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Edit Preferences
              </button>
            )}
          </div>

          {/* Account & Security */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Account & Security
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                <div className="p-3 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700 flex justify-between items-center">
                  <span>Role Permissions</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[11px]">
                    {user?.role || 'Learner'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-xs font-semibold text-slate-700 flex justify-between items-center">
                  <span>Account Status</span>
                  <span className="text-emerald-600 font-bold">Active & Verified</span>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-6 w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
