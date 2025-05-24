
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { MessageCircle, Upload, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ticketHistory = [
  {
    id: 'TKT-001',
    title: 'High CPU usage on EC2 instance',
    status: 'resolved',
    priority: 'high',
    created: '2024-01-15',
    updated: '2024-01-16',
    description: 'Our EC2 instance is showing consistently high CPU usage over 80%.',
  },
  {
    id: 'TKT-002',
    title: 'SSL certificate renewal needed',
    status: 'open',
    priority: 'medium',
    created: '2024-01-18',
    updated: '2024-01-18',
    description: 'SSL certificate expires in 30 days, need assistance with renewal.',
  },
  {
    id: 'TKT-003',
    title: 'Database connection timeout',
    status: 'in-progress',
    priority: 'high',
    created: '2024-01-20',
    updated: '2024-01-21',
    description: 'RDS database showing connection timeout errors intermittently.',
  },
];

const ClientSupport = () => {
  const [newTicket, setNewTicket] = useState({
    title: '',
    priority: 'medium',
    description: '',
    attachment: null as File | null,
  });
  const { toast } = useToast();

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTicket.title || !newTicket.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket submitted",
      description: "Your support ticket has been created successfully",
    });

    setNewTicket({
      title: '',
      priority: 'medium',
      description: '',
      attachment: null,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'default';
      case 'in-progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support Center</h1>
        <p className="text-slate-600">Get help with your infrastructure and services</p>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="new">New Ticket</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {ticketHistory.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <CardTitle className="text-lg">{ticket.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(ticket.priority)}>
                        {ticket.priority} priority
                      </Badge>
                      <Badge variant={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">#{ticket.id}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700 mb-4">{ticket.description}</p>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Created: {ticket.created}</span>
                    <span>Last updated: {ticket.updated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Ticket
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full p-2 border border-slate-200 rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Detailed description of the issue, steps to reproduce, expected vs actual behavior..."
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="attachment">Attachment (optional)</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="attachment"
                      type="file"
                      onChange={(e) => setNewTicket({...newTicket, attachment: e.target.files?.[0] || null})}
                      className="flex-1"
                    />
                    <Upload className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Max file size: 10MB. Supported formats: PNG, JPG, PDF, TXT
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    Submit Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setNewTicket({
                    title: '',
                    priority: 'medium',
                    description: '',
                    attachment: null,
                  })}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Technical Support</Label>
                  <p className="text-sm text-slate-600">support@sbcdeploy.com</p>
                  <p className="text-sm text-slate-600">Available 24/7</p>
                </div>
                <div>
                  <Label className="font-medium">Account Manager</Label>
                  <p className="text-sm text-slate-600">manager@sbcdeploy.com</p>
                  <p className="text-sm text-slate-600">Mon-Fri, 9AM-6PM EST</p>
                </div>
                <div>
                  <Label className="font-medium">Emergency Hotline</Label>
                  <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-slate-600">Critical issues only</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Urgent</span>
                  <Badge variant="destructive">15 minutes</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">High</span>
                  <Badge variant="secondary">2 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Medium</span>
                  <Badge variant="outline">8 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Low</span>
                  <Badge variant="outline">24 hours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSupport;
