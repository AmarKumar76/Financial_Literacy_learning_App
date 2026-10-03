import React from 'react';
import { Target, TrendingUp, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Progress() {
  const stats = {
    overall: 45,
    quizAvg: 82,
    streak: 5,
    weakTopics: ['Tax Basics', 'Investing'],
  };

  const categories = [
    { name: 'Budgeting', progress: 100, color: '#10b981' },
    { name: 'Money Basics', progress: 100, color: '#3b82f6' },
    { name: 'Tax Basics', progress: 20, color: '#ef4444' },
    { name: 'Investing', progress: 10, color: '#ef4444' },
    { name: 'Credit & Loans', progress: 0, color: '#6b7280' },
  ];

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1rem', paddingBottom: '3rem' }}>
      
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Progress</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Track your learning journey and see where to focus next.</p>
      </div>

      {/* Top Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>
            <Target size={16} /> Course Completion
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{stats.overall}%</div>
          <div style={{ width: '100%', height: 6, background: 'var(--color-surface-2)', borderRadius: 99, marginTop: '1rem', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${stats.overall}%`, background: 'var(--color-primary)' }} />
          </div>
        </div>

        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>
            <TrendingUp size={16} /> Avg Quiz Score
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{stats.quizAvg}%</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginTop: '0.5rem', fontWeight: 600 }}>+5% this week</div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Category Breakdown */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} color="var(--color-primary-light)" /> Module Mastery
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {categories.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: 500 }}>
                  <span>{cat.name}</span>
                  <span style={{ color: cat.color }}>{cat.progress}%</span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'var(--color-surface-2)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${cat.progress}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="glass glass-neon-purple" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-light)' }}>
            <AlertCircle size={20} /> Recommended Focus
          </h3>
          
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Based on your recent quiz scores, you should review these topics to strengthen your foundation before moving on.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
            {stats.weakTopics.map((topic, i) => (
              <Link key={i} to="/courses" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 12, textDecoration: 'none', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.2s' }}>
                <span style={{ fontWeight: 600 }}>{topic}</span>
                <ArrowRight size={16} color="var(--color-primary-light)" />
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
