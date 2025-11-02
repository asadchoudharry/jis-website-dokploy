import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { applyConsent } from '../utils/scriptManager';

type ConsentCategories = {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

const COOKIE_CONSENT_KEY = 'jis_cookie_consent';
const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  performance: false,
  functional: false,
  targeting: false,
};

const CookieCategory: React.FC<{
  categoryKey: keyof Omit<ConsentCategories, 'necessary'>;
  userPreferences: Omit<ConsentCategories, 'necessary'>;
  onToggle: (key: keyof Omit<ConsentCategories, 'necessary'>, value: boolean) => void;
}> = ({ categoryKey, userPreferences, onToggle }) => {
  const { t } = useTranslation();
  
  return (
    <div className="py-4 border-b border-slate-200">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold text-slate-800">{t(`cookie_manager.categories.${categoryKey}.title`)}</h4>
        <label htmlFor={`cookie-toggle-${categoryKey}`} className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={`cookie-toggle-${categoryKey}`}
            className="sr-only peer"
            checked={userPreferences[categoryKey]}
            onChange={(e) => onToggle(categoryKey, e.target.checked)}
          />
          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006C35]"></div>
        </label>
      </div>
      <p className="text-sm text-slate-600 mt-2">{t(`cookie_manager.categories.${categoryKey}.description`)}</p>
    </div>
  );
};


const CookieManager: React.FC = () => {
    const { t } = useTranslation();
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [consent, setConsent] = useState<ConsentCategories | null>(null);
    const [userPreferences, setUserPreferences] = useState<Omit<ConsentCategories, 'necessary'>>(DEFAULT_CONSENT);

    useEffect(() => {
        try {
            const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
            if (storedConsent) {
                const parsedConsent: ConsentCategories = JSON.parse(storedConsent);
                if (typeof parsedConsent === 'object' && parsedConsent !== null && 'necessary' in parsedConsent) {
                    setConsent(parsedConsent);
                    setUserPreferences(parsedConsent);
                } else {
                    setShowBanner(true);
                    localStorage.removeItem(COOKIE_CONSENT_KEY);
                }
            } else {
                setShowBanner(true);
            }
        } catch (e) {
            console.error("Could not access localStorage. Showing cookie banner as a fallback.", e);
            setShowBanner(true);
        }
    }, []);
    
    const openModal = useCallback(() => {
        let currentPrefs: ConsentCategories = DEFAULT_CONSENT;
        try {
            const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
            if (storedConsent) {
                const parsedConsent = JSON.parse(storedConsent);
                if (typeof parsedConsent === 'object' && parsedConsent !== null && 'necessary' in parsedConsent) {
                    currentPrefs = parsedConsent;
                }
            }
        } catch (e) {
            console.error("Could not access localStorage on opening modal. Using defaults.", e);
        }

        setUserPreferences(currentPrefs);
        setShowBanner(false);
        setShowModal(true);
    }, []);

    useEffect(() => {
        window.addEventListener('openCookieManager', openModal);
        return () => {
            window.removeEventListener('openCookieManager', openModal);
        };
    }, [openModal]);


    const handleSave = (newConsent: ConsentCategories) => {
        setConsent(newConsent);
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
        } catch (e) {
            console.error("Could not save cookie consent to localStorage.", e);
        }
        setShowBanner(false);
        setShowModal(false);
        applyConsent(newConsent);
    };

    const acceptAll = () => handleSave({ necessary: true, performance: true, functional: true, targeting: true });
    const rejectAll = () => handleSave({ necessary: true, performance: false, functional: false, targeting: false });
    
    const savePreferences = () => {
        const newConsent = { necessary: true, ...userPreferences };
        handleSave(newConsent);
    };
    
    const handleToggle = (key: keyof Omit<ConsentCategories, 'necessary'>, value: boolean) => {
        setUserPreferences(prev => ({ ...prev, [key]: value }));
    };

    if (showBanner) {
        return (
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 md:p-6 z-[100] animate-fade-in-up shadow-2xl">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-700 text-sm md:text-base text-center md:text-left">
                        {t('cookie_manager.banner_message')}{' '}
                        <Link to="/cookie-policy" className="text-slate-900 font-semibold hover:underline hover:text-[#006C35]">
                            {t('footer.cookie_policy')}
                        </Link>.
                    </p>
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <button
                            onClick={openModal}
                            className="text-slate-600 hover:text-slate-900 transition-colors font-semibold px-4 py-2 rounded-lg"
                        >
                            {t('cookie_manager.banner_customize')}
                        </button>
                        <button
                            onClick={acceptAll}
                            className="bg-[#006C35] text-white font-bold py-2 px-6 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all"
                        >
                            {t('cookie_manager.banner_accept_all')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (showModal) {
        return (
            <div className="cookie-modal-overlay animate-fade-in">
                <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-slide-in-up">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">{t('cookie_manager.modal_title')}</h2>
                        <p className="text-sm text-slate-600 mt-2">{t('cookie_manager.modal_intro')}</p>
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{t('cookie_manager.modal_manage_consent')}</h3>
                        
                        {/* Strictly Necessary Cookies */}
                        <div className="py-4 border-b border-slate-200">
                             <div className="flex justify-between items-center">
                                <h4 className="text-lg font-bold text-slate-800">{t('cookie_manager.categories.necessary.title')}</h4>
                                <span className="text-sm font-semibold text-slate-500 px-3 py-1 bg-slate-100 rounded-full">{t('cookie_manager.always_active')}</span>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">{t('cookie_manager.categories.necessary.description')}</p>
                        </div>

                        <CookieCategory categoryKey="performance" userPreferences={userPreferences} onToggle={handleToggle} />
                        <CookieCategory categoryKey="functional" userPreferences={userPreferences} onToggle={handleToggle} />
                        <CookieCategory categoryKey="targeting" userPreferences={userPreferences} onToggle={handleToggle} />

                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button onClick={rejectAll} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">
                            {t('cookie_manager.modal_reject_all')}
                        </button>
                         <button onClick={savePreferences} className="px-4 py-2 text-sm font-semibold text-white bg-[#006C35] border border-[#006C35] rounded-lg hover:bg-opacity-90 transition-opacity">
                            {t('cookie_manager.modal_save_preferences')}
                        </button>
                         <button onClick={acceptAll} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">
                            {t('cookie_manager.modal_accept_all')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default CookieManager;