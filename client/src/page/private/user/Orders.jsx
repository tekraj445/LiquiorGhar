import { useState, useEffect } from 'react';
import { orderAPI, returnAPI } from '../../../utils/api';

const STATUS_CLASS = {
  Delivered: 'delivered', Shipped: 'shipped',
  Processing: 'processing', Cancelled: 'cancelled',
};

export default function Orders({ addToCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderAPI.getAll().then(r => setOrders(r.data.orders || [])).catch(() => {});
  }, []);

  function cancelOrder(id) {
    orderAPI.cancel(id).then(() => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
    }).catch(() => alert('Cancel failed.'));
  }

  function reorder(order) {
    if (order.items) order.items.forEach(i => addToCart(i.product));
  }

  function requestReturn(id) {
    returnAPI.request(id, 'Customer request')
      .then(() => alert('Return/Refund request submitted!'))
      .catch(() => alert('Request failed.'));
  }

  return (
    <div className="page">
      <h1 className="page-title">Order History</h1>
      <div className="addresses-list">
        {orders.map(o => (
          <div className="card order-card" key={o.id}>
            <div className="order-top">
              <div>
                <p className="order-id">{o.order_number}</p>
                <p className="order-date">{o.created_at?.slice(0, 10)} · {o.delivery_address}</p>
              </div>
              <div className="order-right">
                <span className={`status-badge status-${STATUS_CLASS[o.status] || 'processing'}`}>{o.status}</span>
                <span className="total">₹{o.total_amount}</span>
              </div>
            </div>
            <div className="order-body">
              {(o.items || []).map((i, idx) => (
                <div className="order-item" key={idx}>
                  <div>{i.product?.image} {i.product?.name} × {i.quantity}</div>
                  <span className="order-item-price">₹{i.price * i.quantity}</span>
                </div>
              ))}
              <div className="order-actions">
                <button className="btn-sm" onClick={() => reorder(o)}>🔄 Reorder</button>
                {o.status === 'Processing' && (
                  <button className="btn-sm danger" onClick={() => cancelOrder(o.id)}>✕ Cancel</button>
                )}
                {o.status === 'Delivered' && (
                  <button className="btn-sm" onClick={() => requestReturn(o.id)}>↩️ Return/Refund</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}