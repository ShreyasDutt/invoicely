"use client"
import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer, ReactPDF  } from '@react-pdf/renderer';
import { div } from 'motion/react-m';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export default function Create(){

  const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

  return(
    <>
    <div>
      <PDFViewer width="100%" height="100%">
          <MyDocument />
      </PDFViewer>
    </div>

    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
          {({ loading }) => (loading ? "Loading..." : "Download PDF")}
        </PDFDownloadLink>
    </div>
    </>
  )
}
