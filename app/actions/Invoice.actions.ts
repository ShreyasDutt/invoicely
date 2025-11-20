'use server'
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "../db/dbConnect";
import Invoice from "../db/schemas/Invoice.model";
import User from "../db/schemas/user.model";
import mongoose, { mongo } from "mongoose";

export interface InvoiceData {
    InvoiceNumber: string,
    InvoicePrefix: string,
    date: Date,
    dueDate: Date | null,
    currency:string,
    mode:'light'|'dark',
    AccentColor:string,
    billedBy:{
        name:string,
        address:string
    },
    billedTo:{
        name:string,
        address:string
    },
    companyName:string,
    companyLogo?:string,
    companySignature?:string,
    paymentTerms?:string,
    items:{
        id:number,
        name:string,
        description:string,
        qty:number,
        price:number,
        total:number
    }[];
}

export const SaveInvoice = async (data: InvoiceData) => {
        const user = await auth();
        if (!user) {
            throw new Error("Unauthorized");
        }
    try {
            await dbConnect();
            const FoundUser = await User.findOne({
                clerkId: user.userId,
            })
            if (!FoundUser) {
                throw new Error("User not found");
            }
            const createdInvoice = await Invoice.create({
                ...data,
                createdBy: FoundUser._id
            })
            FoundUser.Invoices.push(createdInvoice._id as mongoose.Types.ObjectId);
            await FoundUser.save();
            console.log(createdInvoice);
    } catch (error) {
        console.log(error);
    }
}

export const GetInvoices = async () =>{
    const user = await auth();
    if (!user) {
        throw new Error("Unauthorized");
    }
    try {
        await dbConnect();
        const FoundUser = await User.findOne({
            clerkId: user.userId,
        }).populate({
            path:'Invoices',
            options:{
                sort:{
                    createdAt:-1
                }
            }
        }).lean();
        if (!FoundUser) {
            throw new Error("User not found");
        }
        const Invoices = FoundUser?.Invoices || null;
        return {success:true,Invoices};
    } catch (error) {
        console.log(error);
    }
}