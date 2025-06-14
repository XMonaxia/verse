import mongoose from "mongoose";
export interface PuisiTypes {
  _id: string;
  title: string;
  content: string[];
}
export interface PuisiDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string[];
}
const PuisiSchema = new mongoose.Schema<PuisiDocument>(
  {
    title: { type: String, required: true },
    content: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);
const PuisiModel = mongoose.model<PuisiDocument>("Puisi", PuisiSchema);
export default PuisiModel;
