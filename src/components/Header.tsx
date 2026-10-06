import React from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  ChevronDown, 
  Building2, 
  ShieldCheck, 
  User, 
  Sparkles,
  HelpCircle,
  Briefcase
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAddPipeline: () => void;
  onOpenAddActivity: () => void;
  activeViewTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAddPipeline,
  onOpenAddActivity,
  activeViewTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section: Branding & Page Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* AGIT Modernized Badge */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-agit-magenta via-agit-magenta-hover to-agit-navy text-white font-bold text-lg shadow-sm">
              AG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">SalesStream</span>
                <span className="px-2 py-0.5 text-xs font-bold text-agit-magenta bg-agit-magenta-light border border-agit-magenta-border rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-agit-magenta" /> NEXT
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>Vendor:</span>
                <span className="text-slate-700 font-semibold flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-agit-magenta" /> PT Astra Graphia Information Technology (AGIT)
                </span>
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {/* Current Page Context */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">{activeViewTitle}</span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-all text-left shadow-inner group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-agit-magenta transition-colors" />
              <span>Search pipelines, customers, contacts...</span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
              ⌘K / Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Section: Actions & User Info */}
        <div className="flex items-center gap-3">
          {/* Quick Add Activity */}
          <button
            onClick={onOpenAddActivity}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            title="Log Sales Activity"
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-600" />
            <span>+ Activity</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenAddPipeline}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-agit-magenta hover:bg-agit-magenta-hover active:bg-agit-magenta-dark rounded-lg shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pipeline</span>
          </button>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-agit-orange pulse-badge"></span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs ring-2 ring-agit-magenta/20">
              BS
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">Budi Santoso</div>
              <div className="text-[11px] text-slate-500 font-medium">Sr. Sales Manager — Enterprise Division</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </div>
        </div>
      </div>
    </header>
  );
};
