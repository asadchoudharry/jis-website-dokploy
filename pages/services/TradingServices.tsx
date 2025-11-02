import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ServiceCategoryCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-surface-dark p-6 flex-col">
        <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
        <div className="flex flex-col gap-1">
            <h3 className="text-text-light-primary dark:text-text-dark-primary text-xl font-bold leading-tight">{title}</h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal">{description}</p>
        </div>
    </div>
);

const WhyUsCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
            <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">{title}</h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">{description}</p>
    </div>
);

const TradingServices: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'services_pages.trading';

    const coreCategoriesData = t(`${ns}.core_cat_list`, { returnObjects: true });
    const coreCategories = Array.isArray(coreCategoriesData) ? coreCategoriesData : [];

    const detail1ListData = t(`${ns}.detail1_list`, { returnObjects: true });
    const detail1List = Array.isArray(detail1ListData) ? detail1ListData : [];

    const detail2TechHighlightsData = t(`${ns}.detail2_tech_highlights`, { returnObjects: true });
    const detail2TechHighlights = Array.isArray(detail2TechHighlightsData) ? detail2TechHighlightsData : [];

    const whyUsListData = t(`${ns}.why_us_list`, { returnObjects: true });
    const whyUsList = Array.isArray(whyUsListData) ? whyUsListData : [];

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary">
            {/* Hero Section */}
            <div className="relative flex min-h-[60vh] flex-col items-start justify-end p-6 sm:p-10 lg:p-16 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url("${t(`${ns}.hero_image`)}")` }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative flex flex-col gap-4 text-left max-w-4xl text-white z-10">
                    <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {t(`${ns}.hero_title`)}
                    </h1>
                    <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
                        {t(`${ns}.hero_subtitle`)}
                    </h2>
                    <Link to="/request-quote" className="relative flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 sm:h-14 sm:px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors mt-4">
                        <span className="truncate">{t(`${ns}.hero_cta`)}</span>
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Service Category Grid */}
                <section className="mb-16 sm:mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t(`${ns}.core_cat_title`)}</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-secondary dark:text-text-dark-secondary">{t(`${ns}.core_cat_subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {coreCategories.map((category) => (
                            <ServiceCategoryCard key={category.title} {...category} />
                        ))}
                    </div>
                </section>

                {/* Detailed Content Section 1 */}
                <section className="mb-16 sm:mb-24 py-16 sm:py-20 bg-surface-light dark:bg-surface-dark rounded-xl">
                    <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="text-primary text-base font-bold leading-normal">{t(`${ns}.detail1_tag`)}</p>
                            <h3 className="text-3xl font-bold leading-tight">{t(`${ns}.detail1_title`)}</h3>
                            <p className="text-lg font-normal leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
                                {t(`${ns}.detail1_desc`)}
                            </p>
                            <ul className="mt-4 space-y-3 text-text-light-secondary dark:text-text-dark-secondary">
                                {detail1List.map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">check_circle</span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: `url("${t(`${ns}.detail1_image`)}")` }}></div>
                    </div>
                </section>

                {/* Detailed Content Section 2 */}
                <section className="mb-16 sm:mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl lg:order-last" style={{ backgroundImage: `url("${t(`${ns}.detail2_image`)}")` }}></div>
                        <div className="flex flex-col gap-4">
                            <p className="text-primary text-base font-bold leading-normal">{t(`${ns}.detail2_tag`)}</p>
                            <h3 className="text-3xl font-bold leading-tight">{t(`${ns}.detail2_title`)}</h3>
                            <p className="text-lg font-normal leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
                                {t(`${ns}.detail2_desc`)}
                            </p>
                            <div className="mt-6 border-t border-gray-200 dark:border-white/10 pt-6">
                                <h4 className="text-lg font-bold">{t(`${ns}.detail2_tech_highlights_title`)}</h4>
                                <dl className="mt-4 space-y-4">
                                    {detail2TechHighlights.map((item) => (
                                        <div key={item.label}>
                                            <dt className="font-semibold">{item.label}</dt>
                                            <dd className="text-text-light-secondary dark:text-text-dark-secondary">{item.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Image Gallery/Highlight */}
                <section className="mb-16 sm:mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t(`${ns}.gallery_title`)}</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-secondary dark:text-text-dark-secondary">{t(`${ns}.gallery_subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: `url("${t(`${ns}.gallery_img1`)}")` }}></div>
                            <p className="text-center font-semibold text-text-light-secondary dark:text-text-dark-secondary">{t(`${ns}.gallery_caption1`)}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" style={{ backgroundImage: `url("${t(`${ns}.gallery_img2`)}")` }}></div>
                            <p className="text-center font-semibold text-text-light-secondary dark:text-text-dark-secondary">{t(`${ns}.gallery_caption2`)}</p>
                        </div>
                    </div>
                </section>

                {/* Why Choose JIS Section */}
                <section className="py-16 sm:py-20 bg-surface-light dark:bg-surface-dark rounded-xl">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t(`${ns}.why_us_title`)}</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-secondary dark:text-text-dark-secondary">{t(`${ns}.why_us_subtitle`)}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {whyUsList.map((item) => (
                                <WhyUsCard key={item.title} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TradingServices;