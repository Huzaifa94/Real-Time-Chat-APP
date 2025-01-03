import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import messagesRoutes from "./routes/messages.route.js";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    secure: false,
  })
);
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
