import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, TrendingUp, Shield, Clock } from 'lucide-react';

export default function ModulesList() {
  const modules = [
    { id: '1', title: 'Budgeting Basics', desc: 'Master your income and expenses.', xp: 500, time: '30 min', icon: BookOpen, color: '#10b981' },
    { id: '2', title: 'Savings Strategy', desc: 'Build your emergency fund.', xp: 600, time: '45 min', icon: Shield, color: '#8b5cf6' },
    { id: '3', title: 'Investing 101', desc: 'Grow your wealth over time.', xp: 1000, time: '2 hrs', icon: TrendingUp, color: '#fbbf24' },
    { id: '4', title: 'Credit Score Secrets', desc: 'Understand and improve your score.', xp: 750, time: '1 hr', icon: Star, color: '#3b82f6' }
  ];

  return (
    <div className="animate-fadeInUp" style={{ padding: '0 1rem', maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Courses</h1>
      <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        Expand your financial literacy with these interactive modules.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link to={`/courses/${mod.id}/lesson/1`} key={mod.id} style={{ textDecoration: 'none' }}>
              <div className="glass" style={{ 
                padding: '2rem', borderRadius: 16, transition: 'all 0.3s', cursor: 'pointer', height: '100%',
                display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = mod.color;
                e.currentTarget.style.boxShadow = `0 10px 30px ${mod.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${mod.color}22 0%, transparent 70%)` }} />
                
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${mod.color}11`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: `1px solid ${mod.color}44` }}>
                  <Icon size={28} color={mod.color} />
                </div>
                
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text)' }}>{mod.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{mod.desc}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-accent-gold)', fontWeight: 600 }}>
                    <Star size={14} /> +{mod.xp} XP
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-text-muted)' }}>
                    <Clock size={14} /> {mod.time}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
