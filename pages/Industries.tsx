import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs';

const Industries: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'industries';

    const sectorsData = t(`${ns}.sector_list`, { returnObjects: true });
    const sectors: { title: string; description: string; cards: { imageUrl: string, imageAlt: string, caption: string, subCaption: string }[] }[] = Array.isArray(sectorsData) ? sectorsData : [];
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            
            {/* Hero Section */}
            <div 
                className="flex min-h-[60vh] flex-col gap-6 items-center justify-center px-4 py-10 text-center bg-cover bg-center bg-no-repeat" 
                style={{backgroundImage: `linear-gradient(rgba(16, 34, 24, 0.6) 0%, rgba(16, 34, 24, 0.9) 100%), url("${t(`${ns}.hero_image`)}")`}}
            >
                <div className="flex flex-col gap-2 items-center max-w-4xl">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-6xl">{t(`${ns}.hero_title`)}</h1>
                    <h2 className="text-white/90 text-sm font-normal leading-normal sm:text-lg">{t(`${ns}.hero_subtitle`)}</h2>
                </div>
            </div>

            <div className="bg-white dark:bg-background-dark">
                {/* Overview Section */}
                <section className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto">
                    <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight md:text-4xl">{t(`${ns}.intro_title`)}</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mt-4">{t(`${ns}.intro_subtitle`)}</p>
                </section>
                
                {/* Industries Sections */}
                <div className="space-y-0">
                    {sectors.map((sector, index) => (
                        <section 
                            key={index} 
                            className={`py-16 md:py-20 ${index % 2 !== 0 ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-white dark:bg-background-dark'}`}
                        >
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                                <div className="max-w-3xl mb-12">
                                    <h3 className="text-primary dark:text-secondary-bright-green tracking-tight text-3xl font-bold leading-tight sm:text-4xl">{sector.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed mt-4">{sector.description}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {sector.cards.map((card, cardIndex) => (
                                        <div key={cardIndex} className="flex flex-col gap-4 group">
                                            <div className="aspect-video w-full overflow-hidden rounded-lg">
                                                <div 
                                                    className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300" 
                                                    style={{backgroundImage: `url("${card.imageUrl}")`}}
                                                    role="img"
                                                    aria-label={card.imageAlt}
                                                ></div>
                                            </div>
                                            <div>
                                                <p className="text-slate-900 dark:text-white text-lg font-semibold leading-normal">{card.caption}</p>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">{card.subCaption}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Industries;