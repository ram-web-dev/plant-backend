import dbPromise from "../db/connectDb.js";

export const createUserOrder = async (userId) => {
  const db = await dbPromise;
  const createUserOrderQuery = "INSERT INTO orders(user_id) values(?)";
  const order = await db.run(createUserOrderQuery, [userId]);
  return order;
};

export const createOrderFromCart = async (orderId, cartId) => {
  const db = await dbPromise;
  const createOrderFromCartQuery = `
    INSERT INTO order_items(order_id, product_id, quantity, price)
    SELECT 
        ${orderId} AS order_id,
        cart_item.product_id, 
        cart_item.quantity, 
        products.price
    FROM cart
    cart 
    INNER JOIN 
    cart_item ON cart.id = cart_item.cart_id  INNER JOIN products ON products.id = cart_item.product_id 
    WHERE cart.id = ${cartId}
 `;
  await db.run(createOrderFromCartQuery);
};

export const getUserOrders = async (email) => {
  const db = await dbPromise;
  const getUserOrdersQuery = `SELECT order_items.*, products.name 
        FROM order_items 
    INNER JOIN orders on orders.id = order_items.order_id 
    INNER JOIN users ON users.id = orders.user_id 
    INNER JOIN products ON order_items.product_id = products.id WHERE users.email = ?`;
  const orders = await db.all(getUserOrdersQuery, [email]);
  return orders;
};
