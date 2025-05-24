
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const performanceData = [
  { date: '2024-01-01', uptime: 99.9, responseTime: 145, pageLoad: 2.3, errors: 2 },
  { date: '2024-01-02', uptime: 99.8, responseTime: 152, pageLoad: 2.1, errors: 5 },
  { date: '2024-01-03', uptime: 100, responseTime: 138, pageLoad: 2.2, errors: 1 },
  { date: '2024-01-04', uptime: 99.9, responseTime: 142, pageLoad: 2.0, errors: 3 },
  { date: '2024-01-05', uptime: 99.7, responseTime: 158, pageLoad: 2.4, errors: 8 },
  { date: '2024-01-06', uptime: 100, responseTime: 140, pageLoad: 2.1, errors: 2 },
  { date: '2024-01-07', uptime: 99.9, responseTime: 143, pageLoad: 2.2, errors: 1 },
];

const coreWebVitals = [
  { metric: 'LCP (Largest Contentful Paint)', value: '2.1s', status: 'good', threshold: '< 2.5s' },
  { metric: 'FID (First Input Delay)', value: '95ms', status: 'good', threshold: '< 100ms' },
  { metric: 'CLS (Cumulative Layout Shift)', value: '0.08', status: 'needs-improvement', threshold: '< 0.1' },
];

const awsUsage = [
  { service: 'EC2 (t3.micro)', usage: 85, limit: 100, cost: '$8.50' },
  { service: 'S3 Storage', usage: 2.4, limit: 5, cost: '$0.65', unit: 'GB' },
  { service: 'ECS Tasks', usage: 3, limit: 5, cost: '$12.30' },
];

const ClientAnalytics = () => {
  const [dateRange, setDateRange] = useState('7days');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-slate-600">Performance metrics and AWS usage</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Current Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>Excellent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingDown className="h-3 w-3" />
              <span>-8ms vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Page Load Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.2s</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingDown className="h-3 w-3" />
              <span>-0.1s improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.15%</div>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <TrendingUp className="h-3 w-3" />
              <span>+0.05% vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="errors" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreWebVitals.map((vital, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{vital.metric}</span>
                  <Badge variant={vital.status === 'good' ? 'default' : 'secondary'}>
                    {vital.status === 'good' ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{vital.value}</div>
                <div className="text-xs text-slate-600">Threshold: {vital.threshold}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AWS Usage */}
      <Card>
        <CardHeader>
          <CardTitle>AWS Resource Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {awsUsage.map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{resource.service}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{resource.cost}</Badge>
                    <span className="text-sm text-slate-600">
                      {resource.usage}{resource.unit || '%'} / {resource.limit}{resource.unit || '%'}
                    </span>
                  </div>
                </div>
                <Progress value={(resource.usage / resource.limit) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAnalytics;
