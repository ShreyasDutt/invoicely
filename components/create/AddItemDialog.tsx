'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { invoiceAtom } from "@/lib/store"
import { useAtom } from "jotai"
import { useRef, useState } from "react"
import { toast } from "sonner"

export function AddItemDialog() {

    const [ItemName, setItemName] = useState('');
    const [ItemDescription, setItemDescription] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [UnitPrice, setUnitPrice] = useState('');
    const [invoiceData, setinvoiceData] = useAtom(invoiceAtom);
    const btnRef = useRef<HTMLButtonElement>(null);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const newItem = {
            name: ItemName,
            description: ItemDescription,
            qty: Number(Quantity),
            price: Number(UnitPrice),
            total: Number(Quantity) * Number(UnitPrice)
        }
        setinvoiceData({...invoiceData,items:[...invoiceData.items,newItem]})
        
        setItemName('');
        setItemDescription('');
        setQuantity('');
        setUnitPrice('');
        toast.success('Item added successfully');
        btnRef.current?.click();
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">Add Item</DialogTitle>
            <DialogDescription className="text-sm">
              Add an item to the invoice
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item-name" className="text-sm font-medium">
                Item Name
              </Label>
              <Input 
                id="item-name" 
                name="name" 
                placeholder="Web Design"
                type="text"
                required
                value={ItemName}
                onChange={(e)=>setItemName(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item-description" className="text-sm font-medium">
                Item Description
              </Label>
              <Input 
                id="item-description" 
                name="description" 
                placeholder="Web Design for company's website"
                value={ItemDescription}
                onChange={(e)=>setItemDescription(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </Label>
                <Input 
                  id="quantity" 
                  name="quantity" 
                  placeholder="1" 
                  type="number"
                  min="0"
                  required
                  defaultValue={0}
                  value={Quantity}
                  onChange={(e)=>{
                    const val = e.target.value;
                    setQuantity(val)
                  }}
                  className="h-10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit-price" className="text-sm font-medium">
                  Unit Price
                </Label>
                <Input 
                  id="unit-price" 
                  name="unitPrice" 
                  placeholder="100.00" 
                  type="number"
                  min="0"
                  required
                  defaultValue={0}
                  value={UnitPrice}
                  onChange={(e)=> setUnitPrice(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <DialogClose asChild>
              <Button variant="outline" type="button" ref={btnRef}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}