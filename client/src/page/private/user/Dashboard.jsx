import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, orderAPI, productAPI } from '../../../utils/api';

const STAT_CARDS = [
  { label: 'Total Orders', key: 'totalOrders',  emoji: '🛍️', iconClass: 'stat-icon-primary' },
  { label: 'Total Spent',  key: 'totalSpent',   emoji: '📈', iconClass: 'stat-icon-success', prefix: '₹' },
  { label: 'Pending',      key: 'pending',       emoji: '⏳', iconClass: 'stat-icon-warning' },
  { label: 'Wishlist',     key: 'wishlistCount', emoji: '❤️', iconClass: 'stat-icon-danger'  },
];

const STATUS_CLASS = {
  Delivered: 'delivered', Shipped: 'shipped',
  Processing: 'processing', Cancelled: 'cancelled',
};

export default function Dashboard({ addToCart }) {
  const navigate = useNavigate();
  const [stats, setStats]               = useState({ totalOrders: 0, totalSpent: 0, pending: 0, wishlistCount: 0 });
  const [trending, setTrending]         = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [userName, setUserName]         = useState('User');

  useEffect(() => {
    authAPI.getMe().then(r => setUserName(r.data.name.split(' ')[0])).catch(() => {});
    orderAPI.getStats().then(r => setStats(r.data)).catch(() => {});
    productAPI.getTrending().then(r => setTrending(r.data.products || [])).catch(() => {});
    orderAPI.getAll("limit=3").then(r => setRecentOrders(r.data.orders || [])).catch(() => {});
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Welcome back, {userName} 👋</h1>
      <p className="page-subtitle">Here's what's happening with your account.</p>

      <div className="stats-grid">
        {STAT_CARDS.map(s => (
          <div className="card stat-card" key={s.key}>
            <div className="stat-top">
              <div>
                <p className="stat-label">{s.label}</p>
                <p className="stat-value">
                  {s.prefix}
                  {s.key === 'totalSpent'
                    ? (stats.totalSpent?.toLocaleString('en-IN') || 0)
                    : stats[s.key]}
                </p>
              </div>
              <div className={`stat-icon ${s.iconClass}`}>
                <span>{s.emoji}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="card card-padded">
          <div className="section-header">
            <h2>Trending Products</h2>
            <button onClick={() => navigate('/user/products')}>View All</button>
          </div>
          {trending.map(p => (
            <div className="list-item" key={p.id}>
              <div className="list-item-left">
                <span className="emoji">{p.image}</span>
                <div>
                  <p className="name">{p.name}</p>
                  <p className="sub">{p.brand} · {p.volume}</p>
                </div>
              </div>
              <div className="list-item-right">
                <p className="price">₹{p.price}</p>
                <button className="action" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="card card-padded">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button onClick={() => navigate('/user/orders')}>View All</button>
          </div>
          {recentOrders.map(o => (
            <div className="list-item" key={o.id}>
              <div>
                <p className="name">{o.order_number}</p>
                <p className="sub">{o.created_at?.slice(0, 10)} · {o.item_count} item(s)</p>
              </div>
              <div className="list-item-right">
                <p className="price">₹{o.total_amount}</p>
                <span className={`status-badge status-${STATUS_CLASS[o.status] || 'processing'}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}