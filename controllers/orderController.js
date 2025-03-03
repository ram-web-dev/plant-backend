import {
  createUserOrder,
  createOrderFromCart,
  getUserOrders,
} from "../models/orderModel.js";
import { getUserIdCartByEmail, deleteCartItems } from "../models/cartModel.js";

export const createNewOrder = async (req, res) => {
  const userCart = await getUserIdCartByEmail(req.email);

  //create entry in order table
  const order = await createUserOrder(userCart.user_id);

  //copy all items from cart to order along with price
  await createOrderFromCart(order.lastID, userCart.id);

  //delete all cart items
  await deleteCartItems(userCart.id);
  res.sendStatus(201);
};

export const fetchUserOrders = async (req, res) => {
  const orders = await getUserOrders(req.email);

  res.send({ orders });
};
