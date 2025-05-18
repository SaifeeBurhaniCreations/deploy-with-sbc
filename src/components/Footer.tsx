
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-8 lg:px-20 bg-slate-50 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              <span className="gradient-text">SBC</span>-Deploy
            </h3>
            <p className="text-slate-600 mb-4">
              Your app, live in minutes. DevOps simplified for teams.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-slate-600 hover:text-tech-blue">Features</a></li>
              <li><a href="#how-it-works" className="text-slate-600 hover:text-tech-blue">How It Works</a></li>
              <li><a href="#use-cases" className="text-slate-600 hover:text-tech-blue">Use Cases</a></li>
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">Documentation</a></li>
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">API Reference</a></li>
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">Blog</a></li>
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">GitHub</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@sbc-deploy.com" className="text-slate-600 hover:text-tech-blue">support@sbc-deploy.com</a></li>
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">Twitter</a></li>
              <li><a href="#" className="text-slate-600 hover:text-tech-blue">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SBC-Deploy. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-tech-blue text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-tech-blue text-sm">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-tech-blue text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
