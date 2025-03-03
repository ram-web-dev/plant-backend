import { Router } from "express";
import {
  createNewCartItem,
  deleteCartItem,
  editCartItemQuantity,
  fetchCartList,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", fetchCartList);
router.post("/", createNewCartItem);
router.patch("/", editCartItemQuantity);
router.delete("/", deleteCartItem);

export default router;
