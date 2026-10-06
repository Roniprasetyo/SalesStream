import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  History, 
  CheckCircle2, 
  FileText,
  User,
  Building
} from 'lucide-react';
import { SalesActivity, ActivityType } from '../types';

interface ActivityViewProps {
  activities: SalesActivity[];
  onOpenAddActivity: () => void;
  subMode?: 'all' | 'history' | 'plan';
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  activities,
  onOpenAddActivity,
  subMode = 'all'
}) => {
  const [activeTab, setActiveTab] = useState<'table' | 'timeline'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filtered = activities.filter(act => {
    const matchesSearch = 
      act.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.salesPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'All' || act.type === typeFilter;
    
    if (subMode === 'history') return matchesSearch && matchesType && act.status === 'Completed';
    if (subMode === 'plan') return matchesSearch && matchesType && act.status === 'Planned';

    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {subMode === 'history' ? 'Sales Activity History' : subMode === 'plan' ? 'Sales Activity Plan' : 'Sales Activity Management'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Track client visits, phone calls, technical presentations, and commercial follow-ups.
          </p>
        </div>

        <button
          onClick={onOpenAddActivity}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-agit-orange hover:bg-agit-orange-hover rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" /> Log Sales Activity
        </button>
      </div>

      {/* Filter & View Switch Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search activity by customer, rep, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Activity Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
          >
            <option value="All">All Types</option>
            <option value="Visit">Visit</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Desk Work">Desk Work</option>
            <option value="Correspondence">Correspondence</option>
          </select>
        </div>
      </div>

      {/* TABLE VIEW */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Pipeline</th>
                <th className="p-3.5">Contact Person</th>
                <th className="p-3.5">Sales Person</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Description & Next Action</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(act => (
                <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-800">{act.date}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {act.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">{act.category}</td>
                  <td className="p-3.5 text-slate-700 font-medium">{act.customerName}</td>
                  <td className="p-3.5 text-slate-600 truncate max-w-[140px]">{act.pipelineName || '-'}</td>
                  <td className="p-3.5 text-slate-700">{act.contactPerson}</td>
                  <td className="p-3.5 font-semibold text-agit-magenta">{act.salesPerson}</td>
                  <td className="p-3.5 text-slate-600">{act.durationMinutes} min</td>
                  <td className="p-3.5 max-w-[260px]">
                    <p className="text-slate-800 line-clamp-1">{act.description}</p>
                    {act.nextAction && (
                      <span className="text-[11px] text-agit-magenta font-semibold block mt-0.5">
                        Next: {act.nextAction}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
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
    </div>
  );
};
