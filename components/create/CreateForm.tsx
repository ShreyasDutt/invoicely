"use client"
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
import { Label } from "@radix-ui/react-label"
import getSymbolFromCurrency from "currency-symbol-map"
import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Calendar28 } from "./DatePicker"
import { Badge } from "../ui/badge"



export function CreateForm() {
  const [color, setColor] = useState('#0080ff');
  const ColorInputClick = useRef<HTMLInputElement>(null)

  const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "JPY", "CHF", "CNY", "NZD", "SGD", "HKD", "SEK", "NOK", "DKK", "MXN", "BRL", "ZAR", "RUB", "TRY", "KRW", "IDR", "MYR", "PHP", "THB", "SAR", "AED", "PLN"];
  return (

    <Accordion
      type="single"
      collapsible
      className="w-full p-5 md:border"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent>
          <div className="w-full">
          <form>
        <FieldGroup>
          <FieldSet>
          <FieldLabel>
            Company Logo
          </FieldLabel>
                <Input 
                  id="picture" 
                  type="file"
                  accept="image/*"
                  className=""
                />

          </FieldSet>
                  <FieldSet>
          <FieldLabel>
            Company Signature
          </FieldLabel> 
                <Input 
                  id="picture" 
                  type="file"
                  accept="image/*"
                  className=""
                />
        </FieldSet>
        

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
        <AccordionContent>
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
  <AccordionContent>
    <FieldGroup>
      <FieldSet className="w-full">
        {/* Company and style settings */}
        <Field>
          <FieldLabel htmlFor="checkout-7j9-card-name-43j">
            Company name
          </FieldLabel>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Currency Select */}
            <Select defaultValue="USD">
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((code) => (
                  <SelectItem key={code} value={code}>
                    {code} <p>{getSymbolFromCurrency(code)}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Select */}
            <Select defaultValue="light">
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>

            {/* Color Picker */}
            <Label className="flex items-center gap-2 w-full md:w-auto">
              <Button
                className="rounded-md w-8 h-8"
                style={{ backgroundColor: color }}
                onClick={() => {
                  ColorInputClick.current?.click();
                }}
              ></Button>
              <Input className="w-full md:w-[150px]" type="text" value={color} readOnly />
              <Input
                type="color"
                onChange={(e) => setColor(e.target.value)}
                hidden
                ref={ColorInputClick}
              />
            </Label>
          </div>
        </Field>

        {/* Invoice Prefix + Number */}
        <Field className="w-full">
          <div className="flex flex-col md:flex-row md:items-start gap-3 w-full">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Invoice Prefix</FieldLabel>
              <Input type="text" className="w-full" />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Invoice Number</FieldLabel>
              <Input type="text" className="w-full" />
            </div>
          </div>
        </Field>

        {/* Invoice + Due Date */}
        <Field className="w-full">
          <div className="flex flex-col md:flex-row md:items-start gap-3 w-full">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Invoice Date</FieldLabel>
              <Calendar28 CurrentDate={new Date()} />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Due Date</FieldLabel>
              <Calendar28 CurrentDate={null} />
            </div>
          </div>
        </Field>

        {/* Payment Terms */}
        <Field className="w-full">
          <FieldLabel className="flex items-center gap-2">
            Payment Terms <Badge variant={"outline"}>optional</Badge>
          </FieldLabel>
          <Input type="text" placeholder="50% payment due" className="w-full" />
        </Field>
      </FieldSet>
    </FieldGroup>
  </AccordionContent>
</AccordionItem>


      <AccordionItem value="item-4">
        <AccordionTrigger>
          Additonal Information
        </AccordionTrigger>
        <AccordionContent>
                  <FieldGroup>
                    <FieldSet>
                      <Field>
                        <FieldLabel className="flex items-center">
                          Notes <Badge variant={'outline'}>optional</Badge>
                        </FieldLabel>
                        <Textarea placeholder="Any relevent Information that's not already covered" className="resize-none"/>
                      </Field>

                      <Field>
                        <FieldLabel className="flex items-center">
                          Terms <Badge variant={'outline'}>optional</Badge>
                        </FieldLabel>
                        <Textarea placeholder="Any Terms and Conditions" className="resize-none"/>
                      </Field>
                    </FieldSet>
                  </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  )
}
