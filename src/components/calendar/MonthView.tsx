
import React from 'react';
import { addDays, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { Button } from '@/components/ui/button';
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

interface MonthViewProps {
  currentDate: Date;
  scheduledPosts: ScheduledPost[];
  onSelectDate: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, scheduledPosts, onSelectDate }) => {
  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const days = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="h-3 w-3" />;
      case 'Twitter':
        return <Twitter className="h-3 w-3" />;
      case 'Youtube':
        return <Youtube className="h-3 w-3" />;
      case 'Linkedin':
        return <Linkedin className="h-3 w-3" />;
      case 'Facebook':
        return <Facebook className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(new Date(post.scheduled), date)
    );
  };

  // Generate grid cells for the month
  for (let i = 0; i < 42; i++) {
    const day = addDays(startDate, i);
    const formattedDate = format(day, 'd');
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isToday = isSameDay(day, new Date());
    const posts = getPostsForDate(day);
    
    days.push(
      <div 
        key={i} 
        className={`border min-h-[150px] relative ${!isCurrentMonth ? 'bg-gray-50' : ''}`}
        onClick={() => onSelectDate(day)}
      >
        <div className={`p-2 ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
          <span 
            className={`inline-block w-7 h-7 text-center leading-7 ${isToday 
              ? 'bg-red-400 text-white rounded-full' 
              : ''}`}
          >
            {formattedDate}
          </span>
        </div>
        
        <div className="p-1">
          {posts.slice(0, 2).map(post => (
            <div 
              key={post.id} 
              className={`text-xs mb-1 p-1 rounded-sm flex items-center ${
                post.platform === 'Instagram' ? 'bg-pink-100 text-pink-800' :
                post.platform === 'Twitter' ? 'bg-blue-100 text-blue-800' :
                post.platform === 'Youtube' ? 'bg-red-100 text-red-800' :
                post.platform === 'Linkedin' ? 'bg-blue-100 text-blue-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              <span className="mr-1">{getPlatformIcon(post.platform)}</span>
              <span className="truncate">{post.title.substring(0, 15)}...</span>
            </div>
          ))}
          
          {posts.length > 2 && (
            <div className="text-xs text-gray-500 p-1">
              +{posts.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2 border-b text-center font-medium">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default MonthView;
