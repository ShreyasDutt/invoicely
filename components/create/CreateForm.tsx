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
import { useRef } from "react"
import { Button } from "../ui/button"
import { Calendar28 } from "./DatePicker"
import { Badge } from "../ui/badge"
import { useAtom } from "jotai"
import { invoiceAtom } from "@/lib/store"
import { AddItemDialog } from "./AddItemDialog"
import { Trash2 } from "lucide-react"
import { EditItemDialog } from "./EditItemDialog"
import { CreateSignatureSidebar } from "./createSignatureSidebar"



export function CreateForm() {
  const [invoiceData, setinvoiceData] = useAtom(invoiceAtom);
  const ColorInputClick = useRef<HTMLInputElement>(null)
  

  enum Mode {
  Light = "light",
  Dark = "dark",
}
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
                <CreateSignatureSidebar/>
        </FieldSet>
        

          <FieldSet>
              <Field>
                <FieldLabel>
                  Company Name
                </FieldLabel>
                <Input
                  placeholder="Invox"
                  required
                  value={invoiceData.billedBy.name}
                  onChange={(e)=>{
                    setinvoiceData({...invoiceData, billedBy:{
                      ...invoiceData.billedBy, name: e.target.value
                    }})
                  }}
                />
              </Field>
              <Field>
                <FieldLabel>
                  Company Address
                </FieldLabel>
                <Textarea
                  placeholder="1234 Main St"
                  value={invoiceData.billedBy.address}
                  onChange={(e)=>{
                    setinvoiceData({...invoiceData, billedBy:{
                      ...invoiceData.billedBy, address: e.target.value
                    }})
                  }}
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
                <FieldLabel>
                  Client Name
                </FieldLabel>
                <Input
                  value={invoiceData.billedTo.name}
                  onChange={(e)=>{
                    setinvoiceData({...invoiceData, billedTo:{
                      ...invoiceData.billedTo, name: e.target.value
                    }})
                  }}
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel>
                  Client Address
                </FieldLabel>
                <Textarea
                  value={invoiceData.billedTo.address}
                  placeholder="1234 Second St"
                  onChange={(e)=>{
                    setinvoiceData({...invoiceData, billedTo:{
                      ...invoiceData.billedTo, address: e.target.value
                    }})
                  }}
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
          <FieldLabel>
            Invoice Settings
          </FieldLabel>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Currency Select */}
            <Select defaultValue={invoiceData.currency} onValueChange={(val)=>{
              if (currencies.includes(val)) {
                setinvoiceData({...invoiceData, currency: val})
              }
            }}>
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
            <Select defaultValue={invoiceData.mode} onValueChange={(val) => {
              if (val === Mode.Light || val === Mode.Dark) {
                setinvoiceData({ ...invoiceData, mode: val })
              }
            }}>
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
                type="button"
                className="rounded-md w-8 h-8"
                style={{ backgroundColor: invoiceData.AccentColor }}
                onClick={() => {
                  ColorInputClick.current?.click()
                }}
              ></Button>

              <Input
                className="w-full md:w-[150px]"
                type="text"
                value={invoiceData.AccentColor}
                readOnly
              />

              <Input
                type="color"
                value={invoiceData.AccentColor}
                onChange={(e) => {
                  setinvoiceData({
                    ...invoiceData,
                    AccentColor: e.target.value,
                  })
                }}
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
              <Input type="text" className="w-full" value={invoiceData.InvoicePrefix}
                onChange={(e)=>{
                  setinvoiceData({...invoiceData, InvoicePrefix: e.target.value})
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Invoice Number</FieldLabel>
              <Input type="text" className="w-full" value={invoiceData.InvoiceNumber} 
                onChange={(e)=>{
                  setinvoiceData({...invoiceData, InvoiceNumber: e.target.value})
                }}
              />
            </div>
          </div>
        </Field>

        {/* Invoice + Due Date */}
        <Field className="w-full">
          <div className="flex flex-col md:flex-row md:items-start gap-3 w-full">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Invoice Date</FieldLabel>
              <Calendar28 CurrentDate={(invoiceData.date)} 
                onChange={(date)=>{
                  setinvoiceData({...invoiceData, date: date ?? new Date()})
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <FieldLabel>Due Date</FieldLabel>
              <Calendar28 CurrentDate={invoiceData.dueDate} 
                onChange={(date)=>{
                  setinvoiceData({...invoiceData, dueDate: date ?? null})
                }}
              />
            </div>
          </div>
        </Field>

        {/* Payment Terms */}
        <Field className="w-full">
          <FieldLabel className="flex items-center gap-2">
            Payment Terms <Badge variant={"outline"}>optional</Badge>
          </FieldLabel>
          <Input type="text" placeholder="50% payment due" className="w-full"  value={invoiceData.paymentTerms}
            onChange={(e)=>{
              setinvoiceData({...invoiceData, paymentTerms: e.target.value})
            }}
          />
        </Field>
      </FieldSet>
    </FieldGroup>
  </AccordionContent>
</AccordionItem>

<AccordionItem value="item-4">
        <AccordionTrigger>
          Invoice Items
        </AccordionTrigger>
        <AccordionContent>
                  <FieldGroup>
                    <FieldSet>
                      <Field className={`${invoiceData.items.length > 0 ? 'block' : 'hidden'}`}>
                        
                        {invoiceData.items.map((item,index)=>{
                          // console.log(item);
                          return(
                            <div key={index} className={`flex items-start justify-between gap-4 p-4 rounded-lg border bg-card`}>
                              <div className="flex-1 space-y-1">
                                <h3 className="font-semibold text-base">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                <p className="text-sm font-medium mt-2">
                                  {item.qty} × {getSymbolFromCurrency(invoiceData.currency)}{item.price}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                <div className="flex gap-2">
                                  <EditItemDialog index={index} />
                                  <Button size="sm" variant="outline" onClick={()=>{
                                    invoiceData.items.splice(index,1)
                                    setinvoiceData({...invoiceData})
                                  }}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p></p>
                                <p>
                                  Total: {getSymbolFromCurrency(invoiceData.currency)}{item.total}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </Field>
                      <Field>
                        <AddItemDialog/>
                      </Field>
                    </FieldSet>
                  </FieldGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
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
                        <Textarea placeholder="Any relevent Information that's not already covered" className="resize-none" value={invoiceData.notes ?? ""}
                          onChange={(e)=>{
                            setinvoiceData({...invoiceData, notes: e.target.value})
                          }}
                        />
                      </Field>

                      <Field>
                        <FieldLabel className="flex items-center">
                          Terms <Badge variant={'outline'}>optional</Badge>
                        </FieldLabel>
                        <Textarea placeholder="Any Terms and Conditions" className="resize-none" value={invoiceData.TermsAndConditions ?? ""} 
                          onChange={(e)=>{
                            setinvoiceData({...invoiceData, TermsAndConditions: e.target.value})
                          }}
                        />
                      </Field>
                    </FieldSet>
                  </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  )
}
