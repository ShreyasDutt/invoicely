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

export function CreateForm() {
  return (
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
  )
}
