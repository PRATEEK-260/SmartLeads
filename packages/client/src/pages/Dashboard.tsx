import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import api from '../services/api';
import type { ILead } from '@service-hive/shared';

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    lostLeads: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/leads?limit=5');
        const allLeads = response.data.data.leads;
        
        setLeads(allLeads);
        setStats({
          totalLeads: response.data.data.pagination.total,
          newLeads: allLeads.filter((l: any) => l.status === 'New').length, // This is mock for now since API returns filtered results
          qualifiedLeads: allLeads.filter((l: any) => l.status === 'Qualified').length,
          lostLeads: allLeads.filter((l: any) => l.status === 'Lost').length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statsCards = [
    { 
      name: 'Total Leads', 
      value: stats.totalLeads, 
      trend: '+12.5%', 
      trendType: 'up', 
      trendLabel: 'vs last month',
      icon: TrendingUp, 
      color: 'border-primary',
      iconColor: 'text-primary'
    },
    { 
      name: 'New Leads', 
      value: stats.newLeads, 
      trend: '342', 
      trendType: 'neutral', 
      trendLabel: 'Active this week',
      icon: UserPlus, 
      color: 'border-blue-500',
      iconColor: 'text-blue-500'
    },
    { 
      name: 'Qualified', 
      value: stats.qualifiedLeads, 
      trend: '+5%', 
      trendType: 'up', 
      trendLabel: 'conversion rate',
      icon: CheckCircle, 
      color: 'border-amber-600',
      iconColor: 'text-amber-600'
    },
    { 
      name: 'Lost', 
      value: stats.lostLeads, 
      trend: '-2.1%', 
      trendType: 'down', 
      trendLabel: 'from target',
      icon: XCircle, 
      color: 'border-error',
      iconColor: 'text-error'
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Qualified': return 'bg-green-100 text-green-700';
      case 'Lost': return 'bg-red-100 text-red-700';
      case 'Contacted': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-xl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Real-time performance metrics for your lead generation.</p>
        </div>
        <button className="flex items-center gap-2 bg-surface border border-outline-variant px-lg py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container transition-colors shadow-sm">
          <Calendar className="w-5 h-5" />
          Last 30 Days
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {statsCards.map((card) => (
          <div key={card.name} className={`bg-surface p-lg rounded-xl shadow-sm border border-outline-variant border-l-4 ${card.color} flex flex-col justify-between h-40`}>
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{card.name}</span>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <div>
              <p className="text-[32px] font-bold text-on-surface leading-none mb-2">
                {isLoading ? '...' : card.value.toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5">
                {card.trendType === 'up' && <ArrowUpRight className="w-4 h-4 text-green-600" />}
                {card.trendType === 'down' && <ArrowDownRight className="w-4 h-4 text-error" />}
                <span className={`font-bold text-sm ${card.trendType === 'up' ? 'text-green-600' : card.trendType === 'down' ? 'text-error' : 'text-on-surface'}`}>
                  {card.trend}
                </span>
                <span className="text-on-surface-variant text-sm font-medium">{card.trendLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-lg flex justify-between items-center border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Leads</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface-variant">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface-variant">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-lg py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Name</th>
                <th className="px-lg py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email</th>
                <th className="px-lg py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-lg py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Source</th>
                <th className="px-lg py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Created At</th>
                <th className="px-lg py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {isLoading ? (
                [1, 2, 3, 4].map(i => (
                  <tr key={i} className="animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(j => (
                      <td key={j} className="px-lg py-5"><div className="h-4 bg-surface-variant rounded w-24"></div></td>
                    ))}
                  </tr>
                ))
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-lg py-5 font-bold text-on-surface">{lead.name}</td>
                    <td className="px-lg py-5 text-on-surface-variant">{lead.email}</td>
                    <td className="px-lg py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-lg py-5 text-on-surface">{lead.source}</td>
                    <td className="px-lg py-5 text-on-surface-variant">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-lg py-5">
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-surface-container-high rounded-md transition-colors text-on-surface-variant hover:text-primary">
                          <Edit className="w-4.5 h-4.5" />
                        </button>
                        <button className="p-1.5 hover:bg-surface-container-high rounded-md transition-colors text-on-surface-variant hover:text-error">
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-lg flex justify-between items-center border-t border-outline-variant bg-surface-container-low">
          <p className="text-sm font-medium text-on-surface-variant">
            Showing 4 of {stats.totalLeads.toLocaleString()} leads
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Lead Velocity */}
        <div className="lg:col-span-2 bg-surface p-xl rounded-2xl shadow-sm border border-outline-variant">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Lead Velocity</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm font-medium text-on-surface-variant">Inbound</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 pt-4">
            {[35, 65, 45, 100, 55, 40, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${h === 100 ? 'bg-primary' : 'bg-primary-fixed'}`} 
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-surface p-xl rounded-2xl shadow-sm border border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-lg">Lead Sources</h3>
          <div className="space-y-8">
            {[
              { label: 'LinkedIn', value: 42, color: 'bg-primary' },
              { label: 'Google Ads', value: 28, color: 'bg-primary' },
              { label: 'Organic Search', value: 18, color: 'bg-amber-600' },
              { label: 'Others', value: 12, color: 'bg-gray-400' },
            ].map((source) => (
              <div key={source.label} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-on-surface">{source.label}</span>
                  <span className="text-primary">{source.value}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${source.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${source.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
