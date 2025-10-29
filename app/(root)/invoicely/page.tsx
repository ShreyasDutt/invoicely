"use client"

import { jsPDF } from "jspdf";

export default function Home(){

  const savePdf = () =>{
      const doc = new jsPDF();
      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf");
  }

  return(
    <div>
      <h1>Welcome to invoicely Main page</h1>
      <button onClick={savePdf}>Download PDF</button>
    </div>
  )
}