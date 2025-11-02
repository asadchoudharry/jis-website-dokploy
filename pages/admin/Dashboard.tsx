import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your CMS dashboard!</p>
    </AdminLayout>
  );
};

export default Dashboard;
