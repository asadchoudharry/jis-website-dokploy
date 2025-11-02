import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';

export interface TextBlock {
  id: string;
  type: 'text';
  data: {
    text: string;
  };
}

export interface ImageBlock {
  id: string;
  type: 'image';
  data: {
    src: string;
    alt: string;
  };
}

export interface Slide {
  id: string;
  content: (TextBlock | ImageBlock)[];
}

export interface SliderBlock {
  id:string;
  type: 'slider';
  data: {
    slides: Slide[];
  };
}

export interface PostGridBlock {
  id: string;
  type: 'post-grid';
  data: {
    columns: number;
  };
}

export type ContentBlockType = TextBlock | ImageBlock | SliderBlock | PostGridBlock;

const PostGrid: React.FC<{ columns: number }> = ({ columns }) => {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/pages')
      .then(response => response.json())
      .then(data => setPages(data))
      .catch(error => console.error('Error fetching pages:', error));
  }, []);

  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {pages.map(page => (
        <div key={page.slug} className="border p-4">
          <h2 className="text-xl font-bold">{page.title}</h2>
          <Link to={`/${page.slug}`} className="text-blue-500 hover:underline">Read more</Link>
        </div>
      ))}
    </div>
  );
};

const ContentBlock: React.FC<ContentBlockType> = (props) => {
  const { type, data } = props;
  switch (type) {
    case 'text':
      return <div dangerouslySetInnerHTML={{ __html: data.text }} />;
    case 'image':
      return <img src={data.src} alt={data.alt} />;
    case 'slider':
      return (
        <Swiper>
          {data.slides.map(slide => (
            <SwiperSlide key={slide.id}>
              {slide.content.map(block => (
                <ContentBlock key={block.id} {...block} />
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case 'post-grid':
      return <PostGrid columns={data.columns} />;
    default:
      return <div>Unknown block type</div>;
  }
};

export default ContentBlock;
