import { fn, col }                                          from "sequelize";
import { Order, OrderItem, Product, Address, Notification, Wishlist } from "../../Model/user/index.js";

export async function getOrders(req, res) {
  try {
    const { limit } = req.query;
    const orders = await Order.findAll({
      where  : { user_id: req.user.id },
      include: [{ model: OrderItem, as: "items", include: [{ model: Product, as: "product" }] }],
      order  : [["created_at", "DESC"]],
      limit  : limit ? parseInt(limit) : undefined,
    });
    res.json({ orders });
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function getOrderStats(req, res) {
  try {
    const totalOrders   = await Order.count({ where: { user_id: req.user.id } });
    const spentResult   = await Order.findAll({
      where     : { user_id: req.user.id },
      attributes: [[fn("SUM", col("total_amount")), "total"]],
      raw       : true,
    });
    const totalSpent    = parseFloat(spentResult[0]?.total || 0);
    const pending       = await Order.count({ where: { user_id: req.user.id, status: "Processing" } });
    const wishlistCount = await Wishlist.count({ where: { user_id: req.user.id } });
    res.json({ totalOrders, totalSpent, pending, wishlistCount });
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function placeOrder(req, res) {
  try {
    const { address_id, payment_method, items } = req.body;
    const address = await Address.findByPk(address_id);
    const total   = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const order   = await Order.create({
      user_id         : req.user.id,
      order_number    : `ORD-${Date.now()}`,
      status          : "Processing",
      total_amount    : total,
      delivery_address: address?.address || "",
      address_id,
      payment_method,
    });
    for (const item of items) {
      await OrderItem.create({ order_id: order.id, product_id: item.product_id, quantity: item.quantity, price: item.price });
    }
    await Notification.create({ user_id: req.user.id, message: `Your order ${order.order_number} has been placed!` });
    res.status(201).json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function cancelOrder(req, res) {
  try {
    const order = await Order.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "Processing") return res.status(400).json({ message: "Cannot cancel this order" });
    await order.update({ status: "Cancelled" });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
}