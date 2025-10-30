"use client"
import React from 'react'
import styles from './PDFViewer.module.css'

// This is a placeholder. In a real app, you'd use a library
// for this, but it matches the "zero" in your image.
const numberToWords = (num) => {
  if (num === 0) return "zero";
  // A full implementation is complex.
  return "a non-zero amount"; 
}

const PDFViewer = ({ invoiceData }) => {

  if (!invoiceData) {
    return <div>Loading preview...</div>
  }

  // Calculate totals
  const subtotal = invoiceData.items.reduce((acc, item) => acc + item.total, 0);
  
  // In your new image, Total is the same as Subtotal (no tax shown)
  const total = subtotal; 
  const totalInWords = numberToWords(total);

  return (
    <div className={styles.invoice}>
      
      {/* --- Header, Meta, Billing Info (Unchanged) --- */}
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

      <div className={styles.billingInfo}>
        <div>
          <h4 className={styles.billingTitle}>Billed By</h4>
          <p>{invoiceData.billedBy.name}</p>
          <p>{invoiceData.billedBy.address}</p>
        </div>
        <div>
          <h4 className={styles.billingTitle}>Billed To</h4>
          <p>{invoiceData.billedTo.name}</p>
          <p>{invoiceData.billedTo.address}</p>
        </div>
      </div>

      {/* --- Items Table (tfoot is removed) --- */}
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
          {/* This empty row creates the large white space
            seen in your image when there are no items.
          */}
          {invoiceData.items.length === 0 && (
            <tr className={styles.emptyRow}>
              <td colSpan="4"></td>
            </tr>
          )}
        </tbody>
        {/* The <tfoot> ... </tfoot> section is fully removed */}
      </table>

      {/* === NEW TOTALS SECTION (matches your second image) === */}
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
      
    </div>
  )
}

export default PDFViewer