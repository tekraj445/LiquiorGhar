import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const STATUS_BADGE = { Active: 'badge-success', Suspended: 'badge-destructive' };

export default function AdminUsers() {
  const [users,       setUsers]       = useState([]);
  const [search,      setSearch]      = useState('');
  const [page,        setPage]        = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const PAGE_SIZE = 6;

  useEffect(() => { fetchUsers(); }, [search]);

  async function fetchUsers() {
    try {
      const r = await axios.get(`${API}/users`, { headers: headers(), params: { search } });
      setUsers(r.data);
    } catch {}
  }

  async function toggleSuspend(id) {
    try {
      await axios.put(`${API}/users/${id}/suspend`, {}, { headers: headers() });
      fetchUsers();
    } catch {}
  }

  async function deleteUser() {
    try {
      await axios.delete(`${API}/users/${deleteId}`, { headers: headers() });
      setConfirmOpen(false);
      fetchUsers();
    } catch {}
  }

  const filtered   = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const slice      = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="page-section active">
      <div className="mb-6">
        <h2 className="page-title">User Management</h2>
        <p className="page-subtitle">{users.length} registered users</p>
      </div>

      <div className="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Search users..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
      </div>

      <div className="data-table-wrap fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {slice.map(u => (
              <tr key={u.id}>
                <td className="text-muted">#{u.id}</td>
                <td className="font-medium">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || '—'}</td>
                <td>{u.createdAt?.slice(0, 10)}</td>
                <td><span className={`badge ${STATUS_BADGE[u.status] || 'badge-muted'}`}>{u.status || 'Active'}</span></td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn-icon warn" onClick={() => toggleSuspend(u.id)} title={u.status === 'Active' ? 'Suspend' : 'Activate'}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/></svg>
                    </button>
                    <button className="btn-icon delete" onClick={() => { setDeleteId(u.id); setConfirmOpen(true); }} title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
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

      {/* Confirm Delete */}
      {confirmOpen && (
        <div className="modal-overlay open" onClick={e => e.target.classList.contains('modal-overlay') && setConfirmOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '24rem' }}>
            <h3>Delete User</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-fg)', marginBottom: '1rem' }}>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="btn-row">
              <button className="btn-cancel" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="btn-danger" onClick={deleteUser}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}