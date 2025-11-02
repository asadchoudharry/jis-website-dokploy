import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import DynamicHeader from './components/DynamicHeader';
import DynamicFooter from './components/DynamicFooter';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Downloads from './pages/Downloads';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import RequestQuote from './pages/RequestQuote';
import Industries from './pages/Industries';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';

// Import new service detail pages
import TradingServices from './pages/services/TradingServices';
import DewateringServices from './pages/services/DewateringServices';
import HydrojettingServices from './pages/services/HydrojettingServices';
import ChemicalCleaning from './pages/services/ChemicalCleaning';
import WasteManagement from './pages/services/WasteManagement';
import ManpowerSolutions from './pages/services/ManpowerSolutions';
import ProjectSupport from './pages/services/ProjectSupport';

// Import new policy pages
import QualityPolicy from './pages/policies/QualityPolicy';
import HSEPolicy from './pages/policies/HSEPolicy';
import EnvironmentalPolicy from './pages/policies/EnvironmentalPolicy';
import HSEQ from './pages/HSEQ';
import CookieManager from './components/CookieManager';
import CookiePolicy from './pages/CookiePolicy';
import { applyConsent } from './utils/scriptManager';
import CookieScanner from './pages/CookieScanner';
import Pages from './pages/admin/Pages';
import EditPage from './pages/admin/EditPage';
import Page from './pages/Page';
import Forms from './pages/admin/Forms';
import EditForm from './pages/admin/EditForm';
import Theme from './pages/admin/Theme';
import EditHeader from './pages/admin/EditHeader';
import EditFooter from './pages/admin/EditFooter';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import Popups from './pages/admin/Popups';
import EditPopup from './pages/admin/EditPopup';
import Login from './pages/admin/Login';
import PrivateRoute from './components/admin/PrivateRoute';
import { Navigate } from 'react-router-dom';
import { SettingsContext, SiteSettings } from './components/SettingsContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import PopupRenderer from './components/PopupRenderer';
import BackToTopButton from './components/BackToTopButton';


const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const COOKIE_CONSENT_KEY = 'jis_cookie_consent';

const AppContent: React.FC = () => {
  
  React.useEffect(() => {
    fetch('http://localhost:3001/api/settings')
      .then(response => response.json())
      .then(data => {
        document.title = data.title;
      })
      .catch(error => console.error('Error fetching site settings:', error));

    try {
        const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (storedConsent) {
            const parsedConsent = JSON.parse(storedConsent);
            // FIX: Validate the structure of the parsed consent object before using it.
            // This prevents crashes if localStorage contains old or malformed data.
            if (typeof parsedConsent === 'object' && parsedConsent !== null && 'necessary' in parsedConsent) {
                applyConsent(parsedConsent);
            } else {
                console.warn("Malformed cookie consent found in localStorage. Removing it.");
                localStorage.removeItem(COOKIE_CONSENT_KEY);
            }
        }
    } catch (e) {
        console.error("Could not access localStorage or parse cookie consent.", e);
    }
  }, []);

  return (
      <div className="bg-white text-slate-800 min-h-screen flex flex-col">
        <DynamicHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/trading-services" element={<TradingServices />} />
            <Route path="/services/dewatering-services" element={<DewateringServices />} />
            <Route path="/services/hydrojetting-services" element={<HydrojettingServices />} />
            <Route path="/services/chemical-cleaning" element={<ChemicalCleaning />} />
            <Route path="/services/waste-management" element={<WasteManagement />} />
            <Route path="/services/manpower-solutions" element={<ManpowerSolutions />} />
            <Route path="/services/project-support" element={<ProjectSupport />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/hseq" element={<HSEQ />} />
            <Route path="/policies/quality" element={<QualityPolicy />} />
            <Route path="/policies/hse" element={<HSEPolicy />} />
            <Route path="/policies/environmental" element={<EnvironmentalPolicy />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pages" element={<Pages />} />
              <Route path="pages/:slug/edit" element={<EditPage />} />
              <Route path="forms" element={<Forms />} />
              <Route path="forms/:name/edit" element={<EditForm />} />
              <Route path="theme" element={<Theme />} />
              <Route path="theme/header/edit" element={<EditHeader />} />
              <Route path="theme/footer/edit" element={<EditFooter />} />
              <Route path="settings" element={<Settings />} />
              <Route path="popups" element={<Popups />} />
              <Route path="popups/:id/edit" element={<EditPopup />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>
            <Route path="/cookie-scanner" element={<CookieScanner />} />
            <Route path="/:slug" element={<Page />} />
          </Routes>
        </main>
        <DynamicFooter />
        <CookieManager />
        <BackToTopButton />
        <PopupRenderer />
      </div>
  );
};

const App: React.FC = () => {
  const [settings, setSettings] = React.useState<SiteSettings | null>(null);

  React.useEffect(() => {
    fetch('http://localhost:3001/api/settings')
      .then(response => response.json())
      .then(data => {
        setSettings(data);
        document.title = data.title;
      })
      .catch(error => console.error('Error fetching site settings:', error));
  }, []);

  return (
    <ParallaxProvider>
      <SettingsContext.Provider value={settings}>
        <HashRouter>
          <ScrollToTop />
          <AppContent />
        </HashRouter>
      </SettingsContext.Provider>
    </ParallaxProvider>
  );
};

export default App;