import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Play, Upload, Link } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CreateWorkflowDialog from '@/components/workflow/CreateWorkflowDialog';
import SelectWorkflowDialog from '@/components/workflow/SelectWorkflowDialog';

const sampleWorkflows = [
  {
    id: "1",
    name: "YouTube to Short-Form",
    description: "Convert YouTube videos to TikTok, Reels, and Shorts",
    platforms: ["YouTube", "TikTok", "Instagram", "YouTube Shorts"],
    type: "future",
    status: "Active"
  },
  {
    id: "2",
    name: "Podcast Repurposing",
    description: "Turn podcast episodes into audiograms and clips",
    platforms: ["Spotify", "Twitter", "LinkedIn", "Instagram"],
    type: "multiple",
    status: "Active"
  },
  {
    id: "3",
    name: "Blog Content Automation",
    description: "Convert blog posts into carousel posts and threads",
    platforms: ["WordPress", "Twitter", "LinkedIn", "Instagram"],
    type: "multiple",
    status: "Paused"
  }
];

const Dashboard = () => {
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false);
  const [isSelectWorkflowDialogOpen, setIsSelectWorkflowDialogOpen] = useState(false);
  
  const [workflows, setWorkflows] = useState(sampleWorkflows);

  const handleOpenWorkflowDialog = () => {
    setIsWorkflowDialogOpen(true);
  };

  const handleCloseWorkflowDialog = () => {
    setIsWorkflowDialogOpen(false);
  };
  
  const handleUploadContent = () => {
    setIsSelectWorkflowDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleUploadContent}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Content
            </Button>
            <Button 
              className="gradient-bg flex items-center"
              onClick={handleOpenWorkflowDialog}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        </div>
        
        <CreateWorkflowDialog 
          isOpen={isWorkflowDialogOpen} 
          onClose={handleCloseWorkflowDialog} 
        />
        
        <SelectWorkflowDialog
          isOpen={isSelectWorkflowDialogOpen}
          onClose={() => setIsSelectWorkflowDialogOpen(false)}
          workflows={workflows}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Repurposed Content This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23/50</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold">5/7</div>
                <Button variant="ghost" size="sm" className="ml-auto text-primary">
                  <Link className="mr-1 h-4 w-4" /> 
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={`https://picsum.photos/seed/${item}/500/300`} 
                    alt="Content thumbnail" 
                    className="w-full h-48 object-cover"
                  />
                  <Button size="sm" variant="secondary" className="absolute bottom-2 right-2 flex items-center">
                    <Play className="mr-1 h-3 w-3" /> Play
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">How to Grow Your Audience in 2025</h3>
                  <p className="text-sm text-gray-500 mb-3">Repurposed to 5 platforms • 2 days ago</p>
                  <div className="flex items-center space-x-1 text-xs">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">YouTube</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">Instagram</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">+3</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Workflows</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                name: "YouTube to Short-Form",
                description: "Convert YouTube videos to TikTok, Reels, and Shorts",
                platforms: ["YouTube", "TikTok", "Instagram", "YouTube Shorts"],
                status: "Active"
              },
              {
                name: "Podcast Repurposing",
                description: "Turn podcast episodes into audiograms and clips",
                platforms: ["Spotify", "Twitter", "LinkedIn", "Instagram"],
                status: "Active"
              },
              {
                name: "Blog Content Automation",
                description: "Convert blog posts into carousel posts and threads",
                platforms: ["WordPress", "Twitter", "LinkedIn", "Instagram"],
                status: "Paused"
              }
            ].map((workflow, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">{workflow.name}</h3>
                      <p className="text-gray-500 mb-3">{workflow.description}</p>
                      <div className="flex items-center space-x-1 text-xs mb-4 md:mb-0">
                        {workflow.platforms.map((platform, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        workflow.status === 'Active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                      }`}>
                        {workflow.status}
                      </span>
                      <Button variant="ghost" size="sm" className="ml-4">Edit</Button>
                      <Button variant="ghost" size="sm" className="ml-2">Run Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
