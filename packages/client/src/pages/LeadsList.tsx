import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { ILead } from '@service-hive/shared';
import LeadTable from '../components/leads/LeadTable';

const LeadsList: React.FC = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (sourceFilter) params.source = sourceFilter;

      const response = await api.get('/leads', { params });
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, sourceFilter]);

  const handleNewLead = () => {
    console.log('New Lead clicked');
    alert('New Lead feature coming soon!');
  };

  return (
    <div className="space-y-lg">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Leads Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Review and manage your active sales pipeline leads.</p>
        </div>
        <div className="flex gap-3">
          <button 
            className="flex items-center gap-2 bg-secondary text-on-secondary px-lg py-md rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity"
            onClick={() => console.log('Export CSV')}
          >
            <span className="material-symbols-outlined">download</span>
            Export CSV
          </button>
          <button 
            className="flex items-center gap-2 bg-primary text-on-primary px-lg py-md rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity"
            onClick={handleNewLead}
          >
            <span className="material-symbols-outlined">add</span>
            New Lead
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface p-md rounded-xl shadow-sm border border-outline-variant flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Status</label>
          <select 
            className="w-full bg-white border border-outline-variant rounded-lg py-2 px-3 font-body-sm text-body-sm focus:ring-primary focus:border-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Source</label>
          <select 
            className="w-full bg-white border border-outline-variant rounded-lg py-2 px-3 font-body-sm text-body-sm focus:ring-primary focus:border-primary"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Sort By</label>
          <select className="w-full bg-white border border-outline-variant rounded-lg py-2 px-3 font-body-sm text-body-sm focus:ring-primary focus:border-primary">
            <option>Latest</option>
            <option>Oldest</option>
          </select>
        </div>
        <button 
          className="mt-5 p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors"
          onClick={() => {
            setStatusFilter('');
            setSourceFilter('');
          }}
          title="Clear Filters"
        >
          <span className="material-symbols-outlined">filter_list_off</span>
        </button>
      </div>

      <LeadTable leads={leads} isLoading={isLoading} />
    </div>
  );
};

export default LeadsList;
