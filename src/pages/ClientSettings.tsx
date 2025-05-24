
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, User, Bell, Shield, Server } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const teamMembers = [
  { id: 1, name: 'John Smith', email: 'john@acmecorp.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@acmecorp.com', role: 'Developer', status: 'active' },
  { id: 3, name: 'Mike Wilson', email: 'mike@acmecorp.com', role: 'Viewer', status: 'pending' },
];

const ClientSettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Acme Corp',
    domain: 'acmecorp.com',
    alertEmail: 'alerts@acmecorp.com',
  });

  const [notifications, setNotifications] = useState({
    uptime: true,
    performance: true,
    billing: true,
    security: false,
  });

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'viewer',
  });

  const { toast } = useToast();

  const handleSaveCompany = () => {
    toast({
      title: "Settings saved",
      description: "Company information has been updated successfully",
    });
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invitation sent",
      description: `Team member invitation sent to ${newMember.email}`,
    });

    setNewMember({ name: '', email: '', role: 'viewer' });
  };

  const handleRequestUpgrade = () => {
    toast({
      title: "Upgrade request submitted",
      description: "SBC manager will contact you within 24 hours",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-slate-600">Manage your company profile and preferences</p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="domain">Primary Domain</Label>
                <Input
                  id="domain"
                  value={companyInfo.domain}
                  onChange={(e) => setCompanyInfo({...companyInfo, domain: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="alertEmail">Alert Email</Label>
                <Input
                  id="alertEmail"
                  type="email"
                  value={companyInfo.alertEmail}
                  onChange={(e) => setCompanyInfo({...companyInfo, alertEmail: e.target.value})}
                />
                <p className="text-xs text-slate-500 mt-1">
                  This email will receive important notifications and alerts
                </p>
              </div>

              <Button onClick={handleSaveCompany}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-slate-600">{member.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{member.role}</Badge>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Team Member
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="memberName">Name</Label>
                  <Input
                    id="memberName"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="memberEmail">Email</Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <Label htmlFor="memberRole">Role</Label>
                  <select
                    id="memberRole"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full p-2 border border-slate-200 rounded-md"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="developer">Developer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleAddMember}>
                Send Invitation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Uptime Monitoring</div>
                  <div className="text-sm text-slate-600">Get notified when services go down</div>
                </div>
                <Switch
                  checked={notifications.uptime}
                  onCheckedChange={(checked) => setNotifications({...notifications, uptime: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Performance Alerts</div>
                  <div className="text-sm text-slate-600">Alerts for slow response times or high error rates</div>
                </div>
                <Switch
                  checked={notifications.performance}
                  onCheckedChange={(checked) => setNotifications({...notifications, performance: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Billing Notifications</div>
                  <div className="text-sm text-slate-600">Monthly billing summaries and usage alerts</div>
                </div>
                <Switch
                  checked={notifications.billing}
                  onCheckedChange={(checked) => setNotifications({...notifications, billing: checked})}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Security Alerts</div>
                  <div className="text-sm text-slate-600">Failed login attempts and security events</div>
                </div>
                <Switch
                  checked={notifications.security}
                  onCheckedChange={(checked) => setNotifications({...notifications, security: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Infrastructure Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="font-medium mb-2">Current Tier: Basic</div>
                <div className="text-sm text-slate-600 mb-4">
                  EC2: t3.micro, RDS: db.t3.micro, S3: 5GB limit
                </div>
                <Button onClick={handleRequestUpgrade}>
                  Request Tier Upgrade
                </Button>
              </div>

              <Separator />

              <div>
                <div className="font-medium mb-2">Available Upgrades</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <div className="font-medium">Standard Tier</div>
                      <div className="text-sm text-slate-600">t3.small, db.t3.small, 20GB S3</div>
                    </div>
                    <Badge variant="outline">+$25/month</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <div className="font-medium">Professional Tier</div>
                      <div className="text-sm text-slate-600">t3.medium, db.t3.medium, 100GB S3</div>
                    </div>
                    <Badge variant="outline">+$75/month</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSettings;
