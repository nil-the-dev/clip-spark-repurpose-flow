
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span>Automate Your Content </span>
              <span className="gradient-text">Repurposing</span>
              <span> Workflow</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Transform long-form content into platform-optimized short clips, automatically distribute to multiple platforms, and grow your audience everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gradient-bg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <div className="text-sm text-gray-500 pt-2">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>
          <div className="md:col-span-5 animate-slide-up">
            <div className="glass-card p-5 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="Content management dashboard" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
