import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs';

interface Project {
    title: string;
    industry: string;
    service: string;
    imageUrl: string;
    imageAlt: string;
    challenge: { title: string; description: string };
    solution: { title: string; description: string };
}

const CollapsibleDetail: React.FC<{ icon: string; title: string; description: string; defaultOpen?: boolean }> = ({ icon, title, description, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="rounded-lg bg-slate-50/70 p-4 border border-slate-200">
            <button
                className="flex cursor-pointer items-center justify-between font-semibold text-slate-800 w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined ${title.includes('Challenge') ? 'text-accent-gold' : 'text-primary'}`}>{icon}</span>
                    <span>{title}</span>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isOpen && (
                <p className="mt-3 text-sm text-slate-600 animate-fade-in">
                    {description}
                </p>
            )}
        </div>
    );
};

const ProjectDetailCard: React.FC<{ project: Project; reverse?: boolean }> = ({ project, reverse = false }) => {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg border border-slate-200/80 overflow-hidden">
            <div className={`w-full h-full ${reverse ? 'md:order-last' : ''}`}>
                <img alt={project.imageAlt} className="h-full w-full object-cover object-center" src={project.imageUrl} />
            </div>
            <div className={`flex flex-col p-6 md:p-8 ${reverse ? 'md:order-first' : ''}`}>
                <h3 className="text-2xl font-bold text-primary sm:text-3xl">{project.title}</h3>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-200 pt-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('projects.industry_label')}</p>
                        <p className="mt-1 font-medium text-jis-green bg-jis-green/10 px-3 py-1 rounded-full inline-block text-sm">{project.industry}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('projects.service_label')}</p>
                        <p className="mt-1 font-medium text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full inline-block text-sm">{project.service}</p>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <CollapsibleDetail
                        icon="help_outline"
                        title={project.challenge.title}
                        description={project.challenge.description}
                        defaultOpen={true}
                    />
                    <CollapsibleDetail
                        icon="verified"
                        title={project.solution.title}
                        description={project.solution.description}
                    />
                </div>
            </div>
        </div>
    );
};


const Projects: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'projects';

    const projectsListData = t(`${ns}.project_list`, { returnObjects: true });
    const projectsData: Project[] = Array.isArray(projectsListData) ? projectsListData : [];
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <main className="bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 industrial-steel-bg opacity-50"></div>
                <div className="relative">
                    {/* Hero Section */}
                    <section className="relative flex min-h-[60vh] md:min-h-[70vh] w-full items-center justify-center text-center">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${t(`${ns}.hero_image`)}")` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-background-dark/30"></div>
                        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center gap-4 text-white">
                                <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">{t(`${ns}.hero_title`)}</h1>
                                <p className="max-w-3xl text-base font-normal leading-relaxed text-slate-200 md:text-lg">{t(`${ns}.hero_description`)}</p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Intro Section */}
                    <section className="py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-4xl mx-auto">
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t(`${ns}.showcase_title`)}</h2>
                                <p className="mt-4 text-lg leading-8 text-slate-600">{t(`${ns}.showcase_subtitle`)}</p>
                            </div>
                        </div>
                    </section>

                    {/* Projects List */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 pb-16 sm:pb-24">
                        {projectsData.map((project, index) => (
                            <ProjectDetailCard key={project.title} project={project} reverse={index % 2 !== 0} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Projects;