
import React from 'react';
import { Users, Server, Database, FileCheck, CloudUpload, FileText } from 'lucide-react';

const features = [
  {
    title: 'Unlimited Subdomains',
    description: 'Create as many client environments as you need with wildcard DNS support.',
    icon: Server,
  },
  {
    title: 'HTTPS Included',
    description: "Automatic wildcard SSL certificates via Let's Encrypt for all subdomains.",
    icon: FileCheck,
  },
  {
    title: 'Secure Proxy Routing',
    description: 'Enterprise-grade secure reverse proxy routing for all your applications.',
    icon: CloudUpload,
  },
  {
    title: 'One-Click Scaling',
    description: 'Scale resources up or down with simple controls and access detailed logs.',
    icon: Database,
  },
  {
    title: 'Temporary Environments',
    description: 'Create disposable test environments for demos and short-term client projects.',
    icon: FileText,
  },
  {
    title: 'Post-Trial Support',
    description: 'Comprehensive support for migrating or scaling after the trial period.',
    icon: Users,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 px-6 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for <span className="gradient-text">Client Environments</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A complete solution for managing temporary deployment environments with powerful DevOps features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border border-slate-100 rounded-lg transition-all hover:border-transparent hover:shadow-lg bg-white group"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center mb-5 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                <feature.icon className="h-6 w-6 text-tech-blue" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
