import React from 'react'

const PDFViewer = () => {
  return (
    <div className="max-w-4xl mx-auto border font-mono">
      {/* Invoice Header */}
      <div className="border-b p-6">
        <h1 className="text-4xl font-bold">Invoice INV-0001</h1>
      </div>
      
      {/* Invoice Details */}
      <div className="border-b p-6">
        <div className="flex gap-32">
          <div className="flex gap-12">
            <span>Serial Number</span>
            <span>0001</span>
          </div>
        </div>
        <div className="flex gap-32 mt-2">
          <div className="flex gap-32">
            <span>Date</span>
            <span>30/10/2025</span>
          </div>
        </div>
        <div className="flex gap-32 mt-2">
          <div className="flex gap-23">
            <span>Currency</span>
            <span>USD</span>
          </div>
        </div>
      </div>

      {/* Billed By and Billed To */}
      <div className="grid grid-cols-2 border-b">
        <div className="border-r p-6">
          <h3 className="mb-3">Billed By</h3>
          <p className="font-semibold">Invox</p>
          <p>Abbotsford,CA</p>
        </div>
        <div className="p-6">
          <h3 className="mb-3">Billed To</h3>
          <p className="font-semibold">John Doe</p>
          <p>456 Second St, Anytown, USA</p>
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
        
        {/* Empty space */}
        <div className="h-96 border-b"></div>
      </div>

      {/* Totals Section */}
      <div className="grid grid-cols-2">
        <div></div>
        <div className="border-l">
          <div className="flex justify-between p-4 border-b">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between p-4 border-b">
            <span className="font-bold">Total</span>
            <span className="font-bold">$0.00</span>
          </div>
          <div className="p-4">
            <p className="text-sm">Total </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFViewer