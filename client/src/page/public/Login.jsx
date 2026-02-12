import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema/loginSchema";
import { useAuth } from "../../hooks/useAuth";
import "../../css/global.css";

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const navigate             = useNavigate();
  const { login, loading, error, success } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      // ── Role based redirect ──────────────────
      const role = result.user?.role;
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 800);
    }
  };

  return (
    <div className="auth-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="navbar__logo">Liquor<span>Rush</span></Link>
        <ul className="navbar__links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Delivery Area</a></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login" className="active">Login</Link></li>
        </ul>
        <Link to="/register" className="navbar__cta">Order Now →</Link>
      </nav>

      {/* CARD */}
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-sub">Sign in to continue your 24/7 delivery service</p>

          {error   && <div className="server-error">{error}</div>}
          {success && <div className="server-success">{success}</div>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap">
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  className={errors.email ? "input--error" : ""}
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`has-icon${errors.password ? " input--error" : ""}`}
                  {...register("password")}
                />
                <span className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                  {showPw ? "🙈" : "👁"}
                </span>
              </div>
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            <div className="form-extras">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
          <p className="age-notice">Must be 21+ years old to use this service</p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2026 <span>LiquorRush</span>. All rights reserved. | Drink responsibly. Must be 21+ to order.</p>
      </footer>
    </div>
  );
}