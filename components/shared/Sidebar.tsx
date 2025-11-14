import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Images, PanelLeft, Receipt } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <PanelLeft className="h-4 w-4"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-8 pt-8 pb-6"> 
          <SheetTitle className="text-3xl font-bold tracking-tight flex items-center gap-2 font-mono">
            Invox
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Professional invoices, made effortless.
          </SheetDescription>
        </SheetHeader>
        
        {/* Navigation */}
        <div className="flex-1 overflow-auto py-6">
          <div className="px-6 space-y-6">
            {/* Main Section */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-3 block">
                Navigation
              </Label>
              <Link href="/invoices" className="block">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-11 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Receipt className="h-4 w-4 mr-3" />
                  <span className="font-medium">Invoices</span>
                </Button>
              </Link>
              <Link href="/media" className="block">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-11 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Images className="h-4 w-4 mr-3" />
                  <span className="font-medium">Media Library</span>
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}