import { Op } from 'sequelize';
import { Product } from '../../Model/admin/index.js';

// GET /api/admin/products
export const getAll = async (req, res) => {
  try {
    const { search } = req.query;
    const where = {};
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    const products = await Product.findAll({
      where,
      order: [['created_at', 'DESC']],
    });
    res.json(products);
  } catch (err) {
    console.error('PRODUCT ERROR:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

// POST /api/admin/products
export const create = async (req, res) => {
  try {
    const { name, price, in_stock } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Name and price required' });
    const product = await Product.create({
      name, price,
      in_stock: in_stock !== undefined ? in_stock : true,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error('PRODUCT CREATE ERROR:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

// PUT /api/admin/products/:id
export const update = async (req, res) => {
  try {
    const { name, price, in_stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.update({
      name, price,
      in_stock: in_stock !== undefined ? in_stock : product.in_stock,
    });
    res.json(product);
  } catch (err) {
    console.error('PRODUCT UPDATE ERROR:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

// DELETE /api/admin/products/:id
export const remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('PRODUCT DELETE ERROR:', err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};