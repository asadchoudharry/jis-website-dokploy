import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditBlock from './EditBlock';
import { ContentBlockType } from './ContentBlock';

interface SortableItemProps {
  id: string;
  block: ContentBlockType;
  onChange: (block: ContentBlockType) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, block, onChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-white border rounded-md shadow-sm mb-4">
      <EditBlock block={block} onChange={onChange} />
    </div>
  );
};

export default SortableItem;
