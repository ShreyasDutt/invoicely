'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eraser, Moon, Sun, Pencil } from "lucide-react"
import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"

export function CreateSignDialog({onSave}:{onSave?:(dataUrl:string)=>void}) {
  const [dark, setdark] = useState<boolean>(false);
  const [show, setshow] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  
  const save = () => {
    if (!sigCanvas.current) return;
    const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
    const ctx = trimmedCanvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = dark ? "#18181b" : "#ffffff";
    ctx.fillRect(0, 0, trimmedCanvas.width, trimmedCanvas.height);
    const dataURL = trimmedCanvas.toDataURL("image/png");
    if (onSave) onSave(dataURL);
    closeBtnRef.current?.click();
    setshow(false);
  }
  
  const clear = () => {
    sigCanvas.current?.clear();
    setshow(false);
  }
    
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full rounded-lg border-2 border-dashed"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Create Signature
          </Button>
        </DialogTrigger>    
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create Signature</DialogTitle>
          </DialogHeader>
          
          <div className="relative flex items-center justify-center py-4">
            {show && (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className={`absolute -top-4 right-0 z-10 rounded-lg`}
                onClick={clear}
              >
                <Eraser className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
            
            <div className="rounded-xl overflow-hidden border-2 border-dashed">
              <SignatureCanvas
                onBegin={() => {setshow(true)}}
                key={dark ? "dark" : "light"} 
                ref={sigCanvas}
                penColor={dark ? "white" : "black"}
                canvasProps={{
                  width: 400,
                  height: 250,
                  className: `cursor-crosshair ${dark ? "bg-zinc-900" : "bg-white"}`,
                }}
              />
            </div>
          </div>

          
          <DialogFooter className="gap-2 sm:gap-2">
            <Button 
              type="button"
              variant="outline" 
              size="icon"
              className="rounded-lg"
              onClick={() => {setdark(!dark); setshow(false)}}
            >
              {dark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <DialogClose asChild>
              <Button 
                type="button"
                variant="outline"
                className="rounded-lg"
                ref={closeBtnRef}
              >
                Cancel
              </Button>
            </DialogClose>
            
            <Button 
              type="submit" 
              className="rounded-lg"
              onClick={save}
            >
              Save Signature
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}