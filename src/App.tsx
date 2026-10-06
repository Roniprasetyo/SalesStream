import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, ViewTab } from './components/Sidebar';
import { FilterBar } from './components/FilterBar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PipelineFormModal } from './components/PipelineFormModal';
import { QuickActivityModal } from './components/QuickActivityModal';

import { DashboardView } from './views/DashboardView';
import { PipelineView } from './views/PipelineView';
import { PipelineDetailView } from './views/PipelineDetailView';
import { ActivityView } from './views/ActivityView';
import { CustomerView } from './views/CustomerView';
import { ReportsView } from './views/ReportsView';
import { WinLossView } from './views/WinLossView';

import { 
  INITIAL_PIPELINES, 
  INITIAL_CUSTOMERS, 
  INITIAL_ACTIVITIES, 
  INITIAL_METRICS 
} from './data/mockData';

import { Pipeline, GlobalFilterState, Customer, SalesActivity } from './types';

export const App: React.FC = () => {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(null);

  // Core Datasets
  const [pipelines, setPipelines] = useState<Pipeline[]>(INITIAL_PIPELINES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [activities, setActivities] = useState<SalesActivity[]>(INITIAL_ACTIVITIES);

  // Global Filters
  const [filters, setFilters] = useState<GlobalFilterState>({
    year: '2026',
    quarter: 'All',
    month: 'All',
    workingArea: 'All',
    salesPerson: 'All',
    customer: 'All',
    portfolio: 'All',
    stage: 'All',
  });

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddPipelineOpen, setIsAddPipelineOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [pipelineToEdit, setPipelineToEdit] = useState<Pipeline | null>(null);

  // Filter handlers
  const handleFilterChange = (field: keyof GlobalFilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      year: 'All',
      quarter: 'All',
      month: 'All',
      workingArea: 'All',
      salesPerson: 'All',
      customer: 'All',
      portfolio: 'All',
      stage: 'All',
    });
  };

  // Pipeline Actions
  const handleSelectPipeline = (id: string) => {
    setSelectedPipelineId(id);
    setActiveTab('pipeline-detail' as any);
  };

  const handleSavePipeline = (partial: Partial<Pipeline>) => {
    if (pipelineToEdit) {
      setPipelines(prev => prev.map(p => p.id === pipelineToEdit.id ? { ...p, ...partial } as Pipeline : p));
      setPipelineToEdit(null);
    } else {
      const newPipeline = partial as Pipeline;
      setPipelines(prev => [newPipeline, ...prev]);
    }
  };

  const handleArchivePipeline = (id: string) => {
    setPipelines(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveActivity = (activity: SalesActivity) => {
    setActivities(prev => [activity, ...prev]);
  };

  // Active Title Helper
  const getActiveTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Executive Sales Dashboard';
      case 'pipeline': return 'Sales Pipeline Management';
      case 'activity': return 'Sales Activity Management';
      case 'activity-history': return 'Sales Activity History';
      case 'activity-plan': return 'Sales Activity Plan';
      case 'customers': return 'Customer Database';
      case 'contacts': return 'Customer Contacts';
      case 'report-win-loss': return 'Win & Loss Analysis';
      default: return 'SalesStream Next Workspace';
    }
  };

  const currentPipeline = pipelines.find(p => p.id === selectedPipelineId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-agit-magenta selection:text-white">
      {/* Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAddPipeline={() => { setPipelineToEdit(null); setIsAddPipelineOpen(true); }}
        onOpenAddActivity={() => setIsAddActivityOpen(true)}
        activeViewTitle={getActiveTitle()}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedPipelineId(null);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          pipelineCount={pipelines.length}
          activityCount={activities.length}
        />

        {/* Workspace Body */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Global Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* View Content Switcher */}
          <div className="flex-1 pb-12">
            {activeTab === 'dashboard' && (
              <DashboardView
                metrics={INITIAL_METRICS}
                pipelines={pipelines}
                activities={activities}
                onSelectPipeline={handleSelectPipeline}
                onNavigateToPipelines={() => setActiveTab('pipeline')}
                onNavigateToActivities={() => setActiveTab('activity')}
              />
            )}

            {activeTab === 'pipeline' && (
              <PipelineView
                pipelines={pipelines}
                onSelectPipeline={handleSelectPipeline}
                onOpenAddPipeline={() => { setPipelineToEdit(null); setIsAddPipelineOpen(true); }}
                onEditPipeline={(p) => { setPipelineToEdit(p); setIsAddPipelineOpen(true); }}
                onArchivePipeline={handleArchivePipeline}
              />
            )}

            {(activeTab as any) === 'pipeline-detail' && currentPipeline && (
              <PipelineDetailView
                pipeline={currentPipeline}
                onBack={() => setActiveTab('pipeline')}
                onUpdatePipeline={(updated) => {
                  setPipelines(prev => prev.map(p => p.id === updated.id ? updated : p));
                }}
              />
            )}

            {activeTab === 'activity' && (
              <ActivityView
                activities={activities}
                onOpenAddActivity={() => setIsAddActivityOpen(true)}
                subMode="all"
              />
            )}

            {activeTab === 'activity-history' && (
              <ActivityView
                activities={activities}
                onOpenAddActivity={() => setIsAddActivityOpen(true)}
                subMode="history"
              />
            )}

            {activeTab === 'activity-plan' && (
              <ActivityView
                activities={activities}
                onOpenAddActivity={() => setIsAddActivityOpen(true)}
                subMode="plan"
              />
            )}

            {(activeTab === 'customers' || activeTab === 'contacts') && (
              <CustomerView customers={customers} />
            )}

            {activeTab === 'report-win-loss' && (
              <WinLossView pipelines={pipelines} />
            )}

            {activeTab.startsWith('report-') && activeTab !== 'report-win-loss' && (
              <ReportsView pipelines={pipelines} activities={activities} />
            )}

            {activeTab === 'admin' && (
              <div className="p-8 max-w-4xl mx-auto space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Administration & Master Data</h2>
                <div className="p-6 bg-white border border-slate-200 rounded-2xl text-xs space-y-2">
                  <p className="font-semibold text-slate-700">System Role & Security Governance</p>
                  <p className="text-slate-500">Configure User Roles, Portfolio Master List, Working Area Definitions, and SAP Integration Connectors.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        pipelines={pipelines}
        customers={customers}
        activities={activities}
        onSelectPipeline={handleSelectPipeline}
        onSelectCustomer={() => setActiveTab('customers')}
      />

      <PipelineFormModal
        isOpen={isAddPipelineOpen}
        onClose={() => setIsAddPipelineOpen(false)}
        onSave={handleSavePipeline}
        customers={customers}
        initialData={pipelineToEdit}
      />

      <QuickActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onSave={handleSaveActivity}
        customers={customers}
        pipelines={pipelines}
      />
    </div>
  );
};
