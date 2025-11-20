import mongoose,{Schema,Document} from "mongoose";

export interface UserInterface extends Document {
    _id:mongoose.Types.ObjectId,
    firstName:string,
    clerkId:string,
    email:string,
    username:string,
    photos:[mongoose.Types.ObjectId],
    Invoices:[mongoose.Types.ObjectId],
    createdAt:Date,
    updatedAt:Date
}

const UserSchema = new Schema<UserInterface>({
    firstName:{
        type:String,
        required:true
    },
    clerkId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    ,
    username:{
        type:String,
        required:true
    }
    ,
    photos:[{
        type:Schema.Types.ObjectId,
        ref:'Photo'
    }],
    Invoices:[{
        type:Schema.Types.ObjectId,
        ref:'Invoice',
        default:[]
    }]
},{
    timestamps:true
})

const User = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>('User',UserSchema);
export default User;