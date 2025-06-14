import mongoose from "mongoose";

export interface ImageHomeTypes {
  _id: string;
  title: string;
  src: string;
}
export interface ImageHomeDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  src: string;
}
const ImageHomeSchema = new mongoose.Schema<ImageHomeDocument>(
  {
    title: { type: String, required: true },
    src: { type: String, required: true },
  },
  { timestamps: true }
);
const ImageHomeModel = mongoose.model<ImageHomeDocument>(
  "ImageHome",
  ImageHomeSchema
);
export default ImageHomeModel;
