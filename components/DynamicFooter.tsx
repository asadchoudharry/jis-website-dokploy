import React, { useState, useEffect } from 'react';
import PageRenderer from './PageRenderer';
import { ContentBlockType } from './admin/ContentBlock';

const DynamicFooter: React.FC = () => {
  const [content, setContent] = useState<ContentBlockType[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/theme/footer`)
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
