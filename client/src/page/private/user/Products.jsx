import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productAPI } from '../../../utils/api';

const CATEGORIES = ['All', 'Whisky', 'Vodka', 'Beer', 'Wine', 'Rum', 'Gin', 'Tequila'];

export default function Products({ addToCart, wishlist, toggleWishlist }) {
  const location    = useLocation();
  const querySearch = new URLSearchParams(location.search).get('search') || '';

  const [products, setProducts]               = useState([]);
  const [prodSearch, setProdSearch]           = useState(querySearch);
  const [prodCategory, setProdCategory]       = useState('All');
  const [prodSort, setProdSort]               = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (prodSearch)             params.set('search',   prodSearch);
    if (prodCategory !== 'All') params.set('category', prodCategory);
    if (prodSort !== 'default') params.set('sort',     prodSort);
    productAPI.getAll(params).then(r => setProducts(r.data.products || [])).catch(() => {});
  }, [prodSearch, prodCategory, prodSort]);

  return (
    <div className="page">
      <div className="products-header">
        <h1 className="page-title">Browse Products</h1>
        <div className="filter-bar">
          <div className="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={prodSearch}
              onChange={e => setProdSearch(e.target.value)}
            />
          </div>
          <select value={prodSort} onChange={e => setProdSort(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="cat-filters">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`cat-btn${prodCategory === c ? ' active' : ''}`}
            onClick={() => setProdCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map(p => {
          const isWished = wishlist.includes(String(p.id));
          return (
            <div className="card product-card" key={p.id}>
              <div className="img-area" onClick={() => setSelectedProduct(p)}>
                <button
                  className="heart-btn"
                  onClick={e => { e.stopPropagation(); toggleWishlist(String(p.id)); }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill={isWished ? 'var(--destructive)' : 'none'}
                    stroke={isWished ? 'var(--destructive)' : 'currentColor'}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <span className="emoji">{p.image}</span>
              </div>
              <div className="info">
                <p className="brand">{p.brand}</p>
                <p className="pname" onClick={() => setSelectedProduct(p)}>{p.name}</p>
                <div className="rating">
                  <span>⭐ {p.rating}</span>
                  <span className="count">({p.reviews_count || p.reviews})</span>
                </div>
                <div className="price-row">
                  <div>
                    <span className="price">₹{p.price}</span>
                    <span className="orig">₹{p.original_price || p.originalPrice}</span>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => addToCart(p)}
                    disabled={!p.in_stock && !p.inStock}
                  >
                    {(p.in_stock || p.inStock) ? 'Add' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isWished={wishlist.includes(String(selectedProduct.id))}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
          onToggleWishlist={() => { toggleWishlist(String(selectedProduct.id)); setSelectedProduct(null); }}
        />
      )}
    </div>
  );
}

function ProductDetailModal({ product: p, isWished, onClose, onAddToCart, onToggleWishlist }) {
  const origPrice = p.original_price || p.originalPrice;
  const off       = Math.round((1 - p.price / origPrice) * 100);

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="detail-emoji">{p.image}</div>
        <h2>{p.name}</h2>
        <p className="detail-meta">{p.brand} · {p.volume} · {p.category}</p>
        <p className="detail-desc">{p.description}</p>
        <div className="detail-rating">
          ⭐ <strong>{p.rating}</strong>
          <span className="detail-review-count">({p.reviews_count || p.reviews} reviews)</span>
        </div>
        <div className="detail-price">
          <span className="big">₹{p.price}</span>
          <span className="orig">₹{origPrice}</span>
          <span className="off">{off}% off</span>
        </div>
        <div className="modal-actions">
          <button className="btn-primary" onClick={onAddToCart}>🛒 Add to Cart</button>
          <button className={`wish-btn${isWished ? ' wished' : ''}`} onClick={onToggleWishlist}>❤️</button>
        </div>
      </div>
    </div>
  );
}