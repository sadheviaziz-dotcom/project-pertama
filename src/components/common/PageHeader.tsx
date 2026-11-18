import type { ReactNode } from 'react';
import SimulationBadge from './SimulationBadge';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: boolean;
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, badge = true, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="section-title">{title}</h1>
          {badge && <SimulationBadge />}
        </div>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

