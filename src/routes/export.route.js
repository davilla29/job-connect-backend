import express from "express";
import { exportJobApplications } from "../controllers/export.controller.js";

const router = express.Router();

router.get("/job/:id/export-pdf", exportJobApplications);

export default router;
