import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Search, 
  Plus, 
  ExternalLink, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Layers, 
  Briefcase,
  X
} from 'lucide-react';
import { Customer, CustomerContact } from '../types';

interface CustomerViewProps {
  customers: Customer[];
}

export const CustomerView: React.FC<CustomerViewProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer Database</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage enterprise accounts, key decision-makers, and active portfolio value.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-agit-magenta hover:bg-agit-magenta-hover rounded-xl shadow-xs transition-all">
          <Plus className="w-4 h-4" /> Add New Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, code, or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-agit-magenta/20 focus:border-agit-magenta font-medium"
          />
        </div>
      </div>

      {/* Customer List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Customer Name & Code</th>
                <th className="p-3.5">Customer Type</th>
                <th className="p-3.5">Industry</th>
                <th className="p-3.5">Working Area</th>
                <th className="p-3.5">Group</th>
                <th className="p-3.5 text-center">Active Deals</th>
                <th className="p-3.5 text-right">Total Pipeline Value</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr 
                  key={c.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedCustomer(c)}
                >
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <span className="text-[10px] font-mono font-semibold text-agit-magenta">{c.code}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-blue-100 text-blue-800">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">{c.industry}</td>
                  <td className="p-3.5 text-slate-600">{c.workingArea}</td>
                  <td className="p-3.5 text-slate-600 font-medium">{c.group}</td>
                  <td className="p-3.5 text-center font-extrabold text-slate-900">{c.activePipelinesCount}</td>
                  <td className="p-3.5 text-right font-mono font-extrabold text-slate-900">
                    Rp {(c.totalPipelineValue / 1e9).toFixed(2)} B
                  </td>
                  <td className="p-3.5 text-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedCustomer(c); }}
                      className="px-3 py-1 text-xs font-semibold text-agit-magenta bg-agit-magenta-light border border-agit-magenta-border rounded-lg hover:bg-agit-magenta hover:text-white transition-colors"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-agit-magenta" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedCustomer.name}</h2>
                  <p className="text-xs text-slate-500 font-mono">{selectedCustomer.code} • {selectedCustomer.industry}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block">Working Area:</span>
                  <span className="font-bold text-slate-800">{selectedCustomer.workingArea}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Website:</span>
                  <span className="font-bold text-blue-600 flex items-center gap-1">
                    {selectedCustomer.website} <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-semibold block">Campus / Office Address:</span>
                  <span className="font-medium text-slate-800">{selectedCustomer.address}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3">Key Stakeholders & Contacts</h3>
                <div className="space-y-3">
                  {selectedCustomer.contacts.map(con => (
                    <div key={con.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{con.name}</span>
                        {con.isKeyDecisionMaker && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-100 text-purple-800">
                            Key Decision Maker
                          </span>
                        )}
                      </div>
                      <div className="text-slate-700 font-medium">{con.title} — {con.department}</div>
                      <div className="text-slate-500 text-[11px] flex gap-4">
                        <span>Email: {con.email}</span>
                        <span>Phone: {con.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
