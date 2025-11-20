import { InvoiceData, SaveInvoice } from "@/app/actions/Invoice.actions"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { invoiceAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { ChevronDown, FileDown } from "lucide-react"

export function DownloadDropDown() {
  const [invoiceData] = useAtom(invoiceAtom);

  const SaveData:InvoiceData = {
      InvoiceNumber: invoiceData.InvoiceNumber,
      InvoicePrefix: invoiceData.InvoicePrefix,
      date: invoiceData.date,
      dueDate: invoiceData.dueDate || null,
      currency: invoiceData.currency,
      companyName: invoiceData.billedBy.name,
      mode: invoiceData.mode,
      AccentColor: invoiceData.AccentColor,
      billedBy: {
        name: invoiceData.billedBy.name,
        address: invoiceData.billedBy.address
      },
      billedTo: {
        name: invoiceData.billedTo.name,
        address: invoiceData.billedTo.address
      },
      companyLogo: invoiceData.companyLogo,
      companySignature: invoiceData.companySignature,
      paymentTerms: invoiceData.paymentTerms,
      items: invoiceData.items
  }
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button className="flex items-center justify-center"><FileDown className="size-4"/> Download <ChevronDown/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-38 mr-2" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=>{
            SaveInvoice(SaveData);
          }}>
            Save Invoice
          </DropdownMenuItem>
          <DropdownMenuItem>
            View Invoice
          </DropdownMenuItem>
          <DropdownMenuItem>
            Download PDF
          </DropdownMenuItem>
          <DropdownMenuItem>
            Download PNG
          </DropdownMenuItem>
        </DropdownMenuGroup>        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
