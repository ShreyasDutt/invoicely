import {atom} from "jotai";

export type PersonInfo = {
  name: string
  address: string
}

export type Item = {
  id: number
  name: string
  qty: number
  price: number
  total: number
}

enum Mode {
  Light = "light",
  Dark = "dark",
}

export type InvoiceData = {
  companyLogo?: string
  companySignature?: string
  billedBy: PersonInfo
  billedTo: PersonInfo
  currency: string
  mode:Mode,
  AccentColor: string
  InvoicePrefix: string
  InvoiceNumber: string
  date: Date
  dueDate: Date | null
  paymentTerms?: string
  notes?: string
  TermsAndConditions?: string
  items: Item[]

}

export const invoiceAtom = atom<InvoiceData>({
  InvoiceNumber: "0001",
  InvoicePrefix: "INV",
  date: (new Date()),
  dueDate: null,
  currency: "USD",
  mode: Mode.Light,
  AccentColor: "#0080ff",
  billedBy: { name: "Invox", address: "Abbotsford, CA" },
  billedTo: { name: "John Doe", address: "123 Main St, USA" },
  items: [
    { id: 1, name: "Web Design", qty: 1, price: 1200, total: 1200 }
  ],
  companyLogo: "",
  companySignature: ""
})
