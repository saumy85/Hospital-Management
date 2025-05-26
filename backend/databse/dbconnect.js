import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const dbconnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`DB connected!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("ERROR in DB connection", error);
    process.exit(1)
  }
};

export default dbconnect;
