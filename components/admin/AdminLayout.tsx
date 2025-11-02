import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">My CMS</div>
        <nav>
          <ul>
            <li><NavLink to="/admin/dashboard" className="block p-4 hover:bg-gray-700">Dashboard</NavLink></li>
            <li><NavLink to="/admin/pages" className="block p-4 hover:bg-gray-700">Pages</NavLink></li>
            <li><NavLink to="/admin/forms" className="block p-4 hover:bg-gray-700">Forms</NavLink></li>
            <li><NavLink to="/admin/theme" className="block p-4 hover:bg-gray-700">Theme Builder</NavLink></li>
            <li><NavLink to="/admin/settings" className="block p-4 hover:bg-gray-700">Settings</NavLink></li>
          </ul>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded">Logout</button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;