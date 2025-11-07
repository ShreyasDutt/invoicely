'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Signature } from "lucide-react"
import { CreateSignDialog } from "./createSignDialog"
import { useEffect, useRef, useState } from "react"
import { handleImagekitUpload, handleSignatureFileUpload } from "@/lib/handleImageKitUpload";
import { ButtonGroup } from "../ui/button-group"

export function CreateSignatureSidebar() {
  const [CanvasUrl, setCanvasUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [sigFileProgress,setSigFileProgress] = useState(0);


    useEffect(() => {
      if (!CanvasUrl) {
        return;
      }
      handleImagekitUpload(CanvasUrl,setProgress);
    }, [CanvasUrl])

    
  return (
    <Sheet>
        <SheetTrigger asChild className="border-2 border-dashed">
        <Button 
            variant="outline" 
            className="flex flex-col items-center gap-3 rounded-lg p-6 h-auto"
        >
      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
            <Signature className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col items-center gap-1">
            <span className="font-medium text-sm">Select Image From Assets</span>
            <span className="text-zinc-500 text-xs">Type: signature</span>
            </div>
        </Button>
        </SheetTrigger>
        <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Signature</SheetTitle>
          <SheetDescription>
            Select a Signature stored on your device
          </SheetDescription>
        </SheetHeader>
      <div className="flex items-center justify-center gap-2">
          {progress > 0 ? <div>
              Uploading....
          </div>:<CreateSignDialog onSave={(dataUrl) => setCanvasUrl(dataUrl)}/>}
        <div className="relative">
          <Input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              ref={fileInputRef}
              onChange={()=>{handleSignatureFileUpload(fileInputRef as React.RefObject<HTMLInputElement>,setSigFileProgress)}}
          />
          {sigFileProgress > 0 ? <div>Uploading...</div>:         
          <Button 
            variant={'outline'} 
            className="w-full p-7 border-dashed"
          >
            Upload Signature
          </Button>}
        </div>
      </div>
      </SheetContent>
      
    </Sheet>
  )
}
