import mongoose,{Schema,Document} from "mongoose";

enum PhotoType{
    logo="logo",
    signature="signature",
}
export interface PhotoInterface extends Document {
    _id:mongoose.Types.ObjectId,
    url:string,
    fileId:string,
    type:PhotoType,
    userId:mongoose.Types.ObjectId,
    createdAt:Date,
    updatedAt:Date,
}

const PhotoModel = new Schema<PhotoInterface>({
    url:{
        type:String,
        required:true
    },
    fileId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }

},{
    timestamps:true
})

const Photo = (mongoose.models.Photo as mongoose.Model<PhotoInterface>) || mongoose.model<PhotoInterface>('Photo',PhotoModel);
export default Photo;