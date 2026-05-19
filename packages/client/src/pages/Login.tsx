import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Please enter your details to sign in.">
      <form className="space-y-lg" onSubmit={handleSubmit}>
        {error && <div className="p-sm bg-error-container text-on-error-container text-sm rounded-lg">{error}</div>}
        
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
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-on-surface-variant" htmlFor="password">Password</label>
            <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              className="w-full h-12 pl-10 pr-10 bg-surface border border-outline-variant rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" 
              id="password" 
              placeholder="••••••••" 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant" 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button 
          className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm rounded-card transition-all flex items-center justify-center gap-sm active:scale-[0.98] disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          <span>{loading ? 'Logging in...' : 'Login'}</span>
          {!loading && <ArrowRight className="w-4.5 h-4.5" />}
        </button>
      </form>

      <p className="mt-lg text-center text-sm text-on-surface-variant">
        Don't have an account? 
        <Link className="text-primary font-semibold hover:underline ml-xs" to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
