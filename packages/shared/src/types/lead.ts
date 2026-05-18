export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface ILead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo: string;
  createdAt: Date;
}
