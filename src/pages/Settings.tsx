
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronRight, Github, RefreshCw, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Mock data for demo purposes
const organizations = [
  { id: 'org1', name: 'Personal Account' },
  { id: 'org2', name: 'SBC-Deploy' },
  { id: 'org3', name: 'Acme Corp' },
];

const repositories = [
  { id: 'repo1', name: 'sbc-deploy-frontend', description: 'Frontend for SBC-Deploy platform', updatedAt: '2 days ago', isPrivate: false },
  { id: 'repo2', name: 'client-portal', description: 'Client portal application', updatedAt: '1 week ago', isPrivate: true },
  { id: 'repo3', name: 'deployment-api', description: 'API for deployment automation', updatedAt: '3 days ago', isPrivate: true },
  { id: 'repo4', name: 'marketing-site', description: 'Marketing website', updatedAt: '5 days ago', isPrivate: false },
];

const templates = [
  { id: 'template1', name: 'Next.js', description: 'The React framework for production', icon: '📦' },
  { id: 'template2', name: 'AI Chatbot', description: 'Conversational AI chatbot starter', icon: '🤖' },
  { id: 'template3', name: 'Vite + React', description: 'Frontend tooling with React', icon: '⚡' },
  { id: 'template4', name: 'Commerce', description: 'E-commerce starter kit', icon: '🛒' },
];

const Settings = () => {
  const [selectedOrg, setSelectedOrg] = useState('org1');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [isConnected, setIsConnected] = useState(true);

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6"  style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-600">Configure your deployment settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Connect Git Repository */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Connect Git Repository</CardTitle>
                <CardDescription>
                  Import your projects from GitHub
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-slate-600">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* GitHub Organization Selector */}
              <div className="space-y-2">
                <Label htmlFor="organization">GitHub Organization</Label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger id="organization" className="w-full">
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map(org => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Branch Selection */}
              <div className="space-y-2">
                <Label htmlFor="branch">Default Branch</Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="staging">staging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Auto-deploy toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-deploy on push</p>
                  <p className="text-sm text-slate-600">
                    Automatically deploy when new commits are pushed to your repository
                  </p>
                </div>
                <Switch
                  checked={autoDeploy}
                  onCheckedChange={setAutoDeploy}
                />
              </div>
              
              {/* GitHub Auth Button */}
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Github className="h-4 w-4" />
                {isConnected ? 'Reconnect GitHub Account' : 'Connect GitHub Account'}
              </Button>
              
              {/* Repository Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search repositories..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Repository List */}
              <div className="border rounded-md divide-y">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map(repo => (
                    <div key={repo.id} className="p-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{repo.name}</h3>
                          {repo.isPrivate && (
                            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">Private</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{repo.description}</p>
                        <p className="text-xs text-slate-400">Updated {repo.updatedAt}</p>
                      </div>
                      <Button size="sm">Import</Button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-slate-600">No repositories found matching your search.</p>
                  </div>
                )}
              </div>
              
              {/* Pagination Placeholder */}
              <div className="flex justify-between items-center text-sm text-slate-600">
                <div>
                  Showing {filteredRepos.length} of {repositories.length} repositories
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Clone Template */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Clone Template</CardTitle>
              <CardDescription>
                Start with a pre-configured template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {templates.map(template => (
                <div 
                  key={template.id} 
                  className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{template.icon}</div>
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-slate-600">{template.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Browse More Templates
              </Button>
            </CardContent>
          </Card>
          
          {/* Additional Settings Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable API Access</p>
                  <p className="text-sm text-slate-600">Allow programmatic access via API</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Webhook Notifications</p>
                  <p className="text-sm text-slate-600">Send deployment events to webhooks</p>
                </div>
                <Switch />
              </div>
              
              <Button variant="outline" className="w-full">
                View API Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
