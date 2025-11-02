import React from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';

interface Cookie {
    name: string;
    provider: string;
    purpose: string;
    duration: string;
    type: string;
}

interface CookieCategoryData {
    category_key: string;
    category_title: string;
    category_description: string;
    cookies: Cookie[];
}

const CookiePolicy: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'cookie_policy_page';

    const cookiesDataRaw = t(`${ns}.cookies_data`, { returnObjects: true });
    const cookiesData: CookieCategoryData[] = Array.isArray(cookiesDataRaw) ? cookiesDataRaw : [];

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t(`${ns}.title`) }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-slate-50">
                <PageWrapper>
                    <SectionTitle subtitle={t(`${ns}.last_updated`)}>
                        {t(`${ns}.title`)}
                    </SectionTitle>
                    <article className="max-w-4xl mx-auto text-slate-700 space-y-8 prose-jis prose-lg">
                        <p>{t(`${ns}.intro`)}</p>

                        <h3 className="text-slate-900">{t(`${ns}.what_are_cookies`)}</h3>
                        <p>{t(`${ns}.what_are_cookies_p1`)}</p>

                        <h3 className="text-slate-900">{t(`${ns}.why_we_use_cookies`)}</h3>
                        <p>{t(`${ns}.why_we_use_cookies_p1`)}</p>

                        <h3 className="text-slate-900 !mb-6">{t(`${ns}.cookies_we_use`)}</h3>
                        
                        {cookiesData.map(category => (
                            <div key={category.category_key} className="not-prose">
                                <h4 className="text-2xl font-bold text-slate-800 mb-2">{category.category_title}</h4>
                                <p className="text-slate-600 mb-4">{category.category_description}</p>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-slate-500 border border-slate-200 rounded-lg">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">{t(`${ns}.table_name`)}</th>
                                                <th scope="col" className="px-6 py-3">{t(`${ns}.table_provider`)}</th>
                                                <th scope="col" className="px-6 py-3">{t(`${ns}.table_purpose`)}</th>
                                                <th scope="col" className="px-6 py-3">{t(`${ns}.table_duration`)}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(category.cookies) && category.cookies.map(cookie => (
                                                <tr key={cookie.name} className="bg-white border-b border-slate-200">
                                                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{cookie.name}</th>
                                                    <td className="px-6 py-4">{cookie.provider}</td>
                                                    <td className="px-6 py-4">{cookie.purpose}</td>
                                                    <td className="px-6 py-4">{cookie.duration}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </article>
                </PageWrapper>
            </section>
        </>
    );
};

export default CookiePolicy;