import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

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
    const ns = 'services_pages.manpower';
    const navItems = [
        { id: 'overview', label: t(`${ns}.nav_overview`) },
        { id: 'positions', label: t(`${ns}.nav_positions`) },
        { id: 'process', label: t(`${ns}.nav_process`) },
        { id: 'industries', label: t(`${ns}.nav_industries`) },
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


const ManpowerSolutions: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'services_pages.manpower';
    const [activeSection, setActiveSection] = useState('overview');

    const sectionRefs = {
        overview: useRef<HTMLDivElement>(null),
        positions: useRef<HTMLDivElement>(null), // This corresponds to the complex overview section in the HTML
        process: useRef<HTMLDivElement>(null),
        industries: useRef<HTMLDivElement>(null),
    };
    
    // Map 'positions' to the 'overview' ref since it's the main content block
    sectionRefs.positions = sectionRefs.overview;


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        // Special handling for the main overview block
                        if (id === 'overview') {
                            setActiveSection('positions');
                        } else {
                            setActiveSection(id);
                        }
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px' }
        );
        
        const overviewRef = sectionRefs.overview.current;
        if(overviewRef) observer.observe(overviewRef);

        const processRef = sectionRefs.process.current;
        if(processRef) observer.observe(processRef);

        const industriesRef = sectionRefs.industries.current;
        if(industriesRef) observer.observe(industriesRef);


        return () => {
            if(overviewRef) observer.unobserve(overviewRef);
            if(processRef) observer.unobserve(processRef);
            if(industriesRef) observer.unobserve(industriesRef);
        };
    }, []);

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('header.services'), path: '/services' },
        { name: t(`${ns}.title`) }
    ];
    
    const whyUsPointsData = t(`${ns}.why_us_points`, { returnObjects: true });
    const whyUsPoints = Array.isArray(whyUsPointsData) ? whyUsPointsData : [];

    const processStepsData = t(`${ns}.process_steps`, { returnObjects: true });
    const processSteps = Array.isArray(processStepsData) ? processStepsData : [];

    const industriesListData = t(`${ns}.industries_list`, { returnObjects: true });
    const industriesList = Array.isArray(industriesListData) ? industriesListData : [];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            
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

            <section id="overview" ref={sectionRefs.overview} className="py-12 md:py-20 bg-jis-bg-gray relative overflow-hidden">
                <div className="absolute inset-0 network-pattern-light opacity-50"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-7">
                            <div className="flex flex-col gap-8">
                                <div className="max-w-3xl">
                                    <h2 className="text-3xl font-bold text-slate-900">{t(`${ns}.overview_title`)}</h2>
                                    <p className="mt-4 text-lg text-slate-600">{t(`${ns}.overview_subtitle`)}</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="rounded-lg bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-900">{t(`${ns}.overview_card1_title`)}</h3>
                                        <p className="mt-2 text-sm text-slate-600">{t(`${ns}.overview_card1_desc`)}</p>
                                    </div>
                                    <div className="rounded-lg bg-white p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-slate-900">{t(`${ns}.overview_card2_title`)}</h3>
                                        <p className="mt-2 text-sm text-slate-600">{t(`${ns}.overview_card2_desc`)}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-cover bg-center h-64 w-full" style={{backgroundImage: `url('${t(`${ns}.overview_img1`)}')`}}></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-cover bg-center h-full w-full" style={{backgroundImage: `url('${t(`${ns}.overview_img2`)}')`}}></div>
                                        <div className="rounded-lg bg-cover bg-center h-full w-full" style={{backgroundImage: `url('${t(`${ns}.overview_img3`)}')`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="sticky top-32">
                                <div className="rounded-lg bg-white border border-jis-green/20 p-6 lg:p-8">
                                    <h3 className="text-2xl font-bold text-slate-900">{t(`${ns}.why_us_title`)}</h3>
                                    <p className="mt-2 text-base text-slate-600">{t(`${ns}.why_us_subtitle`)}</p>
                                    <div className="mt-8 space-y-6">
                                        {whyUsPoints.map(point => (
                                            <div key={point.title} className="flex items-start gap-4">
                                                <div className="flex-shrink-0"><span className="material-symbols-outlined text-3xl text-jis-green">{point.icon}</span></div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{point.title}</h4>
                                                    <p className="text-sm text-slate-600">{point.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 border-t border-jis-green/20 pt-6 grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-4xl font-bold text-jis-green">{t(`${ns}.stat1_num`)}</p>
                                            <p className="text-sm font-medium text-slate-600">{t(`${ns}.stat1_text`)}</p>
                                        </div>
                                        <div>
                                            <p className="text-4xl font-bold text-jis-green">{t(`${ns}.stat2_num`)}</p>
                                            <p className="text-sm font-medium text-slate-600">{t(`${ns}.stat2_text`)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="process" ref={sectionRefs.process} className="py-12 md:py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 network-pattern-light opacity-25 mix-blend-multiply"></div>
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
            
            <section id="industries" ref={sectionRefs.industries} className="py-12 md:py-20 bg-jis-bg-gray relative overflow-hidden">
                 <div className="absolute inset-0 network-pattern-light opacity-50"></div>
                <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 md:flex-row-reverse lg:gap-12">
                        <div className="aspect-video w-full flex-1 rounded-lg bg-cover bg-center shadow-md" style={{backgroundImage: `url('${t(`${ns}.industries_image`)}')`}}></div>
                        <div className="w-full flex-1">
                            <span className="font-semibold text-jis-green uppercase tracking-wider">{t(`${ns}.industries_tag`)}</span>
                            <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-900">{t(`${ns}.industries_title`)}</h2>
                            <p className="mt-4 text-base text-slate-600">{t(`${ns}.industries_desc`)}</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
                                {industriesList.map(item => (
                                     <div key={item.text} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-jis-green">{item.icon}</span>
                                        <span className="text-sm font-medium text-slate-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-12 md:py-20 bg-white relative overflow-hidden">
                 <div className="absolute inset-0 network-pattern-light opacity-25 mix-blend-multiply"></div>
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

export default ManpowerSolutions;