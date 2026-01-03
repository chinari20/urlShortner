import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  redirectFunction,
  shortUrl,
  getUserUrls,
} from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

/* CREATE SHORT URL */
shortURLRouter.post("/", protect, shortUrl);

/* USER HISTORY (STATIC FIRST) */
shortURLRouter.get("/history", protect, getUserUrls);

/* REDIRECT (DYNAMIC LAST) */
shortURLRouter.get("/:shortcode", redirectFunction);

export default shortURLRouter;
