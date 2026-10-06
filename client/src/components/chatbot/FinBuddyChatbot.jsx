import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  Minimize2,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { sendChatMessage } from '../../services/aiService';
import { useAuth } from '../../context/AuthContext';

const STORAGE_KEY = 'fin08_finbuddy_chat_history';

const SUGGESTED_QUESTIONS = [
  'What is the 50/30/20 budgeting rule?',
  'How do I start building an emergency fund?',
  'Explain inflation simply with an example',
  'What is compound interest and how does it work?',
];

export default function FinBuddyChatbot() {
  const { user } = useAuth();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load chat history from localStorage', e);
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: `Hi ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I'm **FinBuddy**, your personal AI financial guide. Ask me anything about budgeting, saving, taxes, or investing!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Detect lesson context from page location
  const isLessonPage = location.pathname.includes('/courses/');

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save chat history', e);
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setError(null);
    setInput('');

    // User Message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      let fullPrompt = query;
      if (isLessonPage) {
        fullPrompt = `[Context: User is currently reading a lesson on FIN-08] ${query}`;
      }

      const res = await sendChatMessage(fullPrompt);

      if (res && res.reply) {
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('No reply returned from AI assistant.');
      }
    } catch (err) {
      console.error('FinBuddy error:', err);
      const errMsg =
        err.response?.data?.message || err.message || 'FinBuddy is temporarily unavailable. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    const initial = [
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `Chat cleared! How can I assist your financial journey today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(initial);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.45), 0 8px 10px -6px rgba(37, 99, 235, 0.2)',
            border: ' none',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 14px 30px -5px rgba(37, 99, 235, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.45)';
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={16} color="#FFFFFF" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
            Ask FinBuddy AI
          </span>
        </button>
      )}

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: 'calc(100vw - 32px)',
            maxWidth: '420px',
            height: '600px',
            maxHeight: 'calc(100vh - 40px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(226, 232, 240, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            animation: 'finbuddySlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Bot size={22} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>FinBuddy AI</span>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 8px #10B981',
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: '#93C5FD', margin: 0, fontWeight: 500 }}>
                  Financial Literacy Assistant
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                onClick={handleClearHistory}
                title="Clear Chat History"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#93C5FD',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#93C5FD')}
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Context Banner if on lesson page */}
          {isLessonPage && (
            <div
              style={{
                backgroundColor: '#EFF6FF',
                borderBottom: '1px solid #DBEAFE',
                padding: '0.45rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: '#1D4ED8',
                fontWeight: 600,
              }}
            >
              <BookOpen size={14} />
              <span>Lesson-Aware Mode Active</span>
            </div>
          )}

          {/* Non-Authenticated Warning banner if user not logged in */}
          {!user && (
            <div
              style={{
                backgroundColor: '#FEF3C7',
                padding: '0.55rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#92400E',
                fontWeight: 600,
              }}
            >
              <span>Please sign in to chat with FinBuddy</span>
              <Link to="/login" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                Sign in
              </Link>
            </div>
          )}

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backgroundColor: '#F8FAFC',
            }}
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      maxWidth: '86%',
                      flexDirection: isUser ? 'row-reverse' : 'row',
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: isUser ? '#2563EB' : '#1E293B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isUser ? <User size={15} color="#FFFFFF" /> : <Bot size={15} color="#FFFFFF" />}
                    </div>

                    {/* Bubble */}
                    <div
                      style={{
                        backgroundColor: isUser ? '#2563EB' : '#FFFFFF',
                        color: isUser ? '#FFFFFF' : '#0F172A',
                        padding: '0.75rem 0.95rem',
                        borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        boxShadow: isUser
                          ? '0 2px 8px rgba(37, 99, 235, 0.2)'
                          : '0 2px 6px rgba(0, 0, 0, 0.04)',
                        border: isUser ? 'none' : '1px solid #E2E8F0',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: '#94A3B8',
                      marginTop: '0.25rem',
                      paddingLeft: isUser ? 0 : '2.4rem',
                      paddingRight: isUser ? '2.4rem' : 0,
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#1E293B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={15} color="#FFFFFF" />
                </div>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px 16px 16px 2px',
                    padding: '0.65rem 0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      animation: 'bounce 1.4s infinite ease-in-out both',
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      animation: 'bounce 1.4s infinite ease-in-out both 0.2s',
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      animation: 'bounce 1.4s infinite ease-in-out both 0.4s',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  fontSize: '0.8125rem',
                  color: '#B91C1C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={16} color="#DC2626" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => handleSend()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <RefreshCw size={12} /> Retry
                </button>
              </div>
            )}

            {/* Suggested Question Chips (only if few messages) */}
            {messages.length <= 2 && !loading && (
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <span
                  style={{
                    fontSize: '0.71875rem',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Suggested Topics
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      style={{
                        textAlign: 'left',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        padding: '0.55rem 0.8rem',
                        fontSize: '0.8125rem',
                        color: '#334155',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#2563EB';
                        e.currentTarget.style.backgroundColor = '#EFF6FF';
                        e.currentTarget.style.color = '#1D4ED8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#CBD5E1';
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.color = '#334155';
                      }}
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={user ? "Ask FinBuddy a question..." : "Sign in to ask..."}
              value={input}
              disabled={!user || loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                height: '42px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                padding: '0 0.85rem',
                fontSize: '0.875rem',
                color: '#0F172A',
                backgroundColor: user ? '#F8FAFC' : '#F1F5F9',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading || !user}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: input.trim() && user && !loading ? '#2563EB' : '#94A3B8',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && user && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
