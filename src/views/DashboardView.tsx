import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Percent, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Briefcase, 
  ArrowUpRight, 
  Layers, 
  PieChart as PieIcon,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line, 
  PieChart as RechartsPie, 
  Pie, 
  Cell, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Pipeline, SalesActivity, DashboardMetrics } from '../types';

interface DashboardViewProps {
  metrics: DashboardMetrics;
  pipelines: Pipeline[];
  activities: SalesActivity[];
  onSelectPipeline: (id: string) => void;
  onNavigateToPipelines: () => void;
  onNavigateToActivities: () => void;
}

const PORTFOLIO_COLORS: Record<string, string> = {
  'Smart Campus & IoT': '#9E1B5D',
  'Cloud & Infrastructure': '#3B82F6',
  'Application Modernization': '#10B981',
  'Managed Services': '#6366F1',
  'Cyber Security': '#F59E0B',
  'Data Analytics & AI': '#EC4899',
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  pipelines,
  activities,
  onSelectPipeline,
  onNavigateToPipelines,
  onNavigateToActivities
}) => {
  // Format currency helper (IDR Billions)
  const formatBillion = (val: number) => `Rp ${(val / 1e9).toFixed(1)}B`;
  const formatMillion = (val: number) => `Rp ${(val / 1e6).toFixed(0)}M`;

  // Pipeline Stage Distribution Data
  const stageCounts: Record<string, { count: number; value: number }> = {
    Opportunity: { count: 0, value: 0 },
    Qualification: { count: 0, value: 0 },
    Proposal: { count: 0, value: 0 },
    Negotiation: { count: 0, value: 0 },
    Closing: { count: 0, value: 0 },
    Won: { count: 0, value: 0 },
    Lost: { count: 0, value: 0 },
  };

  pipelines.forEach(p => {
    if (stageCounts[p.stage]) {
      stageCounts[p.stage].count += 1;
      stageCounts[p.stage].value += p.projectValue;
    }
  });

  const funnelData = [
    { stage: 'Opportunity', count: stageCounts.Opportunity.count, value: stageCounts.Opportunity.value / 1e9, fill: '#3B82F6' },
    { stage: 'Qualification', count: stageCounts.Qualification.count, value: stageCounts.Qualification.value / 1e9, fill: '#6366F1' },
    { stage: 'Proposal', count: stageCounts.Proposal.count, value: stageCounts.Proposal.value / 1e9, fill: '#8B5CF6' },
    { stage: 'Negotiation', count: stageCounts.Negotiation.count, value: stageCounts.Negotiation.value / 1e9, fill: '#F59E0B' },
    { stage: 'Closing', count: stageCounts.Closing.count, value: stageCounts.Closing.value / 1e9, fill: '#10B981' },
    { stage: 'Won', count: stageCounts.Won.count, value: stageCounts.Won.value / 1e9, fill: '#059669' },
  ];

  // Revenue Forecast Monthly Data
  const monthlyRevenueData = [
    { month: 'Jan', contract: 4.2, revenue: 3.5, gp: 1.1 },
    { month: 'Feb', contract: 5.8, revenue: 4.2, gp: 1.3 },
    { month: 'Mar', contract: 8.5, revenue: 6.0, gp: 1.8 },
    { month: 'Apr', contract: 6.2, revenue: 5.5, gp: 1.6 },
    { month: 'May', contract: 9.0, revenue: 7.2, gp: 2.1 },
    { month: 'Jun', contract: 11.5, revenue: 8.8, gp: 2.6 },
    { month: 'Jul', contract: 7.0, revenue: 6.5, gp: 1.9 },
    { month: 'Aug', contract: 9.8, revenue: 9.8, gp: 2.45 },
    { month: 'Sep', contract: 10.2, revenue: 8.0, gp: 2.3 },
    { month: 'Oct', contract: 12.5, revenue: 9.5, gp: 2.8 },
    { month: 'Nov', contract: 14.0, revenue: 11.0, gp: 3.2 },
    { month: 'Dec', contract: 15.5, revenue: 12.8, gp: 3.8 },
  ];

  // Pipeline by Portfolio Data
  const portfolioMap: Record<string, number> = {};
  pipelines.forEach(p => {
    portfolioMap[p.portfolio] = (portfolioMap[p.portfolio] || 0) + p.projectValue;
  });

  const portfolioChartData = Object.keys(portfolioMap).map(key => ({
    name: key,
    value: portfolioMap[key] / 1e9,
    color: PORTFOLIO_COLORS[key] || '#9E1B5D'
  }));

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Page Title & Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-agit-navy to-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">Executive Sales Dashboard</h1>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-agit-magenta/30 border border-agit-magenta-border text-agit-magenta-light">
              FY 2026 Overview
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Real-time sales pipeline performance, revenue plan forecasting, win/loss analytics, and key customer engagement metrics across AGIT enterprise accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToPipelines}
            className="px-4 py-2 text-xs font-semibold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Manage All Pipelines</span>
          </button>
        </div>
      </div>

      {/* TOP 6 EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Pipeline */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Pipeline</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            {formatBillion(metrics.totalPipeline)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% vs Q3</span>
          </div>
        </div>

        {/* Contract Value */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Contract Value</span>
            <div className="p-1.5 bg-agit-magenta-light text-agit-magenta rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            {formatBillion(metrics.contractValue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.5% target achievement</span>
          </div>
        </div>

        {/* Revenue Plan */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Revenue Plan</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            {formatBillion(metrics.revenuePlan)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mt-1">
            <span>Forecasted YTD</span>
          </div>
        </div>

        {/* Gross Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gross Profit (GP)</span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-emerald-700 font-mono">
            {formatBillion(metrics.grossProfit)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <span>Margin: ~30.0%</span>
          </div>
        </div>

        {/* Weighted Pipeline */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Weighted Pipeline</span>
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            {formatBillion(metrics.weightedPipeline)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mt-1">
            <span>Probability factored</span>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Win Rate</span>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-extrabold text-slate-900 font-mono">
            {metrics.winRate}%
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+5.2% vs industry benchmark</span>
          </div>
        </div>
      </div>

      {/* SECTION 1 & 2: PIPELINE OVERVIEW & SALES FUNNEL + REVENUE FORECAST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Funnel Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sales Funnel Stage Breakdown</h3>
                <p className="text-xs text-slate-500">Pipeline progression across active opportunity stages</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                {pipelines.length} Active Deals
              </span>
            </div>

            {/* Visual Funnel Stage Bars */}
            <div className="space-y-3 my-2">
              {funnelData.map((item) => (
                <div key={item.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }}></span>
                      {item.stage}
                    </span>
                    <span className="text-slate-900 font-mono font-bold">
                      {item.count} deals • Rp {item.value.toFixed(1)}B
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.max(10, (item.value / (metrics.totalPipeline / 1e9)) * 100)}%`,
                        backgroundColor: item.fill 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Value: <strong className="text-slate-800">{formatBillion(metrics.totalPipeline)}</strong></span>
            <button onClick={onNavigateToPipelines} className="text-agit-magenta font-semibold hover:underline flex items-center gap-1">
              View Stage Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Revenue Forecast Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Forecast (Monthly 2026)</h3>
              <p className="text-xs text-slate-500">Contract vs Forecasted Revenue vs Gross Profit (IDR Billions)</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-agit-magenta"></span> Contract</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500"></span> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500"></span> GP</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(val: number) => [`Rp ${val} B`, '']}
                  contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="contract" fill="#9E1B5D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gp" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 3 & 4: PIPELINE BY PORTFOLIO & WIN VS LOSS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pipeline by Portfolio (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pipeline Distribution by Portfolio</h3>
              <p className="text-xs text-slate-500">Contract value across AGIT solution practice areas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={portfolioChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {portfolioChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => [`Rp ${val.toFixed(1)} B`, 'Value']} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs">
              {portfolioChartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-slate-700 truncate max-w-[140px]">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">Rp {item.value.toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Win vs Loss Summary Card (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Win vs Loss Performance Analysis</h3>
                <p className="text-xs text-slate-500">Executive win rate metrics & deal outcome breakdown</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
                Win Rate: {metrics.winRate}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Won Value</span>
                <div className="text-xl font-extrabold text-emerald-900 font-mono mt-1">Rp 9.8 B</div>
                <div className="text-xs text-emerald-700 mt-0.5">1 Opportunity Won (100%)</div>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="text-[11px] font-bold text-rose-700 uppercase">Lost Value</span>
                <div className="text-xl font-extrabold text-rose-900 font-mono mt-1">Rp 3.2 B</div>
                <div className="text-xs text-rose-700 mt-0.5">1 Opportunity Lost</div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-1">Primary Win/Loss Driver Analysis:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                • <strong>Wins:</strong> Strong AGIT Practice synergy, pre-integrated IoT platform, robust enterprise cloud SLA.<br />
                • <strong>Losses:</strong> Niche local hardware pricing constraint on standard RFID campus tags.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-right">
            <button onClick={onNavigateToPipelines} className="text-xs font-semibold text-agit-magenta hover:underline">
              View Detailed Win/Loss Dashboard →
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5 & 6: UPCOMING ACTIVITIES & RECENT UPDATES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upcoming Activities Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Upcoming Sales Activities</h3>
              <p className="text-xs text-slate-500">Planned client interactions & next action items</p>
            </div>
            <button onClick={onNavigateToActivities} className="text-xs font-semibold text-agit-magenta hover:underline">
              View All Activities
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Pipeline</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Sales Person</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activities.slice(0, 5).map(act => (
                  <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-800">{act.date}</td>
                    <td className="p-3 font-medium text-slate-700">{act.customerName}</td>
                    <td className="p-3 text-slate-600 truncate max-w-[150px]">{act.pipelineName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {act.type}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{act.salesPerson}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        act.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Pipeline Updates (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Pipeline Updates</h3>
              <p className="text-xs text-slate-500">Live opportunity movements across enterprise accounts</p>
            </div>
          </div>

          <div className="space-y-3">
            {pipelines.slice(0, 4).map(p => (
              <div 
                key={p.id}
                onClick={() => onSelectPipeline(p.id)}
                className="p-3 rounded-xl border border-slate-100 hover:border-agit-magenta-border hover:bg-agit-magenta-light/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-agit-magenta">{p.id}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                      {p.stage}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    Rp {(p.projectValue / 1e9).toFixed(1)}B
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-800 mt-1.5 group-hover:text-agit-magenta transition-colors line-clamp-1">
                  {p.projectName}
                </div>

                <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{p.customerName}</span>
                  <span className="text-slate-400">Close: {p.expectedCloseDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
