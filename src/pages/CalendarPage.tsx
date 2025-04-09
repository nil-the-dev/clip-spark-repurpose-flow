
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  addDays, 
  addMonths, 
  addWeeks, 
  endOfWeek, 
  format, 
  startOfWeek 
} from 'date-fns';
import { Toggle } from '@/components/ui/toggle';
import MonthView from '@/components/calendar/MonthView';
import WeekView from '@/components/calendar/WeekView';
import DayView from '@/components/calendar/DayView';

interface ScheduledPost {
  id: number;
  title: string;
  platform: string;
  scheduled: Date;
  status: 'scheduled' | 'draft';
}

const scheduledPosts: ScheduledPost[] = [
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
  },
  {
    id: 6,
    title: 'SEO Best Practices for 2025',
    platform: 'Linkedin',
    scheduled: new Date(2025, 3, 15, 11, 0),
    status: 'draft'
  },
  {
    id: 7,
    title: 'Behind the Scenes: Our Content Creation Process',
    platform: 'Instagram',
    scheduled: new Date(2025, 3, 17, 15, 30),
    status: 'scheduled'
  },
  {
    id: 8,
    title: 'Why Video Marketing Matters in 2025',
    platform: 'Youtube',
    scheduled: new Date(2025, 3, 20, 13, 0),
    status: 'scheduled'
  }
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const navigatePrevious = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, -1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, -1));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const navigateNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  // Set selected date to current date when view changes
  useEffect(() => {
    setSelectedDate(currentDate);
  }, [view]);

  const formatDateRange = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else if (view === 'week') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(currentDate, 'MMMM d, yyyy');
    }
  };

  const handleSelectDate = (date: Date) => {
    if (view === 'month' || view === 'week') {
      setSelectedDate(date);
      setCurrentDate(date);
      setView('day');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">Calendar</h1>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <Button variant="outline" onClick={() => navigatePrevious()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="mx-4 min-w-[160px] text-center font-medium">
              {formatDateRange()}
            </div>
            <Button variant="outline" onClick={() => navigateNext()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center ml-4 p-1 bg-gray-100 rounded-lg">
              <Toggle
                pressed={view === 'month'}
                onPressedChange={() => setView('month')}
                className={`px-3 py-1 text-sm ${view === 'month' ? 'bg-white shadow-sm' : ''}`}
              >
                Month
              </Toggle>
              <Toggle
                pressed={view === 'week'}
                onPressedChange={() => setView('week')}
                className={`px-3 py-1 text-sm ${view === 'week' ? 'bg-white shadow-sm' : ''}`}
              >
                Week
              </Toggle>
              <Toggle
                pressed={view === 'day'}
                onPressedChange={() => setView('day')}
                className={`px-3 py-1 text-sm ${view === 'day' ? 'bg-white shadow-sm' : ''}`}
              >
                Day
              </Toggle>
            </div>
            
            <Button className="ml-4 gradient-bg">
              <Plus className="mr-1 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {view === 'month' && (
            <MonthView 
              currentDate={currentDate} 
              scheduledPosts={scheduledPosts} 
              onSelectDate={handleSelectDate} 
            />
          )}
          {view === 'week' && (
            <WeekView 
              currentDate={currentDate} 
              scheduledPosts={scheduledPosts} 
              onSelectDate={handleSelectDate} 
            />
          )}
          {view === 'day' && (
            <DayView 
              currentDate={currentDate} 
              scheduledPosts={scheduledPosts} 
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
