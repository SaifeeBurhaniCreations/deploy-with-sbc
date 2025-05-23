import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronRight, Github, RefreshCw, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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

// GitHub reconnection flow steps
const STEPS = {
  CHOOSE_METHOD: 0,
  MANUAL_URL: 1,
  SELECT_REPO: 2,
  CREDENTIALS: 3,
  CONFIRM: 4,
};

const Settings = () => {
  const [selectedOrg, setSelectedOrg] = useState('org1');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoDeploy, setAutoDeploy] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [isConnected, setIsConnected] = useState(true);
  
  // API Documentation dialog state
  const [apiDocsOpen, setApiDocsOpen] = useState(false);
  
  // GitHub reconnection flow states
  const [reconnectOpen, setReconnectOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.CHOOSE_METHOD);
  const [reconnectMethod, setReconnectMethod] = useState<'oauth' | 'manual' | null>(null);
  const [manualUrl, setManualUrl] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  
  const { toast } = useToast();

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle GitHub reconnection workflow
  const handleReconnectGithub = () => {
    setReconnectOpen(true);
    setCurrentStep(STEPS.CHOOSE_METHOD);
  };

  const handleNextStep = () => {
    if (currentStep === STEPS.CHOOSE_METHOD) {
      if (reconnectMethod === 'oauth') {
          setTimeout(() => {
          setCurrentStep(STEPS.SELECT_REPO);
        }, 1000);
      } else if (reconnectMethod === 'manual') {
        setCurrentStep(STEPS.MANUAL_URL);
      }
    } else if (currentStep === STEPS.MANUAL_URL) {
      // Validate URL
      if (!manualUrl) {
        toast({
          title: "URL Required",
          description: "Please enter a valid GitHub repository URL",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(STEPS.CREDENTIALS);
    } else if (currentStep === STEPS.SELECT_REPO) {
      if (!selectedRepo) {
        toast({
          title: "Repository Required",
          description: "Please select a repository to continue",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(STEPS.CONFIRM);
    } else if (currentStep === STEPS.CREDENTIALS) {
      if (!githubUsername || !githubToken) {
        toast({
          title: "Credentials Required",
          description: "Please enter your GitHub credentials to continue",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(STEPS.CONFIRM);
    } else if (currentStep === STEPS.CONFIRM) {
      // Simulate successful connection
      setReconnectOpen(false);
      setIsConnected(true);
      toast({
        title: "GitHub Connected",
        description: "Your GitHub account has been successfully connected",
      });
    }
  };

  const handleResetFlow = () => {
    setReconnectOpen(false);
    setCurrentStep(STEPS.CHOOSE_METHOD);
    setReconnectMethod(null);
    setManualUrl('');
    setGithubUsername('');
    setGithubToken('');
    setSelectedRepo(null);
  };

  // Render different steps of the reconnection flow
  const renderReconnectStep = () => {
    switch (currentStep) {
      case STEPS.CHOOSE_METHOD:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Choose how you want to connect your GitHub account:</p>
            <div className="space-y-3">
              <button 
                className={`flex items-center w-full p-4 border rounded-md ${reconnectMethod === 'oauth' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                onClick={() => setReconnectMethod('oauth')}
              >
                <Github className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Sign in with GitHub</p>
                  <p className="text-sm text-slate-500">Authenticate via GitHub OAuth</p>
                </div>
              </button>
              
              <button 
                className={`flex items-center w-full p-4 border rounded-md ${reconnectMethod === 'manual' ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                onClick={() => setReconnectMethod('manual')}
              >
                <Search className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Manual URL Entry</p>
                  <p className="text-sm text-slate-500">Enter repository URL directly</p>
                </div>
              </button>
            </div>
          </div>
        );
      case STEPS.MANUAL_URL:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">GitHub Repository URL</Label>
              <Input 
                id="repo-url" 
                placeholder="https://github.com/username/repo"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
              />
              <p className="text-xs text-slate-500">
                Enter the full URL of your GitHub repository
              </p>
            </div>
          </div>
        );
      case STEPS.SELECT_REPO:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Select a repository to import:</p>
            <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
              {repositories.map(repo => (
                <div 
                  key={repo.id} 
                  className={`p-4 flex items-start cursor-pointer hover:bg-slate-50 ${selectedRepo === repo.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}
                  onClick={() => setSelectedRepo(repo.id)}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{repo.name}</h3>
                      {repo.isPrivate && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded">Private</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{repo.description}</p>
                    <p className="text-xs text-slate-400">Updated {repo.updatedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case STEPS.CREDENTIALS:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Enter your GitHub credentials:</p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="GitHub username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Personal Access Token</Label>
                <Input 
                  id="token" 
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxx"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                />
                <p className="text-xs text-slate-500">
                  Tokens can be created in GitHub under Settings → Developer Settings → Personal Access Tokens
                </p>
              </div>
            </div>
          </div>
        );
      case STEPS.CONFIRM:
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h3 className="font-medium text-green-800 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ready to connect
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Your GitHub account is ready to be connected. Click confirm to complete the setup.
              </p>
            </div>
            <div className="border rounded-md p-4">
              <h4 className="font-medium">Connection Details</h4>
              {reconnectMethod === 'oauth' ? (
                <p className="text-sm text-slate-600 mt-1">GitHub OAuth authentication with selected repository: <span className="font-medium">{repositories.find(r => r.id === selectedRepo)?.name}</span></p>
              ) : (
                <p className="text-sm text-slate-600 mt-1">Manual connection to: <span className="font-medium">{manualUrl}</span></p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
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
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleReconnectGithub}
              >
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
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setApiDocsOpen(true)}
              >
                View API Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Documentation Dialog */}
      <Dialog open={apiDocsOpen} onOpenChange={setApiDocsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>SBC-Deploy API Documentation</DialogTitle>
            <DialogDescription>
              How to interact with SBC-Deploy services programmatically
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Authentication Section */}
            <div>
              <h3 className="text-lg font-medium">Authentication</h3>
              <div className="mt-3 p-4 bg-slate-50 rounded-md border">
                <p className="text-sm">All API requests require authentication using an API key.</p>
                <div className="mt-2">
                  <code className="text-xs bg-slate-100 p-1 rounded">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
                <p className="text-xs mt-2 text-slate-500">
                  API keys can be generated in your account settings. Keep your API keys secure and never share them.
                </p>
              </div>
            </div>
            
            {/* Endpoints Section */}
            <div>
              <h3 className="text-lg font-medium">Endpoints</h3>
              
              {/* Deployments Endpoint */}
              <div className="mt-3 border rounded-md">
                <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">GET</span>
                    <span className="ml-2 font-mono text-sm">/api/deployments</span>
                  </div>
                  <span className="text-xs text-slate-500">List deployments</span>
                </div>
                <div className="p-3">
                  <p className="text-sm">Returns a list of all deployments for your account.</p>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="mt-1 p-2 bg-slate-50 rounded-md overflow-x-auto text-xs">
                      <code>
{`curl -X GET "https://api.sbc-deploy.com/api/deployments" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                      </code>
                    </pre>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium">Example Response</h4>
                    <pre className="mt-1 p-2 bg-slate-50 rounded-md overflow-x-auto text-xs">
                      <code>
{`{
  "deployments": [
    {
      "id": "dep_123abc",
      "name": "Production",
      "status": "active",
      "url": "https://myapp.sbc-deploy.com",
      "createdAt": "2023-05-10T14:48:00Z",
      "updatedAt": "2023-05-10T14:48:00Z"
    },
    {
      "id": "dep_456def",
      "name": "Staging",
      "status": "active",
      "url": "https://staging.myapp.sbc-deploy.com",
      "createdAt": "2023-05-09T10:24:00Z",
      "updatedAt": "2023-05-09T10:24:00Z"
    }
  ],
  "total": 2
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Create Deployment Endpoint */}
              <div className="mt-3 border rounded-md">
                <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">POST</span>
                    <span className="ml-2 font-mono text-sm">/api/deployments</span>
                  </div>
                  <span className="text-xs text-slate-500">Create deployment</span>
                </div>
                <div className="p-3">
                  <p className="text-sm">Creates a new deployment from a Git repository.</p>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="mt-1 p-2 bg-slate-50 rounded-md overflow-x-auto text-xs">
                      <code>
{`curl -X POST "https://api.sbc-deploy.com/api/deployments" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "New Deployment",
    "repository": "https://github.com/user/repo",
    "branch": "main",
    "environment": {
      "NODE_ENV": "production"
    }
  }'`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rate Limits Section */}
            <div>
              <h3 className="text-lg font-medium">Rate Limits</h3>
              <div className="mt-2">
                <p className="text-sm">The API has the following rate limits:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-slate-600">
                  <li>60 requests per minute for paid accounts</li>
                  <li>30 requests per minute for free accounts</li>
                </ul>
                <p className="mt-2 text-sm">
                  Rate limit information is included in the response headers:
                </p>
                <pre className="mt-1 p-2 bg-slate-50 rounded-md overflow-x-auto text-xs">
                  <code>
{`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1620680340`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setApiDocsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* GitHub Reconnect Dialog */}
      <AlertDialog open={reconnectOpen} onOpenChange={setReconnectOpen}>
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {currentStep === STEPS.CONFIRM ? "Confirm GitHub Connection" : "Connect to GitHub"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentStep === STEPS.CONFIRM 
                ? "Review and confirm your GitHub connection details."
                : "Connect your GitHub account to import and deploy repositories."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              {Object.keys(STEPS).map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block text-slate-500">
                    {step.replace('_', ' ').toLowerCase()}
                  </span>
                </div>
              ))}
            </div>

            {renderReconnectStep()}
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleResetFlow}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleNextStep}
              disabled={
                (currentStep === STEPS.CHOOSE_METHOD && !reconnectMethod) ||
                (currentStep === STEPS.SELECT_REPO && !selectedRepo)
              }
            >
              {currentStep === STEPS.CONFIRM ? 'Connect' : 'Next'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
