import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))



//routes
import messageRouter from "./router/messageRouter.js";
app.use("/api/v1/message", messageRouter);

import userRouter from "./router/userRouter.js";
app.use("/api/v1/user", userRouter);

import appointmentRouter from "./router/appointmentRouter.js";
app.use("/api/v1/appointment", appointmentRouter);

export  {app};
