
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  Repeat, 
  ListVideo, 
  Video, 
  CloudUpload
} from 'lucide-react';

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
    }
  ];

  const handleSelection = (workflowId: string) => {
    setSelectedWorkflowType(workflowId);
  };

  const handleClose = () => {
    setSelectedWorkflowType(null);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:w-[600px] max-w-full p-0 overflow-y-auto">
        <div className="p-6">
          <SheetHeader className="mb-6">
            {isFirstWorkflow && (
              <div className="mb-4">
                <SheetTitle className="text-2xl">Create your first workflow</SheetTitle>
                <SheetDescription className="text-base mt-1">
                  A workflow automates taking content from one platform and publishing it to another.
                </SheetDescription>
              </div>
            )}
            <h3 className="text-xl font-semibold">Choose a workflow type</h3>
          </SheetHeader>

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

          {selectedWorkflowType && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-medium text-xl mb-3">
                {selectedWorkflowType === 'future' ? 'Repurpose future content' : 'Repurpose existing content'}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedWorkflowType === 'future' 
                  ? 'Whenever you upload new content to your Source platform, it will be automatically published to your Destination within 2 hours.'
                  : 'Automatically schedule and publish your existing content from your Source platform to your Destination up to 5 times per day.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Source (choose one)</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_TikTok_%282018-2022%29.svg" 
                           alt="TikTok" className="h-6 w-6 mr-2" />
                      <span>TikTok</span>
                    </div>
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                           alt="Instagram" className="h-6 w-6 mr-2" />
                      <span>Instagram</span>
                    </div>
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" 
                           alt="Facebook" className="h-6 w-6 mr-2" />
                      <span>Facebook</span>
                    </div>
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Dropbox_logo.svg" 
                           alt="Dropbox" className="h-6 w-6 mr-2" />
                      <span>Dropbox</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Destination (choose one)</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_TikTok_%282018-2022%29.svg" 
                           alt="TikTok" className="h-6 w-6 mr-2" />
                      <span>TikTok</span>
                    </div>
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                           alt="Instagram" className="h-6 w-6 mr-2" />
                      <span>Instagram</span>
                    </div>
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                           alt="YouTube" className="h-6 w-6 mr-2" />
                      <span>YouTube</span>
                    </div>
                    <div className="p-3 border rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" 
                           alt="Facebook" className="h-6 w-6 mr-2" />
                      <span>Facebook</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SheetFooter className="mt-8 flex justify-between items-center">
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
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Create Workflow
              </Button>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateWorkflowDialog;
