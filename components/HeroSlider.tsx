import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  button2Text?: string;
  button2Link?: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const slideInterval = setInterval(nextSlide, 8000); // Auto-slide every 8 seconds
    return () => clearInterval(slideInterval);
  }, [nextSlide, slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white p-4">
            <div className="max-w-4xl animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-300">
                {slide.subtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to={slide.buttonLink}
                  className="inline-block bg-white text-slate-800 font-bold py-3 px-8 rounded-md border-2 border-white hover:bg-opacity-90 transition-all text-lg w-full sm:w-auto"
                >
                  {slide.buttonText}
                </Link>
                {slide.button2Text && slide.button2Link && (
                   <Link
                    to={slide.button2Link}
                    className="inline-block bg-transparent text-white font-bold py-3 px-8 rounded-md border-2 border-white hover:bg-white hover:text-slate-800 transition-all text-lg w-full sm:w-auto"
                  >
                    {slide.button2Text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;