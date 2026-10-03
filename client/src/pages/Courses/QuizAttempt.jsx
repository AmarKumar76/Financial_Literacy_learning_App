import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Target, CheckCircle, AlertCircle, Trophy } from 'lucide-react';

export default function QuizAttempt() {
  const { id, quizId } = useParams();
  const navigate = useNavigate();
  
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const question = {
    text: "According to the 50/30/20 rule, how much of your income should be allocated to 'Wants' (entertainment, dining out)?",
    options: [
      { id: 'a', text: "20%" },
      { id: 'b', text: "30%" },
      { id: 'c', text: "50%" },
      { id: 'd', text: "10%" }
    ],
    correctOption: 'b',
    explanation: "The rule suggests 50% for Needs, 30% for Wants, and 20% for Savings/Debt reduction."
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected === question.correctOption) {
      setScore(100);
    }
  };

  const handleNext = () => {
    navigate('/dashboard'); // Go back to dashboard after quiz
  };

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 700, margin: '0 auto', padding: '0 1rem' }}>
      
      {!submitted ? (
        <div className="glass glass-neon-purple" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-light)', marginBottom: '1.5rem', fontWeight: 600 }}>
            <Target size={20} />
            <span>Knowledge Check</span>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.5 }}>
            {question.text}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                style={{
                  padding: '1.25rem', borderRadius: 12, textAlign: 'left', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s',
                  background: selected === opt.id ? 'rgba(139,92,246,0.1)' : 'var(--color-surface-2)',
                  border: selected === opt.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                  color: selected === opt.id ? 'white' : 'var(--color-text)'
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}
            disabled={!selected}
            onClick={handleSubmit}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className={`glass ${score === 100 ? 'glass-neon-gold' : 'glass-neon-green'}`} style={{ padding: '3rem', textAlign: 'center' }}>
          
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: score === 100 ? 'rgba(251,191,36,0.2)' : 'rgba(16,185,129,0.2)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {score === 100 ? <Trophy size={40} color="var(--color-accent-gold)" /> : <CheckCircle size={40} color="var(--color-accent)" />}
          </div>
          
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            {score === 100 ? 'Perfect Score!' : 'Good Effort!'}
          </h2>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: 12, textAlign: 'left', marginBottom: '2rem' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: score === 100 ? 'var(--color-accent)' : 'var(--color-danger)', marginBottom: '0.5rem' }}>
              {score === 100 ? <><CheckCircle size={18} /> Correct</> : <><AlertCircle size={18} /> Incorrect</>}
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{question.explanation}</p>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 12, marginBottom: '2rem', color: 'var(--color-accent-gold)', fontWeight: 600 }}>
            + {score === 100 ? 50 : 10} XP Earned!
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleNext}>
            Return to Dashboard
          </button>
        </div>
      )}

    </div>
  );
}
