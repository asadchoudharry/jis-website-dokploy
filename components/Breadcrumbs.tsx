import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <nav aria-label="Breadcrumb" className={`bg-slate-50 border-b border-slate-200 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-slate-600 py-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
              {index > 0 && (
                <span className={`material-symbols-outlined text-base ${isRtl ? 'transform scale-x-[-1]' : ''}`}>
                  chevron_right
                </span>
              )}
              {item.path ? (
                <Link to={item.path} className="hover:text-[#006C35] hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800" aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;