import React, { useState, useEffect } from 'react';
import PageRenderer from './PageRenderer';
import { ContentBlockType } from './admin/ContentBlock';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

const DynamicHeader: React.FC = () => {
  const [content, setContent] = useState<ContentBlockType[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/theme/header`)
      .then(response => response.json())
      .then(data => {
        setContent(data.content || []);
      })
      .catch(error => console.error('Error fetching header:', error));
  }, []);

  return (
    <header>
      <PageRenderer content={content} />
    </header>
  );
};

export default DynamicHeader;
