import React from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';

const Terms: React.FC = () => {
    const { t } = useTranslation();

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('terms.title') }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-slate-50">
                <PageWrapper>
                    <SectionTitle subtitle={t('terms.last_updated')}>{t('terms.title')}</SectionTitle>
                    <article className="max-w-4xl mx-auto text-slate-700 space-y-6 prose-jis prose-lg">
                        <p>{t('terms.intro')}</p>
                        
                        <h3 className="text-slate-900">{t('terms.ip_title')}</h3>
                        <p>{t('terms.ip_p1')}</p>
                        
                        <h3 className="text-slate-900">{t('terms.links_title')}</h3>
                        <p>{t('terms.links_p1')}</p>
                        
                        <h3 className="text-slate-900">{t('terms.disclaimer_title')}</h3>
                        <p>{t('terms.disclaimer_p1')}</p>
                        
                        <h3 className="text-slate-900">{t('terms.law_title')}</h3>
                        <p>{t('terms.law_p1')}</p>
                        
                        <h3 className="text-slate-900">{t('terms.changes_title')}</h3>
                        <p>{t('terms.changes_p1')}</p>
                        
                        <h3 className="text-slate-900">{t('terms.contact_title')}</h3>
                        <p>{t('terms.contact_p1')}</p>
                    </article>
                </PageWrapper>
            </section>
        </>
    );
};

export default Terms;