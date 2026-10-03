import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen, LayoutDashboard, Trophy, User, Shield,
  Bell, LogOut, Menu, X, Zap, TrendingUp, Star, PieChart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
    { to: '/courses',    label: 'Learn',       icon: BookOpen },
    { to: '/simulator',  label: 'Simulator',   icon: PieChart },
    { to: '/progress',   label: 'Progress',    icon: TrendingUp },
    { to: '/leaderboard',label: 'Leaderboard', icon: Trophy },
    { to: '/profile',    label: 'Profile',     icon: User },
  ];

  if (isAdmin) {
    navLinks.push({ to: '/admin', label: 'Admin', icon: Shield });
  }

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="navbar" style={{ padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', height: 64 }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
            Fin<span className="gradient-text">Learn</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 0.85rem', borderRadius: 8,
                fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
                color: isActive(to) ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                background: isActive(to) ? 'rgba(99,102,241,0.12)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user && <NotificationBell />}

          {/* XP chip */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: 'rgba(245,158,11,0.12)',
            padding: '0.3rem 0.75rem', borderRadius: 99,
            fontSize: '0.8rem', fontWeight: 600, color: '#fbbf24',
          }}>
            <Star size={13} fill="#fbbf24" />
            {user?.XP ?? 0} XP
          </div>

          {/* User avatar button */}
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-border)',
              borderRadius: 99, padding: '0.35rem 0.75rem',
              cursor: 'pointer', color: 'var(--color-text-muted)',
              fontSize: '0.8rem', fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 700, color: 'white',
            }}>
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <span className="desktop-nav">{user?.name?.split(' ')[0]}</span>
            <LogOut size={13} />
          </button>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)', padding: '0.25rem' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)',
          padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.65rem 0.85rem', borderRadius: 10,
                color: isActive(to) ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                background: isActive(to) ? 'rgba(99,102,241,0.12)' : 'transparent',
                fontWeight: 500, textDecoration: 'none',
              }}
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .mobile-toggle { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}
