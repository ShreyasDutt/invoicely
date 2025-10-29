"use client";
import { PDFViewer, DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";

interface ClientPDFViewerProps {
  children: ReactElement<DocumentProps>; // ✅ Must be a <Document />
}

export default function ClientPDFViewer({ children }: ClientPDFViewerProps) {
  return (
    <div style={{ height: "40vh", border: "1px solid #ccc" }}>
      <PDFViewer width="100%" height="100%">
        {children}
      </PDFViewer>
    </div>
  );
}
