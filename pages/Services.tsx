import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs';

const ServiceCard: React.FC<{
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
}> = ({ title, description, link, imageUrl, imageAlt }) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-3 pb-3 bg-slate-100/50 dark:bg-white/5 p-4 rounded-lg h-full">
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("${imageUrl}")` }} role="img" aria-label={imageAlt}></div>
            <div className="flex flex-col flex-grow">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">{title}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal mt-1 flex-grow">
                    {description}
                </p>
                <Link to={link} className="text-primary/90 dark:text-primary text-sm font-medium leading-normal mt-3 group">
                    {t('services.learn_more')} <span className="inline-block transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </Link>
            </div>
        </div>
    );
};

const Services: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'services';
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.title`) }
    ];

    const serviceCardsData = t(`${ns}.service_cards`, { returnObjects: true });
    const serviceCards = Array.isArray(serviceCardsData) ? serviceCardsData : [];

    const expertiseImagesData = t(`${ns}.expertise_images`, { returnObjects: true });
    const expertiseImages = Array.isArray(expertiseImagesData) ? expertiseImagesData : [];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <main className="bg-background-light dark:bg-background-dark font-display">
                <div className="layout-content-container flex flex-col max-w-7xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    {/* HeroSection */}
                    <section className="mb-12 md:mb-16">
                        <div 
                            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-start justify-end px-6 pb-10 md:px-10" 
                            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${t(`${ns}.hero_image_url`)}")`}}
                        >
                            <div className="flex flex-col gap-2 text-left max-w-3xl">
                                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
                                    {t(`${ns}.hero_title`)}
                                </h1>
                                <h2 className="text-white text-sm font-normal leading-normal sm:text-base">
                                    {t(`${ns}.hero_subtitle`)}
                                </h2>
                            </div>
                        </div>
                    </section>

                    {/* Expertise Section */}
                    <section className="flex flex-col gap-10 py-10">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-slate-900 dark:text-white tracking-light text-3xl font-bold leading-tight sm:text-4xl max-w-3xl">
                                {t(`${ns}.expertise_title`)}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal max-w-3xl">
                                {t(`${ns}.expertise_description`)}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {expertiseImages.map((image, index) => (
                                <div key={index} className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{backgroundImage: `url("${image.url}")`}} role="img" aria-label={image.alt}></div>
                            ))}
                        </div>
                    </section>
                    
                    {/* Services Grid Section */}
                    <section className="py-10">
                        <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">{t(`${ns}.explore_title`)}</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-normal pb-3 pt-1">
                            {t(`${ns}.explore_subtitle`)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {serviceCards.map(service => (
                                <ServiceCard key={service.title} {...service} />
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="my-10">
                        <div className="flex flex-col gap-6 items-center justify-center text-center bg-slate-900 dark:bg-background-dark/50 rounded-lg p-10 min-h-[320px]">
                            <h2 className="text-white text-3xl font-bold tracking-tight max-w-lg">{t(`${ns}.cta_title`)}</h2>
                            <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                                {t(`${ns}.cta_description`)}
                            </p>
                            <Link to="/request-quote" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                                <span className="truncate">{t(`${ns}.cta_button_text`)}</span>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Services;