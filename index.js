import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import "./config/db.js";
import userRouter from "./routes/user.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express ();

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}))


app.use("/ContactSystem", userRouter);
app.use("/ContactSystem", contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on ${PORT}`));
