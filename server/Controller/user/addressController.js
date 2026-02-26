import { Address } from "../../Model/user/index.js";

export async function getAddresses(req, res) {
  try {
    res.json(await Address.findAll({ where: { user_id: req.user.id } }));
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function addAddress(req, res) {
  try {
    const addr = await Address.create({ user_id: req.user.id, ...req.body, is_default: false });
    res.status(201).json(addr);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function setDefault(req, res) {
  try {
    await Address.update({ is_default: false }, { where: { user_id: req.user.id } });
    await Address.update({ is_default: true  }, { where: { id: req.params.id, user_id: req.user.id } });
    res.json({ message: "Default updated" });
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function deleteAddress(req, res) {
  try {
    await Address.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
}