'use client'
import { Sidebar } from '../shared/Sidebar'
import { Button } from '../ui/button'
import { ClipboardType, Download, ScanEye } from 'lucide-react'
import { CreateForm } from './CreateForm'
import PDFViewer from '../pdf/PDFViewer'
import { useState } from 'react'
import { DownloadDropDown } from './downloadDropdown'

type Photo = {
    _id:string,
    url:string,
    fileId:string,
    type:'logo' | 'signature',
    userId:string,
    createdAt:Date,
    updatedAt:Date,
}

const PreviewSwitcher = ({Images}:{Images:Photo[]}) => {
    const [preview, setPreview] = useState(false);

    return (
        <div className="flex flex-col h-full">
            {/* Top controls */}
            <div className="flex items-center justify-end p-4 border gap-3 px-5">
                <Sidebar/>

                {/* Single toggle button */}
                <Button 
                    variant="outline" 
                    className="sm:hidden" 
                    onClick={() => setPreview(!preview)}
                >
                    {preview ? <>Form <ClipboardType /></> : <>Preview <ScanEye /></>}
                </Button>

                <DownloadDropDown/>
            </div>

            {/* Main content */}
            <div className="flex gap-5 h-[calc(100vh-84px)]">
                {/* Form */}
                <div className={`w-full md:w-6xl md:border md:p-5 overflow-y-auto ${preview ? 'hidden' : 'block'}`}>
                    <CreateForm Images={Images} />
                </div>

                {/* PDF preview */}
                <div className={`w-full border p-4 overflow-y-auto md:block ${preview ? 'block' : 'hidden'}`}>
                    <PDFViewer />
                </div>
            </div>
        </div>
    )
}

export default PreviewSwitcher
