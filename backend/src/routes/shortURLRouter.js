import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { redirectFunction, shortUrl, getUserUrls } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post("", protect, shortUrl);
shortURLRouter.get("/:shortcode", redirectFunction);
// GET /api/s/history - get all URLs for the logged-in user
shortURLRouter.get("/history", protect, getUserUrls);

export default shortURLRouter;