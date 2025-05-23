
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Github, ChevronRight } from 'lucide-react';

const frameworks = [
  { id: 'expo', name: 'Expo' },
  { id: 'vite', name: 'Vite' },
  { id: 'nextjs', name: 'Next.js' },
  { id: 'reactnative', name: 'React Native' },
  { id: 'electronjs', name: 'Electron.js' },
  { id: 'angularjs', name: 'Angular.js' },
  { id: 'express', name: 'Express' },
  { id: 'django', name: 'Django' },
];

const templates = [
  { id: 'template1', name: 'Next.js', description: 'The React framework for production', icon: '📦' },
  { id: 'template2', name: 'AI Chatbot', description: 'Conversational AI chatbot starter', icon: '🤖' },
  { id: 'template3', name: 'Vite + React', description: 'Frontend tooling with React', icon: '⚡' },
  { id: 'template4', name: 'Commerce', description: 'E-commerce starter kit', icon: '🛒' },
];

const DeployNew = () => {
  const [formData, setFormData] = useState({
    repoUrl: '',
    projectName: '',
    framework: '',
    rootDirectory: '',
    enableEnvVars: false,
  });
  const [isDeploying, setIsDeploying] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      toast("Deployment started", {
        description: `${formData.projectName} is now being deployed.`,
      });
      // Redirect would happen here in a real app
    }, 1500);
  };

  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div>
        <h1 className="text-2xl font-bold">Deploy New Application</h1>
        <p className="text-slate-600">Configure and deploy a new app to SBC-Deploy</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Create Deployment */}
      <div className="lg:col-span-2 space-y-6">
      <Card> 
      {/* style={{width: "50vw"}} */}
        <CardHeader>
          <CardTitle>Deployment Configuration</CardTitle>
          <CardDescription>
            Enter the details for your new deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="repoUrl">GitHub Repository URL</Label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500">
                    <Github className="h-4 w-4" />
                  </span>
                  <Input
                    id="repoUrl"
                    placeholder="https://github.com/username/repo"
                    value={formData.repoUrl}
                    onChange={(e) => handleChange('repoUrl', e.target.value)}
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="my-awesome-app"
                    value={formData.projectName}
                    onChange={(e) => handleChange('projectName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="framework">Framework</Label>
                  <Select 
                    value={formData.framework}
                    onValueChange={(value) => handleChange('framework', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      {frameworks.map((framework) => (
                        <SelectItem key={framework.id} value={framework.id}>
                          {framework.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="rootDirectory">Root Directory</Label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500">
                    <GitBranch className="h-4 w-4" />
                  </span>
                  <Input
                    id="rootDirectory"
                    placeholder="/"
                    value={formData.rootDirectory}
                    onChange={(e) => handleChange('rootDirectory', e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-sm text-slate-500 mt-1">Leave empty for repository root</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="enableEnvVars"
                  checked={formData.enableEnvVars}
                  onCheckedChange={(checked) => handleChange('enableEnvVars', checked)}
                />
                <Label htmlFor="enableEnvVars">Configure Environment Variables</Label>
              </div>
              
              {formData.enableEnvVars && (
                <div className="pl-6 border-l-2 border-slate-200">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="KEY" className="font-mono text-sm" />
                      <Input placeholder="value" className="font-mono text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="KEY" className="font-mono text-sm" />
                      <Input placeholder="value" className="font-mono text-sm" />
                    </div>
                    <Button variant="outline" type="button" size="sm" className="w-full">
                      + Add Variable
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <Button type="submit" disabled={isDeploying}>
                {isDeploying ? 'Preparing Deployment...' : 'Deploy Application'}
              </Button>
            </div>
          </form>
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

export default DeployNew;
