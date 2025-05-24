
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const allTemplates = [
  {
    id: 'template1',
    name: 'Next.js',
    description: 'The React framework for production',
    icon: '📦',
    category: 'frameworks',
    tags: ['React', 'SSR', 'TypeScript'],
    popular: true,
    new: false,
    image: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/twitter-card.png'
  },
  {
    id: 'template2',
    name: 'AI Chatbot',
    description: 'Conversational AI chatbot starter',
    icon: '🤖',
    category: 'ai',
    tags: ['AI', 'Chatbot', 'React'],
    popular: true,
    new: true,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a'
  },
  {
    id: 'template3',
    name: 'Vite + React',
    description: 'Frontend tooling with React',
    icon: '⚡',
    category: 'frameworks',
    tags: ['Vite', 'React', 'HMR'],
    popular: false,
    new: false,
    image: 'https://vitejs.dev/og-image.png'
  },
  {
    id: 'template4',
    name: 'Commerce',
    description: 'E-commerce starter kit',
    icon: '🛒',
    category: 'commerce',
    tags: ['E-commerce', 'Shopping Cart', 'Payments'],
    popular: true,
    new: false,
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae'
  },
  {
    id: 'template5',
    name: 'Blog',
    description: 'Fully featured blog platform',
    icon: '📝',
    category: 'content',
    tags: ['CMS', 'Blog', 'Markdown'],
    popular: false,
    new: true,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
  },
  {
    id: 'template6',
    name: 'Admin Dashboard',
    description: 'Complete admin panel template',
    icon: '📊',
    category: 'dashboard',
    tags: ['Admin', 'Dashboard', 'Charts'],
    popular: true,
    new: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  },
  {
    id: 'template7',
    name: 'Landing Page',
    description: 'Modern marketing landing page',
    icon: '🚀',
    category: 'marketing',
    tags: ['Landing', 'Marketing', 'SEO'],
    popular: false,
    new: true,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
  },
  {
    id: 'template8',
    name: 'Portfolio',
    description: 'Showcase your work and skills',
    icon: '🎨',
    category: 'portfolio',
    tags: ['Portfolio', 'Creative', 'Gallery'],
    popular: false,
    new: false,
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b'
  }
];

const categories = [
  { id: 'all', name: 'All Templates' },
  { id: 'frameworks', name: 'Frameworks' },
  { id: 'ai', name: 'AI & Chatbots' },
  { id: 'commerce', name: 'Commerce' },
  { id: 'content', name: 'Content & Blogs' },
  { id: 'dashboard', name: 'Dashboards' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'portfolio', name: 'Portfolio' }
];

