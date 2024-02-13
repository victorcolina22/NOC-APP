import mongoose from "mongoose";

interface ConnectionOptions {
  dbName: string;
  mongoUrl: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      console.log("Mongo connected!");
    } catch (error) {
      console.log("Mongo connection error");
      throw error;
    }
  }
}
