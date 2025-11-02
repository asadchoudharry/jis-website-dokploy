import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs';

interface GalleryImage {
    url: string;
    alt: string;
}

interface Standard {
    title: string;
    description: string;
    certificate_image_url: string;
    certificate_image_alt: string;
    gallery_images: GalleryImage[];
}

const Certifications: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'certifications_page';

    const standardsData = t(`${ns}.standards_list`, { returnObjects: true });
    const standards: Standard[] = Array.isArray(standardsData) ? standardsData : [];
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.page_title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            
            <main className="bg-background-light dark:bg-background-dark">
                {/* Hero Section */}
                <section 
                    className="flex min-h-[60vh] flex-col gap-6 items-center justify-center px-4 py-10 text-center bg-cover bg-center bg-no-repeat"
                    style={{backgroundImage: `linear-gradient(rgba(0, 108, 53, 0.8) 0%, rgba(16, 34, 25, 0.9) 100%), url("${t(`${ns}.hero_image_url`)}")`}}
                >
                    <div className="flex flex-col gap-2 max-w-3xl">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">{t(`${ns}.hero_title`)}</h1>
                        <h2 className="text-gray-200 text-base font-normal leading-relaxed sm:text-lg">{t(`${ns}.hero_subtitle`)}</h2>
                    </div>
                </section>

                {/* Main Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center mb-12">{t(`${ns}.intro_title`)}</h2>
                    
                    <div className="space-y-16">
                        {standards.map((standard, index) => (
                            <div key={index} className="bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
                                    <div className="md:col-span-7">
                                        <h3 className="text-primary dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">{standard.title}</h3>
                                        <p className="text-slate-600 dark:text-gray-300 text-base font-normal leading-relaxed pt-3">{standard.description}</p>
                                    </div>
                                    <div className="md:col-span-5 flex justify-center md:justify-end">
                                        <a href={standard.certificate_image_url} target="_blank" rel="noopener noreferrer">
                                            <img alt={standard.certificate_image_alt} className="w-full h-auto max-w-sm rounded-lg shadow-md hover:scale-105 transition-transform duration-300" src={standard.certificate_image_url} loading="lazy" />
                                        </a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {standard.gallery_images.map((img, imgIndex) => (
                                        <div 
                                            key={imgIndex} 
                                            className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-lg" 
                                            style={{ backgroundImage: `url("${img.url}")` }}
                                            role="img"
                                            aria-label={img.alt}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Certifications;
