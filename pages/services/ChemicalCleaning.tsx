import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col gap-3 rounded-lg border border-jis-green/20 bg-white p-6 transition-shadow hover:shadow-lg h-full">
        <span className="material-symbols-outlined text-4xl text-jis-green">{icon}</span>
        <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="text-sm font-normal leading-normal text-slate-600">{description}</p>
        </div>
    </div>
);

const ProcessStep: React.FC<{ step: string; title: string; description: string }> = ({ step, title, description }) => (
    <div className="flex flex-col items-start text-left">
        <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jis-green text-white font-bold flex-shrink-0">{step}</div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <p className="mt-3 border-l-2 border-jis-green/30 pl-4 ml-5 text-sm text-slate-600">{description}</p>
    </div>
);

const StickyNav: React.FC<{ activeSection: string; }> = ({ activeSection }) => {
    const { t } = useTranslation();
    const ns = 'services_pages.chemical_cleaning';
    const navItems = [
        { id: 'overview', label: t(`${ns}.nav_overview`) },
        { id: 'applications', label: t(`${ns}.nav_applications`) },
        { id: 'process', label: t(`${ns}.nav_process`) },
        { id: 'safety', label: t(`${ns}.nav_safety`) },
    ];
    
    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 120; // Height of sticky header + nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    return (
        <div className="sticky top-[112px] z-40 bg-white/80 backdrop-blur-sm border-b border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            className={`flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                                activeSection === item.id 
                                ? 'bg-jis-green/20 ring-1 ring-jis-green' 
                                : 'bg-jis-green/10 hover:bg-jis-green/20'
                            }`}
                        >
                            <p className={`text-sm font-medium ${activeSection === item.id ? 'text-jis-green' : 'text-slate-700'}`}>{item.label}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


const ChemicalCleaning: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'services_pages.chemical_cleaning';
    const [activeSection, setActiveSection] = useState('overview');

    const sectionRefs = {
        overview: useRef<HTMLDivElement>(null),
        applications: useRef<HTMLDivElement>(null),
        process: useRef<HTMLDivElement>(null),
        safety: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px' } // Adjust rootMargin to trigger when section is more centered
        );

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('header.services'), path: '/services' },
        { name: t(`${ns}.title`) }
    ];
    
    const featuresData = t(`${ns}.features_grid`, { returnObjects: true });
    const features = Array.isArray(featuresData) ? featuresData : [];

    const processStepsData = t(`${ns}.process_steps`, { returnObjects: true });
    const processSteps = Array.isArray(processStepsData) ? processStepsData : [];
    
    const safetyPointsData = t(`${ns}.safety_points`, { returnObjects: true });
    const safetyPoints = Array.isArray(safetyPointsData) ? safetyPointsData : [];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            
            {/* Hero Section */}
            <section 
                className="min-h-[60vh] bg-cover bg-center flex flex-col items-start justify-end p-8 md:p-12 text-white relative"
                style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url('${t(`${ns}.hero_image`)}')`}}
            >
                <div className="max-w-3xl z-10 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t(`${ns}.hero_title`)}</h1>
                    <p className="mt-4 text-lg">{t(`${ns}.hero_subtitle`)}</p>
                    <Link to="/request-quote" className="mt-6 inline-block bg-jis-green text-white font-bold py-3 px-6 rounded-lg border-2 border-jis-green hover:bg-white hover:text-jis-green transition-all">
                        {t(`${ns}.hero_cta`)}
                    </Link>
                </div>
            </section>
            
            <StickyNav activeSection={activeSection} />

            {/* Overview & Features Grid Section */}
            <section id="overview" ref={sectionRefs.overview} className="py-12 md:py-20 bg-jis-bg-gray relative overflow-hidden">
                <div className="absolute inset-0 chemical-pattern-light opacity-50"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">{t(`${ns}.overview_title`)}</h2>
                        <p className="mt-4 text-lg text-slate-600">{t(`${ns}.overview_subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map(feature => (
                           <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Alternating Content Section */}
            <section id="applications" ref={sectionRefs.applications} className="py-12 md:py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 chemical-pattern-light opacity-25"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-20">
                    <div className="flex flex-col items-center gap-8 md:flex-row lg:gap-12">
                        <div className="w-full flex-1">
                            <h3 className="text-2xl font-bold leading-tight text-slate-900">{t(`${ns}.app1_title`)}</h3>
                            <p className="mt-2 text-base font-normal leading-normal text-slate-600">{t(`${ns}.app1_desc`)}</p>
                        </div>
                        <div className="aspect-video w-full flex-1 rounded-lg bg-cover bg-center shadow-md" style={{backgroundImage: `url('${t(`${ns}.app1_image`)}')`}}></div>
                    </div>
                    <div className="flex flex-col items-center gap-8 md:flex-row-reverse lg:gap-12">
                        <div className="w-full flex-1">
                             <h3 className="text-2xl font-bold leading-tight text-slate-900">{t(`${ns}.app2_title`)}</h3>
                            <p className="mt-2 text-base font-normal leading-normal text-slate-600">{t(`${ns}.app2_desc`)}</p>
                        </div>
                        <div className="aspect-video w-full flex-1 rounded-lg bg-cover bg-center shadow-md" style={{backgroundImage: `url('${t(`${ns}.app2_image`)}')`}}></div>
                    </div>
                </div>
            </section>

            {/* Numbered Process Stepper */}
            <section id="process" ref={sectionRefs.process} className="py-12 md:py-20 bg-jis-bg-gray relative overflow-hidden">
                <div className="absolute inset-0 chemical-pattern-light opacity-50"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">{t(`${ns}.process_title`)}</h2>
                        <p className="mt-4 text-lg text-slate-600">{t(`${ns}.process_subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                        {processSteps.map(step => (
                            <ProcessStep key={step.step} step={step.step} title={step.title} description={step.description} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Safety Section */}
            <section id="safety" ref={sectionRefs.safety} className="py-12 md:py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 chemical-pattern-light opacity-25"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 md:flex-row lg:gap-12">
                        <div className="aspect-video w-full flex-1 rounded-lg bg-cover bg-center shadow-md" style={{backgroundImage: `url('${t(`${ns}.safety_image`)}')`}}></div>
                        <div className="w-full flex-1">
                            <span className="font-semibold text-jis-green uppercase tracking-wider">{t(`${ns}.safety_tag`)}</span>
                            <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-900">{t(`${ns}.safety_title`)}</h2>
                            <p className="mt-4 text-base text-slate-600">{t(`${ns}.safety_desc`)}</p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {safetyPoints.map(point => (
                                     <div key={point.text} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-jis-green">{point.icon}</span>
                                        <span className="text-sm font-medium text-slate-700">{point.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="py-12 md:py-20 bg-jis-bg-gray relative overflow-hidden">
                <div className="absolute inset-0 chemical-pattern-light opacity-50"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-jis-green rounded-lg p-8 md:p-12 text-center shadow-lg">
                        <h2 className="text-3xl font-bold text-white">{t(`${ns}.cta_title`)}</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">{t(`${ns}.cta_subtitle`)}</p>
                         <Link to="/contact" className="mt-8 inline-block bg-white text-jis-green font-bold py-3 px-8 rounded-lg border-2 border-white hover:bg-transparent hover:text-white transition-all">
                             {t(`${ns}.cta_button`)}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChemicalCleaning;