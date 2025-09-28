// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { allowedCors } from "./address.js";
import apis from "./route/routes.js";
import connectDB from "./utils/db.js";
// Load environment variables from .env file
dotenv.config();

// Extract variables from .env (with default values)
const PORT = process.env.PORT || 5000;

const app = express();

/* ---------------- Middleware Setup ---------------- */

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests
app.use(cookieParser());

// Configure CORS (only allow requests from CLIENT_URL, allow cookies/credentials)
app.use(
  cors({
    origin: allowedCors, 
    credentials: true, // allow cookies and auth headers
  })
);

app.use("/", apis);

/* ---------------- Routes ---------------- */

// Simple test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express server is running successfully 🚀",
  });
});

/* ---------------- Start Server ---------------- */

app.listen(PORT, () => {
    connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
});
