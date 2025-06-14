import dbPromise from "../db/connectDb.js";

export const getAllProducts = async () => {
  const db = await dbPromise;
  const getAllProductsQuery = "SELECT * FROM products";
  const products = await db.all(getAllProductsQuery);
  return products;
};

export const createProduct = async (
  inStock = true,
  name,
  imageUrl,
  description,
  price
) => {
  const db = await dbPromise;
  const createProductQuery =
    "INSERT INTO products(name, image_url, description, price, in_stock) values(?, ?, ?, ?, ?)";
  await db.run(createProductQuery, [
    name,
    imageUrl,
    description,
    price,
    inStock,
  ]);
};
