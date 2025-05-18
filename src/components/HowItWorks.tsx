
import React from 'react';
import { Server, Link, Database } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Deploy to client.sbc-deploy.com',
    description: 'Easily set up custom subdomains for each client with our simple CLI or web dashboard.',
    icon: Server,
  },
  {
    id: 2,
    title: 'Client tests live app',
    description: 'Give clients instant access to their own secure environment for testing and feedback.',
    icon: Link,
  },
  {
    id: 3,
    title: 'Migrate or scale with us',
    description: 'When ready, migrate to their infrastructure or scale up with our managed hosting.',
    icon: Database,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-6 md:px-8 lg:px-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            SBC-Deploy streamlines the client deployment process with a simple three-step workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-tech-blue" />
              </div>
              
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <span className="text-lg font-semibold text-tech-slate">{step.id}</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
              
              <p className="text-slate-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="max-w-2xl w-full h-1 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
