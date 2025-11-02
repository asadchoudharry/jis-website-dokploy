import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';

const PolicyCard: React.FC<{ icon: string, title: string, description: string, link: string }> = ({ icon, title, description, link }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center hover:border-[#006C35] transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#006C35]/20 h-full flex flex-col">
            <div className="flex justify-center mb-4">
                <div className="bg-[#006C35] p-4 rounded-full">
                    <span className="material-symbols-outlined text-white text-4xl">{icon}</span>
                </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 flex-grow mb-6">{description}</p>
            <Link to={link} className="mt-auto font-semibold text-[#006C35] hover:underline">
                {t('hseq.read_policy')} &rarr;
            </Link>
        </div>
    );
};

const HSEQ: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'hseq';

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-slate-50">
                <PageWrapper>
                    <SectionTitle subtitle={t(`${ns}.subtitle`)}>
                        {t(`${ns}.title`)}
                    </SectionTitle>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-slate-700">{t(`${ns}.intro_p1`)}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16">
                        <PolicyCard 
                            icon="verified" 
                            title={t(`${ns}.quality_title`)} 
                            description={t(`${ns}.quality_desc`)} 
                            link="/policies/quality" 
                        />
                        <PolicyCard 
                            icon="health_and_safety" 
                            title={t(`${ns}.hse_title`)} 
                            description={t(`${ns}.hse_desc`)} 
                            link="/policies/hse" 
                        />
                        <PolicyCard 
                            icon="eco" 
                            title={t(`${ns}.env_title`)} 
                            description={t(`${ns}.env_desc`)} 
                            link="/policies/environmental" 
                        />
                    </div>
                    <section className="mt-20 text-center max-w-4xl mx-auto bg-white p-8 rounded-xl border border-slate-200" aria-labelledby="certs-title-heading">
                      <h3 id="certs-title-heading" className="text-3xl font-bold text-slate-900 mb-3">{t(`${ns}.certs_title`)}</h3>
                      <p className="text-lg text-slate-700 mb-6">
                        {t(`${ns}.certs_desc`)}
                      </p>
                      <Link to="/certifications" className="bg-[#006C35] text-white font-bold py-3 px-8 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all">
                        {t('header.our_certifications')}
                      </Link>
                    </section>
                </PageWrapper>
            </section>
        </>
    );
};

export default HSEQ;