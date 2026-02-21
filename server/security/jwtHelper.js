import jwt    from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET  = process.env.JWT_SECRET  || "liquorghar_secret_key";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

export const generateToken  = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
export const verifyToken    = (token)   => jwt.verify(token, JWT_SECRET);
export const hashPassword   = (password)      => bcrypt.hash(password, 12);
export const comparePassword= (password, hash)=> bcrypt.compare(password, hash);