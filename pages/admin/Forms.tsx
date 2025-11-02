import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

interface Form {
  name: string;
}

const Forms: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/forms')
      .then(response => response.json())
      .then(data => setForms(data))
      .catch(error => console.error('Error fetching forms:', error));
  }, []);

  const handleCreateForm = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(newForm => {
        setForms([...forms, newForm]);
        setName('');
      })
      .catch(error => console.error('Error creating form:', error));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Forms</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Create New Form</h2>
        <form onSubmit={handleCreateForm}>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Form</button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Existing Forms</h2>
        <ul>
          {forms.map(form => (
            <li key={form.name} className="mb-2">
              <Link to={`/admin/forms/${form.name}/edit`} className="text-blue-500 hover:underline">
                {form.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Forms;