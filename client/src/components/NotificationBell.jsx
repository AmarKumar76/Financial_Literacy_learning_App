import React, { useState } from 'react';
import { Bell, ShieldAlert, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  // Mock notifications representing Module 10 requirements (Streaks, Badges, Recommendations)
  const notifications = [
    {
      id: 1,
      type: 'streak',
      title: 'Keep your streak alive!',
      message: 'You are on a 5-day streak. Complete a lesson today to reach 6!',
      icon: ShieldAlert,
      color: 'var(--color-accent-gold)',
      time: '2 hours ago',
      link: '/courses'
    },
    {
      id: 2,
      type: 'badge',
      title: 'New Badge Unlocked!',
      message: 'You earned the "Perfect Score" badge for the Taxes quiz.',
      icon: Award,
      color: 'var(--color-primary-light)',
      time: '1 day ago',
      link: '/profile'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Recommended Topic',
      message: 'Based on your recent scores, we recommend reviewing "Investing Basics".',
      icon: BookOpen,
      color: 'var(--color-accent)',
      time: '2 days ago',
      link: '/courses/investing/lesson/1'
    }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (hasUnread && !isOpen) {
      setHasUnread(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Bell Icon Trigger */}
      <button 
        onClick={toggleDropdown}
        style={{ 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '50%', 
          width: 40, height: 40, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-text)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
      >
        <Bell size={20} />
        {hasUnread && (
          <span style={{ 
            position: 'absolute', top: 8, right: 10, 
            width: 8, height: 8, background: 'var(--color-danger)', 
            borderRadius: '50%', border: '2px solid var(--color-surface)' 
          }} />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          className="glass animate-fadeInUp"
          style={{ 
            position: 'absolute', 
            top: 'calc(100% + 10px)', right: 0, 
            width: 'min(350px, 90vw)', 
            zIndex: 1000, 
            padding: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h4 style={{ fontWeight: 700, margin: 0 }}>Notifications</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>Mark all read</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: 300, overflowY: 'auto' }}>
            {notifications.map((notif) => (
              <Link 
                key={notif.id} 
                to={notif.link}
                onClick={() => setIsOpen(false)}
                style={{ 
                  display: 'flex', gap: '1rem', textDecoration: 'none', color: 'inherit',
                  padding: '0.5rem', borderRadius: 8,
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `rgba(255,255,255,0.05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: notif.color, flexShrink: 0 }}>
                  <notif.icon size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{notif.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBottom: '0.25rem' }}>{notif.message}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{notif.time}</div>
                </div>
              </Link>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary-light)', cursor: 'pointer', fontWeight: 600 }}>View all notifications</span>
          </div>
        </div>
      )}
    </div>
  );
}
