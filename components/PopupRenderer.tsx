import React, { useState, useEffect } from 'react';
import PageRenderer from './PageRenderer';
import { ContentBlockType } from './admin/ContentBlock';

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

const Popup: React.FC<{ popup: Popup, onClose: () => void }> = ({ popup, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <PageRenderer content={popup.content} />
      </div>
    </div>
  );
};

const PopupRenderer: React.FC = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [visiblePopups, setVisiblePopups] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/popups')
      .then(response => response.json())
      .then(data => setPopups(data))
      .catch(error => console.error('Error fetching popups:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      popups.forEach(popup => {
        if (popup.trigger.type === 'onscroll' && popup.trigger.scrollPercentage) {
          const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercent >= popup.trigger.scrollPercentage) {
            if (!visiblePopups.includes(popup.id)) {
              setVisiblePopups([...visiblePopups, popup.id]);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popups, visiblePopups]);

  useEffect(() => {
    popups.forEach(popup => {
      if (popup.trigger.type === 'onload') {
        setTimeout(() => {
          if (!visiblePopups.includes(popup.id)) {
            setVisiblePopups([...visiblePopups, popup.id]);
          }
        }, popup.trigger.delay || 0);
      }
    });
  }, [popups]);

  const handleClose = (popupId: string) => {
    setVisiblePopups(visiblePopups.filter(id => id !== popupId));
  };

  return (
    <>
      {popups
        .filter(popup => visiblePopups.includes(popup.id))
        .map(popup => (
          <Popup key={popup.id} popup={popup} onClose={() => handleClose(popup.id)} />
        ))}
    </>
  );
};

export default PopupRenderer;
