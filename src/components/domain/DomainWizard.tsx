
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Copy, RefreshCw, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DomainWizardProps {
  onComplete: (domain: string) => void;
  onCancel: () => void;
}

const DomainWizard = ({ onComplete, onCancel }: DomainWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'Enter Domain', description: 'Provide your domain name' },
    { id: 2, title: 'DNS Setup', description: 'Configure DNS records' },
    { id: 3, title: 'Verification', description: 'Verify domain ownership' },
    { id: 4, title: 'Complete', description: 'Domain is ready' },
  ];

  const dnsRecords = [
    { type: 'CNAME', name: 'www', value: 'cname.sbc-deploy.com', description: 'Points www subdomain to our service' },
    { type: 'A', name: '@', value: '76.76.21.21', description: 'Points root domain to our servers' },
    { type: 'TXT', name: '@', value: `sbc-verify=${Math.random().toString(36).substr(2, 16)}`, description: 'Verification record' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "DNS record copied to clipboard",
    });
  };

  const handleDomainSubmit = () => {
    if (!domain) return;
    setCurrentStep(2);
  };

  const handleVerifyDomain = () => {
    setIsVerifying(true);
    setCurrentStep(3);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      const success = Math.random() > 0.3; // 70% success rate for demo
      setVerificationStatus(success ? 'verified' : 'failed');
      if (success) {
        setTimeout(() => setCurrentStep(4), 1000);
      }
    }, 3000);
  };

  const handleComplete = () => {
    onComplete(domain);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="space-y-6" style={{ overflowY: "auto", maxHeight: "85vh"}}>
      {/* Progress Steps */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                getStepStatus(step.id) === 'completed' 
                  ? 'bg-green-500 border-green-500 text-white'
                  : getStepStatus(step.id) === 'active'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {getStepStatus(step.id) === 'completed' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="font-medium">{steps[currentStep - 1]?.title}</h3>
          <p className="text-sm text-slate-600">{steps[currentStep - 1]?.description}</p>
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {steps[currentStep - 1]?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Enter Domain */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  type="text"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
                <p className="text-xs text-slate-600 mt-1">
                  Enter your domain without "http://" or "www"
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleDomainSubmit} disabled={!domain}>
                  Continue
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: DNS Setup */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Configure DNS Records</AlertTitle>
                <AlertDescription>
                  Add the following DNS records to your domain provider to connect {domain} to our platform.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {dnsRecords.map((record, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge variant="outline">{record.type} Record</Badge>
                        <p className="text-sm text-slate-600 mt-1">{record.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`${record.name} ${record.type} ${record.value}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span>
                        <code className="ml-2 bg-white px-2 py-1 rounded">{record.name}</code>
                      </div>
                      <div>
                        <span className="font-medium">Value:</span>
                        <code className="ml-2 bg-white px-2 py-1 rounded">{record.value}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  DNS changes can take up to 24 hours to propagate. You can verify immediately if you've already added the records.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={handleVerifyDomain}>
                  Verify Domain
                </Button>
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {currentStep === 3 && (
            <div className="space-y-4 text-center">
              {isVerifying && (
                <div className="space-y-4">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                  <div>
                    <h3 className="font-medium">Verifying Domain</h3>
                    <p className="text-sm text-slate-600">
                      Checking DNS records for {domain}...
                    </p>
                  </div>
                </div>
              )}

              {!isVerifying && verificationStatus === 'failed' && (
                <div className="space-y-4">
                  <AlertCircle className="h-8 w-8 mx-auto text-red-500" />
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      Unable to verify domain ownership. Please check your DNS records and try again.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleVerifyDomain}>
                      Retry Verification
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back to DNS Setup
                    </Button>
                  </div>
                </div>
              )}

              {!isVerifying && verificationStatus === 'verified' && (
                <div className="space-y-4">
                  <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
                  <div>
                    <h3 className="font-medium text-green-800">Domain Verified!</h3>
                    <p className="text-sm text-green-600">
                      {domain} has been successfully verified and connected.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Complete */}
          {currentStep === 4 && (
            <div className="space-y-4 text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
              <div>
                <h3 className="text-lg font-medium">Domain Setup Complete!</h3>
                <p className="text-slate-600">
                  {domain} is now connected and ready to use.
                </p>
              </div>
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <AlertDescription>
                  Your website will be accessible at both {domain} and www.{domain} within a few minutes.
                  SSL certificates are automatically provisioned.
                </AlertDescription>
              </Alert>
              <Button onClick={handleComplete} className="w-full">
                Complete Setup
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainWizard;
