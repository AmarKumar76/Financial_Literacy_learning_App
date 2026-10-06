import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Trophy,
  Award,
  BarChart3,
  User,
  Settings,
  Zap,
  ChevronRight,
  LogOut,
  X,
  Crown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { navigationItems } from '../../data/dashboard';

const iconMap = {
  LayoutDashboard,
  BookOpen,
  Target,
  Trophy,
  Award,
  BarChart3,
  User,
};

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen z-50 w-[260px] bg-white border-r border-slate-200 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:z-30 overflow-y-auto ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6 pr-1">
          {/* Brand Logo */}
          <div className="flex items-center justify-between pt-1 px-1">
            <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
                <Zap className="w-5 h-5 fill-white stroke-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                FinLearn
              </span>
            </NavLink>

            <div className="flex items-center gap-1">
              <button
                className="hidden lg:flex w-7 h-7 rounded-lg border border-slate-200 items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                title="Collapse sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">
              Menu
            </span>
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive =
                item.path === '/dashboard'
                  ? location.pathname === '/dashboard' || location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50/90 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3.5px] bg-blue-600 rounded-r-full" />
                  )}
                  <Icon
                    className={`w-4.5 h-4.5 stroke-[2] ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <hr className="border-slate-100 my-0.5" />

          {/* Settings & Logout */}
          <div className="flex flex-col gap-1">
            <span className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">
              Account
            </span>
            <NavLink
              to="/profile"
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs md:text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors ${
                location.pathname === '/profile' ? 'bg-slate-100 text-slate-900 font-semibold' : ''
              }`}
            >
              <Settings className="w-4.5 h-4.5 text-slate-400 stroke-[1.8]" />
              <span>Settings</span>
            </NavLink>
            <button
              onClick={() => {
                onClose?.();
                logout?.();
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5 text-red-500 stroke-[1.8]" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="mt-4 pt-2">
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
              <Crown className="w-4.5 h-4.5 text-amber-600 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-slate-900 leading-tight">
                FinLearn Pro
              </span>
              <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                Unlock all AI features
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
