
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { 
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduledPost {
  id: number;
  title: string;
  platform: string;
  scheduled: Date;
  status: 'scheduled' | 'draft';
}

interface DayViewProps {
  currentDate: Date;
  scheduledPosts: ScheduledPost[];
}

const DayView: React.FC<DayViewProps> = ({ currentDate, scheduledPosts }) => {
  const dayPosts = scheduledPosts.filter(post => 
    isSameDay(new Date(post.scheduled), currentDate)
  );
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Youtube':
        return <Youtube className="h-5 w-5" />;
      case 'Linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'bg-pink-100 text-pink-800';
      case 'Twitter':
        return 'bg-blue-100 text-blue-800';
      case 'Youtube':
        return 'bg-red-100 text-red-800';
      case 'Linkedin':
        return 'bg-blue-100 text-blue-800';
      case 'Facebook':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-[600px] border rounded-md p-4">
      <div className="mb-6">
        <div className="text-xl font-semibold mb-1">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div>
        <div className="text-sm text-gray-500">
          {dayPosts.length} scheduled posts
        </div>
      </div>

      {dayPosts.length > 0 ? (
        <div className="space-y-4">
          {dayPosts.map((post) => (
            <div 
              key={post.id} 
              className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{format(new Date(post.scheduled), 'h:mm a')}</span>
                    <div className={`ml-3 px-2 py-1 rounded-full flex items-center ${getPlatformColor(post.platform)}`}>
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
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No posts scheduled</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
            You don't have any content scheduled for this day. Click the button below to create a new post.
          </p>
          <div className="mt-6">
            <Button>
              Schedule New Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayView;
