# Frontend Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Login and Register pages with Backend Auth API integration and protected routing.

**Architecture:** Use React Context for auth state management, Axios for API calls with JWT injection, and React Router for navigation and protected routes.

**Tech Stack:** React, TypeScript, TailwindCSS, React Router, Axios, Lucide React.

---

### Task 1: Dependencies and Environment

**Files:**
- Modify: `packages/client/package.json`
- Create: `packages/client/.env`

- [ ] **Step 1: Install dependencies**

Run: `npm install react-router-dom axios lucide-react` in `packages/client`

- [ ] **Step 2: Create .env file**

```
VITE_API_URL=http://localhost:5000/api
```

- [ ] **Step 3: Commit**

```bash
git add packages/client/package.json packages/client/package-lock.json
git commit -m "chore: add frontend dependencies"
```

### Task 2: API Service

**Files:**
- Create: `packages/client/src/services/api.ts`

- [ ] **Step 1: Implement Axios instance with JWT injection**

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

- [ ] **Step 2: Commit**

```bash
git add packages/client/src/services/api.ts
git commit -m "feat: setup axios api service"
```

### Task 3: Auth Context

**Files:**
- Create: `packages/client/src/context/AuthContext.tsx`

- [ ] **Step 1: Implement AuthContext and AuthProvider**

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { IUser } from '../../../shared/src/types/user';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Assuming an endpoint GET /auth/me exists or just use stored user info
          // For now, we'll just set loading to false if token exists
          // In a real app, verify the token and get fresh user info
          const response = await api.get('/auth/me'); // We might need to implement this in server if not exists
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

- [ ] **Step 2: Commit**

```bash
git add packages/client/src/context/AuthContext.tsx
git commit -m "feat: implement AuthContext"
```

### Task 4: Auth Layout

**Files:**
- Create: `packages/client/src/components/layout/AuthLayout.tsx`

- [ ] **Step 1: Implement AuthLayout with design elements**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add packages/client/src/components/layout/AuthLayout.tsx
git commit -m "feat: add AuthLayout component"
```

### Task 5: Login Page

**Files:**
- Create: `packages/client/src/pages/Login.tsx`

- [ ] **Step 1: Implement Login page with form handling**

```tsx
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

      <div className="relative my-xl">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface-container-lowest px-md text-on-surface-variant">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <button className="flex items-center justify-center gap-sm h-11 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container transition-colors">
          <img alt="Google" className="w-4 h-4" src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" />
          <span className="text-sm font-medium text-on-surface-variant">Google</span>
        </button>
        <button className="flex items-center justify-center gap-sm h-11 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container transition-colors">
          <span className="text-sm font-medium text-on-surface-variant">SSO</span>
        </button>
      </div>

      <p className="mt-lg text-center text-sm text-on-surface-variant">
        Don't have an account? 
        <Link className="text-primary font-semibold hover:underline ml-xs" to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
```

- [ ] **Step 2: Commit**

```bash
git add packages/client/src/pages/Login.tsx
git commit -m "feat: implement Login page"
```

### Task 6: Register Page

**Files:**
- Create: `packages/client/src/pages/Register.tsx`

- [ ] **Step 1: Implement Register page**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add packages/client/src/pages/Register.tsx
git commit -m "feat: implement Register page"
```

### Task 7: Protected Route and Routing Setup

**Files:**
- Create: `packages/client/src/components/auth/ProtectedRoute.tsx`
- Modify: `packages/client/src/App.tsx`
- Modify: `packages/client/src/main.tsx`

- [ ] **Step 1: Implement ProtectedRoute**

```tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

- [ ] **Step 2: Update App.tsx with routes**

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <div className="p-xl">
                  <h1 className="text-2xl font-bold">Dashboard (Work in Progress)</h1>
                  <p>Welcome to your Smart Leads Dashboard.</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

- [ ] **Step 3: Commit**

```bash
git add packages/client/src/components/auth/ProtectedRoute.tsx packages/client/src/App.tsx
git commit -m "feat: setup routing and protected routes"
```

### Task 8: Verification

- [ ] **Step 1: Verify API endpoint /auth/me exists in server**

I need to check if `packages/server/src/routes/authRoutes.ts` has `/me`. It doesn't. I should add it.

**Files:**
- Modify: `packages/server/src/routes/authRoutes.ts`
- Modify: `packages/server/src/controllers/authController.ts`

- [ ] **Step 2: Add /me endpoint to server**

In `packages/server/src/routes/authRoutes.ts`:
```typescript
import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);

export default router;
```

In `packages/server/src/controllers/authController.ts`:
```typescript
export const getMe = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

- [ ] **Step 3: Commit server changes**

```bash
git add packages/server/src/routes/authRoutes.ts packages/server/src/controllers/authController.ts
git commit -m "feat: add /auth/me endpoint to server"
```
