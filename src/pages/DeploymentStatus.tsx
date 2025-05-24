
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, ExternalLink, RotateCw, X } from 'lucide-react';

// Mock deployment stages
const deploymentStages = [
  { id: 'clone', name: 'Cloning Repository', description: 'Fetching code from GitHub' },
  { id: 'install', name: 'Installing Dependencies', description: 'Running npm install' },
  { id: 'build', name: 'Building Application', description: 'Running build command' },
  { id: 'deploy', name: 'Deploying', description: 'Configuring servers and deploying' },
  { id: 'live', name: 'Going Live', description: 'Setting up domain and SSL' },
];

const DeploymentStatus = () => {
  const { id } = useParams();
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [deploymentUrl, setDeploymentUrl] = useState('');

  // Simulate deployment progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStage < deploymentStages.length - 1) {
        setCurrentStage(currentStage + 1);
        setLogs(prev => [...prev, `✅ ${deploymentStages[currentStage].name} completed`]);
        
        // Add some mock detailed logs
        if (currentStage === 0) {
          setLogs(prev => [...prev, '> Cloning from github.com/user/repo...']);
          setLogs(prev => [...prev, '> Cloned repository successfully']);
        }
        
        if (currentStage === 1) {
          setLogs(prev => [...prev, '> Installing packages with npm']);
          setLogs(prev => [...prev, '> added 1256 packages in 25s']);
        }
      } else if (currentStage === deploymentStages.length - 1 && !isComplete) {
        setIsComplete(true);
        setLogs(prev => [...prev, `✅ ${deploymentStages[currentStage].name} completed`]);
        setLogs(prev => [...prev, '🚀 Deployment complete! Your app is now live at https://client-app.sbcws-deploy.com.']);
        setDeploymentUrl('https://client-app.sbcws-deploy.com');
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [currentStage, isComplete]);

  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Deployment Status</h1>
          <p className="text-slate-600">Tracking deployment progress for {id}</p>
        </div>
        
        {isComplete && (
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            Redeploy
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Progress</CardTitle>
              <CardDescription>
                {isComplete ? 'Deployment completed successfully' : 'Building and deploying your application'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentStages.map((stage, index) => (
                  <div 
                    key={stage.id}
                    className={`flex items-start gap-4 p-3 rounded-md ${
                      currentStage === index ? 'bg-blue-50 border border-blue-200' :
                      currentStage > index ? 'bg-green-50 border border-green-200' : 
                      'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      currentStage > index ? 'bg-green-100 text-green-700' : 
                      currentStage === index ? 'bg-blue-100 text-blue-700' : 
                      'bg-slate-200 text-slate-500'
                    }`}>
                      {currentStage > index ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{stage.name}</h3>
                      <p className="text-sm text-slate-600">{stage.description}</p>
                      
                      {currentStage === index && !isComplete && (
                        <div className="mt-2 w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full animate-pulse-slow w-3/4"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {isComplete && (
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <div className="text-center sm:text-left">
                    <p className="text-slate-700">Your application is now live at:</p>
                    <a 
                      href={deploymentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-tech-blue font-medium flex items-center justify-center sm:justify-start gap-1 hover:underline"
                    >
                      {deploymentUrl}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  
                  <Button className="w-full sm:w-auto">
                    Visit Site
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {isComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Deployment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-md">
                      <p className="text-sm text-slate-500">Build Time</p>
                      <p className="text-lg font-medium">45s</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-md">
                      <p className="text-sm text-slate-500">Framework</p>
                      <p className="text-lg font-medium">Next.js</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-md">
                      <p className="text-sm text-slate-500">Node Version</p>
                      <p className="text-lg font-medium">16.x</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Deployment Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-slate-50 font-mono text-xs p-4 rounded-md h-96 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="py-1">
                    {log}
                  </div>
                ))}
                {!isComplete && (
                  <div className="animate-pulse">_</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatus;
