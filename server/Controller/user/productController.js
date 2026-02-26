import { Op }              from "sequelize";
import { Product, Review } from "../../Model/user/index.js";

export async function getProducts(req, res) {
  try {
    const { search, category, sort, limit } = req.query;
    const where = {};
    if (search) where[Op.or] = [
      { name:  { [Op.iLike]: `%${search}%` } },
      { brand: { [Op.iLike]: `%${search}%` } },
    ];
    if (category && category !== "All") where.category = category;
    const ORDER_MAP = {
      "price-low" : [["price",  "ASC"]],
      "price-high": [["price",  "DESC"]],
      "rating"    : [["rating", "DESC"]],
    };
    const order    = ORDER_MAP[sort] || [["created_at", "DESC"]];
    const products = await Product.findAll({ where, order, limit: limit ? parseInt(limit) : undefined });
    res.json({ products });
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Review, as: "Reviews" }],
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
}