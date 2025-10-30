"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  text: { fontSize: 12 },
  itemRow: { flexDirection: "row", justifyContent: "space-between" },
});

// Type for each item
type PDFItem = {
  name: string;
  price: number;
};

// Props type
type MyPDFProps = {
  heading: string;
  date: string;
  serialNumber: string;
  billedBy: string;
  name: string;
  message: string;
  items?: PDFItem[];
  total: number;
};

export default function MyPDF({
  heading,
  date,
  serialNumber,
  billedBy,
  name,
  message,
  items = [],
  total,
}: MyPDFProps) {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.text}>Date: {date}</Text>
          <Text style={styles.text}>Serial No: {serialNumber}</Text>
          <Text style={styles.text}>Billed By: {billedBy}</Text>
          <Text style={styles.text}>Customer: {name}</Text>
          <Text style={styles.text}>Message: {message}</Text>
        </View>

        {/* Items Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>Items</Text>
          {items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text>{item.name}</Text>
              <Text>{item.price.toFixed(2)} CAD</Text>
            </View>
          ))}
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Total: {total.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
