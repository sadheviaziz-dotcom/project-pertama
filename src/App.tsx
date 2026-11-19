import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AICenter from './pages/AICenter';
import LandingForecast from './pages/LandingForecast';
import SustainableCatch from './pages/SustainableCatch';
import DemandMatching from './pages/DemandMatching';
import PricePrediction from './pages/PricePrediction';
import FoodLoss from './pages/FoodLoss';
import TPILanding from './pages/TPILanding';
import FishingPlan from './pages/FishingPlan';
import Marketplace from './pages/Marketplace';
import IndustrialDemand from './pages/IndustrialDemand';
import Workflow from './pages/Workflow';
import Analytics from './pages/Analytics';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-center" element={<AICenter />} />
            <Route path="/landing-forecast" element={<LandingForecast />} />
            <Route path="/sustainability" element={<SustainableCatch />} />
            <Route path="/demand-matching" element={<DemandMatching />} />
            <Route path="/price-prediction" element={<PricePrediction />} />
            <Route path="/food-loss" element={<FoodLoss />} />
            <Route path="/tpi-landing" element={<TPILanding />} />
            <Route path="/fishing-plan" element={<FishingPlan />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/fish-catalog" element={<Marketplace />} />
            <Route path="/industrial-demand" element={<IndustrialDemand />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
