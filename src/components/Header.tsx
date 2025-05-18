
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 flex items-center justify-between border-b">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">
          <span className="gradient-text">SBC</span>-Deploy
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="#features" className="text-sm font-medium text-tech-slate hover:text-tech-blue transition-colors hidden md:block">
          Features
        </a>
        <a href="#how-it-works" className="text-sm font-medium text-tech-slate hover:text-tech-blue transition-colors hidden md:block">
          How It Works
        </a>
        <a href="#use-cases" className="text-sm font-medium text-tech-slate hover:text-tech-blue transition-colors hidden md:block">
          Use Cases
        </a>
        <Button size="sm" variant="outline" className="hidden md:flex">
          Login
        </Button>
        <Button size="sm" className="flex items-center gap-1">
          Get Early Access
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
