
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Music, PenTool, Globe } from 'lucide-react';

const platforms = [
  { name: 'YouTube', logo: <Youtube className="h-10 w-10 text-red-600" /> },
  { name: 'Instagram', logo: <Instagram className="h-10 w-10 text-pink-500" /> },
  { name: 'TikTok', logo: <Music className="h-10 w-10 text-black" /> },
  { name: 'Facebook', logo: <Facebook className="h-10 w-10 text-blue-600" /> },
  { name: 'Twitter', logo: <Twitter className="h-10 w-10 text-blue-400" /> },
  { name: 'LinkedIn', logo: <Linkedin className="h-10 w-10 text-blue-700" /> },
  { name: 'Pinterest', logo: <PenTool className="h-10 w-10 text-red-500" /> },
  { name: 'Spotify', logo: <Music className="h-10 w-10 text-green-500" /> },
];

const PlatformIntegrations = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Platform Integrations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect once and distribute everywhere. We support all major social and content platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          {platforms.map((platform, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="mb-3">{platform.logo}</div>
              <div className="font-medium">{platform.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformIntegrations;
