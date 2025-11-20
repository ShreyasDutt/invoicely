import mongoose, { Schema, Document } from "mongoose";

export type PersonInfo = {
  name: string;
  address: string;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  qty: number;
  price: number;
  total: number;
};

type Photo = {
  _id: string;
  url: string;
  fileId: string;
  type: "logo" | "signature";
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

enum Mode {
  Light = "light",
  Dark = "dark",
}

export interface InvoiceInterface extends Document {
  createdBy: mongoose.Schema.Types.ObjectId;
  companyLogo?: string;
  companySignature?: string;  
  companyName: string;
  billedBy: PersonInfo;
  billedTo: PersonInfo;
  currency: string;
  mode: Mode;
  AccentColor: string;
  InvoicePrefix: string;
  InvoiceNumber: string;
  date: Date;
  dueDate: Date | null;
  paymentTerms?: string;
  notes?: string;
  TermsAndConditions?: string;
  items: Item[];
  Signature?: Photo[];
  Logo?: Photo[];
}

const PersonSchema = new Schema<PersonInfo>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

const ItemSchema = new Schema<Item>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const PhotoSchema = new Schema<Photo>(
  {
    url: { type: String, required: true },
    fileId: { type: String, required: true },
    type: { type: String, enum: ["logo", "signature"], required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const InvoiceModel = new Schema<InvoiceInterface>(
  {
    createdBy :{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyLogo: { type: String },
    companySignature: { type: String },
    companyName: { type: String, required: true },

    billedBy: { type: PersonSchema, required: true },
    billedTo: { type: PersonSchema, required: true },

    currency: { type: String, required: true },
    mode: { type: String, enum: Object.values(Mode), required: true },

    AccentColor: { type: String, required: true },
    InvoicePrefix: { type: String, required: true },
    InvoiceNumber: { type: String, required: true },

    date: { type: Date, required: true },
    dueDate: { type: Date },

    paymentTerms: { type: String },
    notes: { type: String },
    TermsAndConditions: { type: String },

    items: { type: [ItemSchema], required: true },

    Signature: { type: [PhotoSchema], default: [] },
    Logo: { type: [PhotoSchema], default: [] },
  },
  { timestamps: true }
);

const Invoice = (mongoose.models.Invoice as mongoose.Model<InvoiceInterface>) || mongoose.model<InvoiceInterface>('Invoice',InvoiceModel);
export default Invoice;