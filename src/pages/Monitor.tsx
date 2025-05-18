
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpCircle, RefreshCw, AlertCircle, Clock, Activity } from 'lucide-react';

// Mock data for monitoring
const mockDeployments = [
  { 
    id: 'dep-001', 
    name: 'Client Portal', 
    subdomain: 'portal.client1.sbc-deploy.com', 
    status: 'healthy',
    responseTime: '87ms',
    lastChecked: '2 mins ago',
    uptime: '99.98%',
    region: 'us-east',
  },
  { 
    id: 'dep-002', 
    name: 'Marketing Website', 
    subdomain: 'marketing.client2.sbc-deploy.com', 
    status: 'healthy',
    responseTime: '124ms',
    lastChecked: '3 mins ago',
    uptime: '99.95%',
    region: 'us-west',
  },
  { 
    id: 'dep-003', 
    name: 'Admin Dashboard', 
    subdomain: 'admin.client3.sbc-deploy.com', 
    status: 'degraded',
    responseTime: '350ms',
    lastChecked: '1 min ago',
    uptime: '99.5%',
    region: 'eu-central',
  },
  { 
    id: 'dep-004', 
    name: 'API Service', 
    subdomain: 'api.client1.sbc-deploy.com', 
    status: 'down',
    responseTime: '-',
    lastChecked: '30 secs ago',
    uptime: '98.2%',
    region: 'us-east',
  },
  { 
    id: 'dep-005', 
    name: 'Documentation Site', 
    subdomain: 'docs.client2.sbc-deploy.com', 
    status: 'healthy',
    responseTime: '92ms',
    lastChecked: '5 mins ago',
    uptime: '100%',
    region: 'us-west',
  },
];

const statusDetails = {
  healthy: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: ArrowUpCircle,
    description: 'All systems operational'
  },
  degraded: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    icon: AlertCircle,
    description: 'Experiencing slowdowns'
  },
  down: { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    icon: AlertCircle,
    description: 'Service unavailable'
  },
};

const Monitor = () => {
  const [deployments, setDeployments] = useState(mockDeployments);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate random changes in response times
      const updatedDeployments = deployments.map(dep => ({
        ...dep,
        responseTime: dep.status !== 'down' ? `${Math.floor(Math.random() * 400) + 50}ms` : '-',
        lastChecked: 'just now'
      }));
      
      setDeployments(updatedDeployments);
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  // Auto refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [deployments]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Monitor</h1>
          <p className="text-slate-600">Real-time health status of all your deployments</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Last updated {lastRefresh.toLocaleTimeString()}</CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Auto-refresh: 60s
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-green-800">Healthy Services</h3>
                <p className="text-2xl font-bold text-green-700">
                  {deployments.filter(d => d.status === 'healthy').length}
                </p>
              </div>
              <ArrowUpCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-yellow-800">Degraded Services</h3>
                <p className="text-2xl font-bold text-yellow-700">
                  {deployments.filter(d => d.status === 'degraded').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-yellow-500" />
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-800">Down Services</h3>
                <p className="text-2xl font-bold text-red-700">
                  {deployments.filter(d => d.status === 'down').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Response Time</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Uptime</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((deployment) => {
                  const statusInfo = statusDetails[deployment.status];
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <tr key={deployment.id} className="border-b border-slate-100">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{deployment.name}</p>
                          <a 
                            href={`https://${deployment.subdomain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-500 hover:text-tech-blue hover:underline"
                          >
                            {deployment.subdomain}
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center gap-2 ${statusInfo.color} px-2.5 py-1 rounded-md text-xs w-fit`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          <span className="capitalize">{deployment.status}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{statusInfo.description}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-mono ${
                          deployment.status === 'healthy' ? 'text-green-600' :
                          deployment.status === 'degraded' ? 'text-yellow-600' : 'text-slate-500'
                        }`}>
                          {deployment.responseTime}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{deployment.uptime}</td>
                      <td className="py-3 px-4 text-slate-600">{deployment.region}</td>
                      <td className="py-3 px-4 text-slate-500 text-sm">{deployment.lastChecked}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monitoring Settings</CardTitle>
          <CardDescription>Configure how often we check your services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Check Frequency</h3>
                <select className="w-full border border-slate-200 rounded-md p-2">
                  <option value="30">Every 30 seconds</option>
                  <option value="60" selected>Every 1 minute</option>
                  <option value="300">Every 5 minutes</option>
                  <option value="600">Every 10 minutes</option>
                </select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Alert Threshold</h3>
                <select className="w-full border border-slate-200 rounded-md p-2">
                  <option value="1">After 1 failed check</option>
                  <option value="2" selected>After 2 failed checks</option>
                  <option value="3">After 3 failed checks</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Notification Methods</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" checked />
                    <span>Email Alerts</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" checked />
                    <span>Dashboard Notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>SMS Alerts (Premium)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitor;
