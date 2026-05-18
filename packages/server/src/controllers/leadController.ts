import { Request, Response } from 'express';
import { z } from 'zod';
import Lead from '../models/Lead';

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  source: z.enum(['Website', 'Instagram', 'Referral']),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  assignedTo: z.string().optional(),
});

const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  source: z.enum(['Website', 'Instagram', 'Referral']).optional(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']).optional(),
  assignedTo: z.string().optional(),
});

export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const sortBy = req.query.sortBy as string;
    const status = req.query.status as string;
    const source = req.query.source as string;

    const query: any = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ];
    }

    // RBAC: Sales only see their own leads
    if (req.user.role === 'Sales') {
      query.assignedTo = req.user.id;
    }

    const skip = (page - 1) * limit;
    const sort: any = sortBy === 'Oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const totalLeads = await Lead.countDocuments(query);
    const totalPages = Math.ceil(totalLeads / limit);

    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      data: {
        leads,
        pagination: {
          total: totalLeads,
          pages: totalPages,
          currentPage: page,
          limit,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);

    let assignedTo = req.user.id;

    // Admin can assign to others
    if (req.user.role === 'Admin' && validatedData.assignedTo) {
      assignedTo = validatedData.assignedTo;
    }

    const lead = await Lead.create({
      ...validatedData,
      assignedTo,
    });

    res.status(201).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // RBAC check
    if (req.user.role === 'Sales' && (lead.assignedTo as any)._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to access this lead' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const validatedData = updateLeadSchema.parse(req.body);
    
    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // RBAC check
    if (req.user.role === 'Sales' && lead.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this lead' });
    }

    lead = await Lead.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        lead,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // RBAC check
    if (req.user.role === 'Sales' && lead.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this lead' });
    }

    await Lead.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
