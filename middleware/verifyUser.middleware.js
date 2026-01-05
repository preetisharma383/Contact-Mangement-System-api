import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

export const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel
      .findById(payload._id)
      .select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    return next();

  } catch (error) {
    console.error("verifyUser error:", error.message);
    return res.status(401).json({ error: "Unauthorized user" });
  }
};
