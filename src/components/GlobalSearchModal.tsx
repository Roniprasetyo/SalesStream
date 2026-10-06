import React, { useState, useEffect } from 'react';
import { Search, X, Layers, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Pipeline, Customer, SalesActivity } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pipelines: Pipeline[];
  customers: Customer[];
  activities: SalesActivity[];
  onSelectPipeline: (id: string) => void;
  onSelectCustomer: (id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  pipelines,
  customers,
  onSelectPipeline,
  onSelectCustomer
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPipelines = pipelines.filter(p => 
    p.projectName.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toLowerCase().includes(query.toLowerCase()) ||
    p.customerName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-agit-magenta shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search pipelines by ID, name, customer or portfolio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Pipelines Section */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-agit-magenta" />
              <span>Pipelines ({filteredPipelines.length})</span>
            </div>
            {filteredPipelines.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-1">No matching pipelines</p>
            ) : (
              <div className="space-y-1.5">
                {filteredPipelines.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPipeline(p.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-agit-magenta-border hover:bg-agit-magenta-light/40 transition-all text-left group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-agit-magenta">{p.id}</span>
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-agit-magenta transition-colors">{p.projectName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {p.customerName} • Stage: <span className="font-medium text-slate-700">{p.stage}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Rp {(p.projectValue / 1e9).toFixed(2)} B
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-agit-magenta group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Customers Section */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-agit-orange" />
              <span>Customers ({filteredCustomers.length})</span>
            </div>
            {filteredCustomers.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-1">No matching customers</p>
            ) : (
              <div className="space-y-1.5">
                {filteredCustomers.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCustomer(c.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-left group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.industry} • {c.workingArea}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        {c.activePipelinesCount} Active Pipelines
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 text-right text-[11px] text-slate-500 font-medium">
          Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};
