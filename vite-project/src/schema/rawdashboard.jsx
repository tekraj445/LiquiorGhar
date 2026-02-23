// src/pages/Dashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-600">
            Welcome, {user?.name || user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6">
        {/* Your dashboard content here */}
        <h2 className="text-xl font-bold">Your Properties</h2>
      </div>
    </div>
  );
};