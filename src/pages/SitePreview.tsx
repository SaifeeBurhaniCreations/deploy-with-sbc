
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SitePreview = () => {
  const [url, setUrl] = useState('https://demo.sbc-deploy.com');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const { toast } = useToast();

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preview Refreshed",
        description: "The preview has been updated to the latest version",
      });
    }, 1000);
  };

  const getFrameClass = () => {
    switch(selectedDevice) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      case 'desktop':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Site Preview</h1>
        <p className="text-slate-600">Preview your deployment</p>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-grow">
              <div className="flex items-center border rounded-md px-3 bg-white">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Enter URL"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="h-8 w-8"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  asChild
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-3 py-1 text-sm ${selectedDevice === 'mobile' ? 'bg-slate-200 font-medium' : 'bg-white'}`}
                onClick={() => setSelectedDevice('mobile')}
              >
                Mobile
              </button>
              <button
                className={`px-3 py-1 text-sm border-l ${selectedDevice === 'tablet' ? 'bg-slate-200 font-medium' : 'bg-white'}`}
                onClick={() => setSelectedDevice('tablet')}
              >
                Tablet
              </button>
              <button
                className={`px-3 py-1 text-sm border-l ${selectedDevice === 'desktop' ? 'bg-slate-200 font-medium' : 'bg-white'}`}
                onClick={() => setSelectedDevice('desktop')}
              >
                Desktop
              </button>
            </div>
          </div>
          
          <div className="w-full bg-white border rounded-md h-[calc(100vh-260px)] flex items-center justify-center overflow-auto">
            <div className={`transition-all duration-300 ${getFrameClass()}`}>
              <iframe
                src={url}
                title="Site Preview"
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts"
                loading="lazy"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SitePreview;
