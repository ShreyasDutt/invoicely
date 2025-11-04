import mongoose,{Schema,Document} from "mongoose";

enum PhotoType{
    logo="logo",
    signature="signature",
}
export interface PhotoInterface extends Document {
    url:string,
    fileId:string,
    type:PhotoType,
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
    }
},{
    timestamps:true
})

const Photo = (mongoose.models.Photo as mongoose.Model<PhotoInterface>) || mongoose.model<PhotoInterface>('Photo',PhotoModel);
export default Photo;