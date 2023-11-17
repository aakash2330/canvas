import mongoose, { Model } from "mongoose";

const certificateSchema = new mongoose.Schema({
   email:String,
   certificateID:String
})

type certificateSchemaType = {
    email:string,
    certificateId:string
}

// export const CERTIFICATE = mongoose.model.certificate || mongoose.model('certificate',certificateSchema);
export const CERTIFICATE = mongoose.models.certificate || mongoose.model('certificate', certificateSchema);
