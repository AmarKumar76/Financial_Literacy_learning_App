import React, { useState } from 'react';
import { PieChart, DollarSign, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

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
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp font-sans max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <PieChart className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Budgeting Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Interactive 50/30/20 rule calculator to plan and optimize your monthly income.
            </p>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Input Sliders (7 cols) */}
          <div className="md:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col gap-6">
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              Monthly Income & Allocation
            </h3>

            {/* Income Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Total Monthly Income ($)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 font-bold text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Allocation Sliders */}
            <div className="flex flex-col gap-5">
              {/* Needs Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Needs (Rent, Groceries, Utilities)</span>
                  <span className={needs > targetNeeds ? 'text-red-600' : 'text-slate-900'}>
                    ${needs}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={income}
                  value={needs}
                  onChange={(e) => setNeeds(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Target: 50%</span>
                  <span>Recommended: ${targetNeeds}</span>
                </div>
              </div>

              {/* Wants Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Wants (Dining out, Hobbies, Shopping)</span>
                  <span className={wants > targetWants ? 'text-amber-600' : 'text-slate-900'}>
                    ${wants}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={income}
                  value={wants}
                  onChange={(e) => setWants(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Target: 30%</span>
                  <span>Recommended: ${targetWants}</span>
                </div>
              </div>

              {/* Savings Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Savings & Investments</span>
                  <span className={savings < targetSavings ? 'text-red-600' : 'text-emerald-600'}>
                    ${savings}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={income}
                  value={savings}
                  onChange={(e) => setSavings(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Target: 20%</span>
                  <span>Recommended: ${targetSavings}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Remaining Balance & Breakdown (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Balance Card */}
            <div
              className={`border rounded-2xl p-6 text-center shadow-2xs flex flex-col items-center justify-center ${
                balance < 0
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : balance > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Unallocated Balance
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
                ${balance}
              </span>
              {balance < 0 && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Expenses exceed total monthly income!</span>
                </div>
              )}
            </div>

            {/* Analysis Box */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                50/30/20 Rule Analysis
              </h3>

              <div className="flex flex-col gap-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Needs: {((needs / (income || 1)) * 100).toFixed(0)}%
                    </span>
                    <span className="text-slate-500 leading-relaxed">
                      {needs > targetNeeds
                        ? 'Spending is higher than 50%. Look for ways to lower fixed bills.'
                        : 'Essential expenses are within the recommended target.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ArrowRight className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Wants: {((wants / (income || 1)) * 100).toFixed(0)}%
                    </span>
                    <span className="text-slate-500 leading-relaxed">
                      {wants > targetWants
                        ? 'Discretionary spending is above 30%. Consider cutting non-essentials.'
                        : 'Lifestyle spending is healthy and well-balanced.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Savings: {((savings / (income || 1)) * 100).toFixed(0)}%
                    </span>
                    <span className="text-slate-500 leading-relaxed">
                      {savings < targetSavings
                        ? 'Savings is below 20%. Try to boost your emergency fund & SIPs.'
                        : 'Great job! You are saving 20%+ for your financial future.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
