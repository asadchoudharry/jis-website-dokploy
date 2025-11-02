import React from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPolicy: React.FC = () => {
    const { t } = useTranslation();

    // FIX: Safely handle the return value from t() to prevent runtime errors if the key is missing.
    const collectionListData = t('privacy_policy.collection_list', { returnObjects: true });
    const collectionList: string[] = Array.isArray(collectionListData) ? collectionListData : [];

    const useListData = t('privacy_policy.use_list', { returnObjects: true });
    const useList: string[] = Array.isArray(useListData) ? useListData : [];

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('privacy_policy.title') }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-slate-50">
                <PageWrapper>
                    <SectionTitle subtitle={t('privacy_policy.last_updated')}>{t('privacy_policy.title')}</SectionTitle>
                    <article className="max-w-4xl mx-auto text-slate-700 space-y-6 prose-jis prose-lg">
                        <p>{t('privacy_policy.intro')}</p>

                        <h3 className="text-slate-900">{t('privacy_policy.collection_title')}</h3>
                        <p>{t('privacy_policy.collection_p1')}</p>
                        <ul>
                            {collectionList.map(item => <li key={item}>{item}</li>)}
                        </ul>

                        <h3 className="text-slate-900">{t('privacy_policy.use_title')}</h3>
                        <p>{t('privacy_policy.use_p1')}</p>
                        <ul>
                            {useList.map(item => <li key={item}>{item}</li>)}
                        </ul>

                        <h3 className="text-slate-900">{t('privacy_policy.security_title')}</h3>
                        <p>{t('privacy_policy.security_p1')}</p>
                        
                        <h3 className="text-slate-900">{t('privacy_policy.providers_title')}</h3>
                        <p>{t('privacy_policy.providers_p1')}</p>

                        <h3 className="text-slate-900">{t('privacy_policy.changes_title')}</h3>
                        <p>{t('privacy_policy.changes_p1')}</p>

                        <h3 className="text-slate-900">{t('privacy_policy.contact_title')}</h3>
                        <p>{t('privacy_policy.contact_p1')}</p>
                    </article>
                </PageWrapper>
            </section>
        </>
    );
};

export default PrivacyPolicy;