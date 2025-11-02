import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageWrapper from './PageWrapper';
import Breadcrumbs from './Breadcrumbs';

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  features: string[];
  imageUrl: string;
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ title, subtitle, children, features, imageUrl }) => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { name: t('header.home'), path: '/' },
    { name: t('header.services'), path: '/services' },
    { name: title },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <section className="bg-slate-100 border-b border-slate-200" aria-labelledby="page-title">
        <PageWrapper className="pt-12 pb-16">
          <div className="text-center">
            <h1 id="page-title" className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">{subtitle}</p>
          </div>
        </PageWrapper>
      </section>
      <div className="bg-white">
        <PageWrapper>
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <article className="lg:col-span-2 prose-jis prose-lg text-slate-700 max-w-none">
              {children}
            </article>
            <aside>
              <div className="sticky top-28">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{t('services.key_features')}</h3>
                  <ul className="space-y-3 text-slate-700">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="material-symbols-outlined text-[#006C35] mr-3 mt-1">check_circle</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <img src={imageUrl} alt={title} className="rounded-lg object-cover w-full h-64" />
                </div>
              </div>
            </aside>
          </div>
          <section className="mt-20 text-center" aria-labelledby="cta-title">
            <h2 id="cta-title" className="text-3xl font-bold text-slate-900 mb-4">{t('services.cta_title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">{t('services.cta_subtitle')}</p>
            <Link to="/request-quote" className="bg-[#006C35] text-white font-bold py-3 px-8 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all text-lg">
              {t('header.cta')}
            </Link>
          </section>
        </PageWrapper>
      </div>
    </>
  );
};

export default ServicePageLayout;