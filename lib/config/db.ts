import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI tidak ditemukan dalam environment variables.");
}
interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}
declare global {
  /* eslint-disable no-var */
  var mongooseCache: MongooseCache;
}
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };
export async function mongooseConnect() {
  if (global.mongooseCache.conn) {
    console.log("Menggunakan koneksi Mongoose...");
    return global.mongooseCache.conn;
  }
  if (!global.mongooseCache.promise) {
    console.log("Menghubungkan ke MongoDB dengan DataBase...");
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "Naliverse",
    });
  }
  global.mongooseCache.conn = await global.mongooseCache.promise;
  console.log("Berhasil terhubung ke DataBase!");
  return global.mongooseCache.conn;
}
