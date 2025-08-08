import express from "express";
import {
  applyJob,
  getMyApplications,
    getApplicationById,
  updateApplicationStatus,
  updateInterviewDetails,
  getApplicationsForJob,
} from "../controllers/applications.controller.js";
import {
  verifyToken,
  isCompany,
  isApplicant,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply/:id", verifyToken, isApplicant, applyJob);
router.get("/my-applications", verifyToken, isApplicant, getMyApplications);
router.get("/:id", verifyToken, getApplicationById);
router.put("/:id/status", verifyToken, isCompany, updateApplicationStatus);
router.put("/:id/interview", verifyToken, isCompany, updateInterviewDetails);
router.get("/job/:jobId", verifyToken, isCompany, getApplicationsForJob);

export default router;
