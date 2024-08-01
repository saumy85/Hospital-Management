import expres from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnect } from "./databse/dbconnect.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
const app = expres();
config({ path: "./config/.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbconnect();

app.use(errorMiddleware);
export default app;
