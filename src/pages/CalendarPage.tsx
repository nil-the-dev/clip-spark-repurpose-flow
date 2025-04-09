
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar as CalendarIcon,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook
} from 'lucide-react';
import { format } from 'date-fns';

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  const scheduledPosts = [
    {
      id: 1,
      title: 'YouTube Video: Content Marketing Basics',
      platform: 'Youtube',
      scheduled: new Date(2025, 3, 10, 14, 30),
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'How to Repurpose Content - Twitter Thread',
      platform: 'Twitter',
      scheduled: new Date(2025, 3, 10, 16, 0),
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Top 5 Content Marketing Tips - Instagram Post',
      platform: 'Instagram',
      scheduled: new Date(2025, 3, 11, 10, 0),
      status: 'draft'
    },
    {
      id: 4,
      title: 'Case Study: Content Strategy - LinkedIn Article',
      platform: 'Linkedin',
      scheduled: new Date(2025, 3, 12, 9, 0),
      status: 'scheduled'
    },
    {
      id: 5,
      title: 'Content Marketing Tools - Facebook Post',
      platform: 'Facebook',
      scheduled: new Date(2025, 3, 12, 12, 0),
      status: 'scheduled'
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="h-4 w-4" />;
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Youtube':
        return <Youtube className="h-4 w-4" />;
      case 'Linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'Facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const filteredPosts = scheduledPosts.filter(post => {
    const postDate = new Date(post.scheduled);
    return postDate.getDate() === date.getDate() && 
           postDate.getMonth() === date.getMonth() && 
           postDate.getFullYear() === date.getFullYear();
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Content Calendar</h1>
            <p className="text-gray-500">
              Schedule and manage your content publishing
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex">
            <div className="mr-2">
              <Button 
                variant="outline" 
                className={view === 'month' ? 'bg-gray-100' : ''}
                onClick={() => setView('month')}
              >
                Month
              </Button>
              <Button 
                variant="outline" 
                className={`ml-2 ${view === 'week' ? 'bg-gray-100' : ''}`}
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button 
                variant="outline" 
                className={`ml-2 ${view === 'day' ? 'bg-gray-100' : ''}`}
                onClick={() => setView('day')}
              >
                Day
              </Button>
            </div>
            <Button className="gradient-bg">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span>{format(date, 'MMMM yyyy')}</span>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="pointer-events-auto"
                />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Platform Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <Youtube className="h-4 w-4 text-red-600" />
                      </div>
                      <span>YouTube</span>
                    </div>
                    <span className="text-sm font-medium">5 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Twitter className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Twitter</span>
                    </div>
                    <span className="text-sm font-medium">12 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-pink-100 p-2 rounded-full mr-3">
                        <Instagram className="h-4 w-4 text-pink-600" />
                      </div>
                      <span>Instagram</span>
                    </div>
                    <span className="text-sm font-medium">8 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Linkedin className="h-4 w-4 text-blue-800" />
                      </div>
                      <span>LinkedIn</span>
                    </div>
                    <span className="text-sm font-medium">6 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Facebook className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Facebook</span>
                    </div>
                    <span className="text-sm font-medium">7 posts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {format(date, 'EEEE, MMMM d, yyyy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPosts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <div 
                        key={post.id} 
                        className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>{format(post.scheduled, 'h:mm a')}</span>
                              <div className="ml-3 flex items-center">
                                {getPlatformIcon(post.platform)}
                                <span className="ml-1">{post.platform}</span>
                              </div>
                            </div>
                          </div>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              post.status === 'scheduled' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                          </span>
                        </div>
                        <div className="flex justify-end mt-3 space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No posts scheduled</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no posts scheduled for this day.
                    </p>
                    <div className="mt-6">
                      <Button className="gradient-bg">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule New Post
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts
                    .filter(post => new Date(post.scheduled) > new Date())
                    .sort((a, b) => a.scheduled.getTime() - b.scheduled.getTime())
                    .slice(0, 3)
                    .map((post) => (
                      <div 
                        key={post.id} 
                        className="flex justify-between items-center p-3 border-b last:border-0"
                      >
                        <div className="flex items-center">
                          <div className="p-2 rounded-full mr-3 bg-gray-100">
                            {getPlatformIcon(post.platform)}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{post.title}</h4>
                            <p className="text-xs text-gray-500">
                              {format(post.scheduled, 'MMM d, yyyy - h:mm a')}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
