
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, AlertCircle, Link as LinkIcon, Check, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { connectYouTube, fetchUserConnections, disconnectPlatform } from '@/services/socialMediaService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { SocialAuthRecord } from '@/services/socialMediaService';

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return <Youtube className="h-10 w-10 text-red-600" />;
    case 'facebook':
      return <Facebook className="h-10 w-10 text-blue-600" />;
    case 'instagram':
      return <Instagram className="h-10 w-10 text-pink-500" />;
    case 'twitter':
      return <Twitter className="h-10 w-10 text-blue-400" />;
    case 'linkedin':
      return <Linkedin className="h-10 w-10 text-blue-700" />;
    default:
      return <LinkIcon className="h-10 w-10 text-gray-500" />;
  }
};

const ConnectionCard = ({ 
  platform, 
  onClick,
  connected = false,
  connectionData = null
}: { 
  platform: string, 
  onClick: () => void,
  connected?: boolean,
  connectionData?: SocialAuthRecord | null
}) => (
  <div 
    className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
    onClick={onClick}
  >
    <div className="relative">
      <PlatformIcon platform={platform} />
      {connected && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">{platform}</span>
    {connected && connectionData?.expires_at && (
      <span className="text-xs text-gray-500 mt-1">
        Connected {new Date(connectionData.created_at || '').toLocaleDateString()}
      </span>
    )}
  </div>
);

const ConnectedPlatformCard = ({
  connection,
  onDisconnect
}: {
  connection: SocialAuthRecord,
  onDisconnect: () => void
}) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex items-center space-x-3">
        <PlatformIcon platform={connection.provider_name || connection.provider} />
        <div>
          <h3 className="font-medium">{connection.provider_name || connection.provider}</h3>
          <p className="text-sm text-gray-500">
            Connected on {new Date(connection.created_at || '').toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            onDisconnect();
          }}
        >
          <Trash2 className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default function Connections() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [connections, setConnections] = useState<SocialAuthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Define all social media platforms
  const platforms = [
    { name: 'YouTube', provider: 'youtube' },
    { name: 'Instagram', provider: 'instagram' },
    { name: 'Facebook', provider: 'facebook' },
    { name: 'Twitter', provider: 'twitter' },
    { name: 'LinkedIn', provider: 'linkedin' },
    { name: 'TikTok', provider: 'tiktok' },
    { name: 'Pinterest', provider: 'pinterest' },
    { name: 'Spotify', provider: 'spotify' },
  ];

  // Fetch user connections on component mount
  useEffect(() => {
    const loadConnections = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userConnections = await fetchUserConnections();
        setConnections(userConnections);
      } catch (error) {
        console.error('Error loading connections:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading connections',
          description: 'Failed to load your connected platforms.',
        });
      } finally {
        setLoading(false);
      }
    };

    loadConnections();
  }, [user, toast]);

  const handleConnect = (platform: string) => {
    console.log(`Connecting to ${platform}`);
    
    // Check if already connected
    const isConnected = connections.some(conn => 
      conn.provider.toLowerCase() === platform.toLowerCase() ||
      (conn.provider_name && conn.provider_name.toLowerCase() === platform.toLowerCase())
    );
    
    if (isConnected) {
      toast({
        title: 'Already Connected',
        description: `You already have a connection to ${platform}.`,
      });
      setIsDialogOpen(false);
      return;
    }
    
    // Handle different platforms
    switch (platform.toLowerCase()) {
      case 'youtube':
        connectYouTube();
        break;
      // Add other platform connections as needed
      default:
        toast({
          title: 'Coming Soon',
          description: `Connection to ${platform} will be available soon.`,
        });
    }
    
    setIsDialogOpen(false);
  };

  const handleDisconnect = async (connectionId: string, platformName: string) => {
    try {
      const result = await disconnectPlatform(connectionId);
      
      if (result.success) {
        setConnections(prev => prev.filter(conn => conn.id !== connectionId));
        toast({
          title: 'Platform Disconnected',
          description: `Your ${platformName} account has been disconnected successfully.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Disconnection Failed',
          description: result.error?.message || 'Failed to disconnect the platform.',
        });
      }
    } catch (error) {
      console.error('Error disconnecting platform:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    }
  };

  // Filter connections based on active tab
  const filteredConnections = connections.filter(conn => {
    if (activeTab === 'all') return true;
    if (activeTab === 'source') return conn.provider !== 'destination';
    if (activeTab === 'destination') return conn.provider === 'destination';
    if (activeTab === 'inactive') return conn.expires_at && new Date(conn.expires_at) < new Date();
    return true;
  });

  const isConnected = (platform: string) => {
    return connections.some(conn => 
      conn.provider.toLowerCase() === platform.toLowerCase() ||
      (conn.provider_name && conn.provider_name.toLowerCase() === platform.toLowerCase())
    );
  };

  const getConnection = (platform: string) => {
    return connections.find(conn => 
      conn.provider.toLowerCase() === platform.toLowerCase() ||
      (conn.provider_name && conn.provider_name.toLowerCase() === platform.toLowerCase())
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <LinkIcon className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">Connections</h1>
            <div className="ml-2 text-gray-500 dark:text-gray-400 cursor-help">
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
                    connected={isConnected(platform.provider)}
                    connectionData={getConnection(platform.provider)}
                    onClick={() => handleConnect(platform.provider)} 
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger 
              value="all" 
              className="px-6 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="source" 
              className="px-6 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800"
            >
              Source
            </TabsTrigger>
            <TabsTrigger 
              value="destination" 
              className="px-6 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800"
            >
              Destination
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className="px-6 data-[state=active]:bg-gray-100 data-[state=active]:dark:bg-gray-800"
            >
              Inactive
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <AlertCircle className="h-4 w-4 mr-2" />
              <p>If you change the passwords on your social media accounts, the connection may become inactive, and you'll need to reconnect it.</p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your connections...</p>
              </div>
            ) : connections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4">
                  <LinkIcon className="h-12 w-12 text-gray-300 dark:text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">No Connections Found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                  Click on the Add Connection button and create a<br />
                  new connection
                </p>
                <Dialog>
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
                          connected={isConnected(platform.provider)}
                          connectionData={getConnection(platform.provider)}
                          onClick={() => handleConnect(platform.provider)} 
                        />
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredConnections.map(connection => (
                  <ConnectedPlatformCard 
                    key={connection.id} 
                    connection={connection}
                    onDisconnect={() => handleDisconnect(connection.id, connection.provider_name || connection.provider)}
                  />
                ))}
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
