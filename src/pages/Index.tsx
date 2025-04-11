
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WorkflowSection from '@/components/WorkflowSection';
import PlatformIntegrations from '@/components/PlatformIntegrations';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <WorkflowSection />
          <PlatformIntegrations />
          <Testimonials />
          <Pricing />
          <CTASection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
