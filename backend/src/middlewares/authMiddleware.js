import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    // 🔧 DEV FALLBACK (REMOVE IN PROD)
    if (!token) {
      req.user = { id: "test-user-123" };
      return next();
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({ status: "token not valid" });
  }
};
