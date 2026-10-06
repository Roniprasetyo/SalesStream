import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  BarChart3, 
  ShieldAlert, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  Calendar, 
  History, 
  CheckCircle2, 
  BookOpen, 
  PieChart, 
  Clock, 
  Sliders,
  Briefcase,
  FileText
} from 'lucide-react';

export type ViewTab = 
  | 'dashboard'
  | 'pipeline'
  | 'activity'
  | 'activity-history'
  | 'activity-plan'
  | 'customers'
  | 'contacts'
  | 'report-pipeline-summary'
  | 'report-pipeline-month'
  | 'report-pipeline-portfolio'
  | 'report-win-loss'
  | 'report-activity-type'
  | 'report-activity-category'
  | 'report-activity-time'
  | 'report-activity-history'
  | 'report-activity-plan'
  | 'admin';

interface SidebarProps {
  activeTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  pipelineCount: number;
  activityCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  pipelineCount,
  activityCount
}) => {
  const [salesOpen, setSalesOpen] = useState(true);
  const [customersOpen, setCustomersOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);

  const isActive = (tab: ViewTab) => activeTab === tab;

  return (
    <aside
      className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 border-r border-slate-800 ${
        collapsed ? 'w-16' : 'w-64'
      } shrink-0 h-full overflow-y-auto`}
    >
      {/* Sidebar Navigation Items */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        
        {/* Dashboard */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            isActive('dashboard')
              ? 'bg-agit-magenta text-white shadow-md'
              : 'hover:bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Executive Dashboard</span>}
        </button>

        {/* SALES SECTION */}
        <div className="pt-2">
          {!collapsed && (
            <button
              onClick={() => setSalesOpen(!salesOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-agit-magenta" />
                <span>Sales Management</span>
              </div>
              {salesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}

          {(salesOpen || collapsed) && (
            <div className="space-y-1 mt-1 pl-1">
              <button
                onClick={() => onSelectTab('pipeline')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('pipeline')
                    ? 'bg-slate-800 text-white border-l-4 border-agit-magenta font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Pipeline Management</span>}
                </div>
                {!collapsed && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {pipelineCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectTab('activity')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('activity')
                    ? 'bg-slate-800 text-white border-l-4 border-agit-magenta font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {!collapsed && <span>Sales Activity</span>}
                </div>
                {!collapsed && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activityCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onSelectTab('activity-history')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('activity-history')
                    ? 'bg-slate-800 text-white border-l-4 border-agit-magenta font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <History className="w-4 h-4 text-slate-400" />
                {!collapsed && <span>Activity History</span>}
              </button>

              <button
                onClick={() => onSelectTab('activity-plan')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('activity-plan')
                    ? 'bg-slate-800 text-white border-l-4 border-agit-magenta font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                {!collapsed && <span>Activity Plan</span>}
              </button>
            </div>
          )}
        </div>

        {/* CUSTOMERS SECTION */}
        <div className="pt-2">
          {!collapsed && (
            <button
              onClick={() => setCustomersOpen(!customersOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-agit-orange" />
                <span>Customers</span>
              </div>
              {customersOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}

          {(customersOpen || collapsed) && (
            <div className="space-y-1 mt-1 pl-1">
              <button
                onClick={() => onSelectTab('customers')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('customers')
                    ? 'bg-slate-800 text-white border-l-4 border-agit-orange font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                {!collapsed && <span>Customer Database</span>}
              </button>

              <button
                onClick={() => onSelectTab('contacts')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('contacts')
                    ? 'bg-slate-800 text-white border-l-4 border-agit-orange font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 text-slate-400" />
                {!collapsed && <span>Customer Contacts</span>}
              </button>
            </div>
          )}
        </div>

        {/* REPORTS SECTION */}
        <div className="pt-2">
          {!collapsed && (
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reporting Center</span>
              </div>
              {reportsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}

          {(reportsOpen || collapsed) && (
            <div className="space-y-1 mt-1 pl-1">
              <button
                onClick={() => onSelectTab('report-win-loss')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive('report-win-loss')
                    ? 'bg-slate-800 text-white border-l-4 border-emerald-500 font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <PieChart className="w-4 h-4 text-emerald-400" />
                {!collapsed && <span>Win & Loss Analysis</span>}
              </button>

              <button
                onClick={() => onSelectTab('report-pipeline-summary')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab.startsWith('report-') && activeTab !== 'report-win-loss'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-400" />
                {!collapsed && <span>All Pipeline & Activity Reports</span>}
              </button>
            </div>
          )}
        </div>

        {/* ADMINISTRATION */}
        <div className="pt-2">
          <button
            onClick={() => onSelectTab('admin')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              isActive('admin')
                ? 'bg-slate-800 text-white border-l-4 border-slate-400'
                : 'hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4 text-slate-400" />
            {!collapsed && <span>Administration</span>}
          </button>
        </div>
      </div>

      {/* Footer System Info */}
      {!collapsed && (
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Vendor: AGIT</span>
            <span className="font-mono text-[10px] text-slate-400">v2.4.0</span>
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            SalesStream Enterprise Modernization
          </div>
        </div>
      )}
    </aside>
  );
};
