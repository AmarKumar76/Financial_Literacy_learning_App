import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { register as registerApi } from '../../services/authService';

const passwordChecks = (pw) => [
  { label: 'At least 8 characters',   pass: pw.length >= 8 },
  { label: 'Contains a number',        pass: /\d/.test(pw) },
  { label: 'Contains a letter',        pass: /[a-zA-Z]/.test(pw) },
];

export default function Register() {
  const [form, setForm]       = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const checks = passwordChecks(form.password);
  const passwordStrong = checks.every(c => c.pass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!passwordStrong) { setError('Please choose a stronger password.'); return; }
    setLoading(true);
    try {
      const { data } = await registerApi(form);
      login(data.user, data.token);
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
      background: 'radial-gradient(ellipse at 80% 40%, rgba(139,92,246,0.12) 0%, transparent 60%), var(--color-bg)',
    }}>
      <div className="animate-fadeInUp" style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
          }}>
            <Zap size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Start learning for free
          </h1>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Master budgeting, taxes, investing and more
          </p>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.25rem',
              color: '#f87171', fontSize: '0.875rem',
            }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <div className="input-group">
              <label htmlFor="reg-name">Full name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input id="reg-name" type="text" className="input" style={{ paddingLeft: '2.5rem' }} placeholder="John Doe"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required autoComplete="name" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input id="reg-email" type="email" className="input" style={{ paddingLeft: '2.5rem' }} placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required autoComplete="email" />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '0.75rem' }}>
              <label htmlFor="reg-password">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input id="reg-password" type={showPw ? 'text' : 'password'} className="input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }} placeholder="Create a password"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Password strength */}
            {form.password && (
              <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {checks.map(({ label, pass }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: pass ? '#34d399' : 'var(--color-text-muted)' }}>
                    <CheckCircle size={12} style={{ opacity: pass ? 1 : 0.3 }} />
                    {label}
                  </div>
                ))}
              </div>
            )}

            <button id="register-submit-btn" type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? <><div className="spinner" /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <div className="divider" />
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
