import { verifyToken } from "../security/jwtHelper.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });
  try {
    req.user = verifyToken(authHeader.split(" ")[1]);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}