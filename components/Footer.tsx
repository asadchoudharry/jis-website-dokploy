import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import JISLogo from '../assets/JISLogo';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  const openCookieManager = () => {
    window.dispatchEvent(new Event('openCookieManager'));
  }

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <JISLogo className="h-16 w-auto mb-4" />
            <p className="text-sm max-w-sm">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">{t('footer.projects')}</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">{t('footer.industries')}</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/trading-services" className="hover:text-white transition-colors">{t('footer.trading')}</Link></li>
              <li><Link to="/services/dewatering-services" className="hover:text-white transition-colors">{t('footer.dewatering')}</Link></li>
              <li><Link to="/services/hydrojetting-services" className="hover:text-white transition-colors">{t('footer.hydrojetting')}</Link></li>
              <li><Link to="/services/chemical-cleaning" className="hover:text-white transition-colors">{t('footer.chemical_cleaning')}</Link></li>
              <li><Link to="/services/waste-management" className="hover:text-white transition-colors">{t('footer.waste_management')}</Link></li>
              <li><Link to="/services/manpower-solutions" className="hover:text-white transition-colors">{t('footer.manpower')}</Link></li>
              <li><Link to="/services/project-support" className="hover:text-white transition-colors">{t('footer.project_support')}</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/certifications" className="hover:text-white transition-colors">{t('footer.certifications')}</Link></li>
              <li><Link to="/hseq" className="hover:text-white transition-colors">{t('footer.hseq_policy')}</Link></li>
              <li><Link to="/downloads" className="hover:text-white transition-colors">{t('footer.downloads')}</Link></li>
              <li className="pt-2 mt-2 border-t border-slate-700"><Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy_policy')}</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white transition-colors">{t('footer.cookie_policy')}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors">{t('footer.sitemap')}</Link></li>
              <li><Link to="/cookie-scanner" className="hover:text-white transition-colors">{t('footer.cookie_scanner')}</Link></li>
               <li><button onClick={openCookieManager} className="hover:text-white transition-colors">{t('footer.manage_cookies')}</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.developed_by')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;