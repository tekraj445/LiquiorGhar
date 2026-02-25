import bcrypt from "bcryptjs";
import Auth from "../Model/authmodel.js";
import { generateToken } from "../security/jwtHelper.js";

// ── REGISTER ──────────────────────────────────────────
export const register = async (req, res) => {
  try {
    console.log("📥 REGISTER BODY:", req.body);          // ← k aayo frontend bata?

    const { firstName, lastName, email, phone, address, dob, password, role } = req.body;

    console.log("🎭 ROLE RECEIVED:", role);               // ← role ko value ke ho?

    const birthDate = new Date(dob);
    const age = Math.floor((Date.now() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 21) {
      return res.status(400).json({ message: "You must be 21 or older to register." });
    }

    const existing = await Auth.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({
      firstName, lastName, email, phone, address, dob,
      password: hashedPassword,
      role: role || "user",
    });

    console.log("✅ USER CREATED IN DB:", {              // ← DB ma k save bhayo?
      id   : user.id,
      email: user.email,
      role : user.role,
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id       : user.id,
        firstName: user.firstName,
        lastName : user.lastName,
        email    : user.email,
        role     : user.role,
      },
    });
  } catch (err) {
    console.error("❌ REGISTER ERROR MESSAGE:", err.message);
    console.error("❌ REGISTER FULL ERROR:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ── LOGIN ─────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    console.log("📥 LOGIN BODY:", req.body);              // ← login ma k aayo?

    const { email, password } = req.body;

    const user = await Auth.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    console.log("🎭 USER FROM DB:", {                    // ← DB bata role k aayo?
      id   : user.id,
      email: user.email,
      role : user.role,
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id       : user.id,
        firstName: user.firstName,
        lastName : user.lastName,
        email    : user.email,
        role     : user.role,
      },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR MESSAGE:", err.message);
    console.error("❌ LOGIN FULL ERROR:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ── GET PROFILE ───────────────────────────────────────
export const getProfile = async (req, res) => {
  try {
    const user = await Auth.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};