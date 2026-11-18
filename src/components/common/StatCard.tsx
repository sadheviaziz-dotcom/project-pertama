import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; label: string };
  color?: 'navy' | 'teal' | 'cyan' | 'success' | 'warning' | 'danger' | 'info';
}

const colorMap = {
  navy: 'bg-navy/10 text-navy',
  teal: 'bg-teal/10 text-teal',
  cyan: 'bg-cyan/10 text-cyan-dark',
  success: 'bg-emerald-50 text-emerald-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
};

export default function StatCard({ title, value, subtitle, icon, trend, color = 'navy' }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`w-12 h-12 rounded-xl ${colorMap[color]} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        {trend && (
          <p className={`text-xs font-medium mt-1 ${trend.value >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </div>
    </div>
  );
}

