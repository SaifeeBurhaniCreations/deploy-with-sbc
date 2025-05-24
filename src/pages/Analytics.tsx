
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, TrendingUp, AlertTriangle, Code, Github, GitBranch } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockPerformanceData = [
  { time: '00:00', responseTime: 120, uptime: 99.9, errors: 0 },
  { time: '04:00', responseTime: 115, uptime: 99.8, errors: 1 },
  { time: '08:00', responseTime: 180, uptime: 99.9, errors: 0 },
  { time: '12:00', responseTime: 145, uptime: 99.7, errors: 2 },
  { time: '16:00', responseTime: 135, uptime: 99.9, errors: 0 },
  { time: '20:00', responseTime: 125, uptime: 99.8, errors: 1 },
];

const mockVitalsData = [
  { metric: 'LCP', value: 2.1, status: 'good' },
  { metric: 'FID', value: 95, status: 'good' },
  { metric: 'CLS', value: 0.08, status: 'needs-improvement' },
  { metric: 'TTFB', value: 180, status: 'good' },
];

const Analytics = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [selectedRepo, setSelectedRepo] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [configCode, setConfigCode] = useState(`# Monitoring Configuration
alerts:
  - name: High Response Time
    condition: response_time > 500ms
    severity: warning
  - name: Downtime Alert
    condition: uptime < 99%
    severity: critical

monitoring:
  interval: 60s
  timeout: 30s
  retries: 3`);

  const mockSiteData = {
    name: 'Client Portal',
    subdomain: 'portal.client1.sbc-deploy.com',
    status: 'healthy',
    uptime: '99.8%',
    avgResponseTime: '142ms',
  };

  const mockRepos = [
    { id: 'repo-1', name: 'client-portal-config', url: 'github.com/user/client-portal-config' },
    { id: 'repo-2', name: 'monitoring-scripts', url: 'github.com/user/monitoring-scripts' },
  ];

  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/monitor')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Monitoring
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{mockSiteData.name}</h1>
          <p className="text-slate-600">Analytics for {mockSiteData.subdomain}</p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockSiteData.uptime}</div>
            <p className="text-xs text-slate-600">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSiteData.avgResponseTime}</div>
            <p className="text-xs text-green-600">↓ 15ms from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0.2%</div>
            <p className="text-xs text-slate-600">4 errors in 24h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Bundle Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1MB</div>
            <p className="text-xs text-slate-600">45 requests</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="vitals">Core Web Vitals</TabsTrigger>
          <TabsTrigger value="config">Config & Scripts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Bottlenecks</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="space-y-3"> */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Large JavaScript Bundle</p>
                    <p className="text-sm text-yellow-600">Bundle size increased by 15% after last deployment</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Slow Database Queries</p>
                    <p className="text-sm text-blue-600">API response time spike during peak hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockVitalsData.map((vital) => (
                  <div key={vital.metric} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{vital.metric}</h3>
                      <Badge variant={vital.status === 'good' ? 'default' : 'secondary'}>
                        {vital.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">{vital.value}{vital.metric === 'CLS' ? '' : vital.metric === 'FID' ? 'ms' : 's'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Attach to Repository</label>
                  <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select repository" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRepos.map((repo) => (
                        <SelectItem key={repo.id} value={repo.id}>
                          <div className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            {repo.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Branch</label>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4" />
                          main
                        </div>
                      </SelectItem>
                      <SelectItem value="develop">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4" />
                          develop
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Configuration Script</label>
                <div className="border rounded-lg">
                  <div className="flex items-center gap-2 px-3 py-2 border-b bg-slate-50">
                    <Code className="h-4 w-4" />
                    <span className="text-sm">monitoring-config.yml</span>
                  </div>
                  <textarea
                    value={configCode}
                    onChange={(e) => setConfigCode(e.target.value)}
                    className="w-full h-64 p-3 font-mono text-sm border-0 resize-none focus:outline-none"
                    placeholder="Enter your monitoring configuration..."
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Preview Changes</Button>
                <div className="space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button>Deploy Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
