
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

// YouTube API credentials
const YOUTUBE_CLIENT_ID = '182818486779-1ufamttgqemqrekgpkrioj7he4sq4uaj.apps.googleusercontent.com';
const YOUTUBE_CLIENT_SECRET = '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';
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
  try {
    // Verify the state parameter to prevent CSRF attacks
    const storedState = localStorage.getItem('youtube_auth_state');
    if (state !== storedState) {
      toast.error('Authentication failed: Invalid state parameter.');
      return null;
    }
    
    // Clear the state from localStorage
    localStorage.removeItem('youtube_auth_state');
    
    // Exchange the authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: YOUTUBE_CLIENT_ID,
        client_secret: YOUTUBE_CLIENT_SECRET,
        redirect_uri: YOUTUBE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token exchange failed:', errorData);
      toast.error('Failed to connect YouTube: Token exchange failed.');
      return null;
    }
    
    const tokenData = await tokenResponse.json();
    
    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    
    if (!userInfoResponse.ok) {
      console.error('Failed to fetch user info:', await userInfoResponse.json());
      toast.error('Failed to get YouTube channel information.');
      return null;
    }
    
    const userInfo = await userInfoResponse.json();
    const channelInfo = userInfo.items?.[0] || {};
    
    // Get the authenticated user from Supabase
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('User not authenticated. Please log in.');
      return null;
    }
    
    // Calculate token expiration time
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000).toISOString();
    
    // Store the connection in Supabase
    const { data, error } = await supabase
      .from('social_auth')
      .insert({
        user_id: user.id,
        provider: 'youtube',
        provider_name: 'YouTube',
        provider_id: channelInfo.id || null,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: expiresAt,
        platform_specific_data: {
          channel_id: channelInfo.id || null,
          channel_title: channelInfo.snippet?.title || 'YouTube Channel',
          channel_thumbnail: channelInfo.snippet?.thumbnails?.default?.url || null,
          connected_at: new Date().toISOString()
        }
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error storing connection:', error);
      toast.error('Connection failed: ' + error.message);
      return null;
    }
    
    toast.success('YouTube Connected', {
      description: 'Your YouTube account has been successfully connected.',
    });
    
    return data;
  } catch (error) {
    console.error('Unexpected error during YouTube connection:', error);
    toast.error('Connection failed: An unexpected error occurred.');
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
