import React from 'react';
import { Shield, BookOpen, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BadgeShowcase from '../../components/BadgeShowcase';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 800, margin: '0 auto', padding: '0 1rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800, color: 'white', border: '4px solid var(--color-surface)' }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>{user?.name || 'User'}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>{user?.email}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 99, background: 'rgba(251,191,36,0.1)', color: 'var(--color-accent-gold)', fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(251,191,36,0.3)' }}>Level 12 Learner</span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: 99, background: 'rgba(16,185,129,0.1)', color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(16,185,129,0.3)' }}>Active Streak: 5 Days</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={20} color="var(--color-primary-light)" /> Learning Preferences</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Current Role</label>
            <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{user?.preferences?.userType || 'First-time Earner'}</div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Primary Goal</label>
            <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{user?.preferences?.learningGoal || 'Build an emergency fund'}</div>
          </div>

          <button className="btn-ghost" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>Edit Preferences</button>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={20} color="var(--color-accent)" /> Security & Account</h3>
          
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>Change Password</button>
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>Notification Settings</button>
          
          <div style={{ borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }} />
          
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--color-danger)' }} onClick={logout}>Sign Out</button>
        </div>
      </div>

      <BadgeShowcase userLevel={user?.level || 1} />

    </div>
  );
}
