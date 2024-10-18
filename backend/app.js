import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import  dbConnection  from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/message.route.js";
import userRouter from "./router/user.route.js";
import timelineRouter from "./router/timeline.route.js"
import softwareRouter from "./router/software.route.js";


const app = express();
dotenv.config({path: "./config/.env"})

app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
}))

// console.log(process.env.PORT)
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwares", softwareRouter);


dbConnection();
app.use(errorMiddleware);

export default app;