import { createProduct, getAllProducts } from "../models/productModel.js";

export const fetchAllProducts = async (req, res) => {
  const products = await getAllProducts();
  res.send({ products });
};

export const createNewProduct = async (req, res) => {
  const { name, imageUrl, description, price } = req.body;
  await createProduct(true, name, imageUrl, description, price);
  res.sendStatus(201);
};
