
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Server, 
  DollarSign, 
  MessageCircle, 
  Settings,
  TrendingUp,
  Shield
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/client-dashboard',
    icon: BarChart3,
  },
  {
    name: 'Analytics',
    href: '/client-dashboard/analytics',
    icon: TrendingUp,
  },
  {
    name: 'Infrastructure',
    href: '/client-dashboard/infrastructure',
    icon: Server,
  },
  {
    name: 'Billing',
    href: '/client-dashboard/billing',
    icon: DollarSign,
  },
  {
    name: 'Support',
    href: '/client-dashboard/support',
    icon: MessageCircle,
  },
  {
    name: 'Security',
    href: '/client-dashboard/security',
    icon: Shield,
  },
  {
    name: 'Settings',
    href: '/client-dashboard/settings',
    icon: Settings,
  },
];

const ClientDashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                end={item.href === '/client-dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-tech-blue text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ClientDashboardSidebar;
