import { Link } from "react-router-dom";
import "../../css/global.css";

const features = [
  {
    title: "24/7 Availability",
    desc: "We're always open to serve you. Late night party or early morning celebration, we've got you covered anytime, anywhere.",
  },
  {
    title: "Fast Home Delivery",
    desc: "Quick and reliable delivery service ensuring your order reaches you fresh and on time, every single time.",
  },
  {
    title: "Premium Brands",
    desc: "Choose from a wide selection of authentic, top-shelf liquors sourced directly from trusted suppliers worldwide.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          Liquor<span>Rush</span>
        </Link>
        <ul className="navbar__links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#delivery">Delivery Area</a></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <Link to="/register" className="navbar__cta">Order Now →</Link>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero__title">
          Premium Liquor<br />
          <em>Delivered to Your Door</em>
        </h1>
        <p className="hero__sub">
          Experience the convenience of 24/7 liquor delivery service. Quality
          products, fast delivery, and exceptional service — all at your fingertips.
        </p>
        <div className="hero__badges">
          <span className="hero-badge">Wide selection of premium brands</span>
          <span className="hero-badge">Delivery within 30–45 minutes</span>
          <span className="hero-badge">100% authentic products guaranteed</span>
        </div>
        <div className="hero__buttons">
          <Link to="/register" className="btn-primary">Order Now →</Link>
          <a href="#delivery" className="btn-secondary">Check Delivery Area</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="products">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* OFFER BANNER */}
      <section className="offer-banner">
        <h2>Special Offer!</h2>
        <p>Get <strong>10% off</strong> on your first order. Use the code below at checkout:</p>
        <div className="promo-code">FIRSTORDER</div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          &copy; 2026 <span>LiquorRush</span>. All rights reserved. | Drink responsibly. Must be 21+ to order.
        </p>
      </footer>

    </div>
  );
}