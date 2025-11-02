import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  author: string;
  company: string;
  content: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000); // Auto-slide every 7 seconds
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="bg-slate-100 p-8 md:p-12 rounded-xl border-l-4 border-[#006C35] mx-4">
              <p className="italic text-slate-700 text-lg">"{testimonial.content}"</p>
              <p className="mt-6 font-bold text-slate-900 text-xl">{testimonial.author}</p>
              <p className="text-sm text-slate-500">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full text-slate-800 shadow-md border border-slate-200 transition-colors z-10"
        aria-label="Previous testimonial"
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full text-slate-800 shadow-md border border-slate-200 transition-colors z-10"
        aria-label="Next testimonial"
      >
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </button>

      {/* Dots Indicator */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-slate-800 scale-110' : 'bg-slate-400 hover:bg-slate-600'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
