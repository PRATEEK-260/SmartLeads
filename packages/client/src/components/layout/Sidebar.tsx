import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant flex flex-col z-50">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-primary leading-tight">Smart Leads Dashboard</h1>
        <p className="text-sm text-on-surface-variant mt-1 capitalize">{user?.role || 'User'}</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'text-primary font-bold bg-surface-container-high'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          New Lead
        </button>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-xl text-sm font-medium mt-4"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
