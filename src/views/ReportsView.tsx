import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Layers, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Filter
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Pipeline, SalesActivity } from '../types';

interface ReportsViewProps {
  pipelines: Pipeline[];
  activities: SalesActivity[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ pipelines, activities }) => {
  const [activeReportGroup, setActiveReportGroup] = useState<'pipeline' | 'activity'>('pipeline');
  const [selectedReport, setSelectedReport] = useState<string>('summary');

  const monthlyReportData = [
    { month: 'Jan', count: 4, value: 18.5 },
    { month: 'Feb', count: 6, value: 24.0 },
    { month: 'Mar', count: 8, value: 38.5 },
    { month: 'Apr', count: 5, value: 21.0 },
    { month: 'May', count: 7, value: 32.0 },
    { month: 'Jun', count: 9, value: 45.2 },
    { month: 'Jul', count: 6, value: 28.0 },
    { month: 'Aug', count: 10, value: 52.0 },
    { month: 'Sep', count: 8, value: 41.5 },
    { month: 'Oct', count: 12, value: 68.3 },
  ];

  const activityTypeData = [
    { name: 'Visit', count: 42, color: '#9E1B5D' },
    { name: 'Phone Call', count: 38, color: '#3B82F6' },
    { name: 'Desk Work', count: 24, color: '#10B981' },
    { name: 'Correspondence', count: 30, color: '#F59E0B' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Enterprise Reporting Center</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Standard executive reports for pipeline progression, portfolio monthly distribution, and sales activity allocation.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-2xs">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export Excel
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-2xs">
            <FileText className="w-4 h-4 text-rose-600" /> Export PDF
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-2xs">
            <Download className="w-4 h-4 text-blue-600" /> Export CSV
          </button>
        </div>
      </div>

      {/* Report Group Selector Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-card">
        <button
          onClick={() => { setActiveReportGroup('pipeline'); setSelectedReport('summary'); }}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportGroup === 'pipeline'
              ? 'bg-agit-magenta text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Pipeline Reports (5 Types)
        </button>
        <button
          onClick={() => { setActiveReportGroup('activity'); setSelectedReport('activity-type'); }}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportGroup === 'activity'
              ? 'bg-agit-magenta text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Sales Activity Reports (5 Types)
        </button>
      </div>

      {/* Specific Report Sub-tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {activeReportGroup === 'pipeline' ? (
          <>
            <button
              onClick={() => setSelectedReport('summary')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'summary' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              1. Pipeline Summary
            </button>
            <button
              onClick={() => setSelectedReport('month')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'month' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              2. Pipeline per Month
            </button>
            <button
              onClick={() => setSelectedReport('portfolio-summary')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'portfolio-summary' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              3. Pipeline Summary by Portfolio
            </button>
            <button
              onClick={() => setSelectedReport('portfolio-monthly')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'portfolio-monthly' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              4. Pipeline Monthly by Portfolio
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedReport('activity-type')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'activity-type' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              1. Activity by Type
            </button>
            <button
              onClick={() => setSelectedReport('activity-category')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'activity-category' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              2. Activity by Category
            </button>
            <button
              onClick={() => setSelectedReport('activity-time')}
              className={`px-3.5 py-2 rounded-xl border transition-all ${
                selectedReport === 'activity-time' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              3. Sales Time Spending
            </button>
          </>
        )}
      </div>

      {/* REPORT CONTENT CHART & MATRIX */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Report Visual Visualization: {selectedReport.replace('-', ' ')}
        </h3>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyReportData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip formatter={(val: number) => [`Rp ${val} B`, 'Pipeline Value']} />
              <Bar dataKey="value" fill="#9E1B5D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Data Matrix */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Period / Category</th>
                <th className="p-3 text-center">Deal Count</th>
                <th className="p-3 text-right">Total Pipeline Value (IDR)</th>
                <th className="p-3 text-right">% Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlyReportData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{row.month} 2026</td>
                  <td className="p-3 text-center font-semibold">{row.count} deals</td>
                  <td className="p-3 text-right font-mono font-extrabold text-slate-900">Rp {row.value.toFixed(1)} B</td>
                  <td className="p-3 text-right font-mono font-semibold text-slate-600">
                    {((row.value / 389.0) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
