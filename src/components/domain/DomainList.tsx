
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, ExternalLink, Settings, Trash2 } from 'lucide-react';

interface Domain {
  id: number;
  name: string;
  status: 'active' | 'verifying' | 'error' | 'pending';
  sslStatus: 'active' | 'provisioning' | 'error';
  addedDate: string;
  lastChecked: string;
}

const mockDomains: Domain[] = [
  {
    id: 1,
    name: 'example.com',
    status: 'active',
    sslStatus: 'active',
    addedDate: '2024-01-10',
    lastChecked: '2 minutes ago'
  },
  {
    id: 2,
    name: 'staging.myproject.com',
    status: 'verifying',
    sslStatus: 'provisioning',
    addedDate: '2024-01-15',
    lastChecked: '1 hour ago'
  },
  {
    id: 3,
    name: 'old-domain.com',
    status: 'error',
    sslStatus: 'error',
    addedDate: '2024-01-05',
    lastChecked: '1 day ago'
  }
];

interface DomainListProps {
  onAddDomain: () => void;
}

const DomainList = ({ onAddDomain }: DomainListProps) => {
  const getStatusBadge = (status: Domain['status']) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Active' },
      verifying: { variant: 'secondary' as const, label: 'Verifying' },
      error: { variant: 'destructive' as const, label: 'Error' },
      pending: { variant: 'outline' as const, label: 'Pending' }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getSslBadge = (sslStatus: Domain['sslStatus']) => {
    const sslConfig = {
      active: { variant: 'default' as const, label: 'SSL Active' },
      provisioning: { variant: 'secondary' as const, label: 'Provisioning' },
      error: { variant: 'destructive' as const, label: 'SSL Error' }
    };
    
    const config = sslConfig[sslStatus];
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Connected Domains
          </CardTitle>
          <Button onClick={onAddDomain}>
            Add Domain
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {mockDomains.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No domains connected</h3>
            <p className="text-slate-600 mb-4">
              Connect your custom domain to make your site accessible at your own URL.
            </p>
            <Button onClick={onAddDomain}>
              Add Your First Domain
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SSL</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDomains.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="font-medium">{domain.name}</p>
                        {domain.status === 'active' && (
                          <a
                            href={`https://${domain.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Visit site <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(domain.status)}</TableCell>
                  <TableCell>{getSslBadge(domain.sslStatus)}</TableCell>
                  <TableCell className="text-sm text-slate-600">{domain.addedDate}</TableCell>
                  <TableCell className="text-sm text-slate-600">{domain.lastChecked}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainList;
