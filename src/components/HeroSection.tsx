
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 lg:px-20 flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1 rounded-full mb-6">
          <span className="text-xs md:text-sm font-medium text-tech-slate">Internal Deployments Made Easy</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Your App, <span className="gradient-text">Live in Minutes</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          SBC-Deploy gives your clients instant access to staging environments under your domain. 
          Fully managed. Secure. DevOps included.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="flex items-center gap-2">
            Get Early Access
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button size="lg" variant="outline">
            See It in Action
          </Button>
        </div>
      </div>
      
      <div className="w-full mt-16 max-w-4xl bg-gradient-to-r from-blue-50 to-purple-50 p-1 rounded-lg shadow-xl">
        <div className="bg-white rounded-lg p-4 md:p-6">
          <div className="h-64 md:h-80 relative rounded-md overflow-hidden border border-slate-200 bg-slate-50">
            <div className="absolute top-0 w-full py-2 px-4 bg-slate-100 flex items-center gap-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-500">client1.sbc-deploy.com</span>
              </div>
            </div>
            <div className="mt-10 w-full flex flex-col items-center justify-center">
              <div className="w-2/3 h-10 bg-slate-100 rounded-md animate-pulse-slow"></div>
              <div className="w-4/5 h-6 bg-slate-100 rounded-md mt-4 animate-pulse-slow"></div>
              <div className="w-3/5 h-6 bg-slate-100 rounded-md mt-2 animate-pulse-slow"></div>
              <div className="mt-8 flex gap-3">
                <div className="h-10 w-28 bg-blue-100 rounded-md animate-pulse-slow"></div>
                <div className="h-10 w-28 bg-slate-100 rounded-md animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 flex flex-wrap gap-8 justify-center items-center opacity-70">
        <div className="text-sm font-semibold uppercase tracking-wider text-slate-400">Trusted by teams at</div>
        <div className="text-slate-500 font-semibold">TECH CO</div>
        <div className="text-slate-500 font-semibold">STARTUP INC</div>
        <div className="text-slate-500 font-semibold">AGENCY PRO</div>
        <div className="text-slate-500 font-semibold">DEV LABS</div>
      </div>
    </section>
  );
};

export default HeroSection;
