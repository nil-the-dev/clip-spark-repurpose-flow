
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const WorkflowSection = () => {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 md:order-2">
            <div className="text-left space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Custom Workflows <span className="gradient-text">That Work for You</span>
              </h2>
              <p className="text-lg text-gray-600">
                Set up automated content repurposing workflows and let our system handle the rest. Create rules like "Convert every new YouTube video into Instagram Reels" or "Turn podcast episodes into audiograms for Twitter."
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">✓</div>
                  <div className="ml-3">
                    <p className="text-gray-700">Conditional logic for smarter automation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">✓</div>
                  <div className="ml-3">
                    <p className="text-gray-700">Platform-specific optimizations for each output</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">✓</div>
                  <div className="ml-3">
                    <p className="text-gray-700">Scheduled publishing at optimal times</p>
                  </div>
                </div>
              </div>
              <Button className="mt-4">
                Create Your First Workflow
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="md:col-span-6 md:order-1">
            <Card className="glass-card shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Custom workflow automation" 
                  className="w-full h-auto" 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
