
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DownloadCloud, 
  Edit, 
  MoreHorizontal, 
  Pause, 
  Play, 
  RefreshCw, 
  Search, 
  Trash2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample data
const deployments = [
  { 
    id: 'dep-001', 
    name: 'Client Portal', 
    subdomain: 'portal.client1.sbc-deploy.com', 
    status: 'active',
    lastDeployed: '2023-05-18 14:32',
    region: 'us-east',
    framework: 'Next.js',
  },
  { 
    id: 'dep-002', 
    name: 'Marketing Website', 
    subdomain: 'marketing.client2.sbc-deploy.com', 
    status: 'active',
    lastDeployed: '2023-05-17 10:15',
    region: 'us-west',
    framework: 'Vite',
  },
  { 
    id: 'dep-003', 
    name: 'Admin Dashboard', 
    subdomain: 'admin.client3.sbc-deploy.com', 
    status: 'paused',
    lastDeployed: '2023-05-15 08:45',
    region: 'eu-central',
    framework: 'React',
  },
  { 
    id: 'dep-004', 
    name: 'API Service', 
    subdomain: 'api.client1.sbc-deploy.com', 
    status: 'error',
    lastDeployed: '2023-05-14 22:10',
    region: 'us-east',
    framework: 'Express',
  },
  { 
    id: 'dep-005', 
    name: 'Documentation Site', 
    subdomain: 'docs.client2.sbc-deploy.com', 
    status: 'active',
    lastDeployed: '2023-05-12 16:20',
    region: 'us-west',
    framework: 'Next.js',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

type SortField = 'name' | 'status' | 'lastDeployed' | 'region' | 'framework';
type SortDirection = 'asc' | 'desc';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('lastDeployed');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort deployments
  const filteredDeployments = deployments
    .filter(deployment => 
      (statusFilter === 'all' || deployment.status === statusFilter) && 
      (deployment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       deployment.subdomain.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === 'lastDeployed') {
        return sortDirection === 'asc' 
          ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
          : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
      } else {
        return sortDirection === 'asc'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-600">Manage all deployments and environments</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search deployments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="md:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    <button 
                      onClick={() => handleSort('name')} 
                      className="flex items-center gap-1 hover:text-tech-blue"
                    >
                      Name
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Subdomain</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    <button 
                      onClick={() => handleSort('status')} 
                      className="flex items-center gap-1 hover:text-tech-blue"
                    >
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    <button 
                      onClick={() => handleSort('lastDeployed')} 
                      className="flex items-center gap-1 hover:text-tech-blue"
                    >
                      Last Deployed
                      {sortField === 'lastDeployed' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    <button 
                      onClick={() => handleSort('region')} 
                      className="flex items-center gap-1 hover:text-tech-blue"
                    >
                      Region
                      {sortField === 'region' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    <button 
                      onClick={() => handleSort('framework')} 
                      className="flex items-center gap-1 hover:text-tech-blue"
                    >
                      Framework
                      {sortField === 'framework' && (
                        sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                      )}
                    </button>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeployments.map((deployment) => (
                  <tr key={deployment.id} className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">{deployment.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      <a 
                        href={`https://${deployment.subdomain}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-tech-blue hover:underline"
                      >
                        {deployment.subdomain}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[deployment.status]
                        }`}
                      >
                        {deployment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{deployment.lastDeployed}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{deployment.region}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{deployment.framework}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            {deployment.status === 'paused' ? (
                              <>
                                <Play className="h-4 w-4" /> Resume
                              </>
                            ) : (
                              <>
                                <Pause className="h-4 w-4" /> Pause
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" /> Redeploy
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <DownloadCloud className="h-4 w-4" /> Backup
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredDeployments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-slate-500">No deployments found matching your filters.</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-between items-center text-sm text-slate-500">
            <div>
              Showing {filteredDeployments.length} of {deployments.length} deployments
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
