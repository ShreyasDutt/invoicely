"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CreateForm } from "../create/CreateForm";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  text: { fontSize: 12 },
  itemRow: { flexDirection: "row", justifyContent: "space-between" },
});

export default function MyPDF({
  heading,
  date,
  serialNumber,
  billedBy,
  name,
  message,
  items = [],
  total,
}) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.text}>Date: {date}</Text>
          <Text style={styles.text}>Serial No: {serialNumber}</Text>
          <Text style={styles.text}>Billed By: {billedBy}</Text>
          <Text style={styles.text}>Customer: {name}</Text>
          <Text style={styles.text}>Message: {message}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Items</Text>
          {items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text>{item.name}</Text>
              <Text>{item.price} CAD</Text>
            </View>
          ))}
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Total: {total}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
