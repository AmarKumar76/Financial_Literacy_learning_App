import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle, Target } from 'lucide-react';

export default function LessonView() {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);

  // Mock Lesson Data
  const lesson = {
    title: "Understanding Cash Flow",
    content: `
      <h2>The Lifeblood of Your Finances</h2>
      <p>Cash flow is simply the money coming in (income) and the money going out (expenses). Positive cash flow means you earn more than you spend. Negative cash flow means you're sinking into debt.</p>
      
      <h3>Step 1: Track Everything</h3>
      <p>You can't manage what you don't measure. Use a spreadsheet or an app to track every penny for a month. You'll be surprised where your money actually goes!</p>

      <h3>Step 2: The 50/30/20 Rule</h3>
      <p>A simple rule of thumb for budgeting:</p>
      <ul>
        <li><strong>50% Needs:</strong> Rent, groceries, utilities.</li>
        <li><strong>30% Wants:</strong> Dining out, entertainment, hobbies.</li>
        <li><strong>20% Savings:</strong> Debt repayment, emergency fund, investments.</li>
      </ul>
      
      <p>By keeping your expenses aligned with these percentages, you ensure a healthy financial future while still enjoying the present.</p>
    `,
    time: "5 min read"
  };

  const handleScroll = (e) => {
    const element = e.target;
    const progress = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setReadingProgress(progress);
  };

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 800, margin: '0 auto', padding: '0 1rem' }}>
      <div className="glass glass-neon-green" style={{ padding: '2.5rem', position: 'relative' }}>
        
        {/* Progress Bar at Top */}
        <div style={{ position: 'absolute', top: 0, left: 0, height: 4, background: 'var(--color-accent)', width: `${readingProgress}%`, transition: 'width 0.1s', borderTopLeftRadius: 16, borderTopRightRadius: readingProgress > 98 ? 16 : 0 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
          <BookOpen size={20} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', letterSpacing: 1, textTransform: 'uppercase' }}>Lesson {lessonId} • {lesson.time}</span>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'white' }}>
          {lesson.title}
        </h1>

        <div 
          style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '1rem', color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}
          onScroll={handleScroll}
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
          <button className="btn-ghost" onClick={() => navigate('/courses')}>Back to Modules</button>
          
          <button className="btn-primary" onClick={() => navigate(`/courses/${id}/quiz/1`)} style={{ gap: '0.5rem' }}>
            <CheckCircle size={18} />
            Complete & Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
