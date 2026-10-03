import React, { useState } from 'react';
import { PieChart, DollarSign, ArrowRight, AlertCircle } from 'lucide-react';

export default function BudgetSimulator() {
  const [income, setIncome] = useState(5000);
  const [needs, setNeeds] = useState(2500);
  const [wants, setWants] = useState(1500);
  const [savings, setSavings] = useState(1000);

  const totalExpenses = needs + wants + savings;
  const balance = income - totalExpenses;

  // 50/30/20 Rule calculations
  const targetNeeds = income * 0.5;
  const targetWants = income * 0.3;
  const targetSavings = income * 0.2;

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: '4rem' }}>
      
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
          <PieChart size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>Budgeting Simulator</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Interactive 50/30/20 rule calculator to plan your monthly finances.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Inputs */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Monthly Income & Allocation</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Total Monthly Income</label>
            <div style={{ position: 'relative' }}>
              <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="number" 
                value={income} 
                onChange={(e) => setIncome(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '1.1rem', fontWeight: 600 }}
              />
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Needs (Rent, Groceries, Bills)</label>
                <span style={{ color: needs > targetNeeds ? 'var(--color-danger)' : 'var(--color-text)' }}>${needs}</span>
              </div>
              <input 
                type="range" min="0" max={income} value={needs} onChange={(e) => setNeeds(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3b82f6' }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>Target: ${targetNeeds} (50%)</div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Wants (Dining out, Hobbies)</label>
                <span style={{ color: wants > targetWants ? 'var(--color-danger)' : 'var(--color-text)' }}>${wants}</span>
              </div>
              <input 
                type="range" min="0" max={income} value={wants} onChange={(e) => setWants(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>Target: ${targetWants} (30%)</div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Savings & Investments</label>
                <span style={{ color: savings < targetSavings ? 'var(--color-danger)' : 'var(--color-accent)' }}>${savings}</span>
              </div>
              <input 
                type="range" min="0" max={income} value={savings} onChange={(e) => setSavings(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>Target: ${targetSavings} (20%)</div>
            </div>
          </div>
        </div>

        {/* Right Column: Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass" style={{ padding: '2rem', textAlign: 'center', background: balance < 0 ? 'rgba(239,68,68,0.1)' : balance > 0 ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${balance < 0 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}` }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Remaining Balance</h4>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: balance < 0 ? 'var(--color-danger)' : 'var(--color-text)' }}>
              ${balance}
            </div>
            {balance < 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-danger)', marginTop: '1rem', fontSize: '0.9rem' }}>
                <AlertCircle size={16} /> You are over budget!
              </div>
            )}
          </div>

          <div className="glass" style={{ padding: '2rem', flex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Analysis</h3>
            
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <ArrowRight size={18} color={needs > targetNeeds ? 'var(--color-danger)' : 'var(--color-accent)'} style={{ marginTop: '0.1rem' }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Needs ({(needs/income*100).toFixed(0)}%)</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {needs > targetNeeds ? "You are spending more than 50% on needs. Consider finding ways to lower fixed costs." : "Great! Your essential expenses are within the recommended 50%."}
                  </span>
                </div>
              </li>
              
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <ArrowRight size={18} color={wants > targetWants ? 'var(--color-danger)' : 'var(--color-accent-gold)'} style={{ marginTop: '0.1rem' }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Wants ({(wants/income*100).toFixed(0)}%)</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {wants > targetWants ? "Your discretionary spending is over 30%. Try cutting back on non-essentials." : "Your lifestyle spending is balanced."}
                  </span>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <ArrowRight size={18} color={savings < targetSavings ? 'var(--color-danger)' : 'var(--color-accent)'} style={{ marginTop: '0.1rem' }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Savings ({(savings/income*100).toFixed(0)}%)</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {savings < targetSavings ? "You are saving less than the recommended 20%. Try to boost your savings rate." : "Excellent! You are saving 20% or more for your future."}
                  </span>
                </div>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
