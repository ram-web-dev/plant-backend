import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import verifyJwt from "./middlewares/verifyJWT.js";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", authRoutes);

app.use(verifyJwt);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(process.env.PORT_NO, () => {
  console.log(`Listening on port ${process.env.PORT_NO}`);
});
