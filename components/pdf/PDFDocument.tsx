"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  text: { fontSize: 12 },
});

export default function MyPDF({ name, message }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Form Submission</Text>
          <Text style={styles.text}>Name: {name}</Text>
          <Text style={styles.text}>Message: {message}</Text>
        </View>
      </Page>
    </Document>
  );
}