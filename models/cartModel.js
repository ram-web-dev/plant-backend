import dbPromise from "../db/connectDb.js";

export const createCart = async (userId) => {
  const db = await dbPromise;
  const createCartQuery = "INSERT INTO cart(user_id) VALUES(?)";
  const cart = await db.run(createCartQuery, [userId]);
  return cart;
};

export const createCartItem = async (cartId, productId, quantity) => {
  const db = await dbPromise;
  const createCartItemQuery =
    "INSERT INTO cart_item(cart_id, product_id, quantity) VALUES(?, ?, ? )";
  await db.run(createCartItemQuery, [cartId, productId, quantity]);
};

export const getCartItemByProductId = async (cartId, productId) => {
  const db = await dbPromise;
  const getCartItemByProductIdQuery =
    "SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ?";
  return await db.get(getCartItemByProductIdQuery, [cartId, productId]);
};

export const getUserCartByEmail = async (email) => {
  const db = await dbPromise;
  const getUserCartQuery =
    "SELECT cart.id FROM cart INNER JOIN users on cart.user_id = users.id WHERE users.email = ?";
  const userCartId = await db.get(getUserCartQuery, email);
  return userCartId;
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  const db = await dbPromise;
  const updateCartItemQuantityQuery =
    "UPDATE cart_item SET quantity = ? WHERE id = ?";

  const res = await db.run(updateCartItemQuantityQuery, [quantity, cartItemId]);
};

export const getUserCartList = async (cartId) => {
  const db = await dbPromise;
  const getUserCartListQuery =
    "SELECT cart_item.id, products.name, products.price, cart_item.quantity FROM cart_item INNER JOIN products ON cart_item.product_id = products.id WHERE cart_item.cart_id = ?";
  const cartList = await db.all(getUserCartListQuery, [cartId]);
  return cartList;
};

export const deleteItem = async (id) => {
  const db = await dbPromise;
  const deleteItemQuery = "DELETE FROM cart_item WHERE id=?";
  await db.run(deleteItemQuery, [id]);
};

export const getUserIdCartByEmail = async (email) => {
  const db = await dbPromise;
  const getUserIdCartByEmailQuery =
    "SELECT cart.id, cart.user_id FROM cart INNER JOIN users on cart.user_id = users.id WHERE users.email = ?";

  const userAndCart = await db.get(getUserIdCartByEmailQuery, [email]);

  return userAndCart;
};

export const deleteCartItems = async (cartId) => {
  const db = await dbPromise;
  const deletCartItemsQuery = "DELETE FROM cart_item WHERE cart_id = ?";
  await db.run(deletCartItemsQuery, [cartId]);
};