const ITEMS_PER_PAGE = 6;

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [importStep, setImportStep] = useState(1);
  const [importSettings, setImportSettings] = useState({
    branch: 'main',
    buildCommand: 'npm build',
    installDependencies: true,
    configureEnvironment: false
  });
  const [importProgress, setImportProgress] = useState(0);
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'popular' && template.popular) ||
      (activeTab === 'new' && template.new);
    
    return matchesSearch && matchesCategory && matchesTab;
  });
  
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleImportClick = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setImportStep(1);
    setImportProgress(0);
    setImportDialogOpen(true);
  };

  const handleNextImportStep = () => {
    if (importStep < 3) {
      setImportStep(importStep + 1);
    } else {
      simulateImport();
    }
  };

  const simulateImport = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setImportProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setImportDialogOpen(false);
        const template = allTemplates.find(t => t.id === selectedTemplateId);
        
        toast({
          title: "Import Successful",
          description: `${template?.name} has been imported successfully.`,
        });
      }
    }, 500);
  };
  
  const selectedTemplate = allTemplates.find(t => t.id === selectedTemplateId);

  const renderImportStep = () => {
    switch(importStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{selectedTemplate?.icon}</div>
                <div>
                  <h3 className="font-medium">{selectedTemplate?.name}</h3>
                  <p className="text-sm text-slate-600">{selectedTemplate?.description}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              You are about to import this template. In the next steps, you can configure how you want to set it up.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="confirm" />
              <label htmlFor="confirm" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I understand this will create a new project using this template
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">
              Configure your import settings:
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="branch" className="text-sm font-medium">Branch</label>
                <Input 
                  id="branch" 
                  value={importSettings.branch} 
                  onChange={(e) => setImportSettings({...importSettings, branch: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="buildCommand" className="text-sm font-medium">Build Command</label>
                <Input 
                  id="buildCommand" 
                  value={importSettings.buildCommand} 
                  onChange={(e) => setImportSettings({...importSettings, buildCommand: e.target.value})} 
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="installDeps" 
                  checked={importSettings.installDependencies} 
                  onCheckedChange={(checked) => 
                    setImportSettings({...importSettings, installDependencies: checked === true})
                  }
                />
                <label htmlFor="installDeps" className="text-sm font-medium leading-none">
                  Automatically install dependencies
                </label>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="configEnv" 
                  checked={importSettings.configureEnvironment} 
                  onCheckedChange={(checked) => 
                    setImportSettings({...importSettings, configureEnvironment: checked === true})
                  }
                />
                <label htmlFor="configEnv" className="text-sm font-medium leading-none">
                  Configure environment variables
                </label>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-green-50 border-green-100">
              <h3 className="font-medium text-green-800 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ready to import
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Your template is ready to be imported with the selected settings.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Import Summary</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Template:</span> {selectedTemplate?.name}</p>
                <p><span className="font-medium">Branch:</span> {importSettings.branch}</p>
                <p><span className="font-medium">Build Command:</span> {importSettings.buildCommand}</p>
                <p><span className="font-medium">Install Dependencies:</span> {importSettings.installDependencies ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">Configure Environment:</span> {importSettings.configureEnvironment ? 'Yes' : 'No'}</p>
              </div>
            </div>
            {importProgress > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Importing... {importProgress}%</div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${importProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div>
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="text-slate-600">Discover templates and themes for your projects</p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search templates..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        
        <div className="flex items-center ml-auto">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1); // Reset to first page on tab change
            }}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="px-2 py-0 pb-3">
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setCurrentPage(1); // Reset to first page on category change
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Templates Grid */}
        <div className="col-span-1 lg:col-span-3">
          {paginatedTemplates.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedTemplates.map(template => (
                  <Card key={template.id} className="h-full overflow-hidden hover:border-primary hover:shadow-md transition-all">
                    <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                      <Link to={`/dashboard/templates/${template.id}`}>
                        <img 
                          src={template.image} 
                          alt={template.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x225?text=Template+Preview';
                          }}
                        />
                      </Link>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{template.icon}</span>
                          <Link to={`/dashboard/templates/${template.id}`}>
                            <CardTitle className="text-lg hover:text-primary transition-colors">{template.name}</CardTitle>
                          </Link>
                        </div>
                        {(template.popular || template.new) && (
                          <div>
                            {template.new && <Badge className="bg-blue-500">New</Badge>}
                            {template.popular && <Badge className="ml-1 bg-amber-500">Popular</Badge>}
                          </div>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Link to={`/dashboard/templates/${template.id}`} className="text-sm text-primary hover:underline flex items-center">
                          View details <ChevronRight className="h-3 w-3 ml-1" />
                        </Link>
                        <Button size="sm" onClick={() => handleImportClick(template.id)}>Import</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <div className="text-sm text-slate-600">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredTemplates.length)} of {filteredTemplates.length}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="border rounded-md p-8 text-center">
              <h3 className="font-medium text-lg">No templates found</h3>
              <p className="text-slate-600 mt-1">Try adjusting your search or filters</p>
              <Button 
                className="mt-4" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveTab('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {importStep === 1 ? "Import Template" : 
               importStep === 2 ? "Configure Import" : 
               "Confirm Import"}
            </DialogTitle>
            <DialogDescription>
              {importStep === 1 ? "Start using this template in your project." : 
               importStep === 2 ? "Configure how you want to import this template." : 
               "Review and confirm your import settings."}
            </DialogDescription>
          </DialogHeader>
          
          {/* Step Progress Indicator */}
          <div className="flex items-center justify-between my-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    importStep >= step ? 'bg-primary text-primary-foreground' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {step}
                </div>
                <span className="text-xs mt-1 text-slate-500">
                  {step === 1 ? 'Select' : step === 2 ? 'Configure' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>

          {/* Content based on step */}
          <div className="py-4">
            {renderImportStep()}
          </div>
          
          <DialogFooter>
            {importStep > 1 && importProgress === 0 && (
              <Button 
                variant="outline" 
                onClick={() => setImportStep(importStep - 1)}
              >
                Back
              </Button>
            )}
            <Button 
              onClick={handleNextImportStep}
              disabled={importProgress > 0 && importProgress < 100}
            >
              {importProgress > 0 ? 'Importing...' : 
               importStep < 3 ? 'Next' : 'Import Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
