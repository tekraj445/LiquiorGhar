import { Navigate, Outlet, useLocation } from "react-router-dom";

// ── Decode JWT token without any library ──────────────────
function getTokenPayload() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const base64  = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

const PrivateRoutes = () => {
  const location = useLocation();
  const payload  = getTokenPayload();

  // ── No token → redirect to login ──────────────────────
  if (!payload) {
    return <Navigate to="/login" replace />;
  }

  const role        = payload.role;
  const isAdminPath = location.pathname.startsWith("/admin");
  const isUserPath  = location.pathname.startsWith("/user");

  // ── Admin trying to open user pages → send to admin ───
  if (role === "admin" && isUserPath) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // ── User trying to open admin pages → send to user ────
  if (role === "user" && isAdminPath) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // ── All good → render the page ────────────────────────
  return <Outlet />;
};

export default PrivateRoutes;