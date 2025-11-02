import React from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';

const DownloadItem: React.FC<{ title: string, description: string, fileUrl: string }> = ({ title, description, fileUrl }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm">
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 mt-1">{description}</p>
      </div>
      <a href={fileUrl} download className="bg-[#006C35] text-white font-bold py-2 px-4 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all flex items-center gap-2">
        <span className="material-symbols-outlined">download</span>
        {t('downloads.download_button')}
      </a>
    </div>
  );
}


const Downloads: React.FC = () => {
    const { t } = useTranslation();

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('downloads.title') }
    ];

  return (
    <>
        <Breadcrumbs items={breadcrumbItems} />
        <section className="bg-slate-50">
        <PageWrapper>
            <SectionTitle subtitle={t('downloads.subtitle')}>
            {t('downloads.title')}
            </SectionTitle>
            <div className="max-w-4xl mx-auto space-y-6">
            <DownloadItem title={t('downloads.item1_title')} description={t('downloads.item1_desc')} fileUrl="/assets/docs/jis_company_profile.pdf" />
            <DownloadItem title={t('downloads.item2_title')} description={t('downloads.item2_desc')} fileUrl="/assets/docs/jis_hse_policy.pdf" />
            <DownloadItem title={t('downloads.item3_title')} description={t('downloads.item3_desc')} fileUrl="/assets/docs/jis_environmental_policy.pdf" />
            <DownloadItem title={t('downloads.item4_title')} description={t('downloads.item4_desc')} fileUrl="/assets/docs/jis_quality_policy.pdf" />
            <DownloadItem title={t('downloads.item5_title')} description={t('downloads.item5_desc')} fileUrl="/assets/docs/jis_iso_certificates.pdf" />
            </div>
        </PageWrapper>
        </section>
    </>
  );
};

export default Downloads;