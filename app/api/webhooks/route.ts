import { dbConnect } from '@/app/db/dbConnect'
import User from '@/app/db/schemas/user.model';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    console.log("Webhook verified:", evt.type);

        if (evt.type === 'user.created') {
            const {id,first_name,last_name,email_addresses,username} = evt.data;
        try {
            await dbConnect();
            await User.create({
                firstName:first_name,
                lastName:last_name,
                clerkId:id,
                email:email_addresses[0].email_address,
                username:username,
            })
            console.log("User Created with Email : "+email_addresses[0].email_address);
        } catch (error) {
            console.log(error);
        }
        }

        if (evt.type === 'user.updated') {
            const {id,first_name,last_name,email_addresses,username} = evt.data;
        try {
            await dbConnect();
            await User.findOneAndUpdate({clerkId:id},{
                firstName:first_name,
                lastName:last_name,
                clerkId:id,
                email:email_addresses[0].email_address,
                username:username
            })
            console.log("User updated with Email : "+email_addresses[0].email_address);
        } catch (error) {
            console.log(error);
        }
        }

        if (evt.type === 'user.deleted') {
            try {
                await dbConnect();
                await User.findOneAndDelete({clerkId:evt.data.id});
                console.log("User Deleted");
            } catch (error) {
                console.log(error);
            }
        }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}