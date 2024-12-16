import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import messagesRoutes from './routes/messages.route.js'
const app = express();
dotenv.config()
const PORT =  process.env.PORT 

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});