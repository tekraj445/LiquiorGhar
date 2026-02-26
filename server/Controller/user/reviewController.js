import { Review } from "../../Model/user/index.js";

export async function addReview(req, res) {
  try {
    const { product_id, rating, comment } = req.body;
    const review = await Review.create({ user_id: req.user.id, product_id, rating, comment });
    res.status(201).json(review);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function getProductReviews(req, res) {
  try {
    res.json(await Review.findAll({ where: { product_id: req.params.productId } }));
  } catch (err) { res.status(500).json({ message: err.message }); }
}