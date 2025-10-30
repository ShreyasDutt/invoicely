"use client"

import styles from './PDFViewer.module.css'

// Define types (reuse from your form if available)
type PersonInfo = {
  name: string
  address: string
}

type Item = {
  id: number
  name: string
  qty: number
  price: number
  total: number
}

export type InvoiceData = {
  invoiceNumber: string
  serialNumber: string
  date: string
  currency: string
  billedBy: PersonInfo
  billedTo: PersonInfo
  items: Item[]
  companyLogo?: string
  companySignature?: string
}

// Props for PDFViewer
type PDFViewerProps = {
  invoiceData: InvoiceData
  isDarkMode: boolean
}

// Simple number-to-words placeholder
const numberToWords = (num: number): string => {
  if (num === 0) return "zero"
  return "a non-zero amount"
}

const PDFViewer: React.FC<PDFViewerProps> = ({ invoiceData, isDarkMode }) => {

  if (!invoiceData) {
    return <div>Loading preview...</div>
  }

  const subtotal = invoiceData.items.reduce((acc, item) => acc + item.total, 0)
  const total = subtotal
  const totalInWords = numberToWords(total)

  return (
    <div className={`${styles.invoice} ${isDarkMode ? styles.darkMode : ''}`}>
      
      {/* Header & Meta Info */}
      <div className={styles.invoiceHeader}>
        <h1>Invoice</h1>
        <span className={styles.invoiceNumber}>{invoiceData.invoiceNumber}</span>
      </div>

      <div className={styles.metaInfo}>
        <div>
          <p><strong>Serial Number</strong></p>
          <p>{invoiceData.serialNumber}</p>
        </div>
        <div>
          <p><strong>Date</strong></p>
          <p>{new Date(invoiceData.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p><strong>Currency</strong></p>
          <p>{invoiceData.currency}</p>
        </div>
      </div>

      {/* Billing Info */}
      <div className={styles.billingInfo}>
        <div>
          <h4 className={styles.billingTitle}>Billed By</h4>
          {invoiceData.companyLogo && (
            <img 
              src={invoiceData.companyLogo} 
              alt="Company Logo" 
              className={styles.companyLogo} 
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
          <p>{invoiceData.billedBy.name}</p>
          <p>{invoiceData.billedBy.address}</p>
        </div>
        <div>
          <h4 className={styles.billingTitle}>Billed To</h4>
          <p>{invoiceData.billedTo.name}</p>
          <p>{invoiceData.billedTo.address}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className={styles.itemsTable}>
        <thead>
          <tr className={styles.itemsHeader}>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
          <tr className={styles.emptyRow}>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className={styles.totalsSection}>
        <div className={styles.totalsRow}>
          <span className={styles.totalsLabel}>Subtotal</span>
          <span className={styles.totalsValue}>${subtotal.toFixed(2)}</span>
        </div>
        
        <hr className={styles.totalsDivider} />
        
        <div className={`${styles.totalsRow} ${styles.grandTotal}`}>
          <span className={styles.totalsLabel}>Total</span>
          <span className={styles.totalsValue}>${total.toFixed(2)}</span>
        </div>
        
        <div className={styles.totalInWords}>
          <p>Invoice Total (in words)</p>
          <p>{totalInWords}</p>
        </div>
      </div>

      {/* Signature */}
      {invoiceData.companySignature && (
        <div className={styles.signatureSection}>
          <img 
            src={invoiceData.companySignature} 
            alt="Signature" 
            className={styles.companySignature} 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <p>Authorized Signature</p>
        </div>
      )}
    </div>
  )
}

export default PDFViewer
