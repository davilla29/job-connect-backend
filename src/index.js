import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/applications.route.js";
import applicantRoutes from "./routes/applicant.route.js";
import companyRoutes from "./routes/company.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5005;

const allowedOrigins = [
  "http://localhost:5173",
  "https://jobconnect-beige.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/applicant", applicantRoutes);
app.use("/api/company", companyRoutes);

// To handle 404 API requests
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return res
      .status(404)
      .json({ message: "The specified API route does not exist" });
  }
  next(); // forward to frontend
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
