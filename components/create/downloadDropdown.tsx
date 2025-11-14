import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, FileDown } from "lucide-react"

export function DownloadDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button className="flex items-center justify-center"><FileDown className="size-4"/> Download <ChevronDown/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-38 mr-2" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
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
