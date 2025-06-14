import mongoose from "mongoose";
export interface MusicTypes {
  _id: string;
  song: string;
  artist: string;
  src: string;
  image: string;
}
export interface Music extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  song: string;
  artist: string;
  src: string;
  image: string;
}
const MusicSchema = new mongoose.Schema<Music>(
  {
    song: { type: String, required: true },
    artist: { type: String, required: true },
    src: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);
const MusicModel = mongoose.model<Music>("Music", MusicSchema);
export default MusicModel;
