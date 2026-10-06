import React from 'react';
import { Search, Plus, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAddPipeline: () => void;
  onOpenAddActivity: () => void;
  activeViewTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAddPipeline,
  activeViewTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-2xs">
      <div className="flex items-center justify-between px-6 py-3">
        
        {/* Left: Official AGIT Logo & SalesStream Product Name */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Authentic AGIT Typography Logo ("ag" burgundy + "it" orange) */}
            <div className="flex items-baseline font-extrabold text-2xl tracking-tighter select-none">
              <span className="text-agit-burgundy font-serif font-black lowercase tracking-tighter">ag</span>
              <span className="text-agit-orange font-sans font-extrabold lowercase">it</span>
            </div>

            <div className="h-5 w-px bg-slate-200"></div>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800 text-base tracking-tight">SalesStream</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold text-agit-burgundy bg-agit-burgundy-light border border-agit-burgundy-border rounded">
                NEXT
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

          {/* Current Page Title */}
          <div className="hidden lg:block text-xs font-semibold text-slate-500">
            {activeViewTitle}
          </div>
        </div>

        {/* Center: Minimal Search Input */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg transition-colors text-left group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-agit-burgundy transition-colors" />
              <span className="font-medium">Search pipelines, customers, contacts...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Primary Action & Profile */}
        <div className="flex items-center gap-3">
          {/* Primary Action Button */}
          <button
            onClick={onOpenAddPipeline}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-agit-burgundy hover:bg-agit-burgundy-hover active:bg-agit-burgundy-dark rounded-lg shadow-2xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pipeline</span>
          </button>

          {/* Notification Icon */}
          <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-agit-orange"></span>
          </button>

          <div className="h-5 w-px bg-slate-200"></div>

          {/* User Profile */}
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-agit-burgundy text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              BS
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">Budi Santoso</div>
              <div className="text-[10px] text-slate-500 font-medium">Sales Manager</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </div>
        </div>
      </div>
    </header>
  );
};
