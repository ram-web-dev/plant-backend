import { Router } from "express";
import {
  authenticateUser,
  registerUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", authenticateUser);

export default router;
