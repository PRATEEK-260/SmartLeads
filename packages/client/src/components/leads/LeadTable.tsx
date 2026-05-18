import React from 'react';
import type { ILead } from '@service-hive/shared';

interface LeadTableProps {
  leads: ILead[];
  isLoading: boolean;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, isLoading }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-surface-container-highest text-primary border border-primary-fixed-dim';
      case 'Contacted':
        return 'bg-secondary-fixed text-secondary border border-secondary-fixed-dim';
      case 'Qualified':
        return 'bg-tertiary-fixed text-tertiary border border-tertiary-fixed-dim';
      case 'Lost':
        return 'bg-error-container text-on-error-container';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lead Contact</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Source</th>
                <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date Added</th>
                <th className="px-gutter py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-gutter py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-variant"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-surface-variant rounded"></div>
                        <div className="h-3 w-32 bg-surface-variant rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-4">
                    <div className="h-6 w-20 bg-surface-variant rounded-full"></div>
                  </td>
                  <td className="px-md py-4">
                    <div className="h-4 w-20 bg-surface-variant rounded"></div>
                  </td>
                  <td className="px-md py-4">
                    <div className="h-4 w-24 bg-surface-variant rounded"></div>
                  </td>
                  <td className="px-gutter py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-surface rounded-xl shadow-sm border border-outline-variant p-12 text-center">
        <span className="material-symbols-outlined text-outline text-5xl mb-4">group_off</span>
        <h3 className="text-headline-sm text-on-surface font-bold">No leads found</h3>
        <p className="text-body-md text-on-surface-variant">Try adjusting your filters or add a new lead.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-gutter py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lead Contact</th>
              <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Source</th>
              <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date Added</th>
              <th className="px-gutter py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-surface-container-high transition-colors cursor-pointer group">
                <td className="px-gutter py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                      {getInitials(lead.name)}
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-on-surface">{lead.name}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-md py-4">
                  <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${getStatusBadgeClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-md py-4 font-body-md text-body-md text-on-surface">
                  {lead.source}
                </td>
                <td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">
                  {new Date(lead.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-gutter py-4 text-right">
                  <button className="p-1 text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Placeholder */}
      <div className="px-gutter py-4 flex items-center justify-between border-t border-outline-variant bg-surface-container-low">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Showing {leads.length} leads
        </span>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md">1</button>
          <button className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50" disabled>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
