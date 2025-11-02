import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/Breadcrumbs';

const VisionMissionCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-700 p-6 rounded-xl shadow-md h-full">
        <div className="flex items-center gap-4 mb-3">
            <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
            <h3 className="text-xl font-bold text-primary dark:text-white">{title}</h3>
        </div>
        <p className="text-base leading-relaxed text-slate-700 dark:text-gray-300">{children}</p>
    </div>
);

const CoreValueCard: React.FC<{ letter: string; title: string; description: string; imageUrl: string; imageAlt: string }> = ({ letter, title, description, imageUrl, imageAlt }) => (
    <div className="group bg-white dark:bg-background-dark dark:border dark:border-gray-700 p-6 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
        <div className="w-full h-40 bg-center bg-no-repeat bg-cover rounded-lg mb-4" style={{ backgroundImage: `url("${imageUrl}")` }} role="img" aria-label={imageAlt}></div>
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white"><span className="text-primary text-3xl font-black">{letter}</span> – {title}</h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">{description}</p>
    </div>
);

const PolicySection: React.FC<{ title: string; description: string; points: string[]; imageUrl: string; imageAlt: string; reverseOrder?: boolean }> = ({ title, description, points, imageUrl, imageAlt, reverseOrder }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4">
        <div className={reverseOrder ? 'lg:order-2' : ''}>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">{title}</h3>
            <p className="text-base leading-relaxed mb-4 text-slate-700 dark:text-gray-300">{description}</p>
            <ul className="space-y-2 text-slate-700 dark:text-gray-300">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start">
                        <span className="material-symbols-outlined text-primary mr-2 rtl:ml-2 rtl:mr-0">check_circle</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className={`w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl ${reverseOrder ? 'lg:order-1' : ''}`} style={{ backgroundImage: `url("${imageUrl}")` }} role="img" aria-label={imageAlt}></div>
    </div>
);

const WhyUsCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-700 p-6 rounded-xl shadow-md text-center h-full">
        <span className="material-symbols-outlined text-primary text-4xl mb-3 inline-block">{icon}</span>
        <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">{description}</p>
    </div>
);

const About: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'about';

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.page_title`) }
    ];

    const whoWeAreImagesData = t(`${ns}.who_we_are.images`, { returnObjects: true });
    const whoWeAreImages = Array.isArray(whoWeAreImagesData) ? whoWeAreImagesData : [];

    const coreValuesData = t(`${ns}.core_values.cards`, { returnObjects: true });
    const coreValues = Array.isArray(coreValuesData) ? coreValuesData : [];

    const policiesData = t(`${ns}.policies.list`, { returnObjects: true });
    const policies = Array.isArray(policiesData) ? policiesData : [];

    const whyUsChoicesData = t(`${ns}.why_us.choices`, { returnObjects: true });
    const whyUsChoices = Array.isArray(whyUsChoicesData) ? whyUsChoicesData : [];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="bg-background-light dark:bg-background-dark text-[#1C1C1C] dark:text-gray-200">
                <main className="flex flex-1 justify-center py-10 md:py-20">
                    <div className="flex flex-col max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
                        {/* Page Heading */}
                        <div className="flex flex-wrap justify-between gap-3 p-4 mb-8">
                            <h1 className="text-primary dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter w-full text-center">{t(`${ns}.title`)}</h1>
                        </div>

                        {/* Who We Are Section */}
                        <section className="mb-16">
                            <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">{t(`${ns}.who_we_are.title`)}</h2>
                            <p className="text-base font-normal leading-relaxed pb-6 pt-1 px-4 text-slate-700 dark:text-gray-300">{t(`${ns}.who_we_are.description`)}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                {whoWeAreImages.map((image, index) => (
                                    <div key={index} className="flex flex-col gap-3">
                                        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg" style={{ backgroundImage: `url("${image.url}")` }} role="img" aria-label={image.alt}></div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Our Vision & Mission Section */}
                        <section className="mb-16">
                            <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">{t(`${ns}.vision_mission.title`)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                                <VisionMissionCard icon="visibility" title={t(`${ns}.vision_mission.vision_title`)}>
                                    {t(`${ns}.vision_mission.vision_desc`)}
                                </VisionMissionCard>
                                <VisionMissionCard icon="rocket_launch" title={t(`${ns}.vision_mission.mission_title`)}>
                                    {t(`${ns}.vision_mission.mission_desc`)}
                                </VisionMissionCard>
                            </div>
                        </section>

                        {/* CEO Message Section */}
                        <section className="mb-16 bg-white dark:bg-background-dark dark:border dark:border-gray-700 rounded-xl shadow-lg p-8 mx-4">
                            <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight pb-4 text-center">{t(`${ns}.ceo_message.title`)}</h2>
                            <div className="border-t-2 border-primary/20 max-w-xs mx-auto mb-6"></div>
                            <p className="text-lg italic leading-relaxed text-center mb-6 text-slate-700 dark:text-gray-300">{t(`${ns}.ceo_message.quote`)}</p>
                            <p className="text-base font-bold text-right rtl:text-left text-slate-900 dark:text-white">{t(`${ns}.ceo_message.ceo_name`)}</p>
                            <p className="text-base font-semibold text-right rtl:text-left text-primary dark:text-gray-300">{t(`${ns}.ceo_message.company_name`)}</p>
                        </section>

                        {/* Our Core Values Section */}
                        <section className="mb-16">
                            <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">{t(`${ns}.core_values.title`)}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                                {coreValues.map(value => (
                                    <CoreValueCard key={value.title} {...value} />
                                ))}
                            </div>
                        </section>

                        {/* Policies Section */}
                        <section className="mb-16">
                            <div className="text-center mb-10">
                                <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-2 pt-5">{t(`${ns}.policies.title`)}</h2>
                                <p className="text-base font-normal leading-relaxed px-4 text-slate-700 dark:text-gray-300">{t(`${ns}.policies.subtitle`)}</p>
                            </div>
                            <div className="space-y-12">
                                {policies.map((policy, index) => (
                                    <PolicySection key={policy.title} {...policy} reverseOrder={index === 1} />
                                ))}
                            </div>
                        </section>
                        
                        {/* Why Choose JIS Section */}
                        <section>
                            <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-5 text-center">{t(`${ns}.why_us.title`)}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                                {whyUsChoices.map(choice => (
                                    <WhyUsCard key={choice.title} {...choice} />
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default About;