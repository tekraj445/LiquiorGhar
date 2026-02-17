import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import '../../../css/admin.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',        path: '/admin/dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
  { id: 'products',  label: 'Products',          path: '/admin/products',  icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> },
  { id: 'orders',    label: 'Orders',            path: '/admin/orders',    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> },
  { id: 'users',     label: 'Users',             path: '/admin/users',     icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'returns',   label: 'Returns & Refunds', path: '/admin/returns',   icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> },
];

export default function AdminLayout() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const currentPage = NAV_ITEMS.find(n => location.pathname.startsWith(n.path))?.id || 'dashboard';

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/>
              <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>
            </svg>
          </div>
          <div>
            <h1>Liquor Ghar</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="label">Menu</span>
          {NAV_ITEMS.map(n => (
            <button
              key={n.id}
              className={`sidebar-link${currentPage === n.id ? ' active' : ''}`}
              onClick={() => navigate(n.path)}
            >
              {n.icon}
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* HEADER */}
      <header className="header">
        <div className="header-search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input type="text" placeholder="Search products, orders, users..." />
        </div>

        <div className="header-right">
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button className="notif-btn" onClick={() => setNotifOpen(o => !o)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <span className="notif-dot"></span>
            </button>
            {notifOpen && (
              <div className="admin-dropdown dropdown-notif">
                <div className="dropdown-header">Notifications</div>
                <div className="dropdown-item">New order received<div className="sub">2 min ago</div></div>
                <div className="dropdown-item">Low stock: Johnnie Walker Black<div className="sub">15 min ago</div></div>
                <div className="dropdown-item">Refund request submitted<div className="sub">1 hr ago</div></div>
                <div className="dropdown-item">New support ticket opened<div className="sub">2 hr ago</div></div>
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }} ref={profileRef}>
            <button className="profile-btn" onClick={() => setProfileOpen(o => !o)}>
              <div className="profile-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <div className="profile-name">Admin</div>
                <div className="profile-role">Administrator</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted-fg)' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {profileOpen && (
              <div className="admin-dropdown dropdown-profile">
                <div className="dropdown-item">My Profile</div>
                <div className="dropdown-item">Settings</div>
                <div style={{ borderTop: '1px solid var(--border)' }}></div>
                <div className="dropdown-item danger" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div className="admin-main">
        <div className="main-inner">
          <Outlet />
        </div>
      </div>

    </div>
  );
}