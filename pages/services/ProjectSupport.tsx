import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../components/Breadcrumbs';
import PageWrapper from '../../components/PageWrapper';
import SectionTitle from '../../components/SectionTitle';

const ProjectSupport: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'services_pages.project_support';

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('header.services'), path: '/services' },
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
                    <div className="text-center max-w-2xl mx-auto mt-16 bg-white p-12 rounded-lg shadow-md border border-slate-200">
                        <span className="material-symbols-outlined text-6xl text-[#006C35] mb-4">
                            construction
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{t(`${ns}.coming_soon_title`)}</h2>
                        <p className="text-slate-600 text-lg">{t(`${ns}.coming_soon_desc`)}</p>
                    </div>
                </PageWrapper>
            </section>
        </>
    );
};

export default ProjectSupport;
