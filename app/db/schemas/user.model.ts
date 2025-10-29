import mongoose,{Schema,Document} from "mongoose";

export interface UserInterface extends Document {
    firstName:string,
    lastName:string,
    clerkId:string,
    email:string,
    username:string,
    createdAt:Date,
    updatedAt:Date
}

const UserSchema = new Schema<UserInterface>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
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
},{
    timestamps:true
})

const User = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>('User',UserSchema);
export default User;