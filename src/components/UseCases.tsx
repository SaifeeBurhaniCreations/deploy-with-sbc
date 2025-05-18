
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const useCases = [
  {
    title: "Client Onboarding",
    description: "Speed up your client onboarding process by providing instant access to a working version of your product under your domain.",
    cta: "Improve Client Experience",
    image: "client-onboarding",
  },
  {
    title: "MVP/Staging Previews",
    description: "Share early versions and prototypes with stakeholders while maintaining full control of the deployment environment.",
    cta: "Build Faster MVPs",
    image: "staging-preview",
  },
  {
    title: "Internal Tools Hosting",
    description: "Host and share internal tools with team members and contractors without exposing them to the public internet.",
    cta: "Secure Your Tools",
    image: "internal-tools",
  },
];

const UseCaseCard = ({ title, description, cta, image, index }: { title: string; description: string; cta: string; image: string; index: number }) => {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-center gap-8 p-8 rounded-xl ${index % 2 === 0 ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'border border-slate-100 bg-white'}`}>
      <div className={`w-full lg:w-1/2 lg:order-${index % 2 === 0 ? '1' : '2'}`}>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-slate-600 mb-6">{description}</p>
        <Button variant={index % 2 === 0 ? "default" : "outline"} className="flex items-center gap-1">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className={`w-full lg:w-1/2 h-64 lg:h-80 rounded-lg overflow-hidden bg-slate-100 lg:order-${index % 2 === 0 ? '2' : '1'}`}>
        <div className="w-full h-full bg-slate-200 animate-pulse-slow rounded-lg flex items-center justify-center">
          <span className="text-slate-400 font-medium">
            {image === "client-onboarding" && "Client Dashboard Preview"}
            {image === "staging-preview" && "Staging Environment View"}
            {image === "internal-tools" && "Internal Tools Interface"}
          </span>
        </div>
      </div>
    </div>
  );
};

const UseCases = () => {
  return (
    <section id="use-cases" className="py-16 md:py-24 px-6 md:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect for Multiple <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            SBC-Deploy adapts to various deployment scenarios for startups, agencies, and development teams.
          </p>
        </div>
        
        <div className="flex flex-col space-y-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard 
              key={index}
              title={useCase.title}
              description={useCase.description}
              cta={useCase.cta}
              image={useCase.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
