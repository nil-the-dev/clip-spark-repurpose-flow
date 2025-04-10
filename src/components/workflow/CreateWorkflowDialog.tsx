
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Repeat, ListVideo, Share2, Upload, FileUp } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

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

  const handleClose = () => {
    setSelectedWorkflowType(null);
    setSelectedSource(null);
    setSelectedDestinations([]);
    setShowDestinationSelector(false);
    setCurrentStep(1);
    onClose();
  };

  const renderStep1 = () => (
    <>
      <div className="mt-8 pt-8 border-t">
        <h3 className="font-medium text-xl mb-3">
          {selectedWorkflowType === 'future' 
            ? 'Repurpose future content' 
            : selectedWorkflowType === 'existing' 
            ? 'Repurpose existing content'
            : 'Repurpose one content in multiple destinations'}
        </h3>
        <p className="text-gray-600 mb-6">
          {selectedWorkflowType === 'future' 
            ? 'Whenever you upload new content to your Source platform, it will be automatically published to your Destination within 2 hours.'
            : selectedWorkflowType === 'existing' 
            ? 'Automatically schedule and publish your existing content from your Source platform to your Destination up to 5 times per day.'
            : 'Select one source and add multiple destinations to repurpose your content across various platforms.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Source (choose one)</h4>
            <div className="space-y-2">
              {platforms.sources.map((platform) => (
                <div 
                  key={platform.id}
                  onClick={() => handleSourceSelection(platform.id)}
                  className={`p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer ${
                    selectedSource === platform.id ? 'border-primary bg-primary/5' : ''
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
            {selectedWorkflowType === 'multiple' ? (
              <div>
                <h4 className="font-medium mb-3">Destinations</h4>
                {selectedDestinations.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {selectedDestinations.map((destId, index) => {
                      const destination = platforms.destinations.find(d => d.id === destId);
                      return (
                        <div key={`${destId}-${index}`} className="p-3 border rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <img src={destination?.icon} 
                                 alt={destination?.name} className="h-6 w-6 mr-2" />
                            <span>{destination?.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-500 hover:text-red-500"
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
                          className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer"
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
            ) : (
              <div>
                <h4 className="font-medium mb-3">Destination (choose one)</h4>
                <div className="space-y-2">
                  {platforms.destinations.map((platform) => (
                    <div 
                      key={platform.id}
                      onClick={() => handleDestinationSelection(platform.id)}
                      className={`p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer ${
                        selectedDestinations[0] === platform.id ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <img src={platform.icon} 
                           alt={platform.name} className="h-6 w-6 mr-2" />
                      <span>{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DialogFooter className="mt-8 flex justify-between items-center">
        {selectedWorkflowType && (
          <Button 
            variant="outline" 
            onClick={() => setSelectedWorkflowType(null)}
            className="mr-auto"
          >
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
              className="bg-pink-500 hover:bg-pink-600 text-white"
              onClick={handleNext}
              disabled={!selectedSource || selectedDestinations.length === 0}
            >
              Next
            </Button>
          ) : (
            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white" 
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
    <div className="mt-8 pt-8 border-t">
      <h3 className="font-medium text-xl mb-3">Content Details</h3>
      <p className="text-gray-600 mb-6">
        Upload your content and provide details for it to be repurposed across your selected destinations.
      </p>

      <Form {...form}>
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary font-medium">Click to upload</span>
                <span className="text-gray-500"> or drag and drop</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Videos, images or other content files
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                    className="w-full p-2 border border-gray-300 rounded-md"
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
          onClick={() => setCurrentStep(1)}
          className="mr-auto"
        >
          Back
        </Button>
        <Button 
          onClick={handleClose} 
          variant="ghost"
        >
          Cancel
        </Button>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white">
          Create Workflow
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          {isFirstWorkflow && (
            <div className="mb-4">
              <DialogTitle className="text-2xl">Create your first workflow</DialogTitle>
              <DialogDescription className="text-base mt-1">
                A workflow automates taking content from one platform and publishing it to another.
              </DialogDescription>
            </div>
          )}
          {currentStep === 1 && (
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
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 flex items-center justify-center border border-gray-200 rounded-md bg-gray-50 mr-3">
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
