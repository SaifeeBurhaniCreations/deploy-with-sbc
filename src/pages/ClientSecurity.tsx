
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, AlertTriangle, Shield, Smartphone, Monitor, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const authLogs = [
  { id: 1, timestamp: '2024-01-15 10:30:00', ip: '192.168.1.100', browser: 'Chrome 120.0', location: 'New York, NY', status: 'success' },
  { id: 2, timestamp: '2024-01-15 09:15:30', ip: '10.0.0.50', browser: 'Firefox 121.0', location: 'San Francisco, CA', status: 'success' },
  { id: 3, timestamp: '2024-01-14 14:22:15', ip: '203.0.113.0', browser: 'Safari 17.0', location: 'Unknown', status: 'failed' },
];

const activeSessions = [
  { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'New York, NY', lastActive: '2 minutes ago', current: true },
  { id: 2, device: 'iPhone 15', browser: 'Safari', location: 'New York, NY', lastActive: '1 hour ago', current: false },
  { id: 3, device: 'Desktop PC', browser: 'Firefox', location: 'San Francisco, CA', lastActive: '3 days ago', current: false },
];

const ClientSecurity = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityAlertsEnabled, setSecurityAlertsEnabled] = useState(true);
  const [allowedIps, setAllowedIps] = useState('192.168.1.0/24\n10.0.0.0/8');
  const [twoFactorPhone, setTwoFactorPhone] = useState('');
  const { toast } = useToast();

  const handleTerminateSession = (sessionId: number) => {
    toast({
      title: "Session Terminated",
      description: "The selected session has been terminated successfully.",
    });
  };

  const handleSave2FA = () => {
    setTwoFactorEnabled(true);
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been enabled for your account.",
    });
  };

  const handleSaveIpWhitelist = () => {
    toast({
      title: "IP Whitelist Updated",
      description: "Your allowed IP ranges have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-slate-600">Manage your account security and access controls</p>
      </div>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
            </div>
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
          
          {!twoFactorEnabled && (
            <div className="space-y-3 pt-4 border-t">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={twoFactorPhone}
                  onChange={(e) => setTwoFactorPhone(e.target.value)}
                />
              </div>
              <Button onClick={handleSave2FA} disabled={!twoFactorPhone}>
                <Smartphone className="h-4 w-4 mr-2" />
                Enable 2FA
              </Button>
            </div>
          )}
          
          {twoFactorEnabled && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is active. You'll receive SMS codes for login verification.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device & Browser</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-slate-600">{session.browser}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {session.location}
                    </div>
                  </TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell>
                    {session.current ? (
                      <Badge>Current</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* IP Whitelist */}
      <Card>
        <CardHeader>
          <CardTitle>Allowed IP Ranges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ips">IP Addresses (CIDR format)</Label>
            <textarea
              id="ips"
              className="w-full mt-1 p-2 border border-slate-200 rounded-md font-mono text-sm"
              rows={4}
              value={allowedIps}
              onChange={(e) => setAllowedIps(e.target.value)}
              placeholder="192.168.1.0/24&#10;10.0.0.0/8"
            />
            <p className="text-xs text-slate-600 mt-1">
              Enter one IP range per line. Use CIDR notation (e.g., 192.168.1.0/24)
            </p>
          </div>
          <Button onClick={handleSaveIpWhitelist}>
            Save IP Whitelist
          </Button>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-slate-600">
                Receive emails about suspicious login attempts and security events
              </p>
            </div>
            <Switch 
              checked={securityAlertsEnabled} 
              onCheckedChange={setSecurityAlertsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Authentication Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Authentication Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-mono">{log.ip}</TableCell>
                  <TableCell>{log.browser}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {log.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSecurity;
