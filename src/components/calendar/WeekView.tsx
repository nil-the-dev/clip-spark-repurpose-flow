
import React from 'react';
import { addDays, format, isSameDay, startOfWeek } from 'date-fns';
import { 
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook
} from 'lucide-react';

interface ScheduledPost {
  id: number;
  title: string;
  platform: string;
  scheduled: Date;
  status: 'scheduled' | 'draft';
}

interface WeekViewProps {
  currentDate: Date;
  scheduledPosts: ScheduledPost[];
  onSelectDate: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, scheduledPosts, onSelectDate }) => {
  const weekStart = startOfWeek(currentDate);
  const days = [];
  
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(new Date(post.scheduled), date)
    );
  };

  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    const formattedDate = format(day, 'dd');
    const dayName = format(day, 'EEE');
    const isToday = isSameDay(day, new Date());
    const posts = getPostsForDate(day);
    
    days.push(
      <div 
        key={i} 
        className="border min-h-[400px]"
        onClick={() => onSelectDate(day)}
      >
        <div className={`p-2 text-center border-b ${isToday ? 'bg-blue-50' : ''}`}>
          <div className={`font-medium ${isToday ? 'text-blue-600' : ''}`}>
            {formattedDate}
          </div>
          <div className="text-sm text-gray-500">{dayName}</div>
        </div>
        
        <div className="p-2">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="mb-2 p-2 border rounded-md hover:shadow-sm transition-shadow text-sm"
            >
              <div className="flex items-center mb-1">
                <span className="mr-1">{getPlatformIcon(post.platform)}</span>
                <span className="font-medium">{post.platform}</span>
                <span 
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    post.status === 'scheduled' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                </span>
              </div>
              <div className="truncate">{post.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {format(new Date(post.scheduled), 'h:mm a')}
              </div>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center text-gray-400 mt-6">
              <p>No posts scheduled</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7">
        {days}
      </div>
    </div>
  );
};

export default WeekView;
