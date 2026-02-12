import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema/registerSchema";
import { useAuth } from "../../hooks/useAuth";
import "../../css/global.css";

export default function Register() {
  const [showPw, setShowPw]           = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate                       = useNavigate();
  const { register: registerUser, loading, error, success } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver     : zodResolver(registerSchema),
    defaultValues: { terms: false, role: "user" },
  });

  const onSubmit = async (data) => {
    const { confirmPassword, terms, ...payload } = data;
    const result = await registerUser(payload);
    if (result.success) {
      // ✅ Register paxi login page ma pathau
      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
          <li><Link to="/register" className="active">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <Link to="/register" className="navbar__cta">Order Now →</Link>
      </nav>

      {/* CARD */}
      <div className="auth-wrapper">
        <div className="auth-card auth-card--wide">
          <h2>Create Account</h2>
          <p className="auth-sub">Create your account for 24/7 delivery service</p>

          {error   && <div className="server-error">{error}</div>}
          {success && <div className="server-success">✅ {success} — Redirecting to login...</div>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* First + Last Name */}
            <div className="form-row-2">
              <div className="form-group">
                <label>First Name</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className={errors.firstName ? "input--error" : ""}
                    {...register("firstName")}
                  />
                </div>
                {errors.firstName && <p className="error-msg">{errors.firstName.message}</p>}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className={errors.lastName ? "input--error" : ""}
                    {...register("lastName")}
                  />
                </div>
                {errors.lastName && <p className="error-msg">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
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

            {/* Phone */}
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrap">
                <input
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  className={errors.phone ? "input--error" : ""}
                  {...register("phone")}
                />
              </div>
              {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
            </div>

            {/* Role */}
            <div className="form-group">
              <label>Register As</label>
              <div className="input-wrap">
                <select className="role-select" {...register("role")}>
                  <option value="user">👤 Customer</option>
                  <option value="admin">🔧 Admin</option>
                </select>
              </div>
              {errors.role && <p className="error-msg">{errors.role.message}</p>}
            </div>

            {/* Address */}
            <div className="form-group">
              <label>Current Address</label>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="Enter your address"
                  className={errors.address ? "input--error" : ""}
                  {...register("address")}
                />
              </div>
              {errors.address && <p className="error-msg">{errors.address.message}</p>}
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label>Date of Birth</label>
              <div className="input-wrap">
                <input
                  type="date"
                  className={errors.dob ? "input--error" : ""}
                  {...register("dob")}
                />
              </div>
              {errors.dob && <p className="error-msg">{errors.dob.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Create a password"
                  className={`has-icon${errors.password ? " input--error" : ""}`}
                  {...register("password")}
                />
                <span className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                  {showPw ? "🙈" : "👁"}
                </span>
              </div>
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className={`has-icon${errors.confirmPassword ? " input--error" : ""}`}
                  {...register("confirmPassword")}
                />
                <span className="toggle-pw" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁"}
                </span>
              </div>
              {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword.message}</p>}
            </div>

            <div className="age-warn">You must be 21+ years old to register</div>

            {/* Terms */}
            <div className="terms-row">
              <input type="checkbox" id="terms" {...register("terms")} />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && <p className="error-msg" style={{ marginTop: "-0.8rem", marginBottom: "1rem" }}>{errors.terms.message}</p>}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
          <p className="age-notice">Must be 21+ years old to register</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 <span>LiquorRush</span>. All rights reserved. | Drink responsibly. Must be 21+ to order.</p>
      </footer>
    </div>
  );
}