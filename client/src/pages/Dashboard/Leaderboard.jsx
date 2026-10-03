import React from 'react';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Leaderboard() {
  const { user } = useAuth();
  
  // Mock Leaderboard Data
  const leaderboard = [
    { id: 1, name: 'Alex M.', xp: 12450, rank: 1, isCurrentUser: false },
    { id: 2, name: 'Sarah J.', xp: 11200, rank: 2, isCurrentUser: false },
    { id: 3, name: 'David K.', xp: 10800, rank: 3, isCurrentUser: false },
    { id: 4, name: user?.name || 'You', xp: user?.XP || 4850, rank: 4, isCurrentUser: true },
    { id: 5, name: 'Michael T.', xp: 4100, rank: 5, isCurrentUser: false },
    { id: 6, name: 'Emma W.', xp: 3950, rank: 6, isCurrentUser: false },
  ];

  const renderMedal = (rank) => {
    if (rank === 1) return <Medal size={24} color="#fbbf24" />; // Gold
    if (rank === 2) return <Medal size={24} color="#9ca3af" />; // Silver
    if (rank === 3) return <Medal size={24} color="#b45309" />; // Bronze
    return <span style={{ width: 24, textAlign: 'center', fontWeight: 600, color: 'var(--color-text-muted)' }}>{rank}</span>;
  };

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 800, margin: '0 auto', padding: '0 1rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(251,191,36,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid rgba(251,191,36,0.3)' }}>
          <Trophy size={32} color="var(--color-accent-gold)" />
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Global Leaderboard</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>See how you stack up against other learners this week.</p>
      </div>

      {/* Top 3 Podium (Desktop only for simplicity in mockup) */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '1rem', marginBottom: '3rem', height: 200 }} className="desktop-nav">
        {/* Second Place */}
        <div className="glass" style={{ width: 120, height: '70%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem', background: 'linear-gradient(180deg, rgba(156,163,175,0.1) 0%, transparent 100%)', borderTop: '2px solid #9ca3af' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#9ca3af', marginBottom: '0.5rem', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>S</div>
          <span style={{ fontWeight: 600 }}>Sarah J.</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>11.2k XP</span>
        </div>
        {/* First Place */}
        <div className="glass glass-neon-gold" style={{ width: 140, height: '90%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem', borderTop: '2px solid #fbbf24', zIndex: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fbbf24', marginBottom: '0.5rem', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>A</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Alex M.</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-accent-gold)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Star size={12} fill="currentColor"/> 12.4k XP</span>
        </div>
        {/* Third Place */}
        <div className="glass" style={{ width: 120, height: '60%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem', background: 'linear-gradient(180deg, rgba(180,83,9,0.1) 0%, transparent 100%)', borderTop: '2px solid #b45309' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#b45309', marginBottom: '0.5rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>D</div>
          <span style={{ fontWeight: 600 }}>David K.</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>10.8k XP</span>
        </div>
      </div>

      {/* List View */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        {leaderboard.map((u, i) => (
          <div key={u.id} style={{ 
            display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', 
            borderBottom: i !== leaderboard.length - 1 ? '1px solid var(--color-border)' : 'none',
            background: u.isCurrentUser ? 'rgba(99,102,241,0.1)' : 'transparent'
          }}>
            <div style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
              {renderMedal(u.rank)}
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: u.isCurrentUser ? 'var(--color-primary)' : 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, margin: '0 1rem' }}>
              {u.name[0]}
            </div>
            <div style={{ flexGrow: 1 }}>
              <h4 style={{ fontWeight: 600, fontSize: '1.1rem', color: u.isCurrentUser ? 'var(--color-primary-light)' : 'var(--color-text)' }}>
                {u.name} {u.isCurrentUser && '(You)'}
              </h4>
            </div>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', color: u.isCurrentUser ? 'var(--color-accent-gold)' : 'var(--color-text-muted)' }}>
              {u.xp} <span style={{ fontSize: '0.8rem' }}>XP</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
