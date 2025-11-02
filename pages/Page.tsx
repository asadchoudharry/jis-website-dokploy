import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageRenderer from '../components/PageRenderer';
import { ContentBlockType } from '../components/admin/ContentBlock';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

interface PageData {
  title: string;
  content: ContentBlockType[];
}

const Page: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/pages/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Page not found');
        }
        return response.json();
      })
      .then(data => {
        setPage(data);
        document.title = data.title;
      })
      .catch(error => {
        console.error('Error fetching page:', error);
        setPage(null); // Reset page data on error
      });
  }, [slug]);

  if (!page) {
    // You can render a 404 component here
    return <div>Page not found</div>;
  }

  return (
    <div>
      <PageRenderer content={page.content} />
    </div>
  );
};

export default Page;
