import express from "express";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/company.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile/:id", verifyToken, getCompanyProfile);
router.put("/profile/:id", verifyToken, updateCompanyProfile);

export default router;
