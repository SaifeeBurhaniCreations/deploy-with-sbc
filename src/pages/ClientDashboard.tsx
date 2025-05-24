import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Server, DollarSign, Activity, AlertTriangle, MessageCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    title: 'Website Uptime',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up',
    icon: Activity,
  },
  {
    title: 'Avg Response Time',
    value: '142ms',
    change: '-15ms',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Monthly Cost',
    value: '$89.50',
    change: '+$5.20',
    trend: 'down',
    icon: DollarSign,
  },
  {
    title: 'Active Services',
    value: '8',
    change: '+1',
    trend: 'up',
    icon: Server,
  },
];

const recentActivity = [
  { id: 1, type: 'deployment', message: 'Website deployed successfully', time: '2 hours ago', status: 'success' },
  { id: 2, type: 'alert', message: 'High CPU usage detected on EC2 instance', time: '4 hours ago', status: 'warning' },
  { id: 3, type: 'scaling', message: 'Auto-scaling triggered for ECS service', time: '6 hours ago', status: 'info' },
  { id: 4, type: 'backup', message: 'Daily S3 backup completed', time: '8 hours ago', status: 'success' },
];

const ClientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Client Dashboard</h1>
        <p className="text-slate-600">Welcome back, Acme Corp</p>
      </div>
      
      {/* Key Metrics */}
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
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-slate-600">{activity.time}</p>
                  </div>
                  <Badge variant={
                    activity.status === 'success' ? 'default' :
                    activity.status === 'warning' ? 'secondary' :
                    'outline'
                  }>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button 
                className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => navigate('/client-dashboard/analytics')}
              >
                <Activity className="h-5 w-5 text-tech-blue mb-2" />
                <p className="font-medium text-sm">Analytics</p>
                <p className="text-xs text-slate-600">Performance metrics</p>
              </button>
              
              <button 
                className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => navigate('/client-dashboard/billing')}
              >
                <DollarSign className="h-5 w-5 text-green-600 mb-2" />
                <p className="font-medium text-sm">Billing Details</p>
                <p className="text-xs text-slate-600">View usage & costs</p>
              </button>
              
              <button 
                className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => navigate('/client-dashboard/support')}
              >
                <MessageCircle className="h-5 w-5 text-purple-600 mb-2" />
                <p className="font-medium text-sm">Support</p>
                <p className="text-xs text-slate-600">Get help & tickets</p>
              </button>
              
              <button 
                className="p-4 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => navigate('/client-dashboard/settings')}
              >
                <Settings className="h-5 w-5 text-orange-600 mb-2" />
                <p className="font-medium text-sm">Settings</p>
                <p className="text-xs text-slate-600">Manage account</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
