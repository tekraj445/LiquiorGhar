import { Cart, Product } from "../../Model/user/index.js";

export async function getCart(req, res) {
  try {
    const items = await Cart.findAll({
      where  : { user_id: req.user.id },
      include: [{ model: Product, as: "Product" }],
    });
    res.json(items.map(i => ({ id: i.id, quantity: i.quantity, product: i.Product })));
  } catch (err) {
    console.error("CART ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
}

export async function addToCart(req, res) {
  try {
    const { product_id, quantity = 1 } = req.body;
    let item = await Cart.findOne({ where: { user_id: req.user.id, product_id } });
    if (item) await item.update({ quantity: item.quantity + quantity });
    else item = await Cart.create({ user_id: req.user.id, product_id, quantity });
    res.status(201).json(item);
  } catch (err) {
    console.error("CART ADD ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
}

export async function updateCartItem(req, res) {
  try {
    const item = await Cart.findOne({ where: { user_id: req.user.id, product_id: req.params.productId } });
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    await item.update({ quantity: req.body.quantity });
    res.json(item);
  } catch (err) {
    console.error("CART UPDATE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
}

export async function removeFromCart(req, res) {
  try {
    await Cart.destroy({ where: { user_id: req.user.id, product_id: req.params.productId } });
    res.json({ message: "Removed" });
  } catch (err) {
    console.error("CART REMOVE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
}

export async function clearCart(req, res) {
  try {
    await Cart.destroy({ where: { user_id: req.user.id } });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("CART CLEAR ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
}