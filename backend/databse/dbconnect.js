import mongoose from "mongoose";

export const dbconnect = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT",
    });
    console.log("DB connected");
  } catch (error) {
    console.log("ERR in DB connection", error);
  }
};

// const connectdb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGO_URL);
//     console.log(
//       `Connected to MOngoDb Database ${connect.connection.host}`.bgMagenta
//         .yellow
//     );
//   } catch (error) {
//     console.warn(`Error in Mongodb ${error}`.bgRed.white);
//   }
// };
