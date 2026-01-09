import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();


export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      errors: [{ msg: "No token provided" }],
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // 🔥 THIS WAS MISSING
    next();
  } catch (err) {
    return res.status(401).json({
      errors: [{ msg: "Invalid or expired token" }],
    });
  }
};
