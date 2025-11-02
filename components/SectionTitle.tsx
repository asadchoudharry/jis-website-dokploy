
import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;