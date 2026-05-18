import React from 'react';
import { LayoutDashboard } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-gutter relative overflow-hidden">
      <main className="w-full max-w-[440px] z-10">
        <div className="flex flex-col items-center mb-xl">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-md shadow-lg shadow-primary/20">
            <LayoutDashboard className="text-on-primary w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Smart Leads Dashboard</h1>
          <p className="text-sm text-on-surface-variant mt-xs">Accelerate your sales pipeline today</p>
        </div>

        <div className="bg-surface-container-lowest rounded-card shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] border border-outline-variant p-xl">
          <header className="mb-lg">
            <h2 className="text-xl font-semibold text-on-surface">{title}</h2>
            <p className="text-sm text-on-surface-variant">{subtitle}</p>
          </header>
          {children}
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
