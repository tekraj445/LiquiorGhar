import { useState, useEffect } from 'react';
import { addressAPI } from '../../../utils/api';

export default function Addresses() {
  const [addresses, setAddresses]         = useState([]);
  const [addingAddress, setAddingAddress] = useState(false);
  const [newLabel, setNewLabel]           = useState('');
  const [newAddr, setNewAddr]             = useState('');

  useEffect(() => {
    addressAPI.getAll().then(r => setAddresses(r.data)).catch(() => {});
  }, []);

  function setDefaultAddr(id) {
    addressAPI.setDefault(id).then(() => {
      setAddresses(prev => prev.map(a => ({ ...a, is_default: a.id === id })));
    }).catch(() => {});
  }

  function removeAddr(id) {
    addressAPI.remove(id).then(() => {
      setAddresses(prev => prev.filter(a => a.id !== id));
    }).catch(() => {});
  }

  function saveAddr() {
    if (!newLabel || !newAddr) return;
    addressAPI.add({ label: newLabel, address: newAddr }).then(r => {
      setAddresses(prev => [...prev, r.data]);
      setAddingAddress(false);
      setNewLabel('');
      setNewAddr('');
    }).catch(() => {});
  }

  return (
    <div className="page" style={{ position: 'relative', minHeight: '100%' }}>

      {/* HEADER */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">My Addresses</h1>
          <p className="page-subtitle">Manage your delivery addresses</p>
        </div>
        {!addingAddress && (
          <button className="btn-primary" onClick={() => setAddingAddress(true)}>
            + Add New
          </button>
        )}
      </div>

      {/* ADDRESS LIST */}
      <div className="addresses-list">
        {addresses.length === 0 && (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h3>No addresses yet</h3>
            <p>Add a delivery address to get started</p>
          </div>
        )}

        {addresses.map(a => (
          <div className={`card addr-card${a.is_default ? ' default' : ''}`} key={a.id}>
            <div className="addr-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="field-flex">
              <p className="addr-label">
                {a.label}
                {a.is_default && <span className="addr-default-badge">Default</span>}
              </p>
              <p className="addr-text">{a.address}</p>
              <div className="addr-actions">
                {!a.is_default && (
                  <button className="set-default" onClick={() => setDefaultAddr(a.id)}>Set as Default</button>
                )}
                <button className="remove" onClick={() => removeAddr(a.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD FORM — addresses list ko TALA */}
      {addingAddress && (
        <div className="card add-form" style={{ marginTop: '24px' }}>
          <p style={{ fontWeight: 600, marginBottom: '12px', fontSize: '0.95rem' }}>New Address</p>
          <input
            placeholder="Label (e.g., Home, Office)"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
          />
          <input
            placeholder="Full address"
            value={newAddr}
            onChange={e => setNewAddr(e.target.value)}
          />
          <div className="form-actions">
            <button className="btn-primary" onClick={saveAddr}>Save Address</button>
            <button className="btn-outline" onClick={() => { setAddingAddress(false); setNewLabel(''); setNewAddr(''); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}