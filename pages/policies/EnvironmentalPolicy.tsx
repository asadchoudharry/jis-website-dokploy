import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../components/Breadcrumbs';

const PracticeCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4 bg-neutral-white dark:bg-background-dark/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm h-full">
        <div className="flex-shrink-0">
            <span className="material-symbols-outlined text-secondary-bright-green text-3xl">{icon}</span>
        </div>
        <div>
            <h3 className="text-lg font-bold text-text-dark dark:text-neutral-white">{title}</h3>
            <p className="mt-1 text-text-dark/80 dark:text-neutral-white/80" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    </div>
);

const EnvironmentalPolicy: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'policy_pages.environmental';

    const practicesData = t(`${ns}.practices_list`, { returnObjects: true });
    const practices = Array.isArray(practicesData) ? practicesData : [];

    const goalsData = t(`${ns}.goals_list`, { returnObjects: true });
    const goals = Array.isArray(goalsData) ? goalsData : [];

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('header.hseq'), path: '/hseq' },
        { name: t(`${ns}.page_title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-background-gray dark:bg-background-dark">
                <div className="flex flex-1 justify-center py-16 sm:py-20 md:py-24">
                    <div className="flex flex-col w-full max-w-4xl flex-1 px-4 sm:px-6 lg:px-8">
                        {/* PageHeading */}
                        <div className="flex flex-wrap justify-between gap-4 pb-12 text-center">
                            <div className="flex w-full flex-col items-center gap-4">
                                <h1 className="text-text-dark dark:text-neutral-white text-4xl md:text-5xl font-black leading-tight tracking-tighter">{t(`${ns}.title`)}</h1>
                                <p className="max-w-3xl text-primary-saudi-green dark:text-secondary-bright-green/90 text-lg font-normal leading-relaxed">
                                    {t(`${ns}.subtitle`)}
                                </p>
                            </div>
                        </div>

                        {/* Core Commitments Section */}
                        <div className="mb-12">
                            <h2 className="text-text-dark dark:text-neutral-white text-3xl font-bold leading-tight tracking-tight pb-6">{t(`${ns}.commitments_title`)}</h2>
                            <div className="bg-neutral-white dark:bg-background-dark/50 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <p className="text-text-dark/80 dark:text-neutral-white/80 text-base font-normal leading-relaxed">
                                    {t(`${ns}.commitments_description`)}
                                </p>
                            </div>
                        </div>

                        {/* Highlighted Quote Card */}
                        <div className="p-4 mb-12">
                            <div className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-32 shadow-lg" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 107, 52, 0.8) 0%, rgba(0, 107, 52, 0.2) 100%), url("${t(`${ns}.quote_card.image_url`)}")` }}>
                                <div className="flex w-full items-end justify-between gap-4 p-6 md:p-8">
                                    <p className="text-white tracking-light text-2xl font-bold leading-tight flex-1">
                                        {t(`${ns}.quote_card.quote_text`)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sustainable Practices & Principles Section */}
                        <div className="mb-12">
                            <h2 className="text-text-dark dark:text-neutral-white text-3xl font-bold leading-tight tracking-tight pb-6">{t(`${ns}.practices_title`)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {practices.map((practice, index) => (
                                    <PracticeCard key={index} {...practice} />
                                ))}
                            </div>
                        </div>

                        {/* Regulatory Compliance & Goals Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-text-dark dark:text-neutral-white text-3xl font-bold leading-tight tracking-tight pb-6">{t(`${ns}.compliance_title`)}</h2>
                                <div className="bg-neutral-white dark:bg-background-dark/50 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm h-full">
                                    <p className="text-text-dark/80 dark:text-neutral-white/80 text-base font-normal leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`${ns}.compliance_description`) }} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-text-dark dark:text-neutral-white text-3xl font-bold leading-tight tracking-tight pb-6">{t(`${ns}.goals_title`)}</h2>
                                <div className="bg-neutral-white dark:bg-background-dark/50 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm h-full">
                                    <ul className="space-y-4">
                                        {goals.map((goal, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <span className="material-symbols-outlined text-accent-gold flex-shrink-0 mt-1">check_circle</span>
                                                <p className="text-text-dark/80 dark:text-neutral-white/80">{goal}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnvironmentalPolicy;