
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";

// Mock data
const environmentVariables = [
  { key: 'API_URL', value: 'https://api.sbc-deploy.com' },
  { key: 'DEBUG', value: 'false' },
  { key: 'NODE_ENV', value: 'production' },
];

const branches = ['main', 'develop', 'staging', 'feature/new-ui'];

const EditDeploymentSettings = () => {
  const [buildCommand, setBuildCommand] = useState('npm run build');
  const [installCommand, setInstallCommand] = useState('npm install');
  const [outputDirectory, setOutputDirectory] = useState('dist');
  const [rootDirectory, setRootDirectory] = useState('/');
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [isAutoDeploy, setIsAutoDeploy] = useState(true);
  const [envVars, setEnvVars] = useState(environmentVariables);
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvValue, setNewEnvValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddEnvVar = () => {
    if (!newEnvKey.trim()) return;
    
    setEnvVars([...envVars, { key: newEnvKey, value: newEnvValue }]);
    setNewEnvKey('');
    setNewEnvValue('');
  };

  const handleRemoveEnvVar = (keyToRemove: string) => {
    setEnvVars(envVars.filter(({ key }) => key !== keyToRemove));
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your deployment settings have been updated",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div>
        <h1 className="text-2xl font-bold">Edit Deployment Settings</h1>
        <p className="text-slate-600">Configure how your project is built and deployed</p>
      </div>
      
      <Tabs defaultValue="build">
        <TabsList className="mb-6 w-full max-w-md">
          <TabsTrigger value="build" className="flex-1">Build Settings</TabsTrigger>
          <TabsTrigger value="branch" className="flex-1">Branch Settings</TabsTrigger>
          <TabsTrigger value="env" className="flex-1">Environment Variables</TabsTrigger>
        </TabsList>
        
        <TabsContent value="build">
          <Card>
            <CardHeader>
              <CardTitle>Build Configuration</CardTitle>
              <CardDescription>
                Configure how your project is built during deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="installCommand">Install Command</Label>
                <Input
                  id="installCommand"
                  value={installCommand}
                  onChange={(e) => setInstallCommand(e.target.value)}
                  placeholder="npm install"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buildCommand">Build Command</Label>
                <Input
                  id="buildCommand"
                  value={buildCommand}
                  onChange={(e) => setBuildCommand(e.target.value)}
                  placeholder="npm run build"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="outputDir">Output Directory</Label>
                <Input
                  id="outputDir"
                  value={outputDirectory}
                  onChange={(e) => setOutputDirectory(e.target.value)}
                  placeholder="dist"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rootDir">Root Directory</Label>
                <Input
                  id="rootDir"
                  value={rootDirectory}
                  onChange={(e) => setRootDirectory(e.target.value)}
                  placeholder="/"
                />
                <p className="text-xs text-slate-500">The directory where your source code is located</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="branch">
          <Card>
            <CardHeader>
              <CardTitle>Branch Configuration</CardTitle>
              <CardDescription>
                Configure which branch to deploy and deployment triggers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branch">Production Branch</Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">The branch that will be deployed to production</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <Label>Auto-Deploy on Push</Label>
                    <p className="text-xs text-slate-500">Automatically deploy when changes are pushed to the branch</p>
                  </div>
                  <Switch 
                    checked={isAutoDeploy} 
                    onCheckedChange={setIsAutoDeploy} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="env">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>
                Configure environment variables for your deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {envVars.map(({ key, value }) => (
                  <div key={key} className="flex gap-2">
                    <Input value={key} disabled className="max-w-[180px]" />
                    <Input value={value} disabled />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleRemoveEnvVar(key)}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Input
                    placeholder="KEY"
                    value={newEnvKey}
                    onChange={(e) => setNewEnvKey(e.target.value)}
                    className="max-w-[180px]"
                  />
                  <Input
                    placeholder="Value"
                    value={newEnvValue}
                    onChange={(e) => setNewEnvValue(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleAddEnvVar}
                  >
                    Add
                  </Button>
                </div>
                
                <p className="text-xs text-slate-500">
                  Environment variables are encrypted and only exposed to your build and runtime
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default EditDeploymentSettings;
