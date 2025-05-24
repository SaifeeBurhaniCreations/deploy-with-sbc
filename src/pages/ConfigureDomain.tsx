
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DomainWizard from '@/components/domain/DomainWizard';
import DomainList from '@/components/domain/DomainList';
import { useToast } from "@/hooks/use-toast";

const ConfigureDomain = () => {
  const [showWizard, setShowWizard] = useState(false);
  const { toast } = useToast();

  const handleDomainComplete = (domain: string) => {
    setShowWizard(false);
    toast({
      title: "Domain Connected",
      description: `${domain} has been successfully connected to your deployment.`,
    });
  };

  const handleAddDomain = () => {
    setShowWizard(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Domain Configuration</h1>
        <p className="text-slate-600">Manage custom domains for your deployments</p>
      </div>
      
      <DomainList onAddDomain={handleAddDomain} />

      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Custom Domain</DialogTitle>
          </DialogHeader>
          <DomainWizard 
            onComplete={handleDomainComplete}
            onCancel={() => setShowWizard(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfigureDomain;
