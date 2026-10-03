import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', padding: '4rem 1.5rem 2rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)' }}>
              Fin<span className="gradient-text">Learn</span>
            </span>
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Build financial confidence, one lesson at a time. Learn, practice, and master your money with AI-assisted learning.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a href="#" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}><Twitter size={20} /></a>
            <a href="#" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}><Github size={20} /></a>
            <a href="#" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '1rem' }}>Navigation</h4>
          <Link to="/courses" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Learn</Link>
          <Link to="/progress" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Progress</Link>
          <Link to="/leaderboard" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Leaderboard</Link>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>About Us</a>
        </div>

        {/* Resources */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '1rem' }}>Resources</h4>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Financial Literacy Basics</a>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Scam & Fraud Awareness</a>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Investing Guide</a>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Blog</a>
        </div>

        {/* Legal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '1rem' }}>Legal</h4>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Cookie Policy</a>
        </div>
      </div>
      
      <div style={{ maxWidth: 1200, margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} FinLearn Platform (FIN-08). Educational purposes only. Not financial advice.
      </div>
    </footer>
  );
}
