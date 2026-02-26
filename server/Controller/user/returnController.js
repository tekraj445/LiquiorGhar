import { Return } from "../../Model/user/index.js";

export async function requestReturn(req, res) {
  try {
    const { order_id, reason } = req.body;
    const ret = await Return.create({ order_id, user_id: req.user.id, reason });
    res.status(201).json(ret);
  } catch (err) { res.status(500).json({ message: err.message }); }
}