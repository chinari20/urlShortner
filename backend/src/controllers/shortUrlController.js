import { nanoid } from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";

/* CREATE SHORT URL */
export const shortUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const { originalUrl, customUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    let shortCode = customUrl || nanoid(7);

    while (await ShortURL.findOne({ shortCode })) {
      if (customUrl) {
        return res.status(400).json({ error: "Custom URL already exists" });
      }
      shortCode = nanoid(7);
    }

    const newUrl = await ShortURL.create({
      originalUrl,
      shortCode,
      userId,
    });

    res.status(201).json({
      shortUrl: `http://localhost:3000/api/s/${shortCode}`,
      data: newUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* REDIRECT */
export const redirectFunction = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await ShortURL.findOne({ shortCode });

    if (!url) {
      return res.status(404).send("Short URL not found");
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

/* USER URL HISTORY */
export const getUserUrls = async (req, res) => {
  try {
    const urls = await ShortURL.find({ userId: req.user.id });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};
