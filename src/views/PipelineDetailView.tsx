import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Building2, 
  Calendar, 
  Layers, 
  Users, 
  FileText, 
  MessageSquare, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  BarChart2, 
  Send, 
  ShieldCheck, 
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Pipeline, Stage, SolutionOfferingItem, SalesActivity, CommentItem } from '../types';

interface PipelineDetailViewProps {
  pipeline: Pipeline;
  onBack: () => void;
  onUpdatePipeline: (updated: Pipeline) => void;
}

export const PipelineDetailView: React.FC<PipelineDetailViewProps> = ({
  pipeline,
  onBack,
  onUpdatePipeline
}) => {
  const [activeTab, setActiveTab] = useState<
    'opportunity' | 'solution' | 'revenue' | 'competitors' | 'activities' | 'comments' | 'repository' | 'contacts'
  >('opportunity');

  // Comment input state
  const [newCommentText, setNewCommentText] = useState('');

  const STAGES_ORDER: Stage[] = ['Opportunity', 'Qualification', 'Proposal', 'Negotiation', 'Closing', 'Won'];

  const currentStageIndex = STAGES_ORDER.indexOf(pipeline.stage);

  // Auto calculate total value from solution offerings
  const calculatedTotalSolutionValue = pipeline.solutionOfferings.reduce((sum, item) => sum + item.totalValue, 0);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `COM-${Date.now()}`,
      author: 'Budi Santoso',
      avatar: 'BS',
      role: 'Sr. Sales Manager',
      timestamp: 'Just now',
      text: newCommentText
    };

    const updatedPipeline = {
      ...pipeline,
      comments: [newComment, ...pipeline.comments]
    };

    onUpdatePipeline(updatedPipeline);
    setNewCommentText('');
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-agit-magenta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Pipeline List
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
            {pipeline.status}
          </span>
        </div>
      </div>

      {/* TOP PIPELINE SUMMARY HEADER CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-agit-magenta-light text-agit-magenta border border-agit-magenta-border">
                {pipeline.id}
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-agit-orange" /> {pipeline.customerName}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {pipeline.projectName}
            </h1>
            <p className="text-xs text-slate-500 max-w-3xl">
              {pipeline.projectDescription}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-6 lg:justify-end">
            <div className="text-left lg:text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Project Value</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">
                Rp {(pipeline.projectValue / 1e9).toFixed(2)} Billion
              </span>
            </div>

            <div className="text-left lg:text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Probability</span>
              <span className="text-xl font-extrabold text-agit-magenta font-mono">
                {pipeline.probability}%
              </span>
            </div>

            <div className="text-left lg:text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Expected Close</span>
              <span className="text-sm font-bold text-slate-700 font-mono">
                {pipeline.expectedCloseDate}
              </span>
            </div>
          </div>
        </div>

        {/* HORIZONTAL SALES PROGRESS TRACKER */}
        <div>
          <div className="text-xs font-bold text-slate-600 mb-3 flex items-center justify-between">
            <span>Sales Lifecycle Stage Progress:</span>
            <span className="text-agit-magenta font-bold">Current Stage: {pipeline.stage}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {STAGES_ORDER.map((stg, index) => {
              const isPassed = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;

              return (
                <div
                  key={stg}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-agit-magenta text-white border-agit-magenta shadow-md ring-2 ring-agit-magenta/30'
                      : isPassed
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold mb-1">
                    {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {isCurrent && <Clock className="w-3.5 h-3.5 text-white animate-pulse" />}
                    <span>{stg}</span>
                  </div>
                  <span className={`text-[10px] font-medium block ${isCurrent ? 'text-white/80' : 'text-slate-500'}`}>
                    {index === 0 && '10% Win Prob'}
                    {index === 1 && '30% Win Prob'}
                    {index === 2 && '50% Win Prob'}
                    {index === 3 && '80% Win Prob'}
                    {index === 4 && '90% Win Prob'}
                    {index === 5 && '100% Won'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAILED WORKSPACE TABS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 overflow-x-auto text-xs font-semibold text-slate-600">
          {[
            { id: 'opportunity', label: '01 Opportunity Info' },
            { id: 'solution', label: `02 Solution Offering (${pipeline.solutionOfferings.length})` },
            { id: 'revenue', label: '03 Revenue Plan' },
            { id: 'competitors', label: `04 Competitor (${pipeline.competitors.length})` },
            { id: 'activities', label: `05 Activity (${pipeline.activities.length})` },
            { id: 'comments', label: `06 Comment (${pipeline.comments.length})` },
            { id: 'repository', label: `07 Repository (${pipeline.repository.length})` },
            { id: 'contacts', label: `08 Contact (${pipeline.contacts.length})` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-3 shrink-0 border-b-2 transition-all ${
                activeTab === t.id
                  ? 'border-agit-magenta text-agit-magenta font-bold bg-white'
                  : 'border-transparent hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6">
          
          {/* TAB 01: OPPORTUNITY INFORMATION */}
          {activeTab === 'opportunity' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">Customer & Ownership</h3>
                <div>
                  <span className="text-slate-400 block font-semibold">Customer Name</span>
                  <span className="font-bold text-slate-800 text-sm">{pipeline.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Working Area</span>
                  <span className="font-medium text-slate-800">{pipeline.workingArea}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Sales Executive</span>
                  <span className="font-bold text-agit-magenta">{pipeline.salesPerson}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Sales Team</span>
                  <span className="font-medium text-slate-800">{pipeline.salesTeam}</span>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">Project Classification</h3>
                <div>
                  <span className="text-slate-400 block font-semibold">Portfolio Practice</span>
                  <span className="font-bold text-slate-800">{pipeline.portfolio}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Opportunity Type</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">{pipeline.opportunityType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Start Date</span>
                  <span className="font-medium text-slate-800">{pipeline.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Expected Close Date</span>
                  <span className="font-medium text-slate-800">{pipeline.expectedCloseDate}</span>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">Commercial Value</h3>
                <div>
                  <span className="text-slate-400 block font-semibold">Total Project Value</span>
                  <span className="font-mono font-extrabold text-slate-900 text-base">
                    Rp {(pipeline.projectValue).toLocaleString('id-ID')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Probability Factor</span>
                  <span className="font-bold text-slate-800">{pipeline.probability}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Weighted Revenue Forecast</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    Rp {(pipeline.weightedValue).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 02: SOLUTION OFFERING (SCREEN 5) */}
          {activeTab === 'solution' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Solution Offering Breakdown</h3>
                  <p className="text-xs text-slate-500">Products, services, software licenses, and partner components</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-lg flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Solution Item
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Portfolio</th>
                      <th className="p-3">Product / Service Name</th>
                      <th className="p-3">Partner Vendor</th>
                      <th className="p-3 text-right">Selling Price (IDR)</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Total Value (IDR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pipeline.solutionOfferings.map(sol => (
                      <tr key={sol.id} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-600 font-medium">{sol.portfolio}</td>
                        <td className="p-3 font-bold text-slate-900">{sol.productName}</td>
                        <td className="p-3 text-slate-700">
                          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px] font-semibold">
                            {sol.partner}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono text-slate-700">
                          Rp {sol.sellingPrice.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-900">{sol.quantity}</td>
                        <td className="p-3 text-right font-mono font-extrabold text-slate-900">
                          Rp {sol.totalValue.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Automatic Sum: Total Project Value</span>
                <span className="text-base font-extrabold text-agit-magenta font-mono">
                  Rp {calculatedTotalSolutionValue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}

          {/* TAB 03: REVENUE PLAN (SCREEN 6) */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Revenue Plan & Financial Forecast Matrix</h3>
                  <p className="text-xs text-slate-500">Monthly contract, revenue recognition, and Gross Profit distribution</p>
                </div>
              </div>

              {/* Monthly Revenue Matrix Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Period</th>
                      <th className="p-3 text-right">Contract Value (IDR)</th>
                      <th className="p-3 text-right">Forecasted Revenue (IDR)</th>
                      <th className="p-3 text-right">Gross Profit (GP)</th>
                      <th className="p-3 text-center">Prob. %</th>
                      <th className="p-3 text-right">Weighted Revenue (IDR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pipeline.revenuePlans.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-400 italic">
                          No specific revenue periods configured yet. Standard quarterly forecast applies.
                        </td>
                      </tr>
                    ) : (
                      pipeline.revenuePlans.map((rev, i) => (
                        <tr key={i} className="hover:bg-slate-50 font-medium">
                          <td className="p-3 font-bold text-slate-800">{rev.period} ({rev.month})</td>
                          <td className="p-3 text-right font-mono">Rp {rev.contract.toLocaleString('id-ID')}</td>
                          <td className="p-3 text-right font-mono font-bold text-blue-700">Rp {rev.revenue.toLocaleString('id-ID')}</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-700">Rp {rev.gp.toLocaleString('id-ID')}</td>
                          <td className="p-3 text-center font-bold">{rev.probability}%</td>
                          <td className="p-3 text-right font-mono font-extrabold text-slate-900">
                            Rp {rev.weightedRevenue.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 04: COMPETITOR */}
          {activeTab === 'competitors' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Competitor Analysis & Defense Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pipeline.competitors.map(comp => (
                  <div key={comp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{comp.name}</h4>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        comp.threatLevel === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Threat: {comp.threatLevel}
                      </span>
                    </div>
                    <div>
                      <strong className="text-slate-700">Competitor Strength:</strong>
                      <p className="text-slate-600">{comp.strengths}</p>
                    </div>
                    <div>
                      <strong className="text-slate-700">Competitor Weakness:</strong>
                      <p className="text-slate-600">{comp.weaknesses}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <strong className="text-agit-magenta">Our Winning Strategy:</strong>
                      <p className="text-slate-800 font-semibold">{comp.ourStrategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 05: ACTIVITIES */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Sales Activity Timeline</h3>
              <div className="space-y-3">
                {pipeline.activities.map(act => (
                  <div key={act.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start gap-4">
                    <div className="p-2 bg-agit-magenta-light text-agit-magenta rounded-lg font-bold text-center shrink-0 w-16">
                      <div className="text-[10px] text-slate-500 uppercase">Oct</div>
                      <div className="text-base">{act.date.split('-')[2]}</div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{act.category} ({act.type})</span>
                        <span className="text-slate-500">Rep: {act.salesPerson}</span>
                      </div>
                      <p className="text-slate-700">{act.description}</p>
                      <div className="text-[11px] text-agit-magenta font-semibold">
                        Next Action: {act.nextAction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 06: COMMENTS */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Internal Sales Team Discussions</h3>
              
              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a team note or commercial update..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-agit-magenta/20"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-xl flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </form>

              <div className="space-y-3">
                {pipeline.comments.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{c.author} ({c.role})</span>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 07: REPOSITORY */}
          {activeTab === 'repository' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Document Repository</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pipeline.repository.map(doc => (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-agit-magenta" />
                      <div>
                        <span className="font-bold text-slate-800 block">{doc.fileName}</span>
                        <span className="text-[10px] text-slate-500">{doc.category} • {doc.fileSize}</span>
                      </div>
                    </div>
                    <button className="p-1.5 text-slate-500 hover:text-agit-magenta">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 08: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Key Client Stakeholders</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pipeline.contacts.map(con => (
                  <div key={con.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{con.name}</h4>
                      {con.isKeyDecisionMaker && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">
                          Decision Maker
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 font-semibold">{con.title}</p>
                    <p className="text-slate-500">{con.department}</p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      Email: {con.email} • Phone: {con.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
