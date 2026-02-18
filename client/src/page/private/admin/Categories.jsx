import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

export default function AdminCategories() {
  const [categories,  setCategories]  = useState([]);
  const [page,        setPage]        = useState(0);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editId,      setEditId]      = useState(null);
  const [deleteId,    setDeleteId]    = useState(null);
  const [name,        setName]        = useState('');
  const PAGE_SIZE = 6;

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    try {
      const r = await axios.get(`${API}/categories`, { headers: headers() });
      setCategories(r.data);
    } catch {}
  }

  function openAdd() { setName(''); setEditId(null); setModalOpen(true); }
  function openEdit(c) { setName(c.name); setEditId(c.id); setModalOpen(true); }

  async function saveCategory() {
    try {
      if (editId) {
        await axios.put(`${API}/categories/${editId}`, { name }, { headers: headers() });
      } else {
        await axios.post(`${API}/categories`, { name }, { headers: headers() });
      }
      setModalOpen(false);
      fetchCategories();
    } catch {}
  }

  async function deleteCategory() {
    try {
      await axios.delete(`${API}/categories/${deleteId}`, { headers: headers() });
      setConfirmOpen(false);
      fetchCategories();
    } catch {}
  }

  const totalPages = Math.ceil(categories.length / PAGE_SIZE);
  const slice      = categories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const statusBadge = s => {
    const map = { Active: 'badge-success', Inactive: 'badge-muted' };
    return <span className={`badge ${map[s] || 'badge-muted'}`}>{s}</span>;
  };

  return (
    <div className="page-section active">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="page-title">Category Management</h2>
          <p className="page-subtitle">{categories.length} categories</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Category
        </button>
      </div>

      <div className="data-table-wrap fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Category Name</th><th>Products</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {slice.map(c => (
              <tr key={c.id}>
                <td className="text-muted">#{c.id}</td>
                <td className="font-medium">{c.name}</td>
                <td>{c.dataValues?.productCount || c.productCount || 0}</td>
                <td>{statusBadge(c.status)}</td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn-icon edit" onClick={() => openEdit(c)} title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                    <button className="btn-icon delete" onClick={() => { setDeleteId(c.id); setConfirmOpen(true); }} title="Delete">
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

      {/* Category Modal */}
      {modalOpen && (
        <div className="modal-overlay open" onClick={e => e.target.classList.contains('modal-overlay') && setModalOpen(false)}>
          <div className="admin-modal">
            <h3>{editId ? 'Edit Category' : 'Add Category'}</h3>
            <label>Category Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Category name" />
            <div className="btn-row">
              <button className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveCategory}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmOpen && (
        <div className="modal-overlay open" onClick={e => e.target.classList.contains('modal-overlay') && setConfirmOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '24rem' }}>
            <h3>Delete Category</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-fg)', marginBottom: '1rem' }}>This will remove the category. Products under it won't be deleted.</p>
            <div className="btn-row">
              <button className="btn-cancel" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="btn-danger" onClick={deleteCategory}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}