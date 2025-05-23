
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, Activity, Shield, Settings, LogOut, ShoppingCart } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'New Deployment', path: '/dashboard/deploy', icon: PlusCircle },
  { name: 'Monitoring', path: '/dashboard/monitor', icon: Activity },
  { name: 'Marketplace', path: '/dashboard/marketplace', icon: ShoppingCart },
  { name: 'Admin', path: '/dashboard/admin', icon: Shield },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

const DashboardSidebar = () => {
  return (
    <div className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-slate-200 p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-tech-blue'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-tech-blue'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-4 w-56">
        <button className="flex items-center px-3 py-2 w-full rounded-md text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
