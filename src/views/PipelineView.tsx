import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Archive, 
  LayoutList, 
  Kanban, 
  TrendingUp, 
  Calendar, 
  Building, 
  MoreVertical,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { Pipeline, Stage, Portfolio, WorkingArea } from '../types';

interface PipelineViewProps {
  pipelines: Pipeline[];
  onSelectPipeline: (id: string) => void;
  onOpenAddPipeline: () => void;
  onEditPipeline: (pipeline: Pipeline) => void;
  onArchivePipeline: (id: string) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  pipelines,
  onSelectPipeline,
  onOpenAddPipeline,
  onEditPipeline,
  onArchivePipeline
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [portfolioFilter, setPortfolioFilter] = useState<string>('All');

  // Filtered pipelines
  const filtered = pipelines.filter(p => {
    const matchesSearch = 
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === 'All' || p.stage === stageFilter;
    const matchesPortfolio = portfolioFilter === 'All' || p.portfolio === portfolioFilter;

    return matchesSearch && matchesStage && matchesPortfolio;
  });

  const getStageBadgeClass = (stage: Stage) => {
    switch (stage) {
      case 'Opportunity': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Qualification': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Proposal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Negotiation': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Closing': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Won': return 'bg-emerald-700 text-white border-emerald-800';
      case 'Lost': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const STAGES_KANBAN: Stage[] = ['Opportunity', 'Qualification', 'Proposal', 'Negotiation', 'Closing', 'Won'];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Sales Pipeline Management</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor opportunity lifecycles, weighted pipeline values, and close projections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutList className="w-4 h-4" /> Table
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-4 h-4" /> Kanban
            </button>
          </div>

          {/* Export Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-2xs">
              <Download className="w-4 h-4 text-slate-500" /> Export
            </button>
          </div>

          {/* Add Pipeline */}
          <button
            onClick={onOpenAddPipeline}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" /> Add Pipeline
          </button>
        </div>
      </div>

      {/* Local Search & Quick Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by Project Name, Customer, or Pipeline ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
          />
        </div>

        {/* Stage Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Stage:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
          >
            <option value="All">All Stages</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Qualification">Qualification</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closing">Closing</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Portfolio Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Portfolio:</span>
          <select
            value={portfolioFilter}
            onChange={(e) => setPortfolioFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
          >
            <option value="All">All Portfolios</option>
            <option value="Smart Campus & IoT">Smart Campus & IoT</option>
            <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
            <option value="Application Modernization">Application Modernization</option>
            <option value="Managed Services">Managed Services</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Analytics & AI">Data Analytics & AI</option>
          </select>
        </div>
      </div>

      {/* VIEW CONTENT: TABLE OR KANBAN */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Pipeline ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Project Name</th>
                  <th className="p-3.5">Portfolio</th>
                  <th className="p-3.5">Sales Rep</th>
                  <th className="p-3.5 text-right">Project Value (IDR)</th>
                  <th className="p-3.5">Prob. %</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Expected Close</th>
                  <th className="p-3.5">Last Activity</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-slate-400 italic">
                      No matching sales pipelines found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr 
                      key={p.id} 
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectPipeline(p.id)}
                    >
                      <td className="p-3.5 font-mono font-bold text-agit-magenta">
                        {p.id}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800 max-w-[160px] truncate">
                        {p.customerName}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 group-hover:text-agit-magenta transition-colors max-w-[240px] truncate">
                        {p.projectName}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 rounded border border-slate-200">
                          {p.portfolio}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium">
                        {p.salesPerson}
                      </td>
                      <td className="p-3.5 text-right font-mono font-extrabold text-slate-900">
                        Rp {(p.projectValue).toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 w-8">{p.probability}%</span>
                          <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                p.probability >= 80 ? 'bg-emerald-500' : p.probability >= 50 ? 'bg-amber-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${p.probability}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full border ${getStageBadgeClass(p.stage)}`}>
                          {p.stage}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 font-medium">
                        {p.expectedCloseDate}
                      </td>
                      <td className="p-3.5 text-slate-500 text-[11px] max-w-[140px] truncate">
                        {p.lastActivitySummary || 'No recent activity'}
                      </td>
                      <td className="p-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onSelectPipeline(p.id)}
                            className="p-1.5 text-slate-400 hover:text-agit-magenta hover:bg-agit-magenta-light rounded-lg transition-colors"
                            title="View Pipeline Workspace"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditPipeline(p)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Pipeline"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onArchivePipeline(p.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {pipelines.length} total pipelines</span>
            <span className="font-semibold text-slate-700">
              Total Filtered Pipeline: Rp {(filtered.reduce((acc, curr) => acc + curr.projectValue, 0) / 1e9).toFixed(2)} Billion
            </span>
          </div>
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STAGES_KANBAN.map(stg => {
            const stagePipelines = filtered.filter(p => p.stage === stg);
            const totalStageVal = stagePipelines.reduce((a, b) => a + b.projectValue, 0);

            return (
              <div key={stg} className="bg-slate-100 p-3 rounded-2xl border border-slate-200 min-w-[220px] flex flex-col h-[650px]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{stg}</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-white text-slate-700 border border-slate-200">
                      {stagePipelines.length}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-600">
                    Rp {(totalStageVal / 1e9).toFixed(1)}B
                  </span>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {stagePipelines.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onSelectPipeline(p.id)}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover hover:border-agit-magenta-border transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-agit-magenta">{p.id}</span>
                        <span className="font-bold text-slate-700">{p.probability}%</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-agit-magenta transition-colors line-clamp-2">
                        {p.projectName}
                      </h4>

                      <p className="text-[11px] text-slate-500 truncate">{p.customerName}</p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-mono font-extrabold text-slate-900">
                          Rp {(p.projectValue / 1e9).toFixed(1)}B
                        </span>
                        <span className="text-[10px] text-slate-400">{p.expectedCloseDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
