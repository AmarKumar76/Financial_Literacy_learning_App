import React from 'react';
import { Users, BookOpen, Brain, Activity, Settings, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Learners', value: '1,245', icon: Users, color: '#3b82f6' },
    { label: 'Active Courses', value: '8', icon: BookOpen, color: '#10b981' },
    { label: 'AI Drafts Pending', value: '14', icon: Brain, color: '#f59e0b' },
    { label: 'Quiz Completion Rate', value: '78%', icon: Activity, color: '#8b5cf6' },
  ];

  return (
    <div className="animate-fadeInUp" style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Overview</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>Platform metrics and pending actions.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <s.icon size={16} color={s.color} /> {s.label}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Pending AI Drafts */}
        <div className="glass glass-neon-gold" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={18} color="var(--color-accent-gold)" /> Needs Review: AI Drafts
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Gemini AI has generated draft questions for the "Investing Basics" module. They must be reviewed before publication.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Quiz: Understanding Stocks</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Generated 2 hours ago • 5 Questions</div>
          </div>
          <Link to="/admin/ai-review" className="btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Review Now</Link>
        </div>

        {/* Quick Actions */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={18} /> Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn-ghost" style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.03)' }}>Manage Users</button>
            <button className="btn-ghost" style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.03)' }}>Edit Courses</button>
            <button className="btn-ghost" style={{ justifyContent: 'flex-start', background: 'rgba(255,255,255,0.03)' }}>View Analytics</button>
          </div>
        </div>

      </div>
    </div>
  );
}
