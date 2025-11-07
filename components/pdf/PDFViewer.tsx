"use client"
import { invoiceAtom } from "@/lib/store"
import getSymbolFromCurrency from "currency-symbol-map";
import { useAtom } from "jotai"

const PDFViewer = () => {
  const [invoiceData] = useAtom(invoiceAtom);
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  const isDark = invoiceData.mode === 'dark';
    
  return (
    <div className={`max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl font-mono ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'}`}>
      {/* Invoice Header with Gradient */}
      <div 
        className="relative p-8 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${invoiceData.AccentColor}15 0%, ${invoiceData.AccentColor}05 100%)`
        }}
      >
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20`} 
          style={{backgroundColor: invoiceData.AccentColor}}
        ></div>
        
        <div className="flex justify-between items-start relative z-10">
          {/* Left: Company Logo */}
          <div className={`rounded-xl p-4 ${isDark ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-sm shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <img 
              src="https://via.placeholder.com/120x80/4F46E5/FFFFFF?text=LOGO" 
              alt="Company Logo"
              className="h-20 w-auto object-contain rounded-lg"
            />
          </div>

          {/* Right: Invoice Title */}
          <div className="text-right">
            <h1 
              className="text-5xl font-bold tracking-tight" 
              style={{color: invoiceData.AccentColor}}
            >
              INVOICE
            </h1>
            <p className={`text-xl mt-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {invoiceData.InvoicePrefix}-{invoiceData.InvoiceNumber}
            </p>
          </div>
        </div>
      </div>
      
      {/* Invoice Details - Modern Card Style */}
      <div className="px-8 py-6">
        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm`}>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Serial Number
              </p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {invoiceData.InvoiceNumber}
              </p>
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Date
              </p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {invoiceData.date.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Currency
              </p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {invoiceData.currency} {getSymbolFromCurrency(invoiceData.currency)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Billed By and Billed To - Modern Cards */}
      <div className="grid grid-cols-2 gap-6 px-8 pb-6">
        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm`}>
          <h3 
            className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" 
            style={{
              color: invoiceData.AccentColor,
              borderColor: invoiceData.AccentColor
            }}
          >
            Billed By
          </h3>
          <p className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {invoiceData.billedBy.name}
          </p>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {invoiceData.billedBy.address}
          </p>
        </div>
        
        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm`}>
          <h3 
            className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" 
            style={{
              color: invoiceData.AccentColor,
              borderColor: invoiceData.AccentColor
            }}
          >
            Billed To
          </h3>
          <p className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {invoiceData.billedTo.name}
          </p>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {invoiceData.billedTo.address}
          </p>
        </div>
      </div>
      
      {/* Items Table - Modern Design */}
      <div className="px-8 pb-6">
        <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm`}>
          {/* Table Header */}
          <div 
            className="grid grid-cols-12 text-white font-bold text-sm"
            style={{
              background: `linear-gradient(135deg, ${invoiceData.AccentColor} 0%, ${invoiceData.AccentColor}dd 100%)`
            }}
          >
            <div className="col-span-6 p-4">ITEM DESCRIPTION</div>
            <div className="col-span-2 p-4 text-center">QTY</div>
            <div className="col-span-2 p-4 text-right">PRICE</div>
            <div className="col-span-2 p-4 text-right">TOTAL</div>
          </div>
          
          {/* Table Rows */}
          {invoiceData.items.map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-12 border-t transition-colors ${
                isDark 
                  ? 'border-gray-700 hover:bg-gray-700/30' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`col-span-6 p-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                <p className="font-semibold">{item.name}</p>
                {item.description && (
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                )}
              </div>
              <div className={`col-span-2 p-4 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.qty}
              </div>
              <div className={`col-span-2 p-4 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {getSymbolFromCurrency(invoiceData.currency)}{item.price.toFixed(2)}
              </div>
              <div className={`col-span-2 p-4 text-right font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getSymbolFromCurrency(invoiceData.currency)}{item.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Totals Section - Sleek Card */}
      <div className="px-8 pb-8">
        <div className="flex justify-end">
          <div className={`w-full md:w-96 rounded-xl overflow-hidden ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm`}>
            <div className={`flex justify-between p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Subtotal
              </span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getSymbolFromCurrency(invoiceData.currency)}{subtotal.toFixed(2)}
              </span>
            </div>
            
            <div 
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${invoiceData.AccentColor}20 0%, ${invoiceData.AccentColor}10 100%)`
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold" style={{color: invoiceData.AccentColor}}>
                  TOTAL
                </span>
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getSymbolFromCurrency(invoiceData.currency)}{subtotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            {invoiceData.paymentTerms && (
              <div className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400 bg-gray-900/30' : 'text-gray-500 bg-gray-50'}`}>
                <p className="font-semibold mb-1">Payment Terms</p>
                <p>{invoiceData.paymentTerms}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      {(invoiceData.notes || invoiceData.TermsAndConditions) && (
        <div className="px-8 pb-8">
          <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm space-y-4`}>
            {invoiceData.notes && (
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notes
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {invoiceData.notes}
                </p>
              </div>
            )}
            
            {invoiceData.TermsAndConditions && (
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Terms & Conditions
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {invoiceData.TermsAndConditions}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Signature Section */}
      <div className="px-8 pb-8">
        <div className="flex justify-end">
          <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg backdrop-blur-sm text-center`}>
            <div className={`mb-3 flex justify-center`}>
              <img 
                src="https://via.placeholder.com/200x80/6366F1/FFFFFF?text=Signature" 
                alt="Company Signature"
                className="h-20 w-auto object-contain"
              />
            </div>
            <div className={`border-t-2 pt-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              <p className={`font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Authorized Signature
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {invoiceData.billedBy.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Accent Color */}
      <div 
        className="h-2"
        style={{backgroundColor: invoiceData.AccentColor}}
      ></div>
    </div>
  )
}

export default PDFViewer