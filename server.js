import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/DB.js";

import booksRoute from "./routes/bookRoute.js";

await connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", booksRoute);

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
