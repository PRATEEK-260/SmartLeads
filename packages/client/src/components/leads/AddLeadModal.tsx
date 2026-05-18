import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { LeadStatus, LeadSource, IUser } from '@service-hive/shared';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user: currentUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus>('New');
  const [source, setSource] = useState<LeadSource>('Website');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser?.role === 'Admin') {
      const fetchUsers = async () => {
        try {
          const response = await api.get('/auth/users');
          setUsers(response.data.data.users);
          // Default to current user if none selected
          setAssignedTo(currentUser.id);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload: any = {
        name,
        email,
        status,
        source
      };
      
      if (currentUser?.role === 'Admin' && assignedTo) {
        payload.assignedTo = assignedTo;
      }

      await api.post('/leads', payload);
      onSuccess();
      handleClose();
    } catch (error: any) {
      console.error('Error creating lead:', error);
      if (error.response?.data?.message) {
        setErrors({ email: error.response.data.message });
      } else {
        setErrors({ email: 'An error occurred while creating the lead' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setStatus('New');
    setSource('Website');
    setAssignedTo(currentUser?.id || '');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="w-full max-w-[512px] min-w-[320px] bg-surface-container-lowest rounded-xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-outline-variant overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">New Lead</h2>
          <button 
            onClick={handleClose}
            className="material-symbols-outlined text-outline hover:text-on-surface transition-colors"
          >
            close
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-lg space-y-lg">
          <div className="space-y-base">
            <label className="font-label-md text-label-md text-on-surface-variant">Name</label>
            <input 
              className={`w-full px-md py-2.5 rounded-xl border ${errors.name ? 'border-error' : 'border-outline-variant'} bg-surface focus:ring-2 ${errors.name ? 'focus:ring-error/20 focus:border-error' : 'focus:ring-primary/20 focus:border-primary'} outline-none transition-all font-body-md text-body-md`}
              placeholder="Enter full name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="flex items-center gap-1 mt-1 text-error">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span className="font-body-sm text-body-sm">{errors.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-base">
            <label className="font-label-md text-label-md text-on-surface-variant">Email</label>
            <input 
              className={`w-full px-md py-2.5 rounded-xl border ${errors.email ? 'border-error' : 'border-outline-variant'} bg-surface focus:ring-2 ${errors.email ? 'focus:ring-error/20 focus:border-error' : 'focus:ring-primary/20 focus:border-primary'} outline-none transition-all font-body-md text-body-md`}
              placeholder="email@company.com" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-1 text-error">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span className="font-body-sm text-body-sm">{errors.email}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-lg">
            <div className="space-y-base">
              <label className="font-label-md text-label-md text-on-surface-variant">Status</label>
              <select 
                className="w-full px-md py-2.5 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md appearance-none"
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div className="space-y-base">
              <label className="font-label-md text-label-md text-on-surface-variant">Source</label>
              <select 
                className="w-full px-md py-2.5 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md appearance-none"
                value={source}
                onChange={(e) => setSource(e.target.value as LeadSource)}
              >
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          {currentUser?.role === 'Admin' && (
            <div className="space-y-base">
              <label className="font-label-md text-label-md text-on-surface-variant">Assign To</label>
              <select 
                className="w-full px-md py-2.5 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md appearance-none"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-md bg-surface-container-low flex justify-end gap-md">
            <button 
              type="button"
              onClick={handleClose}
              className="px-lg py-2 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-lg py-2 rounded-xl font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
