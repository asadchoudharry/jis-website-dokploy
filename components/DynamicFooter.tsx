import React, { useState, useEffect } from 'react';
import PageRenderer from './PageRenderer';
import { ContentBlockType } from './admin/ContentBlock';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const DynamicFooter: React.FC = () => {
  const [content, setContent] = useState<ContentBlockType[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/theme/footer`)
      .then(response => response.json())
      .then(data => {
        setContent(data.content || []);
      })
      .catch(error => console.error('Error fetching footer:', error));
  }, []);

  return (
    <footer>
      <PageRenderer content={content} />
    </footer>
  );
};

export default DynamicFooter;
