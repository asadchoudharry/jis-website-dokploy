import React from 'react';
import ContentBlock, { ContentBlockType } from './admin/ContentBlock';

interface PageRendererProps {
  content: ContentBlockType[];
}

const PageRenderer: React.FC<PageRendererProps> = ({ content }) => {
  return (
    <div className="prose lg:prose-xl mx-auto py-8">
      {content.map(block => (
        <ContentBlock key={block.id} {...block} />
      ))}
    </div>
  );
};

export default PageRenderer;
