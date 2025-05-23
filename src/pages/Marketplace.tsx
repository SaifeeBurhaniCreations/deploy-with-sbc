
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

// Mock templates data
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

// Categories for filtering
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
  
  // Filter templates based on search, category, and active tab
  const filteredTemplates = allTemplates.filter(template => {
    // Search filter
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    
    // Tab filter (all, popular, new)
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'popular' && template.popular) ||
      (activeTab === 'new' && template.new);
    
    return matchesSearch && matchesCategory && matchesTab;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo(0, 0);
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
                  <Link key={template.id} to={`/dashboard/templates/${template.id}`}>
                    <Card className="h-full overflow-hidden hover:border-primary hover:shadow-md transition-all">
                      <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                        <img 
                          src={template.image} 
                          alt={template.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x225?text=Template+Preview';
                          }}
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{template.icon}</span>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
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
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
    </div>
  );
};

export default Marketplace;
