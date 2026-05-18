import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join Smart Leads Dashboard today.">
      <form className="space-y-lg" onSubmit={handleSubmit}>
        {error && <div className="p-sm bg-error-container text-on-error-container text-sm rounded-lg">{error}</div>}
        
        <div className="space-y-xs">
          <label className="text-sm font-medium text-on-surface-variant block" htmlFor="name">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              className="w-full h-12 pl-10 pr-4 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" 
              id="name" 
              placeholder="John Doe" 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-xs">
          <label className="text-sm font-medium text-on-surface-variant block" htmlFor="email">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              className="w-full h-12 pl-10 pr-4 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" 
              id="email" 
              placeholder="name@company.com" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-xs">
          <label className="text-sm font-medium text-on-surface-variant block" htmlFor="password">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              className="w-full h-12 pl-10 pr-10 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" 
              id="password" 
              placeholder="••••••••" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-card transition-all flex items-center justify-center gap-sm active:scale-[0.98] disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          <span>{loading ? 'Creating account...' : 'Create Account'}</span>
          {!loading && <ArrowRight className="w-4.5 h-4.5" />}
        </button>
      </form>

      <p className="mt-lg text-center text-sm text-on-surface-variant">
        Already have an account? 
        <Link className="text-primary font-semibold hover:underline ml-xs" to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
