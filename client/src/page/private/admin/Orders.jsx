import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const STATUS_OPTS = ['Pending', 'Processing', 'In Transit', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_BADGE = {
  Delivered: 'badge-success', 'In Transit': 'badge-info', Shipped: 'badge-info',
  Pending: 'badge-warning', Processing: 'badge-warning', Cancelled: 'badge-destructive',
};
const STATUS_STYLE = {
  Delivered:   'background:rgba(50,160,80,0.1);color:var(--success)',
  'In Transit':'background:rgba(40,160,220,0.1);color:var(--info)',
  Shipped:     'background:rgba(40,160,220,0.1);color:var(--info)',
  Pending:     'background:rgba(220,160,40,0.1);color:var(--warning)',
  Processing:  'background:rgba(220,160,40,0.1);color:var(--warning)',
  Cancelled:   'background:rgba(220,70,70,0.1);color:var(--destructive)',
};

export default function AdminOrders() {
  const [orders,  setOrders]  = useState([]);
  const [stats,   setStats]   = useState({ total: 0, pending: 0, inTransit: 0, delivered: 0 });
  const [page,    setPage]    = useState(0);
  const PAGE_SIZE = 6;

  useEffect(() => { fetchOrders(); fetchStats(); }, []);

  async function fetchOrders() {
    try {
      const r = await axios.get(`${API}/orders`, { headers: headers() });
      setOrders(r.data.orders || []);
    } catch {}
  }
  async function fetchStats() {
    try {
      const r = await axios.get(`${API}/orders/stats`, { headers: headers() });
      setStats(r.data);
    } catch {}
  }

  async function updateStatus(id, status) {
    try {
      await axios.put(`${API}/orders/${id}/status`, { status }, { headers: headers() });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      fetchStats();
    } catch {}
  }

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const slice      = orders.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="page-section active">
      <div className="mb-6">
        <h2 className="page-title">Order Management</h2>
        <p className="page-subtitle">Track and manage all customer orders</p>
      </div>

      <div className="stats-grid-4">
        {[
          { label: 'All Orders',  value: stats.total },
          { label: 'Pending',     value: stats.pending },
          { label: 'In Transit',  value: stats.inTransit },
          { label: 'Delivered',   value: stats.delivered },
        ].map((s, i) => (
          <div key={i} className={`stat-card fade-in-up delay-${i + 1}`}>
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="data-table-wrap fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {slice.map(o => (
              <tr key={o.id}>
                <td className="font-medium">#{o.order_number}</td>
                <td>{o.user?.name || 'N/A'}</td>
                <td>{o.createdAt?.slice(0, 10)}</td>
                <td>{o.item_count}</td>
                <td className="font-semibold">₹{Number(o.total_amount).toLocaleString('en-IN')}</td>
                <td>
                  <select
                    className="status-select"
                    style={{ cssText: STATUS_STYLE[o.status] }}
                    value={o.status}
                    onChange={e => updateStatus(o.id, e.target.value)}
                  >
                    {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pagination">
            <span className="pagination-info">Page {page + 1} of {totalPages}</span>
            <div className="pagination-btns">
              <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`page-btn${page === i ? ' active' : ''}`} onClick={() => setPage(i)}>{i + 1}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}