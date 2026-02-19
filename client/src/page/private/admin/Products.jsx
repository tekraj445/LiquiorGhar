import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/admin';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

export default function AdminProducts() {
  const [products,    setProducts]    = useState([]);
  const [search,      setSearch]      = useState('');
  const [page,        setPage]        = useState(0);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editId,      setEditId]      = useState(null);
  const [deleteId,    setDeleteId]    = useState(null);
  const [form,        setForm]        = useState({ name: '', price: '', in_stock: true });
  const PAGE_SIZE = 6;

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { fetchProducts(); }, [search]);

  async function fetchProducts() {
    try {
      const r = await axios.get(`${API}/products`, { headers: headers(), params: { search } });
      setProducts(r.data);
    } catch {}
  }

  function openAdd() { setForm({ name: '', price: '', in_stock: true }); setEditId(null); setModalOpen(true); }
  function openEdit(p) { setForm({ name: p.name, price: p.price, in_stock: p.in_stock }); setEditId(p.id); setModalOpen(true); }

  async function saveProduct() {
    try {
      if (editId) {
        await axios.put(`${API}/products/${editId}`, form, { headers: headers() });
      } else {
        await axios.post(`${API}/products`, form, { headers: headers() });
      }
      setModalOpen(false);
      fetchProducts();
    } catch {}
  }

  async function deleteProduct() {
    try {
      await axios.delete(`${API}/products/${deleteId}`, { headers: headers() });
      setConfirmOpen(false);
      fetchProducts();
    } catch {}
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const slice      = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const stockBadge = inStock => (
    <span className={`badge ${inStock ? 'badge-success' : 'badge-destructive'}`}>
      {inStock ? 'In Stock' : 'Out of Stock'}
    </span>
  );

  return (
    <div className="page-section active">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="page-title">Product Management</h2>
          <p className="page-subtitle">{products.length} products in catalog</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Product
        </button>
      </div>

      <div className="search-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Search products..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
      </div>

      <div className="data-table-wrap fade-in-up">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Product Name</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {slice.map(p => (
              <tr key={p.id}>
                <td className="text-muted">#{p.id}</td>
                <td className="font-medium">{p.name}</td>
                <td className="font-semibold">₹{Number(p.price).toLocaleString('en-IN')}</td>
                <td>{stockBadge(p.in_stock)}</td>
                <td>
                  <div className="flex gap-1">
                    <button className="btn-icon edit" onClick={() => openEdit(p)} title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                    <button className="btn-icon delete" onClick={() => { setDeleteId(p.id); setConfirmOpen(true); }} title="Delete">
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

      {/* Product Modal */}
      {modalOpen && (
        <div className="modal-overlay open" onClick={e => e.target.classList.contains('modal-overlay') && setModalOpen(false)}>
          <div className="admin-modal">
            <h3>{editId ? 'Edit Product' : 'Add New Product'}</h3>
            <label>Product Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" />
            <label>Price (₹)</label>
            <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="Price" />
            <label>Availability</label>
            <select value={form.in_stock} onChange={e => setForm(f => ({ ...f, in_stock: e.target.value === 'true' }))}>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
            <div className="btn-row">
              <button className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveProduct}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmOpen && (
        <div className="modal-overlay open" onClick={e => e.target.classList.contains('modal-overlay') && setConfirmOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: '24rem' }}>
            <h3>Delete Product</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-fg)', marginBottom: '1rem' }}>Are you sure? This action cannot be undone.</p>
            <div className="btn-row">
              <button className="btn-cancel" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="btn-danger" onClick={deleteProduct}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}