import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/applications.route.js";
import applicantRoutes from "./routes/applicant.route.js";
import companyRoutes from "./routes/company.route.js";
import exportRoutes from "./routes/export.route.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://jobconnect-beige.vercel.app",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/applicant", applicantRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/export", exportRoutes);

// 404 Handler for unknown API routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res
      .status(404)
      .json({ message: "The specified API route does not exist" });
  }
  next();
});

export default app;
