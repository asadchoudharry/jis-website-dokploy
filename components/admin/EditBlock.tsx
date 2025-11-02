import React, { useState } from 'react';
import { ContentBlockType, Slide } from './ContentBlock';
import TextBlockEditor from './TextBlockEditor';

interface EditBlockProps {
  block: ContentBlockType;
  onChange: (block: ContentBlockType) => void;
}

const EditBlock: React.FC<EditBlockProps> = ({ block, onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        onChange({ ...block, data: { ...block.data, src: data.url } });
      })
      .catch(error => console.error('Error uploading file:', error));
  };


  switch (block.type) {
    case 'text':
      return (
        <TextBlockEditor
          value={block.data.text}
          onChange={(text) => onChange({ ...block, data: { ...block.data, text } })}
        />
      );
    case 'image':
      return (
        <div>
          <div className="mb-2">
            <label className="block">Image URL</label>
            <input
              type="text"
              value={block.data.src}
              onChange={(e) => onChange({ ...block, data: { ...block.data, src: e.target.value } })}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Upload Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
            <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded mt-2">Upload</button>
          </div>
          <div>
            <label className="block">Alt Text</label>
            <input
              type="text"
              value={block.data.alt}
              onChange={(e) => onChange({ ...block, data: { ...block.data, alt: e.target.value } })}
              className="border p-2 w-full"
            />
          </div>
        </div>
      );
    case 'slider':
      const handleAddSlide = () => {
        const newSlide: Slide = {
          id: new Date().toISOString(),
          content: [{
            id: new Date().toISOString() + '-text',
            type: 'text',
            data: { text: '<p>New Slide</p>' }
          }]
        };
        onChange({ ...block, data: { ...block.data, slides: [...block.data.slides, newSlide] } });
      };

      const handleRemoveSlide = (slideId: string) => {
        onChange({ ...block, data: { ...block.data, slides: block.data.slides.filter(s => s.id !== slideId) } });
      };

      return (
        <div>
          <button onClick={handleAddSlide} className="bg-green-500 text-white p-2 rounded mb-4">Add Slide</button>
          {block.data.slides.map((slide, index) => (
            <div key={slide.id} className="border p-4 mb-4">
              <h3 className="text-lg font-bold">Slide {index + 1}</h3>
              <button onClick={() => handleRemoveSlide(slide.id)} className="bg-red-500 text-white p-1 rounded text-sm">Remove Slide</button>
              {/* I will add a proper editor for the slide content later */}
              <pre>{JSON.stringify(slide.content, null, 2)}</pre>
            </div>
          ))}
        </div>
      );
    case 'post-grid':
      return (
        <div>
          <label className="block">Number of Columns</label>
          <input
            type="number"
            value={block.data.columns}
            onChange={(e) => onChange({ ...block, data: { ...block.data, columns: parseInt(e.target.value, 10) } })}
            className="border p-2 w-full"
          />
        </div>
      );
    default:
      return <div>Unknown block type</div>;
  }
};

export default EditBlock;
