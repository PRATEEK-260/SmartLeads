import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    ...(user?.role === 'Admin' ? [{ name: 'Team', path: '/users', icon: Users }] : []),
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant flex flex-col z-50">
      <div className="px-6 py-10">
        <h1 className="text-[28px] font-bold text-primary leading-tight tracking-tight">Smart Leads<br/>Dashboard</h1>
      </div>

      <div className="px-4 mb-8">
        <div className="bg-surface-container-high rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
            {getInitials(user?.name || '')}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">{user?.name}</p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-primary text-[10px] font-bold text-on-primary uppercase tracking-wider">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'text-primary font-bold bg-surface-container-high shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`
            }
          >
            <item.icon className={`w-5 h-5 ${item.name === 'Dashboard' && 'stroke-[2.5px]'}`} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <button 
          onClick={() => navigate('/leads?new=true')}
          className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          New Lead
        </button>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-colors rounded-xl text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
