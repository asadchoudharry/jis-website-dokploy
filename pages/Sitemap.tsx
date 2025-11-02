import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';

const SitemapLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <li>
        <Link to={to} className="hover:text-[#006C35] hover:underline transition-colors">{children}</Link>
    </li>
);

const Sitemap: React.FC = () => {
    const { t } = useTranslation();
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('sitemap.title') }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-white">
                <PageWrapper>
                    <SectionTitle subtitle={t('sitemap.subtitle')}>
                        {t('sitemap.title')}
                    </SectionTitle>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-slate-700 text-lg">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-[#006C35] pb-2">{t('sitemap.main_pages')}</h3>
                            <ul className="space-y-3">
                                <SitemapLink to="/">{t('header.home')}</SitemapLink>
                                <SitemapLink to="/about">{t('header.about')}</SitemapLink>
                                <SitemapLink to="/services">{t('header.services')}</SitemapLink>
                                <SitemapLink to="/industries">{t('header.industries')}</SitemapLink>
                                <SitemapLink to="/projects">{t('header.projects')}</SitemapLink>
                                <SitemapLink to="/careers">{t('header.careers')}</SitemapLink>
                                <SitemapLink to="/contact">{t('footer.contact')}</SitemapLink>
                                <SitemapLink to="/request-quote">{t('header.cta')}</SitemapLink>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-[#006C35] pb-2">{t('sitemap.our_services')}</h3>
                            <ul className="space-y-3">
                            <SitemapLink to="/services/trading-services">{t('footer.trading')}</SitemapLink>
                            <SitemapLink to="/services/dewatering-services">{t('footer.dewatering')}</SitemapLink>
                            <SitemapLink to="/services/hydrojetting-services">{t('footer.hydrojetting')}</SitemapLink>
                            <SitemapLink to="/services/chemical-cleaning">{t('footer.chemical_cleaning')}</SitemapLink>
                            <SitemapLink to="/services/waste-management">{t('footer.waste_management')}</SitemapLink>
                            <SitemapLink to="/services/manpower-solutions">{t('footer.manpower')}</SitemapLink>
                            <SitemapLink to="/services/project-support">{t('footer.project_support')}</SitemapLink>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b-2 border-[#006C35] pb-2">{t('sitemap.resources')}</h3>
                            <ul className="space-y-3">
                                <SitemapLink to="/certifications">{t('footer.certifications')}</SitemapLink>
                                <SitemapLink to="/hseq">{t('footer.hseq_policy')}</SitemapLink>
                                <SitemapLink to="/downloads">{t('footer.downloads')}</SitemapLink>
                                <SitemapLink to="/privacy-policy">{t('footer.privacy_policy')}</SitemapLink>
                                <SitemapLink to="/cookie-policy">{t('footer.cookie_policy')}</SitemapLink>
                                <SitemapLink to="/terms">{t('footer.terms')}</SitemapLink>
                                <SitemapLink to="/cookie-scanner">{t('footer.cookie_scanner')}</SitemapLink>
                            </ul>
                        </div>
                    </div>
                </PageWrapper>
            </section>
        </>
    );
};

export default Sitemap;