import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../components/Breadcrumbs';

const QualityPolicy: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'policy_pages.quality';

    const principlesData = t(`${ns}.principles_list`, { returnObjects: true });
    const principles = Array.isArray(principlesData) ? principlesData : [];

    const objectivesData = t(`${ns}.objectives_list`, { returnObjects: true });
    const objectives = Array.isArray(objectivesData) ? objectivesData : [];

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('header.hseq'), path: '/hseq' },
        { name: t(`${ns}.page_title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-background-gray dark:bg-background-dark text-text-dark dark:text-text-light relative">
                <div className="absolute inset-0 z-0 bg-repeat opacity-30 dark:opacity-[0.15]" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 L50 0 L100 50 L50 100 Z' fill='none' stroke='%23e5f4ec' stroke-width='0.5'/%3E%3C/svg%3E")`, 
                    backgroundSize: '200px 200px', 
                    animation: 'subtle-pan 60s linear infinite' 
                }}></div>
                <div className="relative z-10 flex flex-1 justify-center py-16 sm:py-20 md:py-24">
                    <div className="flex flex-col max-w-[960px] flex-1 px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="flex flex-wrap justify-between gap-4 p-4 mb-8 text-center">
                            <div className="flex w-full flex-col gap-3">
                                <h1 className="text-primary-saudi-green dark:text-secondary-bright-green text-4xl sm:text-5xl font-black leading-tight tracking-tighter">{t(`${ns}.title`)}</h1>
                                <p className="text-text-dark/80 dark:text-text-light/80 text-base sm:text-lg font-normal leading-normal max-w-3xl mx-auto">
                                    {t(`${ns}.subtitle`)}
                                </p>
                            </div>
                        </div>

                        {/* Core Statement */}
                        <div className="p-4 my-8">
                            <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 rounded-xl border border-primary-saudi-green/20 bg-white dark:bg-background-dark dark:border-primary-saudi-green/40 p-6 md:p-8 shadow-lg">
                                <div className="flex flex-col gap-3 flex-[2_2_0px]">
                                    <p className="text-primary-saudi-green dark:text-secondary-bright-green text-lg font-bold leading-tight">{t(`${ns}.core_statement.title`)}</p>
                                    <p className="text-text-dark dark:text-text-light/90 text-base font-normal leading-relaxed">
                                        {t(`${ns}.core_statement.description`)}
                                    </p>
                                </div>
                                <div className="w-full md:w-auto bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex-1 min-w-[200px] md:min-w-[250px]" style={{ backgroundImage: `url("${t(`${ns}.core_statement.image_url`)}")` }} role="img" aria-label={t(`${ns}.core_statement.image_alt`)}></div>
                            </div>
                        </div>

                        {/* Principles */}
                        <h2 className="text-text-dark dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4 pb-3 pt-10">{t(`${ns}.principles_title`)}</h2>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {principles.map((principle, index) => (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="w-full h-48 bg-cover bg-center rounded-lg shadow-md" style={{ backgroundImage: `url("${principle.image_url}")` }} role="img" aria-label={principle.image_alt}></div>
                                    <div>
                                        <p className="text-primary-saudi-green dark:text-secondary-bright-green text-lg font-bold leading-normal">{principle.title}</p>
                                        <p className="text-text-dark/90 dark:text-text-light/90 text-base font-normal leading-relaxed mt-1">{principle.description}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="md:col-span-2 flex flex-col md:flex-row-reverse items-stretch gap-8 mt-4 p-6 rounded-xl border border-primary-saudi-green/20 bg-white dark:bg-background-dark dark:border-primary-saudi-green/40 shadow-lg">
                                <div className="flex flex-col gap-2 flex-1">
                                    <p className="text-primary-saudi-green dark:text-secondary-bright-green text-lg font-bold leading-normal">{t(`${ns}.supplier_relations.title`)}</p>
                                    <p className="text-text-dark/90 dark:text-text-light/90 text-base font-normal leading-relaxed">{t(`${ns}.supplier_relations.description`)}</p>
                                </div>
                                <div className="flex-1 w-full h-48 md:h-auto bg-cover bg-center rounded-lg" style={{ backgroundImage: `url("${t(`${ns}.supplier_relations.image_url`)}")` }} role="img" aria-label={t(`${ns}.supplier_relations.image_alt`)}></div>
                            </div>
                        </div>
                        
                        {/* Objectives */}
                        <h2 className="text-text-dark dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight px-4 pb-3 pt-16">{t(`${ns}.objectives_title`)}</h2>
                        <div className="p-4 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <ul className="space-y-4">
                                    {objectives.map((objective, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-accent-gold mt-1">check_circle</span>
                                            <span className="text-text-dark/90 dark:text-text-light/90 text-base">{objective}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="aspect-video w-full bg-cover bg-center rounded-xl shadow-lg" style={{ backgroundImage: `url("${t(`${ns}.objectives_image_url`)}")` }} role="img" aria-label={t(`${ns}.objectives_image_alt`)}></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default QualityPolicy;