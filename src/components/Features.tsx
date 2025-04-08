
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Multi-Platform Distribution',
    description: 'Automatically distribute your content across YouTube, TikTok, Instagram, Facebook, Twitter, and more.',
    icon: '🌐',
  },
  {
    title: 'AI-Powered Editing',
    description: 'Our AI detects the most engaging parts of your videos and creates perfect clips for each platform.',
    icon: '🤖',
  },
  {
    title: 'Watermark Removal',
    description: 'Seamlessly remove platform watermarks from TikTok, Instagram, and YouTube Shorts.',
    icon: '✨',
  },
  {
    title: 'Auto Captions & Subtitles',
    description: 'Generate accurate captions in multiple languages and customize styles to match your brand.',
    icon: '💬',
  },
  {
    title: 'Smart Scheduling',
    description: 'Schedule content for optimal engagement times or set up recurring publishing workflows.',
    icon: '📅',
  },
  {
    title: 'Advanced Analytics',
    description: 'Track performance across all platforms and get AI-driven insights to optimize your content.',
    icon: '📊',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features to Supercharge Your Content</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to repurpose, optimize, and distribute your content across multiple platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
