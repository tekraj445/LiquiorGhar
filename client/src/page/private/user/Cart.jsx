import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addressAPI, orderAPI } from '../../../utils/api';

export default function Cart({ cart, updateQty, removeFromCart, clearCart }) {
  const navigate     = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1 className="page-title">My Cart</h1>
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <button className="btn-primary" onClick={() => navigate('/user/products')}>Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">My Cart</h1>

      <div className="cart-grid cart-grid-wrap">
        <div>
          {cart.map((i, idx) => (
            <div className="card cart-item" key={`${i.product.id}-${idx}`}>
              <span className="emoji">{i.product.image}</span>
              <div className="item-info">
                <h3>{i.product.name}</h3>
                <p>{i.product.brand} · {i.product.volume}</p>
                <p className="item-price">₹{i.product.price}</p>
              </div>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => updateQty(i.product.id, i.quantity - 1)}>−</button>
                <span className="qty-val">{i.quantity}</span>
                <button className="qty-btn" onClick={() => updateQty(i.product.id, i.quantity + 1)}>+</button>
              </div>
              <span className="item-total">₹{i.product.price * i.quantity}</span>
              <button className="remove-btn" onClick={() => removeFromCart(i.product.id)}>🗑️</button>
            </div>
          ))}
        </div>

        <div className="card order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span className="summary-label">Subtotal ({cart.length} items)</span>
            <span>₹{total}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Delivery</span>
            <span className="summary-free">FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            className="btn-primary full btn-checkout"
            onClick={() => setShowCheckout(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          total={total}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            clearCart();
            setShowCheckout(false);
            navigate('/user/dashboard');
          }}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   CHECKOUT MODAL  (3 steps)
   Step 0 → Delivery Address
   Step 1 → Payment Method
   Step 2 → Success
