import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Trophy, Star, Target, TrendingUp, BookOpen, ChevronRight, Lock, Bell, CheckCircle } from 'lucide-react';
import api from '../../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories/modules from backend
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Mock data for UI if backend returns empty
  const displayCategories = categories.length > 0 ? categories : [
    { _id: '1', name: 'Budgeting Basics', description: 'Master your income and expenses', icon: 'wallet' },
    { _id: '2', name: 'Savings Strategy', description: 'Build your emergency fund', icon: 'piggy-bank' },
    { _id: '3', name: 'Investing 101', description: 'Grow your wealth over time', icon: 'trending-up' },
    { _id: '4', name: 'Credit Score', description: 'Understand and improve your score', icon: 'credit-card' },
  ];

  return (
    <div className="animate-fadeInUp" style={{ padding: '0 1rem' }}>
      {/* Top Welcome Section */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>
            Hello, {user?.name?.split(' ')[0] || 'Learner'}!
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', marginTop: '0.25rem' }}>
            Welcome Back! Ready to conquer your finances?
          </p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Progress Card */}
        <div className="glass glass-neon-purple" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Overall Progress</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>74%</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', marginTop: '0.5rem' }}>
              Next Goal: <strong>Master Budgeting</strong>
            </p>
          </div>
          {/* Circular Progress Mock */}
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid rgba(139,92,246,0.2)', borderTopColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
            74%
          </div>
        </div>

        {/* XP Card */}
        <div className="glass glass-neon-gold" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Total Points</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>4,850 XP</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-accent-gold)', marginTop: '0.5rem' }}>
              Current Rank: <strong>{user?.preferences?.userType || 'Learner'}</strong>
            </p>
          </div>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(251,191,36,0.4)' }}>
            <Star size={32} color="white" fill="white" />
          </div>
        </div>

        {/* Badges Card */}
        <div className="glass glass-neon-green" style={{ padding: '1.5rem' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>Badges Earned</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>8 Badges</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {['#8b5cf6', '#fbbf24', '#10b981', '#3b82f6', '#ec4899'].map((color, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, transparent)`, border: `1px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={14} color={color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column (Learning Path & Chart) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Learning Path */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>My Learning Path</h3>
              <button className="btn-ghost">View All</button>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
              {displayCategories.map((cat, i) => (
                <div key={cat._id} className={i === 0 ? "glass-neon-green" : "glass"} style={{ 
                  minWidth: 200, padding: '1.5rem', borderRadius: 16, cursor: 'pointer',
                  position: 'relative', overflow: 'hidden', transition: 'all 0.3s',
                  transform: i === 0 ? 'scale(1.05)' : 'scale(1)',
                  background: i === 0 ? 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0))' : 'var(--color-surface)',
                  border: i === 0 ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--color-border)'
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: i === 0 ? 'var(--color-accent)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    {i === 0 ? <BookOpen size={24} color="white" /> : <Lock size={24} color="var(--color-text-muted)" />}
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{cat.name}</h4>
                  
                  {i === 0 ? (
                    <>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>4/8 lessons</p>
                      <div className="progress-bar-track" style={{ marginBottom: '1rem' }}>
                        <div className="progress-bar-fill" style={{ width: '50%' }}></div>
                      </div>
                      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.5rem', background: 'white', color: 'black' }}>
                        Continue
                      </button>
                    </>
                  ) : (
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Locked</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Chart Mock */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Progress This Week</h3>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>+1850 XP this week</span>
            </div>
            {/* Fake SVG Chart */}
            <div style={{ width: '100%', height: 200, position: 'relative' }}>
              <svg viewBox="0 0 500 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(139,92,246,0.4)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,180 Q50,150 100,160 T200,50 T300,120 T400,60 T500,150 L500,200 L0,200 Z" fill="url(#chartGradient)" />
                <path d="M0,180 Q50,150 100,160 T200,50 T300,120 T400,60 T500,150" fill="none" stroke="var(--color-primary)" strokeWidth="3" />
                
                {/* Data Points */}
                <circle cx="100" cy="160" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="200" cy="50" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="300" cy="120" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="400" cy="60" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
              </svg>
              
              {/* Tooltips */}
              <div style={{ position: 'absolute', top: '15px', left: '38%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>580XP</div>
              <div style={{ position: 'absolute', top: '85px', left: '58%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>410XP</div>
              <div style={{ position: 'absolute', top: '25px', left: '78%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>600XP</div>
              
              {/* X Axis */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Badges Unlocked */}
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Badges Unlocked</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { name: 'Saver Pro', icon: Target, color: '#8b5cf6', date: 'Mar 15' },
                { name: 'Budget Master', icon: Trophy, color: '#fbbf24', date: 'Dec 13' },
                { name: 'Investor Rookie', icon: TrendingUp, color: '#10b981', date: 'Jan 10' },
                { name: 'Credit Champ', icon: CheckCircle, color: '#3b82f6', date: 'Jul 15' }
              ].map((badge, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${badge.color}22, transparent)`, border: `1px solid ${badge.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: `0 0 15px ${badge.color}33` }}>
                    <badge.icon size={20} color={badge.color} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)' }}>{badge.name}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{badge.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Recommended For You</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 12, border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-gray-800">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} color="#a78bfa" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Crypto 101</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Learn more financial literacy</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 12, border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover:bg-gray-800">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={18} color="#34d399" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Smart Investing</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Learn smart investing platforms</p>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: '1fr 350px'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
