import {
  createCart,
  createCartItem,
  getCartItemByProductId,
  getUserCartByEmail,
  getUserCartList,
  updateCartItemQuantity,
  deleteItem,
} from "../models/cartModel.js";
import { getUserByEmail } from "../models/userModel.js";

export const createNewCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  const userCartId = await getUserCartByEmail(req.email);

  if (userCartId !== undefined) {
    const cartItem = await getCartItemByProductId(userCartId.id, productId);

    if (cartItem !== undefined) {
      const updatedQuantity = cartItem.quantity + quantity;
      await updateCartItemQuantity(cartItem.id, updatedQuantity);
    } else {
      await createCartItem(userCartId.id, productId, quantity);
    }
    return res.sendStatus(201);
  } else {
    const user = await getUserByEmail(req.email);

    const userCart = await createCart(user.id);

    await createCartItem(userCart.lastID, productId, quantity);
    return res.sendStatus(201);
  }
};

export const fetchCartList = async (req, res) => {
  const userCartId = await getUserCartByEmail(req.email);
  if (userCartId !== undefined) {
    const cartList = await getUserCartList(userCartId.id);
    return res.send({ cartList });
  }
  return res.send({ cartList: [] });
};

export const editCartItemQuantity = async (req, res) => {
  const { cartItemId, quantity } = req.body;

  await updateCartItemQuantity(cartItemId, quantity);
  res.sendStatus(200);
};

export const deleteCartItem = async (req, res) => {
  const { cartItemId } = req.body;

  await deleteItem(cartItemId);
  res.sendStatus(200);
};
