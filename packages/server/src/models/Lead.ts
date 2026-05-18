import mongoose, { Schema, Document } from 'mongoose';
import { ILead } from '@service-hive/shared';

export interface ILeadDocument extends Omit<ILead, 'id'>, Document {}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Lost'], 
    default: 'New' 
  },
  source: { 
    type: String, 
    enum: ['Website', 'Instagram', 'Referral'], 
    required: true 
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILeadDocument>('Lead', LeadSchema);
