
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock template data
const templateData = {
  'template1': {
    id: 'template1',
    name: 'Next.js',
    description: 'The React framework for production',
    icon: '📦',
    fullDescription: 'Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.',
    tags: ['React', 'SSR', 'Static Generation', 'TypeScript'],
    image: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/twitter-card.png',
    features: [
      'Automatic Server and Client rendering',
      'API Routes',
      'File-based routing',
      'Built-in CSS support',
      'Fast Refresh',
      'Zero Config',
    ],
    useCases: [
      'Corporate websites',
      'E-commerce applications',
      'Marketing sites',
      'Personal blogs'
    ],
    code: `// Example Next.js component
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}`
  },
  'template2': {
    id: 'template2',
    name: 'AI Chatbot',
    description: 'Conversational AI chatbot starter',
    icon: '🤖',
    fullDescription: 'Start building advanced conversational experiences with this AI chatbot starter template. Includes pre-built components for chat interfaces, message handling, and AI integration.',
    tags: ['AI', 'Chatbot', 'Conversational UI', 'React'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
    features: [
      'Pre-built chat UI components',
      'Message persistence',
      'AI integration ready',
      'Typing indicators',
      'User authentication',
      'Custom themes'
    ],
    useCases: [
      'Customer support bots',
      'Internal knowledge assistants',
      'Educational tools',
      'Productivity helpers'
    ],
    code: `// Example chatbot component
import { useState } from 'react'
import { ChatMessage } from './components'

export default function ChatBot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  const sendMessage = () => {
    // Your message handling logic
  }
  
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <ChatMessage key={msg.id} {...msg} />
        ))}
      </div>
      <div className="input-area">
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}`
  },
  'template3': {
    id: 'template3',
    name: 'Vite + React',
    description: 'Frontend tooling with React',
    icon: '⚡',
    fullDescription: 'A lightning-fast frontend build tool and development server. Vite is designed to enhance the developer experience with instant server start, fast HMR, and optimized builds.',
    tags: ['Vite', 'React', 'HMR', 'ESBuild'],
    image: 'https://vitejs.dev/og-image.png',
    features: [
      'Instant server start',
      'Hot Module Replacement (HMR)',
      'ESBuild-powered builds',
      'CSS pre-processor support',
      'TypeScript support',
      'JSX and TSX support'
    ],
    useCases: [
      'SPAs',
      'Design systems',
      'Interactive dashboards',
      'Rapid prototyping'
    ],
    code: `// Example Vite component
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  )
}`
  },
  'template4': {
    id: 'template4',
    name: 'Commerce',
    description: 'E-commerce starter kit',
    icon: '🛒',
    fullDescription: 'A complete e-commerce solution with product catalog, shopping cart, checkout flow, and payment processing integration. Fast, SEO-friendly, and customizable.',
    tags: ['E-commerce', 'Shopping Cart', 'Payments', 'React'],
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae',
    features: [
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'Payment processing',
      'Order management',
      'User accounts'
    ],
    useCases: [
      'Online stores',
      'Digital product sales',
      'Subscription services',
      'Marketplace platforms'
    ],
    code: `// Example product component
import { useState } from 'react'
import { useCart } from './hooks/useCart'

export default function Product({ product }) {
  const { addToCart } = useCart()
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  )
}`
  }
};

// Related templates based on tags
const getRelatedTemplates = (currentId: string) => {
  const current = templateData[currentId];
  if (!current) return [];
  
  return Object.values(templateData)
    .filter(template => template.id !== currentId)
    .filter(template => 
      template.tags.some(tag => current.tags.includes(tag))
    )
    .slice(0, 2);
};

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const template = templateData[id as keyof typeof templateData];
  
  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold">Template not found</h2>
        <p className="text-gray-600 mt-2">The template you're looking for doesn't exist.</p>
        <Link to="/dashboard/marketplace">
          <Button className="mt-4">
            Browse Templates
          </Button>
        </Link>
      </div>
    );
  }
  
  const relatedTemplates = getRelatedTemplates(template.id);
  
  const handleUseTemplate = () => {
    toast({
      title: "Template selected",
      description: `You've chosen the ${template.name} template. Setting up...`,
    });
  };
  
  return (
    <div className="space-y-6" style={{overflowY: "auto", maxHeight: "85vh"}}>
      <div className="flex items-center justify-between">
        <div>
          <Link to="/dashboard/marketplace" className="text-sm text-blue-600 hover:text-blue-800 flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
          <h1 className="text-2xl font-bold">{template.name}</h1>
          <p className="text-slate-600">{template.description}</p>
        </div>
        <Button onClick={handleUseTemplate}>
          Use this Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview Image */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/800x450?text=Template+Preview';
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Template Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="code">Example Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About this Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{template.fullDescription}</p>
                  
                  <div>
                    <h3 className="font-medium mb-2">Use Cases</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {template.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Example Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 bg-slate-900 text-slate-50 rounded-md overflow-x-auto text-sm">
                    <code>{template.code}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button onClick={handleUseTemplate} className="w-full">
                  Use this Template
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Templates */}
          {relatedTemplates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedTemplates.map(relatedTemplate => (
                  <Link 
                    key={relatedTemplate.id}
                    to={`/dashboard/templates/${relatedTemplate.id}`}
                    className="block p-3 border rounded-md hover:border-primary hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{relatedTemplate.icon}</div>
                        <div>
                          <h3 className="font-medium">{relatedTemplate.name}</h3>
                          <p className="text-sm text-slate-600">{relatedTemplate.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </Link>
                ))}
                
                <Link to="/dashboard/marketplace">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View All Templates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
