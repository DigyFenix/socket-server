import mongoose, { Schema, model } from "mongoose";

export interface JWTMongoInterface extends mongoose.Document {
  jwt: string;
  usuario: string;
  password: string;
  ip:string;
}

const JWTModel = new Schema({
  jwt: String,
  usuario: String,
  password: String,
  ip:String 
});

export default model<JWTMongoInterface>("JWT", JWTModel);
