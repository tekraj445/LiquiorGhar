import { useState, useEffect } from 'react';
import { authAPI } from '../../../utils/api';

const FIELDS = [
  { icon: '👤', label: 'Full Name',     key: 'name'  },
  { icon: '📧', label: 'Email',         key: 'email' },
  { icon: '📱', label: 'Phone',         key: 'phone' },
  { icon: '📅', label: 'Date of Birth', key: 'dob'   },
];

export default function Profile() {
  const [profile, setProfile]               = useState({ name: '', email: '', phone: '', dob: '' });
  const [editingProfile, setEditingProfile] = useState(false);
  const [formData, setFormData]             = useState({});

  useEffect(() => {
    authAPI.getMe().then(r => {
      setProfile(r.data);
      setFormData(r.data);
    }).catch(() => {});
  }, []);

  function saveProfile() {
    authAPI.updateProfile(formData).then(r => {
      setProfile(r.data);
      setEditingProfile(false);
    }).catch(() => alert('Save failed.'));
  }

  const initials = profile.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <button
          className="btn-outline"
          onClick={() => { setEditingProfile(e => !e); setFormData(profile); }}
        >
          ✏️ {editingProfile ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="card profile-card profile-card-wrap">
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div>
            <p className="profile-name">{profile.name}</p>
            <p className="profile-sub">Premium Member since Jan 2024</p>
          </div>
        </div>

        {FIELDS.map(f => (
          <div className="field-row" key={f.key}>
            <div className="field-icon"><span>{f.icon}</span></div>
            <div className="field-flex">
              <p className="field-label">{f.label}</p>
              {editingProfile ? (
                <input
                  className="field-input"
                  value={formData[f.key] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                />
              ) : (
                <p className="field-value">
                  {f.key === 'dob' && profile.dob
                    ? new Date(profile.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                    : profile[f.key]}
                </p>
              )}
            </div>
          </div>
        ))}

        {editingProfile && (
          <button className="btn-primary btn-save-profile" onClick={saveProfile}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}