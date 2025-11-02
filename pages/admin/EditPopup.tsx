import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
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

interface Popup {
  id: string;
  name: string;
  content: ContentBlockType[];
  trigger: {
    type: 'onload' | 'onscroll';
    delay?: number;
    scrollPercentage?: number;
  };
}

const EditPopup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [popup, setPopup] = useState<Popup | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetch(`http://localhost:3001/api/popups/${id}`)
      .then(response => response.json())
      .then(data => setPopup(data))
      .catch(error => console.error('Error fetching popup:', error));
  }, [id]);

  const handleSave = () => {
    fetch(`http://localhost:3001/api/popups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(popup),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Popup saved:', data);
        alert('Popup saved successfully!');
      })
      .catch(error => console.error('Error saving popup:', error));
  };

  const handleContentChange = (content: ContentBlockType[]) => {
    if (popup) {
      setPopup({ ...popup, content });
    }
  };

  const handleTriggerChange = (trigger: Popup['trigger']) => {
    if (popup) {
      setPopup({ ...popup, trigger });
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (popup && over && active.id !== over.id) {
      const oldIndex = popup.content.findIndex((item) => item.id === active.id);
      const newIndex = popup.content.findIndex((item) => item.id === over.id);
      handleContentChange(arrayMove(popup.content, oldIndex, newIndex));
    }
  };
  
  const handleBlockChange = (updatedBlock: ContentBlockType) => {
    if (popup) {
      handleContentChange(popup.content.map(block => block.id === updatedBlock.id ? updatedBlock : block));
    }
  };

  if (!popup) {
    return <AdminLayout><div>Loading...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Editing Popup: {popup.name}</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Trigger Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="triggerType" className="block">Trigger Type</label>
            <select
              id="triggerType"
              value={popup.trigger.type}
              onChange={e => handleTriggerChange({ ...popup.trigger, type: e.target.value as any })}
              className="border p-2 w-full"
            >
              <option value="onload">On Page Load</option>
              <option value="onscroll">On Scroll</option>
            </select>
          </div>
          {popup.trigger.type === 'onload' && (
            <div>
              <label htmlFor="delay" className="block">Delay (ms)</label>
              <input
                type="number"
                id="delay"
                value={popup.trigger.delay || 0}
                onChange={e => handleTriggerChange({ ...popup.trigger, delay: parseInt(e.target.value, 10) })}
                className="border p-2 w-full"
              />
            </div>
          )}
          {popup.trigger.type === 'onscroll' && (
            <div>
              <label htmlFor="scrollPercentage" className="block">Scroll Percentage (%)</label>
              <input
                type="number"
                id="scrollPercentage"
                value={popup.trigger.scrollPercentage || 0}
                onChange={e => handleTriggerChange({ ...popup.trigger, scrollPercentage: parseInt(e.target.value, 10) })}
                className="border p-2 w-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Content</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={popup.content.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {popup.content.map(block => (
              <SortableItem
                key={block.id}
                id={block.id}
                block={block}
                onChange={handleBlockChange}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-4">Save Popup</button>
    </AdminLayout>
  );
};

export default EditPopup;