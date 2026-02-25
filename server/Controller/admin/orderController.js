import { Order, OrderItem, Product } from '../../Model/admin/index.js';
// GET /api/admin/orders
export const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['created_at', 'DESC']],
      include: [
        {
          model: OrderItem, as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'image'] }],
        },
      ],
    });
    res.json({ orders });
  } catch (err) {
    console.error('ORDERS ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};
// GET /api/admin/orders/stats
export const getStats = async (req, res) => {
  try {
    const total     = await Order.count();
    const pending   = await Order.count({ where: { status: 'Pending'    } });
    const inTransit = await Order.count({ where: { status: 'In Transit' } });
    const delivered = await Order.count({ where: { status: 'Delivered'  } });
    const cancelled = await Order.count({ where: { status: 'Cancelled'  } });
    res.json({ total, pending, inTransit, delivered, cancelled });
  } catch (err) {
    console.error('ORDER STATS ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};
// PUT /api/admin/orders/:id/status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.update({ status });
    res.json(order);
  } catch (err) {
    console.error('ORDER UPDATE ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};