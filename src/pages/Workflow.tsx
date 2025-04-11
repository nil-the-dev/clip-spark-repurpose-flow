
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, ArrowRight, Play, Pause } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CreateWorkflowDialog from '@/components/workflow/CreateWorkflowDialog';

const Workflow = () => {
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false);
  const [activeWorkflows, setActiveWorkflows] = useState([
    {
      name: "YouTube to Short-Form",
      description: "Convert YouTube videos to TikTok, Reels, and Shorts",
      platforms: ["YouTube", "TikTok", "Instagram", "YouTube Shorts"],
      status: "Active",
      lastRun: "2 days ago",
      nextRun: "Tomorrow, 10:00 AM"
    },
    {
      name: "Podcast Repurposing",
      description: "Turn podcast episodes into audiograms and clips",
      platforms: ["Spotify", "Twitter", "LinkedIn", "Instagram"],
      status: "Active",
      lastRun: "Yesterday",
      nextRun: "In 3 days"
    },
    {
      name: "Blog Content Automation",
      description: "Convert blog posts into carousel posts and threads",
      platforms: ["WordPress", "Twitter", "LinkedIn", "Instagram"],
      status: "Paused",
      lastRun: "5 days ago",
      nextRun: "Not scheduled"
    }
  ]);

  const workflowTemplates = [
    {
      title: 'YouTube to Short-Form',
      description: 'Convert YouTube videos to TikTok, Reels, and Shorts',
      icon: '🎬',
    },
    {
      title: 'Podcast Repurposing',
      description: 'Turn podcast episodes into audiograms and clips',
      icon: '🎙️',
    },
    {
      title: 'Blog Content Automation',
      description: 'Convert blog posts into carousel posts and threads',
      icon: '📝',
    },
    {
      title: 'Live Stream Highlights',
      description: 'Extract and optimize key moments from live streams',
      icon: '📺',
    },
  ];

  const openWorkflowDialog = () => {
    setIsWorkflowDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Workflow Management</h1>
          <div className="flex items-center gap-4">
            <Button className="gradient-bg flex items-center" onClick={openWorkflowDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Workflow
            </Button>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Workflow Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{template.icon}</div>
                  <h3 className="font-medium text-lg mb-2">{template.title}</h3>
                  <p className="text-gray-500 mb-4">{template.description}</p>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    Use Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Active Workflows</h2>
          <div className="grid grid-cols-1 gap-4">
            {activeWorkflows.map((workflow, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">{workflow.name}</h3>
                      <p className="text-gray-500 mb-2">{workflow.description}</p>
                      <div className="flex items-center space-x-1 text-xs mb-2">
                        {workflow.platforms.map((platform, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 rounded-full">{platform}</span>
                        ))}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last run: {workflow.lastRun} | Next run: {workflow.nextRun}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        workflow.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {workflow.status}
                      </span>
                      <Button variant="ghost" size="sm" className="ml-4">Edit</Button>
                      <Button variant="ghost" size="sm" className="ml-2">
                        {workflow.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-2">Run Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <CreateWorkflowDialog 
        isOpen={isWorkflowDialogOpen}
        onClose={() => setIsWorkflowDialogOpen(false)}
        isFirstWorkflow={activeWorkflows.length === 0}
      />
    </DashboardLayout>
  );
};

export default Workflow;
