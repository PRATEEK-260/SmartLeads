import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { ILead } from '@service-hive/shared';
import LeadTable from '../components/leads/LeadTable';
import AddLeadModal from '../components/leads/AddLeadModal';
import Pagination from '../components/leads/Pagination';
import { useDebounce } from '../hooks/useDebounce';
import { Search, FilterX } from 'lucide-react';

const LeadsList: React.FC = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1,
    limit: 10
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page,
        limit,
        sortBy
      };
      if (statusFilter) params.status = statusFilter;
      if (sourceFilter) params.source = sourceFilter;
      if (debouncedSearch) params.search = debouncedSearch;

      const response = await api.get('/leads', { params });
      
      // Handle the new response structure
      if (response.data.status === 'success') {
        setLeads(response.data.data.leads);
        setPagination(response.data.data.pagination);
      } else {
        setLeads(response.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, sourceFilter, debouncedSearch, page, sortBy]);

  // Reset selection when leads change
  useEffect(() => {
    setSelectedLeadIds([]);
  }, [leads]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, sourceFilter, debouncedSearch, sortBy]);

  const handleNewLead = () => {
    setIsModalOpen(true);
  };

  const handleExport = async () => {
    try {
      const params: any = {};
      if (selectedLeadIds.length > 0) {
        params.ids = selectedLeadIds.join(',');
      }

      const response = await api.get('/leads/export', {
        params,
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting leads:', error);
    }
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
            className="flex items-center gap-2 bg-secondary text-on-secondary px-lg py-md rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity disabled:opacity-50"
            onClick={handleExport}
          >
            <span className="material-symbols-outlined">download</span>
            {selectedLeadIds.length > 0 ? `Export (${selectedLeadIds.length})` : 'Export All'}
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

      {/* Filter and Search Bar */}
      <div className="bg-surface p-md rounded-xl shadow-sm border border-outline-variant flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px]">
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              className="w-full bg-white border border-outline-variant rounded-lg py-2 pl-10 pr-4 font-body-sm text-body-sm focus:ring-primary focus:border-primary outline-none"
              placeholder="Search by name or email..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="min-w-[150px]">
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
        <div className="min-w-[150px]">
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
        <div className="min-w-[150px]">
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Sort By</label>
          <select 
            className="w-full bg-white border border-outline-variant rounded-lg py-2 px-3 font-body-sm text-body-sm focus:ring-primary focus:border-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
        <button 
          className="mt-5 p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors"
          onClick={() => {
            setStatusFilter('');
            setSourceFilter('');
            setSearchTerm('');
            setSortBy('Latest');
          }}
          title="Clear Filters"
        >
          <FilterX className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <LeadTable 
          leads={leads} 
          isLoading={isLoading} 
          selectedIds={selectedLeadIds}
          onSelectChange={setSelectedLeadIds}
        />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.pages}
          totalLeads={pagination.total}
          limit={pagination.limit}
          onPageChange={(p) => setPage(p)}
        />
      </div>

      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchLeads} 
      />
    </div>
  );
};

export default LeadsList;
