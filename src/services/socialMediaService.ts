
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// YouTube API credentials
const YOUTUBE_CLIENT_ID = '182818486779-1ufamttgqemqrekgpkrioj7he4sq4uaj.apps.googleusercontent.com';
const YOUTUBE_REDIRECT_URI = `${window.location.origin}/connections/callback`;
const YOUTUBE_SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.readonly'
].join(' ');

export interface SocialAuthRecord {
  id: string;
  user_id: string;
  provider: string;
  provider_id?: string | null;
  provider_name?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
  expires_at?: string | null;
  platform_specific_data?: any;
  created_at?: string | null;
  updated_at?: string | null;
}

export const connectYouTube = () => {
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2, 15);
  
  // Store the state in localStorage for verification later
  localStorage.setItem('youtube_auth_state', state);
  
  // Construct the authorization URL
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUTUBE_CLIENT_ID}&redirect_uri=${encodeURIComponent(YOUTUBE_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(YOUTUBE_SCOPES)}&state=${state}&access_type=offline&prompt=consent`;
  
  // Redirect the user to the authorization URL
  window.location.href = authUrl;
};

export const handleYouTubeCallback = async (code: string, state: string) => {
  const { toast } = useToast();
  
  // Verify the state parameter to prevent CSRF attacks
  const storedState = localStorage.getItem('youtube_auth_state');
  if (state !== storedState) {
    toast({
      variant: 'destructive',
      title: 'Authentication failed',
      description: 'Invalid state parameter. Please try again.',
    });
    return null;
  }
  
  // Clear the state from localStorage
  localStorage.removeItem('youtube_auth_state');
  
  try {
    // Exchange the authorization code for tokens using our backend
    // In a real application, you would make a request to your backend to handle this exchange
    // For now, we'll simulate this by directly storing in Supabase
    const user = supabase.auth.getUser();
    const userData = await user;
    
    if (!userData.data.user) {
      toast({
        variant: 'destructive',
        title: 'Authentication failed',
        description: 'User not authenticated. Please log in.',
      });
      return null;
    }
    
    // Store the connection in Supabase
    const { data, error } = await supabase
      .from('social_auth')
      .insert({
        user_id: userData.data.user.id,
        provider: 'youtube',
        provider_name: 'YouTube',
        access_token: 'simulated_token', // This would come from the backend in a real app
        refresh_token: 'simulated_refresh_token', // This would come from the backend in a real app
        expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
        platform_specific_data: { 
          connected_at: new Date().toISOString() 
        }
      })
      .select()
      .single();
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Connection failed',
        description: error.message,
      });
      return null;
    }
    
    toast({
      title: 'YouTube Connected',
      description: 'Your YouTube account has been successfully connected.',
    });
    
    return data;
  } catch (error) {
    toast({
      variant: 'destructive',
      title: 'Connection failed',
      description: 'An unexpected error occurred. Please try again.',
    });
    return null;
  }
};

export const fetchUserConnections = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('social_auth')
    .select('*')
    .eq('user_id', user.id);
  
  if (error) {
    console.error('Error fetching connections:', error);
    return [];
  }
  
  return data;
};

export const disconnectPlatform = async (connectionId: string) => {
  const { error } = await supabase
    .from('social_auth')
    .delete()
    .eq('id', connectionId);
  
  return { success: !error, error };
};
