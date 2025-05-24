
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, AlertTriangle, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', cost: 78.50 },
  { month: 'Feb', cost: 82.30 },
  { month: 'Mar', cost: 76.80 },
  { month: 'Apr', cost: 89.50 },
  { month: 'May', cost: 95.20 },
  { month: 'Jun', cost: 89.50 },
];

const costBreakdown = [
  { name: 'EC2', value: 42.50, color: '#3b82f6' },
  { name: 'RDS', value: 15.50, color: '#10b981' },
  { name: 'S3', value: 3.85, color: '#f59e0b' },
  { name: 'CloudFront', value: 2.85, color: '#ef4444' },
  { name: 'Other', value: 24.80, color: '#8b5cf6' },
];

const currentUsage = [
  { service: 'EC2 Hours', used: 720, limit: 1000, cost: '$42.50' },
  { service: 'RDS Hours', used: 720, limit: 720, cost: '$15.50' },
  { service: 'S3 Storage', used: 18.2, limit: 50, cost: '$3.85', unit: 'GB' },
  { service: 'Data Transfer', used: 45, limit: 100, cost: '$2.85', unit: 'GB' },
];

const ClientBilling = () => {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Billing & Usage</h1>
          <p className="text-slate-600">Monitor your AWS costs and usage</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
      </div>

      {/* Current Month Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalCost.toFixed(2)}</div>
            <p className="text-xs text-slate-600">Estimated total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">vs Last Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">+$5.20</div>
            <p className="text-xs text-red-600">↑ 6.2% increase</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Budget Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">90% of budget used</span>
            </div>
            <Progress value={90} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">${item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Current Usage & Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentUsage.map((usage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{usage.service}</span>
                  <Badge variant="outline">{usage.cost}</Badge>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{usage.used}{usage.unit || ''} used</span>
                  <span>{usage.limit}{usage.unit || ''} limit</span>
                </div>
                <Progress value={(usage.used / usage.limit) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientBilling;
