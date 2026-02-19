import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const STATUS_BADGE = {
  Pending: 'badge-warning', Approved: 'badge-info',
  Refunded: 'badge-success', Rejected: 'badge-destructive',
};

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [page,    setPage]    = useState(0);
  const PAGE_SIZE = 6;

  useEffect(() => { fetchReturns(); }, []);

  async function fetchReturns() {
    try {
      const r = await axios.get(`${API}/returns`, { headers: headers() });
      setReturns(r.data);
    } catch {}
  }

  const totalPages = Math.ceil(returns.length / PAGE_SIZE);
  const slice      = returns.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="page-section active">
      <div className="mb-6">
        <h2 className="page-title">Returns & Refunds</h2>
        <p className="page-subtitle">Manage return requests and process refunds</p>
      </div>

      <div className="data-table-wrap fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Reason</th><th>Amount</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {slice.map(r => (
              <tr key={r.id}>
                <td className="font-medium">#{r.order?.order_number || r.order_id}</td>
                <td>{r.user?.name || 'N/A'}</td>
                <td>{r.product_name}</td>
                <td>{r.reason}</td>
                <td className="font-semibold">₹{Number(r.amount).toLocaleString('en-IN')}</td>
                <td>{r.createdAt?.slice(0, 10)}</td>
                <td><span className={`badge ${STATUS_BADGE[r.status] || 'badge-muted'}`}>{r.status}</span></td>
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