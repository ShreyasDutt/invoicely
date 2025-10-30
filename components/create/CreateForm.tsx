import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { FileImage } from "lucide-react"
import { Label } from "@radix-ui/react-label"

export function CreateForm() {
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
                  Company Name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Invox"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Company Address
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
        <AccordionTrigger>Client Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Client Name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Client Address
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 Second St"
                  className="resize-none"
                />
              </Field>
            </FieldSet>
          </FieldGroup>
         
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Invoice details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
            <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Company name
                </FieldLabel>
                <div className="flex items-center justify-center gap-3">
                    <Select defaultValue="USD">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((code) => (
                          <SelectItem key={code} value={code}>
                            {code}  <p>{getSymbolFromCurrency(code)}</p>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="light">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select currency" />
                        <SelectValue placeholder="Dark"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                    <Label className="flex gap-2">
                      <Button className={`rounded-md`} style={{ backgroundColor: color }} onClick={()=>{
                        ColorInputClick.current?.click()
                      }}></Button>
                      <Input type="text" value={color}/>
                      <Input type='color' onChange={(e)=>{setColor(e.target.value)}} hidden ref={ColorInputClick}/>
                    </Label>
                </div>
              </Field>
              <Field>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Invoice Prefix
                  </FieldLabel>
                  <Input type="text"/>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Invoice Number
                  </FieldLabel>
                  <Input type="text"/>
                  </div>
                </div>
              </Field>

              {/* Due Dates */}
              <Field>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Invoice Prefix
                  </FieldLabel>
                  <Calendar28/>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Invoice Number
                  </FieldLabel>
                  <Input type="text"/>
                  </div>
                </div>
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
