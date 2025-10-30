"use client"

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { FileImage } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import PDFViewer from "../pdf/PDFViewer"


// Hardcoded values for form
const initialInvoiceData = {
  invoiceNumber: "INV-0001",
  serialNumber: "0001",
  date: "2025-10-29", // Use YYYY-MM-DD for date inputs
  currency: "USD",
  billedBy: {
    name: "Invoicely Ltd",
    address: "123 Main St, Anytown, USA",
  },
  billedTo: {
    name: "John Doe",
    address: "456 Second St, Anytown, USA",
  },
  items: [
    { id: 1, name: "Web Design Services", qty: 1, price: 1200, total: 1200 },
    { id: 2, name: "Hosting (1 Year)", qty: 1, price: 150, total: 150 },
    { id: 3, name: "Web Design Services", qty: 1, price: 1200, total: 1200 },
    { id: 4, name: "Hosting (1 Year)", qty: 1, price: 150, total: 150 },
    { id: 5, name: "Web Design Services", qty: 1, price: 1200, total: 1200 },
    { id: 6, name: "Hosting (1 Year)", qty: 1, price: 150, total: 150 },
  ],
  // You can add fields for logo, signature, etc. here
  companyLogo: "https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg",
  companySignature: "https://upload.wikimedia.org/wikipedia/commons/3/38/Alice_Sara_Ott_-_Signature.jpg",
};


export function CreateForm() {

  // -------------------- Static Data for PDF

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

  // --- Handlers for "Billed By" (Accordion 1) ---
  const handleBilledByName = (e) => {
    setInvoiceData(prev => ({
      ...prev,
      billedBy: { ...prev.billedBy, name: e.target.value }
    }));
  };
  const handleBilledByAddress = (e) => {
    setInvoiceData(prev => ({
      ...prev,
      billedBy: { ...prev.billedBy, address: e.target.value }
    }));
  };
  
  // --- Handlers for "Billed To" (Accordion 2) ---
  // (Assuming "Shipping Details" means "Billed To")
  const handleBilledToName = (e) => {
    setInvoiceData(prev => ({
      ...prev,
      billedTo: { ...prev.billedTo, name: e.target.value }
    }));
  };
  const handleBilledToAddress = (e) => {
    setInvoiceData(prev => ({
      ...prev,
      billedTo: { ...prev.billedTo, address: e.target.value }
    }));
  };

  // --------------------------------- Static Data End

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8 min-h-screen">
    <div className="p-4 md:p-6 rounded-lg shadow-sm h-fit">
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent>
          <div className="w-full">
      <form>
        <FieldGroup>
        <div className="flex items-center gap-5 ">
          <FieldSet>
          <FieldLabel>
            Company Logo
          </FieldLabel>
               <Label className="group relative w-32 h-32 rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-2">
                  <FileImage className="w-6 h-6" />
                  <p className="text-sm font-medium">Upload Logo</p>
                  <p className="text-xs text-gray-400">Click to browse</p>
                </div>
                
                <Input 
                  id="picture" 
                  type="file"
                  accept="image/*"
                  className="hidden"
                />

              </Label>

          </FieldSet>
                  <FieldSet>
          <FieldLabel>
            Company Signature
          </FieldLabel>
               <Label className="group relative w-32 h-32 rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-2">
                  <FileImage className="w-6 h-6" />
                  <p className="text-sm font-medium">Upload Logo</p>
                  <p className="text-xs text-gray-400">Click to browse</p>
                </div>
                
                <Input 
                  id="picture" 
                  type="file"
                  accept="image/*"
                  className="hidden"
                />

              </Label>

        </FieldSet>
        </div>

          <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Company name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Invox"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Company address
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 Main St"
                  className="resize-none"
                />
              </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Company name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Invox"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Company address
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 Main St"
                  className="resize-none"
                />
              </Field>
            </FieldSet>
          </FieldGroup>
         
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
                    <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Company name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Invox"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Company address
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 Main St"
                  className="resize-none"
                />
              </Field>
            </FieldSet>
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>

    <div>
        {/* Pass the entire state object down as a prop.
          The PDFViewer will now re-render whenever invoiceData changes.
        */}
        <PDFViewer invoiceData={invoiceData} 

        // Passing in Dark mode
        isDarkMode={false} />
      </div>
      </div>

  )
}
