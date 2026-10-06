import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const userName = user?.name?.split(' ')[0] || 'AMAR';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2] pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search courses, topics, or tools..."
            className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-11 pr-16 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/10 transition-all font-normal leading-normal"
          />
          <div className="hidden sm:flex items-center gap-0.5 absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-400 pointer-events-none">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-full border border-slate-200/80 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 stroke-[2]" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-lg p-3 z-50 text-xs animate-fadeInUp">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <div className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="font-semibold text-slate-800 text-[11px]">
                    🎉 Quiz Completed!
                  </p>
                  <p className="text-slate-500 text-[10px] mt-0.5">
                    You earned 10 XP in Budgeting Basics.
                  </p>
                </div>
                <div className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="font-semibold text-slate-800 text-[11px]">
                    🔥 Streak Extended!
                  </p>
                  <p className="text-slate-500 text-[10px] mt-0.5">
                    You reached a 12-day learning streak.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-blue-500/20 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:flex flex-col items-start text-left">
              <span className="font-bold text-xs text-slate-900 leading-tight tracking-tight uppercase">
                {userName}
              </span>
              <span className="text-[11px] font-medium text-slate-400 leading-tight">
                Free Plan
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[2.2] ml-0.5" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 animate-fadeInUp">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-slate-900 text-xs">{userName}</p>
                <p className="text-[11px] text-slate-400">amar@example.com</p>
              </div>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                Profile & Settings
              </button>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                Preferences
              </button>
              <hr className="my-1 border-slate-100" />
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout?.();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
