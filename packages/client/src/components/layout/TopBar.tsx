import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center h-16 px-gutter w-full sticky top-0 z-40 bg-surface border-b border-outline-variant shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input
            className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary text-sm outline-none"
            placeholder="Search leads, companies..."
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-on-surface">{user?.name}</p>
            <p className="text-xs text-on-surface-variant">{user?.email}</p>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant bg-surface-variant flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
