import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

interface Popup {
  id: string;
  name: string;
}

const Popups: React.FC = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/popups')
      .then(response => response.json())
      .then(data => setPopups(data))
      .catch(error => console.error('Error fetching popups:', error));
  }, []);

  const handleCreatePopup = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/popups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, content: [], trigger: { type: 'onload' } }),
    })
      .then(response => response.json())
      .then(newPopup => {
        setPopups([...popups, newPopup]);
        setName('');
      })
      .catch(error => console.error('Error creating popup:', error));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Popups</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Create New Popup</h2>
        <form onSubmit={handleCreatePopup}>
          <div className="mb-2">
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Popup</button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Existing Popups</h2>
        <ul>
          {popups.map(popup => (
            <li key={popup.id} className="mb-2">
              <Link to={`/admin/popups/${popup.id}/edit`} className="text-blue-500 hover:underline">
                {popup.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Popups;
