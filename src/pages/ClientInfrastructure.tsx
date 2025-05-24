
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Server, Database, HardDrive, Zap, TrendingUp, ArrowUpRight } from 'lucide-react';

const ec2Instances = [
  { id: 'i-1234567890abcdef0', type: 't3.micro', region: 'us-east-1', status: 'running', cpuUsage: 35, ramUsage: 60, uptime: '14 days', cost: '$8.50/month' },
  { id: 'i-0987654321fedcba0', type: 't3.small', region: 'us-east-1', status: 'running', cpuUsage: 45, ramUsage: 75, uptime: '7 days', cost: '$17.00/month' },
];

const ecsServices = [
  { name: 'web-app-service', cluster: 'production', runningTasks: 3, desiredTasks: 3, cpu: '512', memory: '1024', status: 'stable' },
  { name: 'api-service', cluster: 'production', runningTasks: 2, desiredTasks: 2, cpu: '256', memory: '512', status: 'stable' },
];

const s3Buckets = [
  { name: 'acme-website-assets', size: '2.4 GB', objects: '1,543', requests: '45.2K/month', cost: '$0.65/month' },
  { name: 'acme-backups', size: '15.8 GB', objects: '89', requests: '1.2K/month', cost: '$3.20/month' },
];

const otherServices = [
  { name: 'RDS MySQL', type: 'db.t3.micro', status: 'available', cost: '$15.50/month' },
  { name: 'CloudFront CDN', requests: '2.3M/month', dataTransfer: '45 GB', cost: '$2.85/month' },
  { name: 'Lambda Functions', invocations: '150K/month', duration: '45 GB-seconds', cost: '$0.85/month' },
];

const ClientInfrastructure = () => {
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Infrastructure Overview</h1>
        <p className="text-slate-600">Your AWS resources and usage</p>
      </div>

      <Tabs defaultValue="ec2" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ec2">EC2 Instances</TabsTrigger>
          <TabsTrigger value="ecs">ECS Services</TabsTrigger>
          <TabsTrigger value="s3">S3 Storage</TabsTrigger>
          <TabsTrigger value="other">Other Services</TabsTrigger>
        </TabsList>

        <TabsContent value="ec2" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ec2Instances.map((instance) => (
              <Card key={instance.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedInstance(instance.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{instance.type}</CardTitle>
                    <Badge variant={instance.status === 'running' ? 'default' : 'secondary'}>
                      {instance.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{instance.id}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600">Region</p>
                      <p className="font-medium">{instance.region}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Uptime</p>
                      <p className="font-medium">{instance.uptime}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{instance.cpuUsage}%</span>
                    </div>
                    <Progress value={instance.cpuUsage} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>RAM Usage</span>
                      <span>{instance.ramUsage}%</span>
                    </div>
                    <Progress value={instance.ramUsage} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-bold text-green-600">{instance.cost}</span>
                    <Button variant="outline" size="sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      Upgrade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ecs" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {ecsServices.map((service) => (
              <Card key={service.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{service.name}</CardTitle>
                    <Badge variant={service.status === 'stable' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-600">Cluster</p>
                      <p className="font-medium">{service.cluster}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Tasks</p>
                      <p className="font-medium">{service.runningTasks}/{service.desiredTasks}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">CPU</p>
                      <p className="font-medium">{service.cpu} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Memory</p>
                      <p className="font-medium">{service.memory} MB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="s3" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {s3Buckets.map((bucket) => (
              <Card key={bucket.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5" />
                    {bucket.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-600">Size</p>
                      <p className="font-medium">{bucket.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Objects</p>
                      <p className="font-medium">{bucket.objects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Requests</p>
                      <p className="font-medium">{bucket.requests}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Monthly Cost</p>
                      <p className="font-medium text-green-600">{bucket.cost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.type && (
                      <div>
                        <p className="text-xs text-slate-600">Type</p>
                        <p className="font-medium">{service.type}</p>
                      </div>
                    )}
                    {service.status && (
                      <div>
                        <p className="text-xs text-slate-600">Status</p>
                        <Badge variant="default">{service.status}</Badge>
                      </div>
                    )}
                    {service.requests && (
                      <div>
                        <p className="text-xs text-slate-600">Requests</p>
                        <p className="font-medium">{service.requests}</p>
                      </div>
                    )}
                    {service.invocations && (
                      <div>
                        <p className="text-xs text-slate-600">Invocations</p>
                        <p className="font-medium">{service.invocations}</p>
                      </div>
                    )}
                    <div className="pt-2 border-t">
                      <p className="text-lg font-bold text-green-600">{service.cost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientInfrastructure;
