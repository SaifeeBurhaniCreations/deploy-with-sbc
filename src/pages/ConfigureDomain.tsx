
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Check } from "lucide-react";

const ConfigureDomain = () => {
  const [customDomain, setCustomDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [isAddingCustomDomain, setIsAddingCustomDomain] = useState(false);
  const [isAddingSubdomain, setIsAddingSubdomain] = useState(false);
  const [isCustomDomainVerified, setIsCustomDomainVerified] = useState(false);
  const [isSubdomainActive, setIsSubdomainActive] = useState(false);
  const { toast } = useToast();

  const handleAddCustomDomain = () => {
    if (!customDomain) return;
    
    setIsAddingCustomDomain(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingCustomDomain(false);
      setIsCustomDomainVerified(false);
      toast({
        title: "Domain Added",
        description: "DNS verification required. Follow the instructions below.",
      });
    }, 1500);
  };

  const handleVerifyCustomDomain = () => {
    setIsAddingCustomDomain(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingCustomDomain(false);
      setIsCustomDomainVerified(true);
      toast({
        title: "Domain Verified",
        description: `${customDomain} is now connected to your deployment`,
      });
    }, 2000);
  };

  const handleAddSubdomain = () => {
    if (!subdomain) return;
    
    setIsAddingSubdomain(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingSubdomain(false);
      setIsSubdomainActive(true);
      toast({
        title: "Subdomain Created",
        description: `${subdomain}.sbc-deploy.com is now active`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configure Domain</h1>
        <p className="text-slate-600">Set up how users access your deployment</p>
      </div>
      
      <Tabs defaultValue="custom">
        <TabsList className="mb-6 w-full max-w-md">
          <TabsTrigger value="custom" className="flex-1">Custom Domain</TabsTrigger>
          <TabsTrigger value="subdomain" className="flex-1">Subdomain</TabsTrigger>
        </TabsList>
        
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Domain</CardTitle>
              <CardDescription>
                Connect your own domain name to your deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Input
                    placeholder="yourdomain.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    disabled={isCustomDomainVerified}
                  />
                </div>
                <Button 
                  onClick={isCustomDomainVerified ? undefined : handleAddCustomDomain}
                  disabled={!customDomain || isAddingCustomDomain || isCustomDomainVerified}
                >
                  {isAddingCustomDomain ? "Adding..." : isCustomDomainVerified ? "Added" : "Add Domain"}
                </Button>
              </div>
              
              {customDomain && !isCustomDomainVerified && (
                <div className="space-y-4 mt-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>DNS Configuration Required</AlertTitle>
                    <AlertDescription>
                      Add the following DNS records to your domain provider to verify ownership:
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-4 bg-slate-50 p-4 rounded-md">
                    <div>
                      <p className="text-sm font-medium">CNAME Record:</p>
                      <div className="flex justify-between items-center mt-1 bg-white border rounded p-2">
                        <code className="text-sm">www</code>
                        <code className="text-sm">cname.sbc-deploy.com</code>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">A Record:</p>
                      <div className="flex justify-between items-center mt-1 bg-white border rounded p-2">
                        <code className="text-sm">@</code>
                        <code className="text-sm">76.76.21.21</code>
                      </div>
                    </div>
                    
                    <Button onClick={handleVerifyCustomDomain} className="w-full">
                      {isAddingCustomDomain ? "Verifying..." : "Verify Domain"}
                    </Button>
                  </div>
                </div>
              )}
              
              {isCustomDomainVerified && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Domain Verified</AlertTitle>
                  <AlertDescription>
                    {customDomain} is now connected to your deployment.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subdomain">
          <Card>
            <CardHeader>
              <CardTitle>Subdomain</CardTitle>
              <CardDescription>
                Create a subdomain on sbc-deploy.com
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-0">
                <div className="flex-grow">
                  <Input
                    placeholder="yourproject"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    disabled={isSubdomainActive}
                    className="rounded-r-none"
                  />
                </div>
                <div className="bg-slate-100 p-2 border border-l-0 border-r-0 border-slate-200">
                  <span className="text-slate-600">.sbc-deploy.com</span>
                </div>
                <Button 
                  onClick={isSubdomainActive ? undefined : handleAddSubdomain}
                  disabled={!subdomain || isAddingSubdomain || isSubdomainActive}
                  className="rounded-l-none"
                >
                  {isAddingSubdomain ? "Creating..." : isSubdomainActive ? "Created" : "Create"}
                </Button>
              </div>
              
              {isSubdomainActive && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Subdomain Active</AlertTitle>
                  <AlertDescription>
                    Your deployment is now accessible at{" "}
                    <a 
                      href={`https://${subdomain}.sbc-deploy.com`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      {subdomain}.sbc-deploy.com
                    </a>
                  </AlertDescription>
                </Alert>
              )}
              
              <p className="text-xs text-slate-500">
                Subdomains are automatically secured with SSL certificates
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigureDomain;
