import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';

const STATUS_BADGE = {
  Delivered: 'badge-success', 'In Transit': 'badge-info',
  Pending: 'badge-warning', Cancelled: 'badge-destructive',
  Processing: 'badge-warning', Shipped: 'badge-info',
};

export default function AdminDashboard() {
  const [stats,        setStats]        = useState({ totalUsers: 0, totalOrders: 0, pendingOrders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const h     = { Authorization: `Bearer ${token}` };
    axios.get(`${API}/dashboard/stats`,         { headers: h }).then(r => setStats(r.data)).catch(() => {});
    axios.get(`${API}/dashboard/recent-orders`, { headers: h }).then(r => setRecentOrders(r.data)).catch(() => {});
  }, []);

  return (
    <div className="page-section active">
      <div className="mb-6">
        <h2 className="page-title">Dashboard Overview</h2>
        <p className="page-subtitle">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card fade-in-up delay-1">
          <div className="stat-card-inner">
            <div>
              <p className="stat-label">Total Users</p>
              <p className="stat-value">{stats.totalUsers?.toLocaleString()}</p>
            </div>
            <div className="stat-icon primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
        </div>
        <div className="stat-card fade-in-up delay-2">
          <div className="stat-card-inner">
            <div>
              <p className="stat-label">Total Orders</p>
              <p className="stat-value">{stats.totalOrders?.toLocaleString()}</p>
            </div>
            <div className="stat-icon success">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
          </div>
        </div>
        <div className="stat-card fade-in-up delay-3">
          <div className="stat-card-inner">
            <div>
              <p className="stat-label">Revenue</p>
              <p className="stat-value">₹{Number(stats.revenue).toLocaleString('en-IN')}</p>
            </div>
            <div className="stat-icon accent">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
            </div>
          </div>
        </div>
        <div className="stat-card fade-in-up delay-4">
          <div className="stat-card-inner">
            <div>
              <p className="stat-label">Pending Orders</p>
              <p className="stat-value">{stats.pendingOrders}</p>
            </div>
            <div className="stat-icon info">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Recent Orders</h3>
      <div className="data-table-wrap fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td className="font-medium">#{o.order_number}</td>
                <td>{o.user?.name || 'N/A'}</td>
                <td>{o.items?.[0]?.product?.name || '—'} ({o.item_count})</td>
                <td className="font-semibold">₹{Number(o.total_amount).toLocaleString('en-IN')}</td>
                <td><span className={`badge ${STATUS_BADGE[o.status] || 'badge-muted'}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}