───────────────────────────────────────── */
function CheckoutModal({ cart, total, onClose, onSuccess }) {
  const [step, setStep]                   = useState(0);
  const [addresses, setAddresses]         = useState([]);
  const [selectedAddr, setSelectedAddr]   = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading]             = useState(false);

  useEffect(() => {
    addressAPI.getAll()
      .then(r => {
        setAddresses(r.data);
        const def = r.data.find(a => a.is_default);
        setSelectedAddr(def?.id || r.data[0]?.id || null);
      })
      .catch(() => {});
  }, []);

  async function placeOrder() {
    if (!selectedAddr) { alert('Please select a delivery address first!'); return; }
    setLoading(true);
    try {
      await orderAPI.place({
        address_id    : selectedAddr,
        payment_method: paymentMethod,
        items         : cart.map(i => ({
          product_id: i.product.id,
          quantity  : i.quantity,
          price     : i.product.price,
        })),
      });
      setStep(2);
    } catch {
      alert('Order failed. Please try again.');
    }
    setLoading(false);
  }

  /* ── close on backdrop click ── */
  function handleBackdrop(e) {
    if (e.target.classList.contains('co-overlay')) onClose();
  }

  return (
    <>
      {/* ── inline styles so the modal works without touching your CSS file ── */}
      <style>{`
        .co-overlay {
          position: fixed; inset: 0;
          background: rgba(15,23,42,.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          animation: coFadeIn .18s ease;
        }
        @keyframes coFadeIn { from { opacity:0 } to { opacity:1 } }

        .co-modal {
          background: #fff;
          border-radius: 20px;
          padding: 32px 28px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 24px 60px rgba(0,0,0,.18);
          animation: coSlideUp .22s cubic-bezier(.34,1.56,.64,1);
          position: relative;
        }
        @keyframes coSlideUp {
          from { transform: translateY(28px); opacity:0 }
          to   { transform: translateY(0);    opacity:1 }
        }

        .co-close {
          position: absolute; top: 16px; right: 18px;
          background: #f1f5f9; border: none; border-radius: 50%;
          width: 32px; height: 32px; font-size: 1rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #64748b; transition: background .15s;
        }
        .co-close:hover { background: #e2e8f0; }

        /* step indicator */
        .co-steps {
          display: flex; gap: 8px; margin-bottom: 24px;
          justify-content: center;
        }
        .co-step-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #e2e8f0; transition: background .3s, width .3s;
        }
        .co-step-dot.active {
          background: #14b8a6; width: 24px; border-radius: 4px;
        }

        .co-title {
          font-size: 1.4rem; font-weight: 700;
          color: #0f172a; margin-bottom: 20px; text-align: center;
        }

        /* address card */
        .co-addr-card {
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 18px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: border-color .15s, background .15s, box-shadow .15s;
          display: flex; align-items: flex-start; gap: 14px;
        }
        .co-addr-card:hover { border-color: #5eead4; box-shadow: 0 2px 10px rgba(20,184,166,.08); }
        .co-addr-card.sel {
          border-color: #14b8a6;
          background: #f0fdfa;
          box-shadow: 0 2px 14px rgba(20,184,166,.14);
        }
        .co-addr-radio {
          width: 20px; height: 20px; min-width: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color .15s;
        }
        .co-addr-card.sel .co-addr-radio { border-color: #14b8a6; }
        .co-addr-radio-dot {
          width: 10px; height: 10px;
          border-radius: 50%; background: #14b8a6;
          transform: scale(0); transition: transform .15s;
        }
        .co-addr-card.sel .co-addr-radio-dot { transform: scale(1); }

        .co-addr-label {
          font-weight: 700; font-size: .95rem;
          color: #0f172a; margin-bottom: 4px;
        }
        .co-addr-card.sel .co-addr-label { color: #0f766e; }
        .co-addr-text { font-size: .86rem; color: #475569; line-height: 1.45; }

        /* empty address msg */
        .co-empty-addr {
          text-align: center; color: #94a3b8;
          font-size: .875rem; padding: 20px 0;
        }
        .co-empty-addr button {
          color: #14b8a6; background: none; border: none;
          cursor: pointer; font-weight: 600; font-size: .875rem;
        }

        /* payment option */
        .co-pay-card {
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 10px;
          cursor: pointer;
          display: flex; align-items: center; gap: 14px;
          transition: border-color .15s, background .15s;
        }
        .co-pay-card.sel { border-color: #14b8a6; background: #f0fdfa; }
        .co-pay-card:hover { border-color: #5eead4; }
        .co-pay-icon { font-size: 1.4rem; }
        .co-pay-label { font-size: .95rem; font-weight: 600; color: #0f172a; }
        .co-pay-sub   { font-size: .8rem; color: #64748b; }

        /* mini summary */
        .co-mini-summary {
          background: #f8fafc;
          border-radius: 12px;
          padding: 14px 16px;
          margin: 18px 0;
        }
        .co-sum-row {
          display: flex; justify-content: space-between;
          font-size: .875rem; color: #475569;
          margin-bottom: 8px;
        }
        .co-sum-row:last-child { margin-bottom: 0; }
        .co-sum-row.total {
          font-weight: 700; font-size: 1rem;
          color: #0f172a; border-top: 1px solid #e2e8f0;
          padding-top: 10px; margin-top: 4px;
        }
        .co-free { color: #14b8a6; font-weight: 600; }

        /* primary button */
        .co-btn {
          width: 100%;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          color: #fff;
          border: none; border-radius: 9999px;
          padding: 15px;
          font-size: 1rem; font-weight: 700;
          cursor: pointer;
          transition: opacity .15s, transform .1s;
          margin-top: 4px;
        }
        .co-btn:hover:not(:disabled) { opacity: .92; transform: translateY(-1px); }
        .co-btn:active:not(:disabled) { transform: translateY(0); }
        .co-btn:disabled { opacity: .55; cursor: not-allowed; }

        .co-back-btn {
          background: none; border: none;
          color: #14b8a6; font-size: .875rem; font-weight: 600;
          cursor: pointer; margin-bottom: 8px; padding: 0;
          display: flex; align-items: center; gap: 4px;
        }
        .co-back-btn:hover { text-decoration: underline; }

        /* success */
        .co-success {
          text-align: center; padding: 16px 0 8px;
        }
        .co-big-emoji {
          font-size: 4rem; margin-bottom: 12px;
          animation: coBounce .5s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes coBounce {
          from { transform: scale(0) rotate(-15deg); opacity:0 }
          to   { transform: scale(1) rotate(0);      opacity:1 }
        }
        .co-success h2 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
        .co-success p  { color: #64748b; font-size: .9rem; margin-bottom: 24px; }
      `}</style>

      <div className="co-overlay" onClick={handleBackdrop}>
        <div className="co-modal">

          {/* close button */}
          {step < 2 && (
            <button className="co-close" onClick={onClose}>✕</button>
          )}

          {/* step dots */}
          {step < 2 && (
            <div className="co-steps">
              <div className={`co-step-dot ${step === 0 ? 'active' : ''}`} />
              <div className={`co-step-dot ${step === 1 ? 'active' : ''}`} />
            </div>
          )}

          {/* ── STEP 0: Delivery Address ── */}
          {step === 0 && (
            <>
              <h2 className="co-title">Delivery Address</h2>

              {addresses.length === 0 ? (
                <div className="co-empty-addr">
                  <p>No addresses saved.</p>
                  <button onClick={onClose}>Add one first →</button>
                </div>
              ) : (
                addresses.map(a => (
                  <div
                    key={a.id}
                    className={`co-addr-card${selectedAddr === a.id ? ' sel' : ''}`}
                    onClick={() => setSelectedAddr(a.id)}
                  >
                    <div className="co-addr-radio">
                      <div className="co-addr-radio-dot" />
                    </div>
                    <div>
                      <div className="co-addr-label">{a.label}</div>
                      <div className="co-addr-text">{a.address}</div>
                    </div>
                  </div>
                ))
              )}

              <button
                className="co-btn"
                onClick={() => setStep(1)}
                disabled={!selectedAddr}
              >
                Continue to Payment →
              </button>
            </>
          )}

          {/* ── STEP 1: Payment ── */}
          {step === 1 && (
            <>
              <button className="co-back-btn" onClick={() => setStep(0)}>
                ← Back
              </button>
              <h2 className="co-title">Payment Method</h2>

              {[
                { val: 'UPI',  icon: '📲', label: 'UPI',          sub: 'GPay · PhonePe · Paytm' },
                { val: 'Card', icon: '💳', label: 'Card',         sub: 'Credit / Debit Card' },
                { val: 'COD',  icon: '💵', label: 'Cash on Delivery', sub: 'Pay when you receive' },
              ].map(m => (
                <div
                  key={m.val}
                  className={`co-pay-card${paymentMethod === m.val ? ' sel' : ''}`}
                  onClick={() => setPaymentMethod(m.val)}
                >
                  <span className="co-pay-icon">{m.icon}</span>
                  <div>
                    <div className="co-pay-label">{m.label}</div>
                    <div className="co-pay-sub">{m.sub}</div>
                  </div>
                </div>
              ))}

              <div className="co-mini-summary">
                <div className="co-sum-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="co-sum-row">
                  <span>Delivery</span>
                  <span className="co-free">FREE</span>
                </div>
                <div className="co-sum-row total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button className="co-btn" onClick={placeOrder} disabled={loading}>
                {loading ? 'Placing Order…' : `Place Order · ₹${total}`}
              </button>
            </>
          )}

          {/* ── STEP 2: Success ── */}
          {step === 2 && (
            <div className="co-success">
              <div className="co-big-emoji">🎉</div>
              <h2>Order Placed!</h2>
              <p>Your order will be delivered in 30–45 minutes.</p>
              <button className="co-btn" onClick={onSuccess}>
                Back to Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}