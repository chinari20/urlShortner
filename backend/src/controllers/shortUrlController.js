import { nanoid } from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";

export const shortUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const { originalUrl, expiresAt, title, customUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).send({ error: "Original URL is required" });
    }
    let shortCode = "";
    if (customUrl) {
      shortCode = customUrl;
      const existData = await ShortURL.findOne({ shortCode });
      if (existData) {
        return res.status(400).send({ error: "try with new url" });
      }
    } else {
      shortCode = nanoid(7);
      let isUnique = false;
      while (!isUnique) {
        const existData = await ShortURL.findOne({ shortCode });
        if (existData) {
          shortCode = nanoid(7);
        } else {
          isUnique = true;
        }
      }
    }
    const newUser = new ShortURL({
      originalUrl,
      shortCode,
      userId,
    });
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const redirectFunction = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const shortUrlData = await ShortURL.findOne({ shortCode: shortcode });
    if (!shortUrlData) {
      return res.status(404).send({ error: "Short URL not found" });
    }
    // Redirect to the original URL
    return res.redirect(shortUrlData.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export async function getUserUrls(req, res) {
  try {
    // Assuming you have user info in req.user (from auth middleware) - checking if user is authenticated
    const userId = req.user.id;
    const urls = await ShortURL.find({ user: userId }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
}