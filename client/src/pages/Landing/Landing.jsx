import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Shield, BookOpen, Star, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="animate-fadeInUp" style={{ paddingBottom: '4rem' }}>
      
      {/* HERO SECTION */}
      <section style={{ padding: '6rem 1rem', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', padding: '0.5rem 1rem', borderRadius: 99, color: 'var(--color-primary-light)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2rem' }}>
          <Sparkles size={16} /> Powered by Google Gemini AI
        </div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
          Build financial confidence, <br />
          <span className="gradient-text">one lesson at a time.</span>
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: 600, margin: '0 auto 3rem' }}>
          Master budgeting, understand taxes, and learn to invest safely. Practice with AI-generated quizzes, track your progress, and level up your financial awareness.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={user ? "/dashboard" : "/register"} className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
            {user ? "Go to Dashboard" : "Start Learning for Free"}
          </Link>
          <Link to="/courses" className="btn-ghost" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
            Explore Topics
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '4rem 1rem', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem' }}>How it Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { icon: BookOpen, title: 'Learn Basics', desc: 'Read bite-sized, practical lessons on essential financial topics.', color: '#3b82f6' },
            { icon: Target, title: 'Practice & Quiz', desc: 'Test your knowledge with AI-tailored scenarios and immediate feedback.', color: '#8b5cf6' },
            { icon: CheckCircle, title: 'Understand Deeply', desc: 'Get detailed explanations for every answer to reinforce concepts.', color: '#10b981' },
            { icon: TrendingUp, title: 'Track Progress', desc: 'Earn XP, unlock badges, and watch your financial literacy grow.', color: '#f59e0b' }
          ].map((step, i) => (
            <div key={i} className="glass" style={{ padding: '2rem', textAlign: 'center', borderRadius: 16 }}>
              <div style={{ width: 64, height: 64, background: `${step.color}22`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: step.color }}>
                <step.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOPICS PREVIEW */}
      <section style={{ padding: '4rem 1rem', background: 'var(--color-surface-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Essential Learning Topics</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>Curated content designed for first-time earners and beginners.</p>
            </div>
            <Link to="/courses" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {['Money Basics', 'Budgeting', 'Tax Basics', 'Investing Basics', 'Credit & Loans', 'Insurance'].map((topic, i) => (
              <div key={i} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ width: 48, height: 48, background: 'rgba(99,102,241,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-light)' }}>
                  <BookOpen size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{topic}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAUD AWARENESS HIGHLIGHT */}
      <section style={{ padding: '5rem 1rem', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ width: 64, height: 64, background: 'rgba(239,68,68,0.1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)', marginBottom: '1.5rem' }}>
            <Shield size={32} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Don't become a statistic.</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Financial scams are more sophisticated than ever. Our dedicated <strong>Scam & Fraud Awareness</strong> module teaches you how to identify phishing emails, fake investment offers, and OTP scams before it's too late.
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)' }}><CheckCircle size={18} color="var(--color-accent)" /> Identify Phishing Attacks</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)' }}><CheckCircle size={18} color="var(--color-accent)" /> Secure your UPI & Banking</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)' }}><CheckCircle size={18} color="var(--color-accent)" /> Spot "Get Rich Quick" Scams</li>
          </ul>
        </div>
        <div className="glass glass-neon-green" style={{ padding: '3rem', textAlign: 'center' }}>
           <Shield size={80} color="var(--color-accent)" style={{ margin: '0 auto 2rem' }} />
           <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Scam Prevention Master</h3>
           <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Complete the security modules to earn this badge and protect your wealth.</p>
           <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start Module</button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '6rem 1rem', textAlign: 'center', background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.05))' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ready to take control?</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: 600, margin: '0 auto 3rem' }}>
          Join thousands of learners building their financial future safely and confidently.
        </p>
        <Link to={user ? "/dashboard" : "/register"} className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
          {user ? "Continue Learning" : "Create Free Account"}
        </Link>
      </section>

    </div>
  );
}

// Inline mock for Sparkles if missing from imports above
const Sparkles = ({ size }) => <span style={{ fontSize: size }}>✨</span>;
