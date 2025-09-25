import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
  verifyEmail,
  resendCode,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { validate } from "../middlewares/validateSchema.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendCode);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.post("/logout", verifyToken, logout);

export default router;
