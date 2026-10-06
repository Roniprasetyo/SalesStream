import React, { useState } from 'react';
import { X, Save, FileCheck, Layers, Plus, Trash2, Calendar, User, DollarSign, Building } from 'lucide-react';
import { Pipeline, Stage, Portfolio, WorkingArea, Customer } from '../types';

interface PipelineFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pipeline: Partial<Pipeline>) => void;
  customers: Customer[];
  initialData?: Pipeline | null;
}

export const PipelineFormModal: React.FC<PipelineFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customers,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState<'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08'>('01');

  // Form State
  const [customerName, setCustomerName] = useState(initialData?.customerName || customers[0]?.name || '');
  const [projectName, setProjectName] = useState(initialData?.projectName || '');
  const [projectDescription, setProjectDescription] = useState(initialData?.projectDescription || '');
  const [portfolio, setPortfolio] = useState<Portfolio>(initialData?.portfolio || 'Cloud & Infrastructure');
  const [workingArea, setWorkingArea] = useState<WorkingArea>(initialData?.workingArea || 'West Java (Bandung & Cikarang)');
  const [opportunityType, setOpportunityType] = useState<Pipeline['opportunityType']>(initialData?.opportunityType || 'New Logo');
  const [salesPerson, setSalesPerson] = useState(initialData?.salesPerson || 'Dwi Prasetyo');
  const [salesTeam, setSalesTeam] = useState(initialData?.salesTeam || 'Enterprise Education Division');
  const [projectValue, setProjectValue] = useState<number>(initialData?.projectValue || 5000000000);
  const [probability, setProbability] = useState<number>(initialData?.probability || 60);
  const [stage, setStage] = useState<Stage>(initialData?.stage || 'Qualification');
  const [startDate, setStartDate] = useState(initialData?.startDate || '2026-10-01');
  const [expectedCloseDate, setExpectedCloseDate] = useState(initialData?.expectedCloseDate || '2026-12-31');

  // Solution Offering Sub-state
  const [solutions, setSolutions] = useState(initialData?.solutionOfferings || [
    {
      id: 'SOL-NEW-1',
      portfolio: 'Cloud & Infrastructure' as Portfolio,
      productName: 'Managed Hybrid Cloud Setup & Security',
      partner: 'AWS / Cisco',
      sellingPrice: 5000000000,
      quantity: 1,
      totalValue: 5000000000
    }
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedTotal = solutions.reduce((acc, curr) => acc + curr.totalValue, 0);

    onSave({
      id: initialData?.id || `PL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      projectName,
      projectDescription,
      portfolio,
      workingArea,
      opportunityType,
      salesPerson,
      salesTeam,
      projectValue: calculatedTotal > 0 ? calculatedTotal : projectValue,
      probability,
      weightedValue: (calculatedTotal > 0 ? calculatedTotal : projectValue) * (probability / 100),
      stage,
      startDate,
      expectedCloseDate,
      status: 'Active',
      solutionOfferings: solutions,
      revenuePlans: [],
      competitors: [],
      activities: [],
      comments: [],
      repository: [],
      contacts: []
    });
    onClose();
  };

  const handleAddSolution = () => {
    setSolutions([
      ...solutions,
      {
        id: `SOL-${Date.now()}`,
        portfolio: 'Cloud & Infrastructure',
        productName: 'New Hardware / License Item',
        partner: 'AGIT Partner',
        sellingPrice: 1000000000,
        quantity: 1,
        totalValue: 1000000000
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-agit-magenta-light border border-agit-magenta-border rounded-xl">
              <Layers className="w-5 h-5 text-agit-magenta" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {initialData ? `Edit Pipeline — ${initialData.id}` : 'Add New Sales Pipeline'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">SalesStream Next Modernization Wizard</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Steps / Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 overflow-x-auto text-xs font-semibold text-slate-600">
          {[
            { id: '01', label: '01 Opportunity Info' },
            { id: '02', label: '02 Solution Offering' },
            { id: '03', label: '03 Revenue Plan' },
            { id: '04', label: '04 Competitor' },
            { id: '05', label: '05 Activity' },
            { id: '06', label: '06 Comment' },
            { id: '07', label: '07 Repository' },
            { id: '08', label: '08 Contact' },
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

        {/* Tab Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {activeTab === '01' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Customer */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Customer Name *</label>
                <select
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                  required
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.code})</option>
                  ))}
                </select>
              </div>

              {/* Working Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Working Area *</label>
                <select
                  value={workingArea}
                  onChange={(e) => setWorkingArea(e.target.value as WorkingArea)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                >
                  <option value="DKI Jakarta & Head Office">DKI Jakarta & Head Office</option>
                  <option value="West Java (Bandung & Cikarang)">West Java (Bandung & Cikarang)</option>
                  <option value="Central Java & DIY">Central Java & DIY</option>
                  <option value="East Java (Surabaya)">East Java (Surabaya)</option>
                  <option value="Sumatra & Outer Islands">Sumatra & Outer Islands</option>
                </select>
              </div>

              {/* Project Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Smart Campus IoT Lab Modernization Phase 1"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                  required
                />
              </div>

              {/* Project Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of client requirements and key scope..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                />
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Portfolio Category</label>
                <select
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value as Portfolio)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                >
                  <option value="Smart Campus & IoT">Smart Campus & IoT</option>
                  <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                  <option value="Application Modernization">Application Modernization</option>
                  <option value="Managed Services">Managed Services</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Data Analytics & AI">Data Analytics & AI</option>
                </select>
              </div>

              {/* Opportunity Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Opportunity Type</label>
                <select
                  value={opportunityType}
                  onChange={(e) => setOpportunityType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                >
                  <option value="New Logo">New Logo</option>
                  <option value="Upsell / Expansion">Upsell / Expansion</option>
                  <option value="Renewal">Renewal</option>
                  <option value="Managed Contract">Managed Contract</option>
                </select>
              </div>

              {/* Sales Person */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Sales Person</label>
                <input
                  type="text"
                  value={salesPerson}
                  onChange={(e) => setSalesPerson(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                />
              </div>

              {/* Sales Team */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Sales Team</label>
                <input
                  type="text"
                  value={salesTeam}
                  onChange={(e) => setSalesTeam(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pipeline Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as Stage)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-bold text-agit-magenta"
                >
                  <option value="Opportunity">Opportunity (10%)</option>
                  <option value="Qualification">Qualification (30%)</option>
                  <option value="Proposal">Proposal (50%)</option>
                  <option value="Negotiation">Negotiation (80%)</option>
                  <option value="Closing">Closing (90%)</option>
                  <option value="Won">Won (100%)</option>
                  <option value="Lost">Lost (0%)</option>
                </select>
              </div>

              {/* Probability */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Probability (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={probability}
                  onChange={(e) => setProbability(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-semibold"
                />
              </div>

              {/* Dates */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Expected Close Date</label>
                <input
                  type="date"
                  value={expectedCloseDate}
                  onChange={(e) => setExpectedCloseDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
                />
              </div>
            </div>
          )}

          {activeTab === '02' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">Solution Offering Products / Services</h3>
                  <p className="text-[11px] text-slate-500">Total Project Value is automatically calculated from Solution Offering sum</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSolution}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Product / Service
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Portfolio</th>
                      <th className="p-3">Product / Solution Name</th>
                      <th className="p-3">Partner</th>
                      <th className="p-3">Selling Price (IDR)</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Total Value (IDR)</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {solutions.map((sol, index) => (
                      <tr key={sol.id} className="hover:bg-slate-50">
                        <td className="p-2">
                          <input
                            type="text"
                            value={sol.portfolio}
                            onChange={(e) => {
                              const updated = [...solutions];
                              updated[index].portfolio = e.target.value as Portfolio;
                              setSolutions(updated);
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={sol.productName}
                            onChange={(e) => {
                              const updated = [...solutions];
                              updated[index].productName = e.target.value;
                              setSolutions(updated);
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs font-medium"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={sol.partner}
                            onChange={(e) => {
                              const updated = [...solutions];
                              updated[index].partner = e.target.value;
                              setSolutions(updated);
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={sol.sellingPrice}
                            onChange={(e) => {
                              const updated = [...solutions];
                              updated[index].sellingPrice = Number(e.target.value);
                              updated[index].totalValue = updated[index].sellingPrice * updated[index].quantity;
                              setSolutions(updated);
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs font-mono"
                          />
                        </td>
                        <td className="p-2 w-16">
                          <input
                            type="number"
                            value={sol.quantity}
                            onChange={(e) => {
                              const updated = [...solutions];
                              updated[index].quantity = Number(e.target.value);
                              updated[index].totalValue = updated[index].sellingPrice * updated[index].quantity;
                              setSolutions(updated);
                            }}
                            className="w-full p-1 border border-slate-200 rounded text-xs font-bold"
                          />
                        </td>
                        <td className="p-2 font-mono font-bold text-slate-900">
                          Rp {(sol.totalValue).toLocaleString('id-ID')}
                        </td>
                        <td className="p-2 text-right">
                          <button
                            type="button"
                            onClick={() => setSolutions(solutions.filter(s => s.id !== sol.id))}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Calculated Total Project Value:</span>
                <span className="text-base font-extrabold text-agit-magenta font-mono">
                  Rp {solutions.reduce((a, b) => a + b.totalValue, 0).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}

          {activeTab !== '01' && activeTab !== '02' && (
            <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
              <FileCheck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-700 mb-1">Tab {activeTab} Configuration</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Additional detailed parameters (Revenue Matrix, Competitor Threat Analysis, Activity Log & Repository Docs) will be initialized automatically upon pipeline creation.
              </p>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
