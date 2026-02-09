import { useState, useEffect } from 'react';
import { cartAPI, wishlistAPI } from '../utils/api';

export function useCart() {
  const [cart, setCart]         = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    cartAPI.getCart().then(r =>
      setCart((r.data || []).map(i => ({ product: i.product, quantity: i.quantity })))
    ).catch(() => {});
    wishlistAPI.getWishlist().then(r =>
      setWishlist((r.data || []).map(i => String(i.id || i.product_id)))
    ).catch(() => {});
  }, []);

  // ── CART ──────────────────────────────────────
  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      cartAPI.addItem(product.id, 1).catch(() => {});
      return exists
        ? prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(i => i.product.id !== productId));
    cartAPI.removeItem(productId).catch(() => {});
  }

  function updateQty(productId, qty) {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
    cartAPI.updateItem(productId, qty).catch(() => {});
  }

  function clearCart() {
    setCart([]);
    cartAPI.clearCart().catch(() => {});
  }

  // ── WISHLIST ───────────────────────────────────
  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      wishlistAPI.removeItem(productId).catch(() => {});
    } else {
      setWishlist(prev => [...prev, productId]);
      wishlistAPI.addItem(productId).catch(() => {});
    }
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return { cart, wishlist, cartCount, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist };
}