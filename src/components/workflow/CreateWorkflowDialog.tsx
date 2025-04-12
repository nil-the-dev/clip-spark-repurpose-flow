import React, { useState, useRef } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Repeat, ListVideo, Share2, Upload, FileUp, ArrowLeft } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface CreateWorkflowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstWorkflow?: boolean;
}

const CreateWorkflowDialog: React.FC<CreateWorkflowDialogProps> = ({ 
  isOpen, 
  onClose,
  isFirstWorkflow = true
}) => {
  const [selectedWorkflowType, setSelectedWorkflowType] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
  
  const workflowTypes = [
    {
      id: 'future',
      name: 'Repurpose future content',
      icon: <Repeat className="h-6 w-6" />,
      description: 'Whenever you upload new content to your Source platform, it will be automatically published to your Destination within 2 hours.'
    },
    {
      id: 'existing',
      name: 'Repurpose existing content',
      icon: <ListVideo className="h-6 w-6" />,
      description: 'Automatically schedule and publish your existing content from your Source platform to your Destination up to 5 times per day.'
    },
    {
      id: 'multiple',
      name: 'Repurpose one content in multiple destinations',
      icon: <Share2 className="h-6 w-6" />,
      description: 'Select one source and multiple destinations to repurpose your content across various platforms.'
    }
  ];

  const platforms = {
    sources: [
      { id: 'tiktok', name: 'TikTok', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_TikTok_%282018-2022%29.svg' },
      { id: 'instagram', name: 'Instagram', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' },
      { id: 'facebook', name: 'Facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg' },
      { id: 'dropbox', name: 'Dropbox', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Dropbox_logo.svg' }
    ],
    destinations: [
      { id: 'tiktok', name: 'TikTok', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_TikTok_%282018-2022%29.svg' },
      { id: 'instagram', name: 'Instagram', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' },
      { id: 'youtube', name: 'YouTube', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' },
      { id: 'facebook', name: 'Facebook', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg' }
    ]
  };

  const handleSelection = (workflowId: string) => {
    setSelectedWorkflowType(workflowId);
    setSelectedSource(null);
    setSelectedDestinations([]);
    setShowDestinationSelector(false);
    setCurrentStep(1);
  };

  const handleSourceSelection = (sourceId: string) => {
    setSelectedSource(sourceId);
  };

  const handleDestinationSelection = (destinationId: string) => {
    if (selectedWorkflowType === 'multiple') {
      if (!selectedDestinations.includes(destinationId)) {
        setSelectedDestinations([...selectedDestinations, destinationId]);
        setShowDestinationSelector(false);
      }
    } else {
      setSelectedDestinations([destinationId]);
    }
  };

  const handleAddDestination = () => {
    setShowDestinationSelector(true);
  };

  const handleRemoveDestination = (index: number) => {
    const updatedDestinations = [...selectedDestinations];
    updatedDestinations.splice(index, 1);
    setSelectedDestinations(updatedDestinations);
  };

  const handleNext = () => {
    if (selectedWorkflowType === 'multiple' && currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedWorkflowType(null);
    }
  };

  const handleClose = () => {
    setSelectedWorkflowType(null);
    setSelectedSource(null);
    setSelectedDestinations([]);
    setShowDestinationSelector(false);
    setCurrentStep(1);
    setUploadedFile(null);
    form.reset();
    onClose();
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

  const renderMultipleDestinations = () => (
    <div>
      <h3 className="font-medium text-xl mb-3">
        Repurpose one content in multiple destinations
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Select destinations to repurpose your content across various platforms.
      </p>

      <div>
        <h4 className="font-medium mb-3">Destinations</h4>
        {selectedDestinations.length > 0 ? (
          <div className="space-y-2 mb-4">
            {selectedDestinations.map((destId, index) => {
              const destination = platforms.destinations.find(d => d.id === destId);
              return (
                <div key={`${destId}-${index}`} className="p-3 border rounded-md flex items-center justify-between dark:border-gray-700">
                  <div className="flex items-center">
                    <img src={destination?.icon} 
                          alt={destination?.name} className="h-6 w-6 mr-2" />
                    <span>{destination?.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveDestination(index);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        ) : null}

        {showDestinationSelector ? (
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Select a destination to add:</h5>
            {platforms.destinations
              .filter(d => !selectedDestinations.includes(d.id))
              .map((platform) => (
                <div 
                  key={platform.id}
                  onClick={() => handleDestinationSelection(platform.id)}
                  className="p-3 border rounded-md flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer dark:border-gray-700"
                >
                  <img src={platform.icon} 
                        alt={platform.name} className="h-6 w-6 mr-2" />
                  <span>{platform.name}</span>
                </div>
              ))}
          </div>
        ) : (
          <Button 
            variant="outline" 
            className={`w-full ${selectedDestinations.length > 0 ? 'mt-4' : ''} flex items-center justify-center`}
            onClick={handleAddDestination}
          >
            <Plus className="mr-2 h-4 w-4" />
            {selectedDestinations.length > 0 ? 'Add More Destination' : 'Add Destination'}
          </Button>
        )}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <>
      <div className="mt-4 pt-4 border-t dark:border-gray-700">
        <div className="flex flex-wrap gap-3 mb-6">
          {workflowTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelection(type.id)}
              className={`px-3 py-2 rounded-lg flex items-center transition-all ${
                selectedWorkflowType === type.id
                  ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground font-medium'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {selectedWorkflowType === 'multiple' ? (
          renderMultipleDestinations()
        ) : (
          <>
            <h3 className="font-medium text-xl mb-3">
              {selectedWorkflowType === 'future' 
                ? 'Repurpose future content' 
                : 'Repurpose existing content'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {selectedWorkflowType === 'future' 
                ? 'Whenever you upload new content to your Source platform, it will be automatically published to your Destination within 2 hours.'
                : 'Automatically schedule and publish your existing content from your Source platform to your Destination up to 5 times per day.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Source (choose one)</h4>
                <div className="space-y-2">
                  {platforms.sources.map((platform) => (
                    <div 
                      key={platform.id}
                      onClick={() => handleSourceSelection(platform.id)}
                      className={`p-3 border rounded-md flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer dark:border-gray-700 transition-colors ${
                        selectedSource === platform.id 
                          ? 'border-primary dark:border-white/30 bg-primary/5 dark:bg-white/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <img src={platform.icon} 
                           alt={platform.name} className="h-6 w-6 mr-2" />
                      <span>{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Destination (choose one)</h4>
                <div className="space-y-2">
                  {platforms.destinations.map((platform) => (
                    <div 
                      key={platform.id}
                      onClick={() => handleDestinationSelection(platform.id)}
                      className={`p-3 border rounded-md flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer dark:border-gray-700 transition-colors ${
                        selectedDestinations[0] === platform.id 
                          ? 'border-primary dark:border-white/30 bg-primary/5 dark:bg-white/5' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <img src={platform.icon} 
                           alt={platform.name} className="h-6 w-6 mr-2" />
                      <span>{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <DialogFooter className="mt-8 flex justify-between items-center">
        {selectedWorkflowType && (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="mr-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button 
          onClick={handleClose} 
          variant="ghost"
        >
          Cancel
        </Button>
        {selectedWorkflowType && (
          selectedWorkflowType === 'multiple' ? (
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleNext}
              disabled={selectedDestinations.length === 0}
            >
              Next
            </Button>
          ) : (
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground" 
              disabled={!selectedSource || selectedDestinations.length === 0}
            >
              Create Workflow
            </Button>
          )
        )}
      </DialogFooter>
    </>
  );

  const renderStep2 = () => (
    <div className="mt-4 pt-4 border-t dark:border-gray-700">
      <div className="flex flex-wrap gap-3 mb-6">
        {workflowTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelection(type.id)}
            className={`px-3 py-2 rounded-lg flex items-center transition-all ${
              selectedWorkflowType === type.id
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground font-medium'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
      
      <h3 className="font-medium text-xl mb-3">Content Details</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Upload your content and provide details for it to be repurposed across your selected destinations.
      </p>

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
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
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

      <DialogFooter className="mt-8 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mr-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleClose} 
          variant="ghost"
        >
          Cancel
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Create Workflow
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-2">
          {isFirstWorkflow && !selectedWorkflowType && (
            <div className="mb-4">
              <DialogTitle className="text-2xl">Create your first workflow</DialogTitle>
              <DialogDescription className="text-base mt-1">
                A workflow automates taking content from one platform and publishing it to another.
              </DialogDescription>
            </div>
          )}
          {!selectedWorkflowType && (
            <h3 className="text-xl font-semibold">Choose a workflow type</h3>
          )}
        </DialogHeader>

        {!selectedWorkflowType && (
          <div className="space-y-4">
            {workflowTypes.map((type) => (
              <div 
                key={type.id}
                onClick={() => handleSelection(type.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedWorkflowType === type.id
                    ? 'border-primary/70 bg-primary/5 dark:border-primary/70 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 mr-3">
                    {type.icon}
                  </div>
                  <span className="font-medium">{type.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedWorkflowType && currentStep === 1 && renderStep1()}
        {selectedWorkflowType && currentStep === 2 && renderStep2()}
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
