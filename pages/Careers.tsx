import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

const BenefitCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-white p-6 rounded-xl border border-slate-200/80 transition-all duration-300 hover:border-jis-green/50 hover:shadow-lg hover:-translate-y-1 text-center h-full flex flex-col items-center">
        <div className="flex-shrink-0 flex justify-center mb-4">
            <div className="bg-jis-green/10 p-4 rounded-full group-hover:bg-jis-green transition-colors duration-300">
               <span className="material-symbols-outlined text-3xl text-jis-green group-hover:text-white transition-colors duration-300">{icon}</span>
            </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm mt-2 flex-grow">{description}</p>
    </div>
);

const ValueCard: React.FC<{ icon: string; letter: string; title: string; description: string; }> = ({ icon, letter, title, description }) => (
    <div className="group bg-white p-6 rounded-xl border border-slate-200/80 text-center h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:border-jis-gold/30 hover:-translate-y-1.5">
        <div className="flex-shrink-0 flex justify-center mb-5">
            <div className="bg-jis-gold/10 p-4 rounded-full transition-colors duration-300 group-hover:bg-jis-gold">
               <span className="material-symbols-outlined text-4xl text-jis-gold transition-colors duration-300 group-hover:text-white">{icon}</span>
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900"><span className="text-accent-gold text-3xl font-black">{letter}</span> – {title}</h3>
        <p className="text-slate-600 text-sm mt-2 flex-grow">{description}</p>
    </div>
);

// FIX: Define interfaces for the data structure to resolve TypeScript errors about missing properties.
interface LifeAtJISImage {
    url: string;
    alt: string;
}
interface LifeAtJIS {
    title?: string;
    subtitle?: string;
    images?: LifeAtJISImage[];
}


const Careers: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'careers';

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.page_title`) }
    ];

    const benefitsData = t(`${ns}.benefits`, { returnObjects: true });
    const benefits = Array.isArray(benefitsData) ? benefitsData : [];

    const valuesData = t(`${ns}.values`, { returnObjects: true });
    const values = Array.isArray(valuesData) ? valuesData : [];

    // FIX: Properly type the `lifeAtJIS` object to ensure `title`, `subtitle`, and `images` properties are recognized.
    const lifeAtJISData = t(`${ns}.life_at_jis`, { returnObjects: true });
    const lifeAtJIS: LifeAtJIS = (typeof lifeAtJISData === 'object' && lifeAtJISData !== null && !Array.isArray(lifeAtJISData)) ? lifeAtJISData as LifeAtJIS : {};
    
    const lifeAtJISImages: LifeAtJISImage[] = (lifeAtJIS.images && Array.isArray(lifeAtJIS.images)) ? lifeAtJIS.images : [];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <main className="bg-white dark:bg-background-dark font-display">
                {/* Hero Section */}
                <section 
                    className="flex min-h-[60vh] flex-col gap-6 items-center justify-center p-4 text-center bg-cover bg-center bg-no-repeat"
                    style={{backgroundImage: `linear-gradient(to top, rgba(0, 108, 53, 0.7) 0%, rgba(30, 33, 36, 0.5) 100%), url("${t(`${ns}.hero_image_url`)}")`}}
                >
                    <div className="flex flex-col gap-2 max-w-3xl text-white">
                        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">{t(`${ns}.hero_title`)}</h1>
                        <h2 className="text-white/90 text-lg font-normal leading-normal sm:text-xl">{t(`${ns}.hero_subtitle`)}</h2>
                    </div>
                </section>

                {/* Why Build Your Career Section */}
                <section className="py-16 px-4 bg-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 industrial-steel-bg opacity-50"></div>
                     <div className="relative container mx-auto">
                        <div className="text-center mb-12 max-w-4xl mx-auto">
                            <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight mb-3">{t(`${ns}.why_build_title`)}</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">{t(`${ns}.why_build_subtitle`)}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            {benefits.map(benefit => (
                                <BenefitCard key={benefit.title} {...benefit} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Culture Section */}
                <section className="py-16 px-4 bg-white">
                     <div className="container mx-auto">
                        <div className="text-center mb-12 max-w-4xl mx-auto">
                            <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight mb-3">{t(`${ns}.culture_title`)}</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">{t(`${ns}.culture_subtitle`)}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                             {values.map(value => (
                                <ValueCard key={value.title} {...value} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Life at JIS Section */}
                <section className="py-16 px-4 bg-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 network-pattern-light opacity-50"></div>
                    <div className="relative container mx-auto">
                        <div className="text-center mb-12 max-w-4xl mx-auto">
                            <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight mb-3">{lifeAtJIS.title}</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">{lifeAtJIS.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
                            {lifeAtJISImages.map((image, index) => (
                                <div key={index} className="rounded-xl overflow-hidden shadow-lg aspect-video">
                                    <img src={image.url} alt={image.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 my-10 px-4">
                    <div className="container mx-auto">
                        <div className="bg-jis-green rounded-xl p-8 md:p-12 text-center text-white">
                            <h2 className="text-3xl font-bold leading-tight tracking-tight">{t(`${ns}.cta_title`)}</h2>
                            <p className="text-white/80 text-lg leading-relaxed mt-4 max-w-3xl mx-auto">{t(`${ns}.cta_p1`)}</p>
                            <p className="text-white/80 text-lg leading-relaxed mt-4 max-w-3xl mx-auto">
                                <strong>{t(`${ns}.cta_p2_strong`)}</strong>
                            </p>
                            <a 
                                className="inline-block my-6 bg-white text-jis-green text-lg font-bold leading-normal tracking-wide rounded-lg px-8 py-3 transition-transform duration-200 hover:scale-105" 
                                href={`mailto:${t(`${ns}.cta_email`)}`}
                            >
                                {t(`${ns}.cta_email`)}
                            </a>
                            <p className="text-white/80 text-base font-normal leading-normal">{t(`${ns}.cta_conclusion`)}</p>
                        </div>
                     </div>
                </section>
            </main>
        </>
    );
};

export default Careers;