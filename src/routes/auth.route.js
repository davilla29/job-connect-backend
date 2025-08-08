import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { validate } from "../middlewares/validateSchema.js";

const router = express.Router();

router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", verifyToken, logout);

export default router;
