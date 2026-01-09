import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import express from "express";
import cors from "cors";
import "./config/db.js";
import { Router as userRouter } from "./routes/user.route.js";
import { router as contactRouter } from "./routes/contact.route.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "https://contact-mangement-system-ten.vercel.app",
    "https://contact-mangement-system-gveo.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use("/ContactSystem", userRouter);
app.use("/ContactSystem", contactRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on ${PORT}`));
