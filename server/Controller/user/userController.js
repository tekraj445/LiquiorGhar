import { User }                              from "../../Model/user/index.js";
import { generateToken, hashPassword, comparePassword } from "../../security/jwtHelper.js";

export async function register(req, res) {
  try {
    const { firstName, lastName, email, phone, address, dob, password } = req.body;
    const name   = `${firstName} ${lastName}`.trim();
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const hashed = await hashPassword(password);
    const user   = await User.create({ name, email, phone, dob, password: hashed });
    const token  = generateToken({ id: user.id, email: user.email });
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user  = await User.findOne({ where: { email } });
    if (!user)  return res.status(401).json({ message: "Invalid credentials" });
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, plan: user.plan } });
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function getMe(req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function updateProfile(req, res) {
  try {
    const { name, phone, dob } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.update({ name, phone, dob });
    res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone, dob: user.dob, plan: user.plan });
  } catch (err) { res.status(500).json({ message: err.message }); }
}