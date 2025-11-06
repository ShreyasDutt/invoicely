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
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { Signature } from "lucide-react"
import { CreateSignDialog } from "./createSignDialog"
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { saveSignature } from "@/app/actions/Image.action";

export function CreateSignatureSidebar() {
  const [CanvasUrl, setCanvasUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const abortController = new AbortController();
  // console.log("Canvas URL "+CanvasUrl);

      const authenticator = async () => {
        try {
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {
        // Access the file input element using the ref
        if (!CanvasUrl) {
            toast.error("Upload failed : Canvas url is empty");
            return;
        }
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file:CanvasUrl,
                folder: '/Invox',
                fileName: `signature-${Date.now()}.png`,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
            // console.log("Upload response:", uploadResponse);
            // Run a Server Action here
            const res = await saveSignature(uploadResponse.url || '',uploadResponse.fileId || '','signature')
            if (res?.success) {
              setProgress(0);
              return toast.success("Upload successfully");
            }
            toast.error("Upload failed");
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
    };

    useEffect(() => {
      handleUpload();
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
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {progress > 0 ? <div>
              Uploading....
          </div>:<CreateSignDialog onSave={(dataUrl) => setCanvasUrl(dataUrl)}/>}
        <div className="relative">
        <Input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
            // Handle file upload
            const file = e.target.files?.[0];
            }}
        />
        <Button className="w-full">
            Upload Signature
        </Button>
        </div>
        </div>
        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
