import { Router } from "express";

import {
  fetchAllProducts,
  createNewProduct,
} from "../controllers/productController.js";

import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = Router();

router.get("/", fetchAllProducts);

router.use(verifyAdmin);

router.post("/", createNewProduct);

export default router;
