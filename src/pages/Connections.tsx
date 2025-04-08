
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const ConnectionCard = ({ platform, icon, onClick }: { platform: string, icon: string, onClick: () => void }) => (
  <div 
    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    onClick={onClick}
  >
    <img src={icon} alt={platform} className="w-12 h-12 mb-2" />
    <span className="text-sm font-medium">{platform}</span>
  </div>
);

export default function Connections() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock social media platforms
  const platforms = [
    { name: 'YouTube', icon: '/placeholder.svg' },
    { name: 'Instagram', icon: '/placeholder.svg' },
    { name: 'Facebook', icon: '/placeholder.svg' },
    { name: 'Twitter', icon: '/placeholder.svg' },
    { name: 'LinkedIn', icon: '/placeholder.svg' },
    { name: 'TikTok', icon: '/placeholder.svg' },
    { name: 'Pinterest', icon: '/placeholder.svg' },
    { name: 'Spotify', icon: '/placeholder.svg' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <LinkIcon className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">Connections</h1>
            <div className="ml-2 text-gray-500 cursor-help">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-bg">
                <Plus className="mr-2 h-4 w-4" />
                Add New Connection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Connection</DialogTitle>
                <DialogDescription>
                  Connect your social media accounts to start automating content repurposing.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                {platforms.map((platform) => (
                  <ConnectionCard 
                    key={platform.name} 
                    platform={platform.name} 
                    icon={platform.icon} 
                    onClick={() => {
                      console.log(`Connecting to ${platform.name}`);
                      setIsDialogOpen(false);
                    }} 
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" className="px-6">All</TabsTrigger>
            <TabsTrigger value="source" className="px-6">Source</TabsTrigger>
            <TabsTrigger value="destination" className="px-6">Destination</TabsTrigger>
            <TabsTrigger value="inactive" className="px-6">Inactive</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <p>If you change the passwords on your social media accounts, the connection may become inactive, and you'll need to reconnect it.</p>
            </div>

            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4">
                <LinkIcon className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Connections Found</h3>
              <p className="text-gray-500 text-center mb-6">
                Click on the Add Connection button and create a<br />
                new connection
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Connection
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Connection</DialogTitle>
                    <DialogDescription>
                      Connect your social media accounts to start automating content repurposing.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
                    {platforms.map((platform) => (
                      <ConnectionCard 
                        key={platform.name} 
                        platform={platform.name} 
                        icon={platform.icon} 
                        onClick={() => console.log(`Connecting to ${platform.name}`)} 
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
