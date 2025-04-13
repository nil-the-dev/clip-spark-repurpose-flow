
import React, { useState, useEffect, useRef } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, FileUp, Upload, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import CreateWorkflowDialog from './CreateWorkflowDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    }
  });
  
  // Filter workflows to only show "multiple destinations" type
  const multipleDestinationWorkflows = workflows.filter(
    workflow => workflow.type === 'multiple'
  );
  
  // Effect to automatically open the create dialog if no matching workflows exist
  useEffect(() => {
    if (isOpen && multipleDestinationWorkflows.length === 0) {
      handleCreateNew();
    }
    
    // Reset state when dialog opens
    if (isOpen) {
      setSelectedWorkflow(null);
      setShowUploadForm(false);
      setUploadedFile(null);
      form.reset();
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
      setShowUploadForm(true);
    }
  };
  
  const handleBack = () => {
    setShowUploadForm(false);
    setSelectedWorkflow(null);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "File uploaded",
        description: `${e.target.files[0].name} has been successfully uploaded.`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add('border-primary');
      dropAreaRef.current.classList.add('bg-primary/5');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-primary');
      dropAreaRef.current.classList.remove('bg-primary/5');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove('border-primary');
      dropAreaRef.current.classList.remove('bg-primary/5');
    }
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      toast({
        title: "File uploaded",
        description: `${e.dataTransfer.files[0].name} has been successfully uploaded.`,
      });
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFormSubmit = () => {
    const selectedWorkflowData = multipleDestinationWorkflows.find(w => w.id === selectedWorkflow);
    
    toast({
      title: "Content uploaded successfully",
      description: `Your content will be repurposed across ${selectedWorkflowData?.platforms.length || 0} platforms.`,
    });
    
    onClose();
  };

  const renderUploadForm = () => {
    const selectedWorkflowData = multipleDestinationWorkflows.find(w => w.id === selectedWorkflow);
    
    return (
      <div className="py-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2 p-0 h-8 w-8"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold">Upload Content</h3>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Selected Workflow</h4>
          <Card className="border dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-medium">{selectedWorkflowData?.name}</h3>
                  <p className="text-muted-foreground text-sm">{selectedWorkflowData?.description}</p>
                  <div className="flex flex-wrap items-center gap-1 text-xs mt-2">
                    {selectedWorkflowData?.platforms.map((platform, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-none">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Form {...form}>
          <div className="space-y-6">
            <div 
              ref={dropAreaRef}
              className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center transition-colors ${
                uploadedFile ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClickUpload}
            >
              {uploadedFile ? (
                <div className="flex flex-col items-center">
                  <FileUp className="h-12 w-12 text-green-500 dark:text-green-400" />
                  <p className="mt-2 font-medium text-green-600 dark:text-green-400">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-primary font-medium">Click to upload</span>
                      <span className="text-gray-500 dark:text-gray-400"> or drag and drop</span>
                      <input 
                        ref={fileInputRef}
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Videos, images or other content files
                  </p>
                </>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your content"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-background text-foreground"
                      rows={4}
                      placeholder="Enter a description for your content"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Form>
      </div>
    );
  };

  const renderWorkflowList = () => (
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
              ? 'border-primary dark:border-primary dark:border-opacity-70 bg-primary/5 dark:bg-white/5' 
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
                      <Badge key={i} variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-none">
                        {platform}
                      </Badge>
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
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {showUploadForm ? "Upload Content" : "Select a Workflow for Your Content"}
            </DialogTitle>
          </DialogHeader>
          
          {multipleDestinationWorkflows.length > 0 && !showUploadForm && renderWorkflowList()}
          {showUploadForm && renderUploadForm()}
          
          <DialogFooter>
            {!showUploadForm && (
              <>
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
              </>
            )}
            
            {showUploadForm && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleFormSubmit}
                  disabled={!uploadedFile}
                >
                  Upload Content
                  <Upload size={16} />
                </Button>
              </>
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
