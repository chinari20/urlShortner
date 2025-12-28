import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  redirectFunction,
  shortUrl,
  getUserUrls,
} from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

// GET /api/s/history  -> user URL history
shortURLRouter.get("/history", protect, getUserUrls);

// POST /api/s  -> create short URL
shortURLRouter.post("/", protect, shortUrl);

// GET /api/s/:shortCode  -> redirect
shortURLRouter.get("/:shortCode", redirectFunction);

export default shortURLRouter;
