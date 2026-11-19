import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Brain, TrendingUp, Shield, Handshake, Store,
  DollarSign, AlertTriangle, ClipboardList, Anchor, GitBranch,
  BarChart3, Users, Settings, LogOut, ChevronLeft, ChevronRight, Waves,
  Factory, Fish
} from 'lucide-react';
import { useState } from 'react';
import type { UserRole } from '../../types';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
  section?: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['nelayan', 'tpi', 'perusahaan', 'pedagang', 'admin'], section: 'Utama' },
  { path: '/ai-center', label: 'AI Intelligence Center', icon: <Brain size={20} />, roles: ['admin', 'nelayan', 'tpi', 'perusahaan'], section: 'AI & Analitik' },
  { path: '/landing-forecast', label: 'Landing Forecast', icon: <TrendingUp size={20} />, roles: ['admin', 'nelayan', 'tpi', 'perusahaan'] },
  { path: '/sustainability', label: 'Sustainable Catch', icon: <Shield size={20} />, roles: ['admin', 'nelayan', 'tpi'] },
  { path: '/demand-matching', label: 'Demand Matching', icon: <Handshake size={20} />, roles: ['admin', 'tpi', 'perusahaan'] },
  { path: '/price-prediction', label: 'Price Prediction', icon: <DollarSign size={20} />, roles: ['admin', 'nelayan', 'tpi', 'perusahaan', 'pedagang'] },
  { path: '/industrial-demand', label: 'Industrial Demand', icon: <Factory size={20} />, roles: ['admin', 'tpi'], section: 'Operasional' },
  { path: '/food-loss', label: 'Food Loss Prevention', icon: <AlertTriangle size={20} />, roles: ['admin', 'tpi'] },
  { path: '/tpi-landing', label: 'Data Pendaratan TPI', icon: <ClipboardList size={20} />, roles: ['admin', 'tpi'] },
  { path: '/fishing-plan', label: 'Rencana Melaut', icon: <Anchor size={20} />, roles: ['nelayan'] },
  { path: '/marketplace', label: 'Fish Catalog', icon: <Fish size={20} />, roles: ['tpi', 'perusahaan', 'pedagang', 'admin'], section: 'Katalog' },
  { path: '/workflow', label: 'System Workflow', icon: <GitBranch size={20} />, roles: ['admin'], section: 'Sistem' },
  { path: '/analytics', label: 'Analytics & Reports', icon: <BarChart3 size={20} />, roles: ['admin'] },
  { path: '/user-management', label: 'User Management', icon: <Users size={20} />, roles: ['admin'] },
  { path: '/profile', label: 'Profile & Settings', icon: <Settings size={20} />, roles: ['nelayan', 'tpi', 'perusahaan', 'pedagang', 'admin'] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const filteredItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleLabel = (role: UserRole) => {
    const labels: Record<UserRole, string> = {
      nelayan: 'Nelayan',
      tpi: 'TPI',
      perusahaan: 'Industri',
      pedagang: 'Pedagang',
      admin: 'Administrator',
    };
    return labels[role];
  };

  const getRoleColor = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      nelayan: 'bg-blue-500',
      tpi: 'bg-teal-500',
      perusahaan: 'bg-purple-500',
      pedagang: 'bg-orange-500',
      admin: 'bg-red-500',
    };
    return colors[role];
  };

  let currentSection = '';

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-navy-dark to-navy min-h-screen flex flex-col transition-all duration-300 sticky top-0`}>
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-teal flex items-center justify-center flex-shrink-0">
          <Waves size={22} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-lg tracking-wide">SIRKULAUT</h1>
            <p className="text-cyan text-[10px] font-medium tracking-wider">FISHERIES AI PLATFORM</p>
          </div>
        )}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${getRoleColor(user.role)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-slate-400 text-xs">{getRoleLabel(user.role)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto space-y-0.5">
        {filteredItems.map((item) => {
          let sectionHeader = null;
          if (item.section && item.section !== currentSection) {
            currentSection = item.section;
            sectionHeader = !collapsed ? (
              <p key={`section-${item.section}`} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 pt-4 pb-1">
                {item.section}
              </p>
            ) : <div key={`section-${item.section}`} className="pt-3 pb-1"><hr className="border-white/10" /></div>;
          }
          return (
            <div key={item.path}>
              {sectionHeader}
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            </div>
          );
        })}
      </nav>

      {/* Collapse & Logout */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button onClick={() => setCollapsed(!collapsed)} className="sidebar-link w-full justify-center" title="Toggle sidebar">
          {collapsed ? <ChevronRight size={20} /> : <><ChevronLeft size={20} /><span>Collapse</span></>}
        </button>
        <button onClick={handleLogout} className="sidebar-link w-full text-red-300 hover:text-red-200 hover:bg-red-500/10">
          <LogOut size={20} />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}

