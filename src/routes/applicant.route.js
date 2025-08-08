import express from "express";
import {
  getApplicantProfile,
  updateApplicantProfile,
} from "../controllers/applicant.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/profile/:id", verifyToken, getApplicantProfile);
router.put("/profile/:id", verifyToken, updateApplicantProfile);

export default router;