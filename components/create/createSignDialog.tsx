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
import { BrushCleaning, MoonIcon, SunMedium } from "lucide-react"
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

      const clear = () =>{
        sigCanvas.current?.clear();
        setshow(false);
      }
    
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">Create Signature</Button>
        </DialogTrigger>    
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>Create Company Signature</DialogTitle>
          </DialogHeader>
          <div className={`flex items-center justify-center`}>
            <Button
            className={`
                absolute top-16 right-8 bg-red-500 hover:bg-red-700
                transition-all duration-300 ease-in-out
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
            `}
            onClick={clear}
            >
            <BrushCleaning className="h-4 w-4" />
            </Button>

            <SignatureCanvas
            onBegin={()=>{setshow(true)}}
            key={dark ? "dark" : "light"} 
            ref={sigCanvas}
            penColor={dark ? "white" : "black"}
            canvasProps={{
                width: 350,
                height: 350,
                className: ` rounded-md cursor-pointer border border-dashed ${dark ? "bg-zinc-900" : "bg-white"}`,
            }}
            />

          </div>
          <DialogFooter>
            <Button variant="outline" className="transition-all duration-200" onClick={() => {setdark(!dark); setshow(false)}}>
                <span className={`inline-block transition-all duration-300 ease-in-out ${ dark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                >
                    <MoonIcon className="h-4 w-4" />
                </span>
                <span className={`inline-block absolute transition-all duration-300 ease-in-out ${
                    dark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                >
                    <SunMedium className="h-4 w-4" />
                </span>
            </Button>
            <DialogClose asChild>
              <Button variant="outline" ref={closeBtnRef}>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={save}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
