
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "ClipSpark has completely transformed our content strategy. What used to take our team days now happens in minutes.",
    author: "Sarah Johnson",
    title: "Marketing Director, TechFlow Inc.",
    avatar: "👩‍💼",
  },
  {
    quote: "The AI-powered clip selection is mind-blowing. It consistently finds the most engaging parts of my videos that get the most engagement.",
    author: "Michael Rodriguez",
    title: "YouTube Creator, 500K+ Subscribers",
    avatar: "👨‍💻",
  },
  {
    quote: "As a podcast host, converting episodes to social snippets was a huge pain. ClipSpark automated our entire workflow and grew our audience by 73%.",
    author: "Jamie Chen",
    title: "Host, Future Insights Podcast",
    avatar: "🎙️",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Content Creators</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how ClipSpark is helping creators and businesses save time and grow their audience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-8">
                <div className="text-4xl mb-6">{testimonial.avatar}</div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-auto">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
