"use client"
import { invoiceAtom } from "@/lib/store"
import getSymbolFromCurrency from "currency-symbol-map";
import { useAtom } from "jotai"

const PDFViewer = () => {
  const [invoiceData] = useAtom(invoiceAtom);
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  const isDark = invoiceData.mode === 'dark';
    
  return (
    <div className={`max-w-4xl mx-auto shadow-lg ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Invoice Header */}
      <div className={`p-12 border-b-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-between items-start">
          {/* Left: Company Logo & Info */}
          <div className="flex-1">
            <img 
              src={invoiceData.companyLogo || '/default-logo.png'} 
              alt="Company Logo"
              className="h-16 w-auto object-contain mb-4"
            />
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              <p className={`font-bold text-base mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {invoiceData.billedBy.name}
              </p>
              <p className="whitespace-pre-line">{invoiceData.billedBy.address}</p>
            </div>
          </div>

          {/* Right: Invoice Title & Details */}
          <div className="text-right">
            <h1 
              className="text-4xl font-bold mb-6 tracking-wide"
              style={{color: invoiceData.AccentColor}}
            >
              INVOICE
            </h1>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-8">
                <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Invoice Number:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {invoiceData.InvoicePrefix}-{invoiceData.InvoiceNumber}
                </span>
              </div>
              <div className="flex justify-between gap-8">
                <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date:</span>
                <span className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {invoiceData.date.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between gap-8">
                <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Currency:</span>
                <span className={`${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {invoiceData.currency} {getSymbolFromCurrency(invoiceData.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bill To Section */}
      <div className={`px-12 py-8 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Bill To
          </h3>
          <p className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {invoiceData.billedTo.name}
          </p>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'} whitespace-pre-line`}>
            {invoiceData.billedTo.address}
          </p>
        </div>
      </div>
      
      {/* Items Table */}
      <div className="px-12 py-6">
        <table className="w-full">
          <thead>
            <tr className={`border-b-2 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
              <th className={`text-left py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Description
              </th>
              <th className={`text-center py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Qty
              </th>
              <th className={`text-right py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Unit Price
              </th>
              <th className={`text-right py-3 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr 
                key={index}
                className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
              >
                <td className="py-4">
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </p>
                  {item.description && (
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  )}
                </td>
                <td className={`py-4 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.qty}
                </td>
                <td className={`py-4 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {getSymbolFromCurrency(invoiceData.currency)}{item.price.toFixed(2)}
                </td>
                <td className={`py-4 text-right font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getSymbolFromCurrency(invoiceData.currency)}{item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Totals Section */}
      <div className="px-12 py-6">
        <div className="flex justify-end">
          <div className="w-80">
            <div className={`flex justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Subtotal:
              </span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getSymbolFromCurrency(invoiceData.currency)}{subtotal.toFixed(2)}
              </span>
            </div>
            
            <div className={`flex justify-between py-4 border-b-2 ${isDark ? 'border-gray-600' : 'border-gray-400'}`}>
              <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Total Due:
              </span>
              <span 
                className="text-2xl font-bold"
                style={{color: invoiceData.AccentColor}}
              >
                {getSymbolFromCurrency(invoiceData.currency)}{subtotal.toFixed(2)}
              </span>
            </div>
            
            {invoiceData.paymentTerms && (
              <div className="mt-4">
                <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Payment Terms
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {invoiceData.paymentTerms}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      {(invoiceData.notes || invoiceData.TermsAndConditions) && (
        <div className={`px-12 py-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} space-y-6`}>
          {invoiceData.notes && (
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Notes
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {invoiceData.notes}
              </p>
            </div>
          )}
          
          {invoiceData.TermsAndConditions && (
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Terms & Conditions
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {invoiceData.TermsAndConditions}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Signature Section */}
      <div className={`px-12 py-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-end">
          <div className="text-center w-64">
            <div className="mb-4">
              <img 
                src={invoiceData.companySignature || '/default-signature.png'} 
                alt="Company Signature"
                className="h-16 w-auto object-contain mx-auto"
              />
            </div>
            <div className={`border-t pt-2 ${isDark ? 'border-gray-600' : 'border-gray-400'}`}>
              <p className={`font-semibold text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Authorized Signature
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {invoiceData.billedBy.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Accent */}
      <div 
        className="h-1"
        style={{backgroundColor: invoiceData.AccentColor}}
      ></div>
    </div>
  )
}

export default PDFViewer