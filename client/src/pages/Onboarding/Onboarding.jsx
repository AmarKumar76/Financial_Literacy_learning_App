import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitOnboarding } from '../../services/userService';

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    preferences: {
      userType: 'Student', // Student, First-time Earner, Experienced Professional
    },
    learningGoal: 'Budgeting', // Budgeting, Investing, Taxes, General
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userType') {
      setFormData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, userType: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const updatedUser = await submitOnboarding(user._id || user.id, formData);
      updateUser({ 
        preferences: formData.preferences,
        learningGoal: formData.learningGoal,
        isOnboarded: true 
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save onboarding data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div className="animate-fadeInUp" style={{ width: '100%', maxWidth: 500 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, background: 'linear-gradient(135deg,#6366f1,#10b981)',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
          }}>
            <Sparkles size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Welcome, {user?.name || 'Learner'}!
          </h1>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Let's personalize your learning experience.
          </p>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.25rem',
              color: '#f87171', fontSize: '0.875rem', textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                <UserCheck size={16} className="text-primary" />
                Which best describes you?
              </label>
              <select
                name="userType"
                value={formData.preferences.userType}
                onChange={handleChange}
                className="input"
                style={{ cursor: 'pointer', appearance: 'none' }}
              >
                <option value="Student" style={{ background: '#111827' }}>Student</option>
                <option value="First-time Earner" style={{ background: '#111827' }}>First-time Earner</option>
                <option value="Experienced Professional" style={{ background: '#111827' }}>Experienced Professional</option>
              </select>
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                <Target size={16} className="text-accent" />
                What is your primary learning goal?
              </label>
              <select
                name="learningGoal"
                value={formData.learningGoal}
                onChange={handleChange}
                className="input"
                style={{ cursor: 'pointer', appearance: 'none' }}
              >
                <option value="Budgeting" style={{ background: '#111827' }}>Mastering Budgeting</option>
                <option value="Investing" style={{ background: '#111827' }}>Understanding Investing</option>
                <option value="Taxes" style={{ background: '#111827' }}>Navigating Taxes</option>
                <option value="General" style={{ background: '#111827' }}>General Financial Literacy</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              {loading ? <><div className="spinner" /> Saving…</> : <>Start Learning <ArrowRight size={18} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
