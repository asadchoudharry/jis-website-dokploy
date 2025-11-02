import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

interface Page {
  slug: string;
  title: string;
  content: ContentBlockType[];
}

const EditPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [content, setContent] = useState<ContentBlockType[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetch(`http://localhost:3001/api/pages/${slug}`)
      .then(response => response.json())
      .then(data => {
        setPage(data);
        setContent(data.content || []);
      })
      .catch(error => console.error('Error fetching page:', error));
  }, [slug]);

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
    fetch(`http://localhost:3001/api/pages/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Page saved:', data);
      })
      .catch(error => console.error('Error saving page:', error));
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

  const addSliderBlock = () => {
    const newBlock: ContentBlockType = {
      id: new Date().toISOString(),
      type: 'slider',
      data: {
        slides: [],
      },
    };
    setContent([...content, newBlock]);
  };

  const addPostGridBlock = () => {
    const newBlock: ContentBlockType = {
      id: new Date().toISOString(),
      type: 'post-grid',
      data: {
        columns: 3,
      },
    };
    setContent([...content, newBlock]);
  };

  const handleBlockChange = (updatedBlock: ContentBlockType) => {
    setContent(content.map(block => block.id === updatedBlock.id ? updatedBlock : block));
  };

  if (!page) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Editing: {page.title}</h1>
      <div className="mb-4">
        <button onClick={addTextBlock} className="bg-green-500 text-white p-2 rounded mb-4 mr-2">Add Text Block</button>
        <button onClick={addImageBlock} className="bg-blue-500 text-white p-2 rounded mb-4 mr-2">Add Image Block</button>
        <button onClick={addSliderBlock} className="bg-purple-500 text-white p-2 rounded mb-4 mr-2">Add Slider Block</button>
        <button onClick={addPostGridBlock} className="bg-yellow-500 text-white p-2 rounded mb-4">Add Post Grid Block</button>
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

export default EditPage;