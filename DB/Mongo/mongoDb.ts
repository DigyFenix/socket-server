import mongoose from "mongoose";

export default class MongoDb {
  private static _instance: MongoDb;

  private constructor() {
    this.dbConnection();
  }

  public static getInstance(): MongoDb {
    return this._instance || (this._instance = new this());
  }

  public dbConnection = async () => {
    try {
      await mongoose.connect("" + process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      console.log("Error al conectarse a mongodb. " + error);
    }
  };
}
