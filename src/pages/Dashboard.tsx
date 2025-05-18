
import React from 'react';
import { ArrowUp, Code, Globe, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Active Deployments',
    value: '12',
    change: '+3',
    icon: Globe,
  },
  {
    title: 'Total Clients',
    value: '8',
    change: '+2',
    icon: Users,
  },
  {
    title: 'Success Rate',
    value: '99.8%',
    change: '+0.2%',
    icon: ArrowUp,
  },
  {
    title: 'Resource Usage',
    value: '68%',
    change: '-5%',
    icon: Server,
  },
];

const recentDeployments = [
  { id: 'dep-123', name: 'Client Portal', subdomain: 'portal.client1.sbc-deploy.com', status: 'active', date: '2023-05-16' },
  { id: 'dep-124', name: 'Marketing Site', subdomain: 'marketing.client2.sbc-deploy.com', status: 'active', date: '2023-05-15' },
  { id: 'dep-125', name: 'Admin Dashboard', subdomain: 'admin.client3.sbc-deploy.com', status: 'active', date: '2023-05-14' },
  { id: 'dep-126', name: 'API Service', subdomain: 'api.client1.sbc-deploy.com', status: 'error', date: '2023-05-13' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-600">Welcome back to SBC-Deploy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-600 mt-1">
                <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Subdomain</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDeployments.map((deployment) => (
                  <tr key={deployment.id} className="border-b border-slate-100">
                    <td className="py-3 px-4">{deployment.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{deployment.subdomain}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          deployment.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {deployment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{deployment.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-xs text-tech-blue hover:underline">View</button>
                        <button className="text-xs text-tech-blue hover:underline">Restart</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
