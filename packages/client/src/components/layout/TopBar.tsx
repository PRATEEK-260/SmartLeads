import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar: React.FC = () => {
  const { user } = useAuth();
  const [isDark, setIsDark] = React.useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      return next;
    });
  };

  return (
    <header className="flex justify-between items-center h-20 px-gutter w-full sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm">
      <div className="flex items-center gap-4 flex-1">
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <button onClick={toggleDarkMode} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
        
        <div className="flex items-center gap-4 border-l border-outline-variant pl-6">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-fixed bg-surface-variant flex items-center justify-center text-primary font-bold shadow-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
