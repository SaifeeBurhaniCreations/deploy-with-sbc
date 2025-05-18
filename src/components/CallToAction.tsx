
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-6 md:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Deploying Under Your Own Domain <span className="gradient-text">Today</span>
        </h2>
        
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Join the waitlist for early access to SBC-Deploy and transform how you onboard and support clients.
        </p>
        
        <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-tech-blue focus:ring-1 focus:ring-tech-blue"
            required
          />
          <Button size="lg" className="flex items-center gap-1">
            Join Waitlist
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
        
        <p className="text-sm text-slate-500 mt-4">
          No credit card required. Get notified when we launch.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
