
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Github } from 'lucide-react';

const frameworks = [
  { id: 'nextjs', name: 'Next.js' },
  { id: 'vite', name: 'Vite' },
  { id: 'cra', name: 'Create React App' },
  { id: 'svelte', name: 'SvelteKit' },
  { id: 'nuxt', name: 'Nuxt.js' },
  { id: 'express', name: 'Express' },
  { id: 'django', name: 'Django' },
  { id: 'rails', name: 'Ruby on Rails' },
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deploy New Application</h1>
        <p className="text-slate-600">Configure and deploy a new app to SBC-Deploy</p>
      </div>
      
      <Card style={{width: "50vw"}}>
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
  );
};

export default DeployNew;
