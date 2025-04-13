
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const Templates = () => {
  const templateCategories = [
    { id: 1, name: 'Content Repurposing', count: 12 },
    { id: 2, name: 'Social Media', count: 18 },
    { id: 3, name: 'Video Marketing', count: 9 },
    { id: 4, name: 'Podcast', count: 7 },
    { id: 5, name: 'Blog', count: 15 },
  ];

  const popularTemplates = [
    {
      id: 1,
      title: 'YouTube to Short-Form',
      description: 'Convert YouTube videos into TikTok, Instagram Reels, and YouTube Shorts.',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=300',
      category: 'Video',
      popularity: 'High',
    },
    {
      id: 2,
      title: 'Podcast to Audiogram',
      description: 'Transform podcast episodes into engaging audiograms with captions.',
      image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=300',
      category: 'Audio',
      popularity: 'Medium',
    },
    {
      id: 3,
      title: 'Blog to Social Media Thread',
      description: 'Convert blog articles into Twitter/X threads or LinkedIn carousels.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=300',
      category: 'Text',
      popularity: 'High',
    },
    {
      id: 4,
      title: 'Instagram to Pinterest',
      description: 'Repurpose Instagram posts into Pinterest-optimized pins.',
      image: 'https://images.unsplash.com/photo-1596558663611-d77c7d7caee8?q=80&w=300',
      category: 'Image',
      popularity: 'Medium',
    },
    {
      id: 5,
      title: 'Live Stream Highlights',
      description: 'Extract key moments from live streams and format for social media.',
      image: 'https://images.unsplash.com/photo-1534961880437-ce5ae2033053?q=80&w=300',
      category: 'Video',
      popularity: 'Low',
    },
    {
      id: 6,
      title: 'Newsletter to Social Posts',
      description: 'Turn your newsletter into multiple social media posts.',
      image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=300',
      category: 'Text',
      popularity: 'Medium',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Content Templates</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Start with pre-built templates to accelerate your content repurposing
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search templates..."
                className="pl-8 w-full"
              />
            </div>
            <Button className="ml-2 gradient-bg">Create Custom</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {templateCategories.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} templates</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Popular Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  Popularity: {template.popularity}
                </span>
                <Button variant="outline" size="sm">Use Template</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
