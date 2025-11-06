"use server"

import { revalidatePath } from "next/cache";
import { dbConnect } from "../db/dbConnect"
import Photo from "../db/schemas/photo.model";
import { auth } from "@clerk/nextjs/server";
import User from "../db/schemas/user.model";

export const saveSignature = async(url:string,fileId:string,type:'signature'|'logo') =>{
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