import React, { useState } from 'react';
import { X, Briefcase, Calendar, Clock, Save, User, Building } from 'lucide-react';
import { SalesActivity, ActivityType, ActivityCategory, Customer, Pipeline } from '../types';

interface QuickActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: SalesActivity) => void;
  customers: Customer[];
  pipelines: Pipeline[];
}

export const QuickActivityModal: React.FC<QuickActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customers,
  pipelines
}) => {
  const [type, setType] = useState<ActivityType>('Visit');
  const [category, setCategory] = useState<ActivityCategory>('Commercial Negotiation');
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [pipelineId, setPipelineId] = useState(pipelines[0]?.id || '');
  const [contactPerson, setContactPerson] = useState('Dr. Ir. H. Bambang Widjaja');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [description, setDescription] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [salesPerson, setSalesPerson] = useState('Dwi Prasetyo');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === customerId);
    const pipeline = pipelines.find(p => p.id === pipelineId);

    onSave({
      id: `ACT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type,
      category,
      customerId,
      customerName: customer?.name || 'PT Nusantara Enterprise Tbk',
      pipelineId,
      pipelineName: pipeline?.projectName || 'Smart Campus IoT Modernization',
      contactPerson,
      salesPerson,
      durationMinutes,
      description,
      nextAction,
      status: 'Completed'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-agit-orange/10 border border-agit-orange/20 rounded-xl">
              <Briefcase className="w-5 h-5 text-agit-orange" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Log Sales Activity</h2>
              <p className="text-xs text-slate-500 font-medium">Record client engagement & next action</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Activity Type Selection Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Activity Type *</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Visit', 'Phone Call', 'Desk Work', 'Correspondence'] as ActivityType[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    type === t
                      ? 'bg-agit-magenta text-white border-agit-magenta shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Customer & Pipeline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer</label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Related Pipeline</label>
              <select
                value={pipelineId}
                onChange={(e) => setPipelineId(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              >
                {pipelines.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.projectName.substring(0, 20)}...</option>
                ))}
              </select>
            </div>
          </div>

          {/* Activity Category & Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              >
                <option value="Initial Meeting">Initial Meeting</option>
                <option value="Requirement Gathering">Requirement Gathering</option>
                <option value="Technical Presentation">Technical Presentation</option>
                <option value="Proposal Defense">Proposal Defense</option>
                <option value="Commercial Negotiation">Commercial Negotiation</option>
                <option value="Contract Review">Contract Review</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>
          </div>

          {/* Duration & Sales Rep */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sales Person</label>
              <input
                type="text"
                value={salesPerson}
                onChange={(e) => setSalesPerson(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Activity Description *</label>
            <textarea
              rows={3}
              placeholder="Key topics discussed, client feedback, agreement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-medium"
              required
            />
          </div>

          {/* Next Action */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Next Action Items</label>
            <input
              type="text"
              placeholder="e.g. Deliver technical architecture doc by Friday"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-medium text-agit-magenta font-semibold"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-agit-orange hover:bg-agit-orange-hover rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Log Activity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
