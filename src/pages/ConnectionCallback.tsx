
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleYouTubeCallback } from '@/services/socialMediaService';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ConnectionCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing your connection request...');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Parse the URL parameters
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        const errorParam = params.get('error');
        
        console.log('Callback params:', { 
          code: code ? `${code.substring(0, 10)}...` : 'none', 
          state: state || 'none',
          error: errorParam || 'none'
        });
        
        if (errorParam) {
          setStatus('error');
          setMessage(`Authentication failed: ${errorParam}`);
          setError(errorParam);
          setTimeout(() => {
            navigate('/connections');
          }, 5000);
          return;
        }
        
        if (!code || !state) {
          setStatus('error');
          setMessage('Invalid callback parameters.');
          setError('Missing code or state parameter');
          setTimeout(() => {
            navigate('/connections');
          }, 5000);
          return;
        }
        
        // Handle the callback based on the platform
        // For now, we only support YouTube
        const result = await handleYouTubeCallback(code, state);
        
        if (result) {
          setStatus('success');
          setMessage('Connection successful! Redirecting to connections page...');
          setTimeout(() => {
            navigate('/connections');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('Failed to complete the connection. Please check console for details.');
          setError('Connection processing failed');
          setTimeout(() => {
            navigate('/connections');
          }, 5000);
        }
      } catch (error) {
        console.error('Error in callback processing:', error);
        setStatus('error');
        setMessage('An unexpected error occurred.');
        setError(error instanceof Error ? error.message : 'Unknown error');
        toast.error('Connection failed', {
          description: 'An unexpected error occurred during the connection process.',
        });
        setTimeout(() => {
          navigate('/connections');
        }, 5000);
      }
    };
    
    processOAuthCallback();
  }, [location, navigate]);
  
  return (
    <DashboardLayout>
      <div className="p-6 flex items-center justify-center h-[calc(100vh-64px)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              {status === 'processing' ? 'Connecting Account' : 
               status === 'success' ? 'Connection Successful' : 
               'Connection Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 text-center">
            {status === 'processing' ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            ) : status === 'success' ? (
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <p className="text-center text-gray-700 dark:text-gray-300">{message}</p>
            
            {error && (
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-600 dark:text-red-400">
                Error details: {error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
