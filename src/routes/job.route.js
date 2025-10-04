import express from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getJobsById,
  getPostedJobs,
  getAllJobs,
  updateJobAvailability,
} from "../controllers/jobs.controller.js";
import {
  verifyToken,
  isCompany,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/posted-jobs", verifyToken, isCompany, getPostedJobs);
router.post("/", verifyToken, isCompany, createJob);
router.get("/:id", getJobsById);
router.put("/:id", verifyToken, isCompany, updateJob);
router.patch("/:id/availability", verifyToken, isCompany, updateJobAvailability)
router.delete("/:id", verifyToken, isCompany, deleteJob);

export default router;
