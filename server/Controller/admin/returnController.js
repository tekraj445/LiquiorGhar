import { Return, Order } from '../../Model/admin/index.js';

// GET /api/admin/returns
export const getAll = async (req, res) => {
  try {
    const returns = await Return.findAll({
      order: [['id', 'DESC']],
      include: [
        { model: Order, as: 'order', attributes: ['order_number'] },
      ],
    });
    res.json(returns);
  } catch (err) {
    console.error('RETURNS ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/returns/:id/status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ret = await Return.findByPk(req.params.id);
    if (!ret) return res.status(404).json({ message: 'Return not found' });
    await ret.update({ status });
    res.json(ret);
  } catch (err) {
    console.error('RETURN UPDATE ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};