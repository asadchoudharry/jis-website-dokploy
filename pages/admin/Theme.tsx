import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const Theme: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Theme Builder</h1>
      <ul>
        <li className="mb-2">
          <Link to="/admin/theme/header/edit" className="text-blue-500 hover:underline">
            Edit Header
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/theme/footer/edit" className="text-blue-500 hover:underline">
            Edit Footer
          </Link>
        </li>
      </ul>
    </AdminLayout>
  );
};

export default Theme;