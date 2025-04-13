
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CreateWorkflowDialog from './CreateWorkflowDialog';
import { useToast } from '@/hooks/use-toast';

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  type: string;
}

interface SelectWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workflows: WorkflowItem[];
}

const SelectWorkflowDialog: React.FC<SelectWorkflowDialogProps> = ({
  isOpen,
  onClose,
  workflows
}) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter workflows to only show "multiple destinations" type
  const multipleDestinationWorkflows = workflows.filter(
    workflow => workflow.type === 'multiple'
  );
  
  // Effect to automatically open the create dialog if no matching workflows exist
  useEffect(() => {
    if (isOpen && multipleDestinationWorkflows.length === 0) {
      handleCreateNew();
    }
  }, [isOpen, multipleDestinationWorkflows.length]);

  const handleWorkflowSelect = (workflowId: string) => {
    setSelectedWorkflow(workflowId);
  };

  const handleCreateNew = () => {
    setIsCreateDialogOpen(true);
    onClose(); // Close the select dialog
  };

  const handleContinue = () => {
    if (selectedWorkflow) {
      toast({
        title: "Workflow selected",
        description: "You will now be able to upload content for this workflow.",
      });
      onClose();
    }
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Select a Workflow for Your Content</DialogTitle>
          </DialogHeader>
          
          {multipleDestinationWorkflows.length > 0 ? (
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                Choose an existing workflow for your content to be repurposed across multiple platforms:
              </p>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {multipleDestinationWorkflows.map((workflow) => (
                  <Card 
                    key={workflow.id}
                    className={`cursor-pointer transition-all border hover:border-primary/70 ${
                      selectedWorkflow === workflow.id 
                      ? 'border-primary dark:border-white/30 bg-primary/5 dark:bg-white/5' 
                      : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => handleWorkflowSelect(workflow.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium">{workflow.name}</h3>
                          <p className="text-muted-foreground text-sm">{workflow.description}</p>
                          <div className="flex flex-wrap items-center gap-1 text-xs mt-2">
                            {workflow.platforms.map((platform, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex items-center justify-center mt-6">
                <Button variant="outline" onClick={handleCreateNew} className="flex items-center gap-2">
                  <Plus size={16} />
                  Create New Workflow
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">
                You don't have any "Repurpose one content in multiple destinations" workflows yet.
              </p>
              <p className="text-muted-foreground mb-4">
                Create one to continue uploading content.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {multipleDestinationWorkflows.length > 0 && (
              <Button 
                onClick={handleContinue} 
                disabled={!selectedWorkflow}
                className="flex items-center gap-2"
              >
                Continue
                <ArrowRight size={16} />
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <CreateWorkflowDialog 
        isOpen={isCreateDialogOpen} 
        onClose={handleCreateDialogClose} 
        isFirstWorkflow={false}
        preSelectedType="multiple"
      />
    </>
  );
};

export default SelectWorkflowDialog;
