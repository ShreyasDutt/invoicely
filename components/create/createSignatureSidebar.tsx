'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FolderKanban, Signature, Upload, Pencil } from "lucide-react"
import { CreateSignDialog } from "./createSignDialog"
import { useEffect, useRef, useState } from "react"
import { handleImagekitUpload, handleSignatureFileUpload } from "@/lib/handleImageKitUpload";

export function CreateSignatureSidebar() {
  const [CanvasUrl, setCanvasUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [sigFileProgress, setSigFileProgress] = useState(0);
  
  useEffect(() => {
    if (!CanvasUrl) {
      return;
    }
    handleImagekitUpload(CanvasUrl, setProgress);
  }, [CanvasUrl])
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="flex flex-col items-center gap-3 rounded-xl p-6 h-auto border-2 border-dashed"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Signature className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="font-semibold text-sm">Select Signature</span>
            <span className="text-muted-foreground text-xs">From your assets</span>
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 space-y-2">
          <SheetTitle className="text-xl font-semibold">Signature Manager</SheetTitle>
          <SheetDescription className="text-sm">
            Create or upload your company signature
          </SheetDescription>
        </SheetHeader>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          
          {/* Create Signature Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Pencil className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Draw Signature</h3>
                <p className="text-xs text-muted-foreground">Create using drawing tool</p>
              </div>
            </div>
            
            {progress > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <CreateSignDialog onSave={(dataUrl) => setCanvasUrl(dataUrl)} />
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Upload Signature Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Upload Signature</h3>
                <p className="text-xs text-muted-foreground">From your device</p>
              </div>
            </div>
            
            <div className="relative">
              <Input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                ref={fileInputRef}
                onChange={() => {
                  handleSignatureFileUpload(
                    fileInputRef as React.RefObject<HTMLInputElement>,
                    setSigFileProgress
                  )
                }}
                accept="image/*"
              />
              {sigFileProgress > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="font-medium">{sigFileProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${sigFileProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full rounded-lg border-2 border-dashed"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Uploaded Signatures Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Saved Signatures</h3>
              <span className="text-xs text-muted-foreground">0 items</span>
            </div>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl border-2 border-dashed bg-muted/30">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Signature className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                No signatures saved
              </p>
              <p className="text-xs text-muted-foreground text-center max-w-[200px]">
                Draw or upload a signature to add it to your library
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t mt-auto">
          <Button 
            type="button" 
            className="w-full rounded-lg"
            variant="default"
          >
            <FolderKanban className="w-4 h-4 mr-2" />
            Manage Media Library
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}