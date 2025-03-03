import { Router } from "express";
import {
  createNewOrder,
  fetchUserOrders,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", createNewOrder);
router.get("/", fetchUserOrders);

export default router;
