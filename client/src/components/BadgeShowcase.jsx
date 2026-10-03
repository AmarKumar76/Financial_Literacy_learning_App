import React from 'react';
import { Award, Lock, Star, TrendingUp, CheckCircle, Shield } from 'lucide-react';

export default function BadgeShowcase({ userLevel = 1 }) {
  const badges = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Completed your first financial lesson.',
      icon: Star,
      color: '#3b82f6',
      unlocked: true,
      unlockedAt: 'Oct 1, 2026'
    },
    {
      id: 2,
      name: 'Perfect Score',
      description: 'Got 100% on a module quiz.',
      icon: CheckCircle,
      color: '#10b981',
      unlocked: true,
      unlockedAt: 'Oct 2, 2026'
    },
    {
      id: 3,
      name: '7-Day Streak',
      description: 'Learned for 7 consecutive days.',
      icon: TrendingUp,
      color: '#f59e0b',
      unlocked: false,
      progress: 5,
      total: 7
    },
    {
      id: 4,
      name: 'Tax Expert',
      description: 'Completed the entire Tax module.',
      icon: Shield,
      color: '#8b5cf6',
      unlocked: false,
      progress: 20,
      total: 100
    },
    {
      id: 5,
      name: 'Financial Guru',
      description: 'Reach Level 10.',
      icon: Award,
      color: '#fbbf24',
      unlocked: userLevel >= 10,
      progress: userLevel,
      total: 10
    }
  ];

  return (
    <div className="glass animate-fadeInUp" style={{ padding: '2rem', marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Award size={20} color="var(--color-accent-gold)" /> Your Badges
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
        {badges.map((badge) => (
          <div key={badge.id} style={{
            background: badge.unlocked ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)',
            border: `1px solid ${badge.unlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'}`,
            borderRadius: 12,
            padding: '1.25rem 1rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            opacity: badge.unlocked ? 1 : 0.6,
            transition: 'transform 0.2s',
            cursor: 'default'
          }}
          onMouseOver={(e) => badge.unlocked && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => badge.unlocked && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ 
              width: 56, height: 56, borderRadius: '50%', 
              background: badge.unlocked ? `rgba(${hexToRgb(badge.color)}, 0.15)` : 'rgba(255,255,255,0.05)',
              color: badge.unlocked ? badge.color : 'var(--color-text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem', position: 'relative'
            }}>
              {badge.unlocked ? <badge.icon size={28} /> : <Lock size={24} />}
            </div>
            
            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem', color: badge.unlocked ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
              {badge.name}
            </div>
            
            {badge.unlocked ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)' }}>
                {badge.unlockedAt}
              </div>
            ) : (
              <div style={{ width: '100%', marginTop: '0.5rem' }}>
                <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (badge.progress / badge.total) * 100)}%`, background: 'var(--color-text-muted)' }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  {badge.progress} / {badge.total}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper to convert hex to rgb for rgba background transparency
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
}
