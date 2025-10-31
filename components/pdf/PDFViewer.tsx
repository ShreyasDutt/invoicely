"use client"

import { invoiceAtom } from "@/lib/store"
import { useAtom } from "jotai"
const PDFViewer = () => {
  const [invoiceData, setinvoiceData] = useAtom(invoiceAtom);
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  return (
    <div className="max-w-4xl mx-auto border font-mono">
      {/* Invoice Header */}
      <div className="border-b p-6">
        <h1 className="text-4xl font-bold">Invoice {invoiceData.InvoicePrefix}-{invoiceData.InvoiceNumber}</h1>
      </div>
      
      {/* Invoice Details */}
      <div className="border-b p-6">
        <div className="flex gap-32">
          <div className="flex gap-12">
            <span>Serial Number</span>
            <span>{invoiceData.InvoiceNumber}</span>
          </div>
        </div>
        <div className="flex gap-32 mt-2">
          <div className="flex gap-32">
            <span>Date</span>
            <span>{invoiceData.date.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-32 mt-2">
          <div className="flex gap-23">
            <span>Currency</span>
            <span>{invoiceData.currency}</span>
          </div>
        </div>
      </div>

      {/* Billed By and Billed To */}
      <div className="grid grid-cols-2 border-b">
        <div className="border-r p-6">
          <h3 className="mb-3">Billed By</h3>
          <p className="font-semibold">{invoiceData.billedBy.name}</p>
          <p>{invoiceData.billedBy.address}</p>
        </div>
        <div className="p-6">
          <h3 className="mb-3">Billed To</h3>
          <p className="font-semibold">{invoiceData.billedTo.name}</p>
          <p>{invoiceData.billedTo.address}</p>
        </div>
      </div>

      {/* Items Table */}
      <div>
        <div className="grid grid-cols-12 border-b">
          <div className="col-span-6 p-4 border-r">Item</div>
          <div className="col-span-2 p-4 border-r text-center">Qty</div>
          <div className="col-span-2 p-4 border-r text-right">Price</div>
          <div className="col-span-2 p-4 text-right">Total</div>
        </div>


        {invoiceData.items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 border-b">
            <div className="col-span-6 p-4 border-r">{item.name}</div>
            <div className="col-span-2 p-4 border-r text-center">{item.qty}</div>
            <div className="col-span-2 p-4 border-r text-right">
              ${item.price.toFixed(2)}
            </div>
            <div className="col-span-2 p-4 text-right">
              ${item.total.toFixed(2)}
            </div>
          </div>
        ))}
        
        {/* Empty space */}
        <div className="h-96 border-b"></div>
      </div>

      {/* Totals Section */}
      <div className="grid grid-cols-2">
        <div></div>
        <div className="border-l">
          <div className="flex justify-between p-4 border-b">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between p-4 border-b font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="p-4 text-sm text-gray-500">
            <p>Some text here will see later</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PDFViewer