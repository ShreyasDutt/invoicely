"use client"
import { invoiceAtom } from "@/lib/store"
import getSymbolFromCurrency from "currency-symbol-map";
import { useAtom } from "jotai"

const PDFViewer = () => {
  const [invoiceData] = useAtom(invoiceAtom);
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  const isDark = invoiceData.mode === 'dark';
    
  return (
    <div className={`max-w-4xl mx-auto border font-mono ${isDark ? 'bg-black text-white border-white' : 'bg-white text-black'}`}>
      {/* Invoice Header */}
      <div className={`border-b p-6 ${isDark ? 'border-white' : ''}`}>
        <h1 className={`text-4xl font-bold`} style={{color:invoiceData.AccentColor}}>Invoice {invoiceData.InvoicePrefix}-{invoiceData.InvoiceNumber}</h1>
      </div>
      
      {/* Invoice Details */}
      <div className={`border-b p-6 ${isDark ? 'border-white' : ''}`}>
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
      <div className={`grid grid-cols-2 border-b ${isDark ? 'border-white' : ''}`}>
        <div className={`border-r p-6 ${isDark ? 'border-white' : ''}`}>
          <h3 className="mb-3" style={{color:invoiceData.AccentColor}}>Billed By</h3>
          <p className="font-semibold">{invoiceData.billedBy.name}</p>
          <p>{invoiceData.billedBy.address}</p>
        </div>
        <div className="p-6">
          <h3 className="mb-3" style={{color:invoiceData.AccentColor}}>Billed To</h3>
          <p className="font-semibold">{invoiceData.billedTo.name}</p>
          <p>{invoiceData.billedTo.address}</p>
        </div>
      </div>
      
      {/* Items Table */}
      <div>
        <div className={`grid grid-cols-12 border-b ${isDark ? 'border-white' : ''}`} style={{backgroundColor:invoiceData.AccentColor}}>
          <div className={`col-span-6 p-4 border-r ${isDark ? 'border-white' : ''}`}>Item</div>
          <div className={`col-span-2 p-4 border-r text-center ${isDark ? 'border-white' : ''}`}>Qty</div>
          <div className={`col-span-2 p-4 border-r text-right ${isDark ? 'border-white' : ''}`}>Price</div>
          <div className="col-span-2 p-4 text-right">Total</div>
        </div>
        {invoiceData.items.map((item,index) => (
          <div key={index} className={`grid grid-cols-12 border-b ${isDark ? 'border-white' : ''}`}>
            <div className={`col-span-6 p-4 border-r ${isDark ? 'border-white' : ''}`}>{item.name}</div>
            <div className={`col-span-2 p-4 border-r text-center ${isDark ? 'border-white' : ''}`}>{item.qty}</div>
            <div className={`col-span-2 p-4 border-r text-right ${isDark ? 'border-white' : ''}`}>
              {getSymbolFromCurrency(invoiceData.currency)}{item.price.toFixed(2)}
            </div>
            <div className="col-span-2 p-4 text-right">
              {getSymbolFromCurrency(invoiceData.currency)}{item.total.toFixed(2)}
            </div>
          </div>
        ))}
        
        {/* Empty space */}
        <div className={`h-96 border-b ${isDark ? 'border-white' : ''}`}></div>
      </div>
      
      {/* Totals Section */}
      <div className="grid grid-cols-2">
        <div></div>
        <div className={`border-l ${isDark ? 'border-white' : ''}`}>
          <div className={`flex justify-between p-4 border-b ${isDark ? 'border-white' : ''}`}>
            <span>Subtotal</span>
            <span>{getSymbolFromCurrency(invoiceData.currency)}{subtotal.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between p-4 border-b font-bold ${isDark ? 'border-white' : ''}`}>
            <span>Total</span>
            <span>{getSymbolFromCurrency(invoiceData.currency)}{subtotal.toFixed(2)}</span> 
          </div>
          <div className={`p-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
            <p>Some text here will see later</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFViewer