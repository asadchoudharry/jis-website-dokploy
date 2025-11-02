import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../components/Breadcrumbs';

const HSEPolicy: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'policy_pages.hse';

    const commitmentsData = t(`${ns}.commitments_list`, { returnObjects: true });
    const commitments = Array.isArray(commitmentsData) ? commitmentsData : [];

    const principlesData = t(`${ns}.principles_list`, { returnObjects: true });
    const principles = Array.isArray(principlesData) ? principlesData : [];
    
    const responsibilitiesData = t(`${ns}.responsibilities_list`, { returnObjects: true });
    const responsibilities = Array.isArray(responsibilitiesData) ? responsibilitiesData : [];

    const actionsData = t(`${ns}.action_list`, { returnObjects: true });
    const actions = Array.isArray(actionsData) ? actionsData : [];
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('header.hseq'), path: '/hseq' },
        { name: t(`${ns}.page_title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-background-light dark:bg-background-dark text-brand-text-dark dark:text-gray-200">
                <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-10 md:py-16">
                    <div className="flex flex-col max-w-[960px] flex-1">
                        
                        <div className="flex flex-wrap justify-between gap-4 p-4">
                            <div className="flex w-full flex-col gap-3">
                                <h1 className="text-brand-green-primary dark:text-brand-green-secondary text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">{t(`${ns}.title`)}</h1>
                                <p className="text-brand-text-dark dark:text-gray-300 text-base lg:text-lg font-normal leading-normal max-w-3xl">{t(`${ns}.subtitle`)}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-brand-green-primary dark:text-brand-green-secondary text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 border-b-2 border-brand-gold-accent/50">{t(`${ns}.commitments_title`)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                                {commitments.map((item, index) => (
                                    <div key={index} className="p-4">
                                        <div className="flex flex-col items-start justify-start rounded-xl bg-white dark:bg-background-dark shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
                                            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-start gap-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-3xl text-brand-gold-accent">{item.icon}</span>
                                                    <p className="text-brand-text-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{item.title}</p>
                                                </div>
                                                <p className="text-brand-text-dark dark:text-gray-300 text-base font-normal leading-normal mt-2">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="flex flex-col gap-4 p-4">
                                <h3 className="text-brand-green-secondary dark:text-brand-green-secondary/90 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-2">{t(`${ns}.principles_title`)}</h3>
                                <ul className="space-y-4 list-disc list-inside text-brand-text-dark dark:text-gray-300">
                                    {principles.map((item, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4 p-4">
                                <h3 className="text-brand-green-secondary dark:text-brand-green-secondary/90 text-[22px] font-bold leading-tight tracking-[-0.015em] pb-2">{t(`${ns}.responsibilities_title`)}</h3>
                                <ul className="space-y-4 list-disc list-inside text-brand-text-dark dark:text-gray-300">
                                    {responsibilities.map((item, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 p-4">
                            <h2 className="text-brand-green-primary dark:text-brand-green-secondary text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b-2 border-brand-gold-accent/50">{t(`${ns}.action_title`)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                {actions.map((item, index) => (
                                    <div key={index} className="p-4">
                                        <div className="flex flex-col items-stretch justify-start rounded-lg">
                                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("${item.image_url}")` }} role="img" aria-label={item.image_alt}></div>
                                            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4">
                                                <p className="text-brand-text-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{item.title}</p>
                                                <p className="text-brand-text-dark dark:text-gray-300 text-base font-normal leading-normal">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default HSEPolicy;