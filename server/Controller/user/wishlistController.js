import { Wishlist, Product } from "../../Model/user/index.js";

export async function getWishlist(req, res) {
  try {
    const items = await Wishlist.findAll({
      where  : { user_id: req.user.id },
      include: [{ model: Product, as: "Product" }],
    });
    res.json(items.map(i => ({ ...i.Product.dataValues })));
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function addToWishlist(req, res) {
  try {
    const { product_id } = req.body;
    const exists = await Wishlist.findOne({ where: { user_id: req.user.id, product_id } });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });
    const item = await Wishlist.create({ user_id: req.user.id, product_id });
    res.status(201).json(item);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function removeFromWishlist(req, res) {
  try {
    await Wishlist.destroy({ where: { user_id: req.user.id, product_id: req.params.productId } });
    res.json({ message: "Removed from wishlist" });
  } catch (err) { res.status(500).json({ message: err.message }); }
}