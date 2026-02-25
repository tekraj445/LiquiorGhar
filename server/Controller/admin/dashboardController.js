import { Op }                        from 'sequelize';
import { Order, OrderItem, Product } from '../../Model/admin/index.js';
import { User }                      from '../../Model/user/user.js';

export const getStats = async (req, res) => {
  try {
    const totalUsers    = await User.count();
    const totalOrders   = await Order.count();
    const pendingOrders = await Order.count({ where: { status: 'Pending' } });
    const revenue       = await Order.sum('total_amount', {
      where: { status: { [Op.notIn]: ['Cancelled'] } },
    });
    res.json({ totalUsers, totalOrders, pendingOrders, revenue: revenue || 0 });
  } catch (err) {
    console.error("STATS ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model  : OrderItem, as: 'items',   // ✅ limit hatayo
          include: [{ model: Product, as: 'product', attributes: ['name'] }],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    console.error("RECENT ORDERS ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};