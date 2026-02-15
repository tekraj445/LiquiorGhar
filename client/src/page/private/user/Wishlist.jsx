import { useState, useEffect } from 'react';
import { wishlistAPI } from '../../../utils/api';

export default function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  const [wishedProducts, setWishedProducts] = useState([]);

  useEffect(() => {
    if (wishlist.length === 0) { setWishedProducts([]); return; }
    wishlistAPI.getWishlist().then(r => setWishedProducts(r.data)).catch(() => {});
  }, [wishlist]);

  if (wishedProducts.length === 0) {
    return (
      <div className="page">
        <h1 className="page-title">My Wishlist</h1>
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h3>Your wishlist is empty</h3>
          <p>Save items you love for later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">My Wishlist</h1>
      <div className="wishlist-grid wish-add-btn">
        {wishedProducts.map(p => (
          <div className="card wish-card" key={p.id}>
            <div className="wish-top">
              <div className="wish-left">
                <span className="emoji">{p.image}</span>
                <div>
                  <h3>{p.name}</h3>
                  <p className="wish-meta">{p.brand} · {p.volume}</p>
                  <p className="wish-price">₹{p.price}</p>
                </div>
              </div>
              <button className="remove-heart" onClick={() => toggleWishlist(String(p.id))}>❤️</button>
            </div>
            <button className="btn-primary full wish-add-btn" onClick={() => addToCart(p)}>
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}