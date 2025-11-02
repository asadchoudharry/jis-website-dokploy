import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

interface Page {
  slug: string;
  title: string;
}

const Pages: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/pages')
      .then(response => response.json())
      .then(data => setPages(data))
      .catch(error => console.error('Error fetching pages:', error));
  }, []);

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug }),
    })
      .then(response => response.json())
      .then(newPage => {
        setPages([...pages, newPage]);
        setTitle('');
        setSlug('');
      })
      .catch(error => console.error('Error creating page:', error));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Pages</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Create New Page</h2>
        <form onSubmit={handleCreatePage}>
          <div className="mb-2">
            <label htmlFor="title" className="block">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="slug" className="block">Slug</label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Page</button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Existing Pages</h2>
        <ul>
          {pages.map(page => (
            <li key={page.slug} className="mb-2">
              <Link to={`/admin/pages/${page.slug}/edit`} className="text-blue-500 hover:underline">
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Pages;