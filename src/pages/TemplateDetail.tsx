
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, ChevronRight, Copy, ExternalLink, Github } from 'lucide-react';

// Mock templates data
const templates = [
  {
    id: 'template1',
    name: 'Next.js',
    description: 'The React framework for production',
    longDescription: 'Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.',
    icon: '📦',
    category: 'frameworks',
    tags: ['React', 'SSR', 'TypeScript'],
    popular: true,
    new: false,
    usage: 'npx create-next-app@latest my-app',
    image: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/twitter-card.png',
    features: [
      'File-system Routing',
      'API Routes',
      'Fast Refresh',
      'Static Site Generation (SSG)',
      'Server-side Rendering (SSR)',
      'Incremental Static Regeneration',
      'TypeScript Support',
      'Image Optimization',
      'Internationalization',
      'Analytics'
    ],
    requirements: [
      'Node.js 16.8 or later',
      'MacOS, Windows, or Linux',
      'Basic knowledge of React'
    ],
    relatedTemplates: ['template3', 'template4']
  },
  {
    id: 'template2',
    name: 'AI Chatbot',
    description: 'Conversational AI chatbot starter',
    longDescription: 'Build your own AI chatbot with this starter template. Includes a pre-configured UI, API integration with OpenAI, and conversation management.',
    icon: '🤖',
    category: 'ai',
    tags: ['AI', 'Chatbot', 'React'],
    popular: true,
    new: true,
    usage: 'git clone https://github.com/example/ai-chatbot.git',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
    features: [
      'Pre-configured OpenAI API Integration',
      'Message History Management',
      'Responsive UI',
      'Typing Indicators',
      'Error Handling',
      'Token Usage Tracking',
      'Conversation Context Management'
    ],
    requirements: [
      'Node.js 16.0 or later',
      'OpenAI API Key',
      'Basic React knowledge'
    ],
    relatedTemplates: ['template5', 'template7']
  },
  {
    id: 'template3',
    name: 'Vite + React',
    description: 'Frontend tooling with React',
    longDescription: 'A modern frontend build tool that provides a faster and leaner development experience for modern web projects. Vite is opinionated and comes with sensible defaults, but is also customizable.',
    icon: '⚡',
    category: 'frameworks',
    tags: ['Vite', 'React', 'HMR'],
    popular: false,
    new: false,
    usage: 'npm create vite@latest my-app -- --template react-ts',
    image: 'https://vitejs.dev/og-image.png',
    features: [
      'Lightning Fast HMR',
      'Optimized Build Performance',
      'CSS Modules Support',
      'TypeScript Integration',
      'ESBuild-powered',
      'Plugin System',
      'API Proxying'
    ],
    requirements: [
      'Node.js 14.18+',
      'Basic JavaScript/React knowledge'
    ],
    relatedTemplates: ['template1', 'template8']
  },
  {
    id: 'template4',
    name: 'Commerce',
    description: 'E-commerce starter kit',
    longDescription: 'A complete e-commerce solution with product listings, cart functionality, checkout process, and payment integration.',
    icon: '🛒',
    category: 'commerce',
    tags: ['E-commerce', 'Shopping Cart', 'Payments'],
    popular: true,
    new: false,
    usage: 'git clone https://github.com/example/commerce-starter.git',
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae',
    features: [
      'Product Catalog',
      'Shopping Cart',
      'User Authentication',
      'Checkout Process',
      'Payment Integration (Stripe)',
      'Order Management',
      'Inventory Management'
    ],
    requirements: [
      'Node.js 14+',
      'Stripe Account',
      'Database (PostgreSQL recommended)'
    ],
    relatedTemplates: ['template5', 'template8']
  },
  {
    id: 'template5',
    name: 'Blog',
    description: 'Fully featured blog platform',
    longDescription: 'A complete blog platform with article management, commenting system, categories, and SEO optimization.',
    icon: '📝',
    category: 'content',
    tags: ['CMS', 'Blog', 'Markdown'],
    popular: false,
    new: true,
    usage: 'git clone https://github.com/example/blog-platform.git',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    features: [
      'Markdown Support',
      'Comment System',
      'Categories & Tags',
      'SEO Optimization',
      'RSS Feed',
      'Analytics Integration',
      'Social Sharing'
    ],
    requirements: [
      'Node.js 14+',
      'Basic React knowledge'
    ],
    relatedTemplates: ['template4', 'template7']
  }
];

const TemplateDetail = () => {
  const { id } = useParams();
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
        <p className="text-slate-600 mb-6">The template you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/dashboard/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }
  
  // Find related templates
  const relatedTemplatesList = template.relatedTemplates 
    ? templates.filter(t => template.relatedTemplates.includes(t.id))
    : [];
  
  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      {/* Back button */}
      <Button variant="ghost" asChild size="sm" className="mb-4">
        <Link to="/dashboard/marketplace">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Link>
      </Button>
      
      {/* Template header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{template.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{template.name}</h1>
              <p className="text-xl text-slate-600 mt-1">{template.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {template.tags.map(tag => (
                  <Badge key={tag} className="bg-slate-100 text-slate-800 hover:bg-slate-200">{tag}</Badge>
                ))}
                {template.popular && <Badge className="bg-amber-500">Popular</Badge>}
                {template.new && <Badge className="bg-blue-500">New</Badge>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 md:items-end">
          <Button className="w-full md:w-auto">Use This Template</Button>
          <Button variant="outline" className="w-full md:w-auto">
            <Github className="h-4 w-4 mr-2" />
            View on GitHub
          </Button>
        </div>
      </div>
      
      {/* Template preview image */}
      <div className="rounded-lg overflow-hidden border">
        <img 
          src={template.image} 
          alt={`${template.name} preview`}
          className="w-full h-auto object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/1200x630?text=Template+Preview';
          }}
        />
      </div>
      
      {/* Template content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-slate-700 leading-relaxed">{template.longDescription}</p>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="space-y-3">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-3 list-disc list-inside text-slate-700">
                {template.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="instructions" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Usage Instructions</h2>
              <div className="bg-slate-950 text-slate-50 rounded-lg p-4 font-mono text-sm relative">
                <pre className="overflow-x-auto">{template.usage}</pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-200"
                  onClick={() => {
                    navigator.clipboard.writeText(template.usage);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-slate-600">
                After installation, follow the README file for additional setup instructions and configuration options.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          {/* Related templates section */}
          {relatedTemplatesList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Templates</CardTitle>
                <CardDescription>Similar templates you might be interested in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedTemplatesList.map(relatedTemplate => (
                  <Link 
                    key={relatedTemplate.id} 
                    to={`/dashboard/templates/${relatedTemplate.id}`}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-50 transition-colors border group"
                  >
                    <div className="text-2xl">{relatedTemplate.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-primary transition-colors">{relatedTemplate.name}</h3>
                      <p className="text-sm text-slate-600">{relatedTemplate.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard/marketplace">
                    Browse All Templates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Learn more about this template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
