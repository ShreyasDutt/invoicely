"use server"

import { revalidatePath } from "next/cache";
import { dbConnect } from "../db/dbConnect"
import Photo from "../db/schemas/photo.model";
import { auth } from "@clerk/nextjs/server";
import User from "../db/schemas/user.model";
import ImageKit from '@imagekit/nodejs';

export const saveImage = async(url:string,fileId:string,type:'signature'|'logo') =>{
    try{
        const user = await auth();
        if (!user) {throw new Error("Unauthorized");}
        await dbConnect();
        
        const FoundUser = await User.findOne({
            clerkId:user.userId,
        })
        if (!FoundUser) {
            throw new Error("User not found");
        }

        const SigSaved = await Photo.create({
            url,
            fileId,
            type,
            userId:FoundUser._id
        })

        FoundUser.photos.push(SigSaved._id);
        await FoundUser.save();
        revalidatePath('/create')
        return {success:true};

    }catch(err){
        console.log(err)
    }
}

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || ''
});

export const DeleteImage = async(id:string,fileId:string) =>{
    try {
        await dbConnect();
        await Photo.findByIdAndDelete(id);
        await client.files.delete(fileId);
        revalidatePath('/create')
        return {success:true};

    } catch (error) {
        console.log(error);
    }
}