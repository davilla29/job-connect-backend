import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadResume, getResume } from "../controllers/upload.controller.js";

const router = express.Router();

// POST /api/applicants/:id/resume → Upload applicant résumé
router.post("/applicants/:id/resume", upload.single("resume"), uploadResume);

// GET /api/applicants/resume/:filename → Fetch résumé file
router.get("/applicants/resume/:filename", getResume);

export default router;
