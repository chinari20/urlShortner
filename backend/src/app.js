import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import connectDB from "./db/dbConnect.js";
import { config } from "./config.js";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import shortURLRouter from "./routes/shortURLRouter.js";

const app = express();

/* ===============================
   MIDDLEWARES
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://urlshortner-lhpj.onrender.com", // ✅ ADD THIS
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ===============================
   DATABASE
================================ */
connectDB();

/* ===============================
   API ROUTES
================================ */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

/* ✅ CREATE SHORT URL */
app.use("/api/s", shortURLRouter);

/* ✅ PUBLIC REDIRECT (CRITICAL FIX) */
app.use("/", shortURLRouter);

/* ===============================
   FRONTEND (PRODUCTION)
================================ */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

/* ❗ DO NOT OVERRIDE /api or /s ROUTES */
app.get(/^\/(?!api|s).*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
});

/* ===============================
   START SERVER
================================ */
app.listen(config.PORT, () =>
  console.log(`🚀 Server running on PORT: ${config.PORT}`)
);
