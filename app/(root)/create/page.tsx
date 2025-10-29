"use client"

import { jsPDF } from "jspdf";
import { useState } from "react";

export default function Home(){

  const [text, setText] = useState("");
  const [font, setFont] = useState("helvetica");

  const savePdf = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const doc = new jsPDF();

    try {
      doc.setFont(font);
    } catch {
      doc.setFont("helvetica");
    }
    
    doc.text(text || "", 10, 20);
    doc.save("a4.pdf");
  }

  return(
    <main>
        <h1>Welcome to Invoicely</h1>
        <form onSubmit={savePdf}>
            <label>
                <span>Enter Text : </span>
                <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type Something..."
                 />
            </label>
            <br />
            <label>
                <span>Font Name: </span>
                <input 
                type="text"
                value={font}
                onChange={(e) => setFont(e.target.value)}
                placeholder="helvetica, times, courier..."
                 />
            </label>
            <br />
            <button
            type="submit"
            >
                Download PDF
            </button>
        </form>
    </main>
  )
}