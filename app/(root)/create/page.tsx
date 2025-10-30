import { CreateForm } from "@/components/create/CreateForm"
import PDFViewer from "@/components/pdf/PDFViewer"
import Nav from "@/components/shared/Nav"
import { Button } from "@/components/ui/button"
import { Download, ScanEye } from "lucide-react"

const page = () => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="flex items-center justify-end p-4 border gap-3 px-5">
        <Button variant={'outline'}>Preview <ScanEye/></Button>
        <Button>Download <Download/></Button>
      </div>
      <div className="flex gap-5 h-[calc(100vh-84px)]"> 
        
        <div className="w-full md:w-6xl md:border md:p-5 overflow-y-auto">
          <CreateForm />
        </div>
        
        <div className="w-full border p-4 overflow-y-auto hidden md:block">
          <PDFViewer />
        </div>
      </div>
    </>
  )
}

export default page
