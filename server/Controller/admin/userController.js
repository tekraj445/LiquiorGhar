import { Op }   from 'sequelize';
import { User } from '../../Model/user/user.js';

// GET /api/admin/users
export const getAll = async (req, res) => {
  try {
    const { search } = req.query;
    const where = {};
    if (search) {
      where[Op.or] = [
        { name:  { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }
    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']],
    });
    console.log('USERS FOUND:', users.length);
    res.json(users);
  } catch (err) {
    console.error('USER ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/users/:id/suspend
export const toggleSuspend = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    await user.update({ status: newStatus });
    res.json({ message: `User ${newStatus}`, status: newStatus });
  } catch (err) {
    console.error('SUSPEND ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/users/:id
export const remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('DELETE USER ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};