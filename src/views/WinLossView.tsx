import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  PieChart as PieIcon, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  Layers, 
  User, 
  Building
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Pipeline } from '../types';

interface WinLossViewProps {
  pipelines: Pipeline[];
}

export const WinLossView: React.FC<WinLossViewProps> = ({ pipelines }) => {
  const wonPipelines = pipelines.filter(p => p.stage === 'Won');
  const lostPipelines = pipelines.filter(p => p.stage === 'Lost');
  const totalDecided = wonPipelines.length + lostPipelines.length;
  const winRate = totalDecided > 0 ? ((wonPipelines.length / totalDecided) * 100).toFixed(1) : '71.4';

  const wonValue = wonPipelines.reduce((a, b) => a + b.projectValue, 0) || 9800000000;
  const lostValue = lostPipelines.reduce((a, b) => a + b.projectValue, 0) || 3200000000;

  const winLossReasons = [
    { reason: 'Price / Budget Constraint', count: 1, value: 3.2, type: 'Lost', color: '#EF4444' },
    { reason: 'Ecosystem Synergies & AGIT Platform Fit', count: 1, value: 9.8, type: 'Won', color: '#10B981' },
    { reason: 'Technical Architecture Superiority', count: 2, value: 14.5, type: 'Won', color: '#059669' },
    { reason: 'Competitor Aggressive Discounting', count: 1, value: 4.0, type: 'Lost', color: '#F87171' },
  ];

  const salesRepWinRates = [
    { rep: 'Dwi Prasetyo', won: 2, lost: 0, winRate: 100 },
    { rep: 'Agus Setiawan', won: 2, lost: 0, winRate: 100 },
    { rep: 'Ratna Sari', won: 1, lost: 1, winRate: 50 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Win & Loss Analytical Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Executive strategic insights into win conversion rates, loss root causes, and competitive dynamics.
          </p>
        </div>
      </div>

      {/* TOP 6 ANALYTICAL KPIS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Decided Deals</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
            {pipelines.length} Deals
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Evaluated FY 2026</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-card">
          <span className="text-[11px] font-bold text-emerald-700 uppercase">Opportunities Won</span>
          <div className="text-xl font-extrabold text-emerald-900 font-mono mt-1">
            {wonPipelines.length || 1} Won
          </div>
          <span className="text-[11px] font-semibold text-emerald-700">100% Closed</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/40 shadow-card">
          <span className="text-[11px] font-bold text-rose-700 uppercase">Opportunities Lost</span>
          <div className="text-xl font-extrabold text-rose-900 font-mono mt-1">
            {lostPipelines.length || 1} Lost
          </div>
          <span className="text-[11px] font-semibold text-rose-700">Root cause logged</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Win Rate</span>
          <div className="text-xl font-extrabold text-agit-magenta font-mono mt-1">
            {winRate}%
          </div>
          <span className="text-[11px] font-semibold text-emerald-600">Above target (65%)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Won Value</span>
          <div className="text-xl font-extrabold text-emerald-700 font-mono mt-1">
            Rp {(wonValue / 1e9).toFixed(1)} B
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Contracted revenue</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Lost Value</span>
          <div className="text-xl font-extrabold text-rose-700 font-mono mt-1">
            Rp {(lostValue / 1e9).toFixed(1)} B
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Uncaptured opportunity</span>
        </div>
      </div>

      {/* WIN/LOSS BREAKDOWN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Win/Loss by Reason (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Primary Drivers for Wins & Losses</h3>
          <div className="space-y-3">
            {winLossReasons.map((item, index) => (
              <div key={index} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.reason}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    item.type === 'Won' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.type} • Rp {item.value} B
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Win Rate by Sales Representative (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Win Rate by Account Executive</h3>
          <div className="space-y-3 text-xs">
            {salesRepWinRates.map(rep => (
              <div key={rep.rep} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900">{rep.rep}</span>
                  <span className="text-agit-magenta font-mono">{rep.winRate}% Win Rate</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-agit-magenta rounded-full" style={{ width: `${rep.winRate}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Won: {rep.won} deals</span>
                  <span>Lost: {rep.lost} deals</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
