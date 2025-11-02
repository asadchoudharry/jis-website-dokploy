import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from '../../components/admin/SortableItem';
import { ContentBlockType } from '../../components/admin/ContentBlock';
import AdminLayout from '../../components/admin/AdminLayout';

const EditHeader: React.FC = () => {
  const [content, setContent] = useState<ContentBlockType[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetch(`http://localhost:3001/api/theme/header`)
      .then(response => response.json())
      .then(data => {
        setContent(data.content || []);
      })
      .catch(error => console.error('Error fetching header:', error));
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setContent((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/api/theme/header`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Header saved:', data);
      })
      .catch(error => console.error('Error saving header:', error));
  };

  const addTextBlock = () => {
    const newBlock: ContentBlockType = {
      id: new Date().toISOString(),
      type: 'text',
      data: {
        text: '<p>New text block</p>',
      },
    };
    setContent([...content, newBlock]);
  };

  const addImageBlock = () => {
    const newBlock: ContentBlockType = {
      id: new Date().toISOString(),
      type: 'image',
      data: {
        src: 'https://via.placeholder.com/800x400',
        alt: 'Placeholder image',
      },
    };
    setContent([...content, newBlock]);
  };

  const handleBlockChange = (updatedBlock: ContentBlockType) => {
    setContent(content.map(block => block.id === updatedBlock.id ? updatedBlock : block));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Editing: Header</h1>
      <div className="mb-4">
        <button onClick={addTextBlock} className="bg-green-500 text-white p-2 rounded mb-4 mr-2">Add Text Block</button>
        <button onClick={addImageBlock} className="bg-blue-500 text-white p-2 rounded mb-4">Add Image Block</button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={content.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {content.map(block => (
            <SortableItem
              key={block.id}
              id={block.id}
              block={block}
              onChange={handleBlockChange}
            />
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-4">Save</button>
    </AdminLayout>
  );
};

export default EditHeader;