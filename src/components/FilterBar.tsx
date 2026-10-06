import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { GlobalFilterState } from '../types';

interface FilterBarProps {
  filters: GlobalFilterState;
  onFilterChange: (field: keyof GlobalFilterState, value: string) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 shadow-2xs">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pr-2 border-r border-slate-200 shrink-0">
          <Filter className="w-3.5 h-3.5 text-agit-magenta" />
          <span>Global Filters:</span>
        </div>

        {/* Year */}
        <select
          value={filters.year}
          onChange={(e) => onFilterChange('year', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta"
        >
          <option value="All">Year: All</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>

        {/* Quarter */}
        <select
          value={filters.quarter}
          onChange={(e) => onFilterChange('quarter', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta"
        >
          <option value="All">Quarter: All</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>

        {/* Month */}
        <select
          value={filters.month}
          onChange={(e) => onFilterChange('month', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta hidden sm:block"
        >
          <option value="All">Month: All</option>
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
        </select>

        {/* Working Area */}
        <select
          value={filters.workingArea}
          onChange={(e) => onFilterChange('workingArea', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta"
        >
          <option value="All">Working Area: All</option>
          <option value="DKI Jakarta & Head Office">DKI Jakarta & Head Office</option>
          <option value="West Java (Bandung & Cikarang)">West Java (Bandung & Cikarang)</option>
          <option value="Central Java & DIY">Central Java & DIY</option>
          <option value="East Java (Surabaya)">East Java (Surabaya)</option>
          <option value="Sumatra & Outer Islands">Sumatra & Outer Islands</option>
        </select>

        {/* Sales Person */}
        <select
          value={filters.salesPerson}
          onChange={(e) => onFilterChange('salesPerson', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta hidden md:block"
        >
          <option value="All">Sales Person: All</option>
          <option value="Dwi Prasetyo">Dwi Prasetyo</option>
          <option value="Ratna Sari">Ratna Sari</option>
          <option value="Agus Setiawan">Agus Setiawan</option>
        </select>

        {/* Portfolio */}
        <select
          value={filters.portfolio}
          onChange={(e) => onFilterChange('portfolio', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta hidden lg:block"
        >
          <option value="All">Portfolio: All</option>
          <option value="Smart Campus & IoT">Smart Campus & IoT</option>
          <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
          <option value="Application Modernization">Application Modernization</option>
          <option value="Managed Services">Managed Services</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Data Analytics & AI">Data Analytics & AI</option>
        </select>

        {/* Stage */}
        <select
          value={filters.stage}
          onChange={(e) => onFilterChange('stage', e.target.value)}
          className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-agit-magenta"
        >
          <option value="All">Stage: All</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Qualification">Qualification</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closing">Closing</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        {/* Reset Action */}
        <button
          onClick={onResetFilters}
          className="ml-auto flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
