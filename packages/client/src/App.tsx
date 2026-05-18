import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import LeadsList from './pages/LeadsList';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';

const SettingsPlaceholder = () => (
  <div>
    <h2 className="text-2xl font-bold text-on-surface">Account Settings</h2>
    <p className="text-on-surface-variant">Manage your profile and preferences.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/settings" element={<SettingsPlaceholder />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
