
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  // Modal states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState<typeof deployments[0] | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [redeployDialogOpen, setRedeployDialogOpen] = useState(false);
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  
  // Form state for edit dialog
  const [editForm, setEditForm] = useState({
    name: '',
    subdomain: '',
    region: '',
    framework: ''
  });

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

  // Action handlers
  const handleEditClick = (deployment: typeof deployments[0]) => {
    setSelectedDeployment(deployment);
    setEditForm({
      name: deployment.name,
      subdomain: deployment.subdomain,
      region: deployment.region,
      framework: deployment.framework
    });
    setEditDialogOpen(true);
  };

  const handleRedeployClick = (deployment: typeof deployments[0]) => {
    setSelectedDeployment(deployment);
    setRedeployDialogOpen(true);
  };

  const handleDeleteClick = (deployment: typeof deployments[0]) => {
    setSelectedDeployment(deployment);
    setDeleteDialogOpen(true);
  };

  const handleBackupClick = (deployment: typeof deployments[0]) => {
    setSelectedDeployment(deployment);
    setBackupDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // Here you would implement the actual edit logic
    setEditDialogOpen(false);
    toast({
      title: "Deployment updated",
      description: `${editForm.name} has been updated successfully.`,
    });
  };

  const handleConfirmDelete = () => {
    // Here you would implement the actual delete logic
    setDeleteDialogOpen(false);
    if (selectedDeployment) {
      toast({
        title: "Deployment deleted",
        description: `${selectedDeployment.name} has been deleted successfully.`,
      });
    }
  };

  const handleConfirmRedeploy = () => {
    // Here you would implement the actual redeploy logic
    setRedeployDialogOpen(false);
    if (selectedDeployment) {
      toast({
        title: "Redeployment initiated",
        description: `${selectedDeployment.name} is now being redeployed.`,
      });
    }
  };

  const handleConfirmBackup = () => {
    // Here you would implement the actual backup logic
    setBackupDialogOpen(false);
    if (selectedDeployment) {
      toast({
        title: "Backup started",
        description: `Creating a backup of ${selectedDeployment.name}. This may take a few minutes.`,
      });
    }
  };

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
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleEditClick(deployment)}
                          >
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => {
                              if (deployment.status === 'paused') {
                                // Resume logic would go here
                                toast({
                                  title: "Deployment resumed",
                                  description: `${deployment.name} has been resumed.`,
                                });
                              } else {
                                // Pause logic would go here
                                toast({
                                  title: "Deployment paused",
                                  description: `${deployment.name} has been paused.`,
                                });
                              }
                            }}
                          >
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
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleRedeployClick(deployment)}
                          >
                            <RefreshCw className="h-4 w-4" /> Redeploy
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2"
                            onClick={() => handleBackupClick(deployment)}
                          >
                            <DownloadCloud className="h-4 w-4" /> Backup
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 text-red-600"
                            onClick={() => handleDeleteClick(deployment)}
                          >
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

      {/* Edit Deployment Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Deployment</DialogTitle>
            <DialogDescription>
              Make changes to your deployment settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                value={editForm.name} 
                onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subdomain" className="text-sm font-medium">Subdomain</label>
              <Input 
                id="subdomain" 
                value={editForm.subdomain} 
                onChange={(e) => setEditForm({...editForm, subdomain: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="region" className="text-sm font-medium">Region</label>
              <Select 
                value={editForm.region} 
                onValueChange={(value) => setEditForm({...editForm, region: value})}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east">US East</SelectItem>
                  <SelectItem value="us-west">US West</SelectItem>
                  <SelectItem value="eu-central">EU Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="framework" className="text-sm font-medium">Framework</label>
              <Select 
                value={editForm.framework} 
                onValueChange={(value) => setEditForm({...editForm, framework: value})}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Next.js">Next.js</SelectItem>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Vite">Vite</SelectItem>
                  <SelectItem value="Express">Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redeploy Confirmation Dialog */}
      <Dialog open={redeployDialogOpen} onOpenChange={setRedeployDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redeploy</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeploy {selectedDeployment?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-500">
              This will rebuild and deploy your application with the latest committed changes. 
              This process may take several minutes to complete.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRedeployDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmRedeploy}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Redeploy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Backup Dialog */}
      <Dialog open={backupDialogOpen} onOpenChange={setBackupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Backup</DialogTitle>
            <DialogDescription>
              Create a backup of {selectedDeployment?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-500 mb-4">
              This will create a backup of your application, including all database content, files, and configurations.
            </p>
            <div className="space-y-2">
              <label htmlFor="backup-name" className="text-sm font-medium">Backup Name</label>
              <Input id="backup-name" placeholder={`${selectedDeployment?.name}-backup-${new Date().toISOString().split('T')[0]}`} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBackupDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmBackup}>
              <DownloadCloud className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the deployment
              "{selectedDeployment?.name}" and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700" 
              onClick={handleConfirmDelete}
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
