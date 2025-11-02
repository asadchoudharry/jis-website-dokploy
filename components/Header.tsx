import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import JISLogo from '../assets/JISLogo';

const ServicesDropdown: React.FC<{onClose?: () => void}> = ({onClose}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const services = [
      { name: t('footer.trading'), href: '/services/trading-services' },
      { name: t('footer.dewatering'), href: '/services/dewatering-services' },
      { name: t('footer.hydrojetting'), href: '/services/hydrojetting-services' },
      { name: t('footer.chemical_cleaning'), href: '/services/chemical-cleaning' },
      { name: t('footer.waste_management'), href: '/services/waste-management' },
      { name: t('footer.manpower'), href: '/services/manpower-solutions' },
      { name: t('footer.project_support'), href: '/services/project-support' }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const isActive = location.pathname.startsWith('/services');

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`text-slate-700 hover:text-[#006C35] transition-colors py-2 flex items-center gap-1 ${isActive ? 'text-[#006C35] font-semibold border-b-2 border-[#006C35]' : ''}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {t('header.services')}
                <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            {isOpen && (
                 <div className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white rounded-lg shadow-lg p-2 z-50 border border-slate-100 animate-fade-in">
                    <Link to="/services" onClick={handleLinkClick} className="block font-semibold px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-[#006C35] rounded-md text-left">
                        {t('services.title')}
                    </Link>
                    <div className="border-t border-slate-200 my-1"></div>
                    {services.map(service => (
                        <Link key={service.name} to={service.href} onClick={handleLinkClick} className="block px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-[#006C35] rounded-md text-left">
                            {service.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

const CertificationsDropdown: React.FC<{onClose?: () => void}> = ({onClose}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const policies = [
      { name: t('header.our_certifications'), href: '/certifications'},
      { name: t('header.quality_policy'), href: '/policies/quality'},
      { name: t('header.hse_policy'), href: '/policies/hse'},
      { name: t('header.environmental_policy'), href: '/policies/environmental'},
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };
    
    const isActive = location.pathname.startsWith('/certifications') || location.pathname.startsWith('/hseq') || location.pathname.startsWith('/policies');

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`text-slate-700 hover:text-[#006C35] transition-colors py-2 flex items-center gap-1 ${isActive ? 'text-[#006C35] font-semibold border-b-2 border-[#006C35]' : ''}`}
                 aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {t('header.certifications_policies')}
                <span className={`material-symbols-outlined text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
             {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white rounded-lg shadow-lg p-2 z-50 border border-slate-100 animate-fade-in">
                    {policies.map((policy) => (
                        <Link key={policy.name} to={policy.href} onClick={handleLinkClick} className="block px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-[#006C35] rounded-md text-left">
                            {policy.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

const NavLinks: React.FC<{ className?: string, onClick?: () => void }> = ({ className, onClick }) => {
  const { t } = useTranslation();
  const linkClass = "text-slate-700 hover:text-[#006C35] transition-colors py-2";
  const activeLinkClass = "text-[#006C35] font-semibold border-b-2 border-[#006C35]";

  const links = [
    { to: "/", text: t('header.home') },
    { to: "/about", text: t('header.about') },
    { to: "/industries", text: t('header.industries')},
    { to: "/projects", text: t('header.projects') },
    { to: "/careers", text: t('header.careers') },
  ];

  return (
    <>
      {links.slice(0, 2).map(link => (
        <NavLink key={link.to} to={link.to} onClick={onClick} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} ${className}`}>
          {link.text}
        </NavLink>
      ))}
      
      <div className="hidden md:block"> <ServicesDropdown onClose={onClick} /> </div>
      <div className="hidden md:block"> <CertificationsDropdown onClose={onClick} /> </div>

      <div className="contents md:hidden">
        <NavLink to="/services" onClick={onClick} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} ${className}`}>{t('header.services')}</NavLink>
      </div>
       <div className="contents md:hidden">
        <NavLink to="/certifications" onClick={onClick} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} ${className}`}>{t('header.certifications_policies')}</NavLink>
      </div>

      {links.slice(2).map(link => (
        <NavLink key={link.to} to={link.to} onClick={onClick} className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} ${className}`}>
          {link.text}
        </NavLink>
      ))}
    </>
  );
};

const MobileCollapsibleMenu: React.FC<{
  title: string;
  mainLinkText: string;
  mainLinkTo: string;
  items: Array<{ name: string; href: string }>;
  onLinkClick: () => void;
  itemSeparators?: number[];
}> = ({ title, mainLinkText, mainLinkTo, items, onLinkClick, itemSeparators = [] }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(mainLinkTo) || (mainLinkTo === '/certifications' && (location.pathname.startsWith('/hseq') || location.pathname.startsWith('/policies')));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isActive);
  }, [isActive, location.pathname]);


  return (
    <div className="w-full text-center">
      <div className={`flex items-center w-full rounded-md transition-colors ${isActive ? 'bg-slate-100' : ''}`}>
        <NavLink
          to={mainLinkTo}
          onClick={onLinkClick}
          className={({ isActive: isMainActive }) =>
            `flex-grow px-3 py-2 text-base font-medium transition-colors hover:text-[#006C35] text-left ${
              isMainActive ? 'text-[#006C35] font-semibold' : 'text-slate-700'
            }`
          }
        >
          {mainLinkText}
        </NavLink>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 text-slate-600 hover:text-slate-900"
          aria-expanded={isOpen}
          aria-controls={`collapsible-menu-${title}`}
        >
          <span className={`material-symbols-outlined text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
      </div>

      {isOpen && (
        <div id={`collapsible-menu-${title}`} className="mt-1 flex flex-col items-center bg-slate-50/50 rounded-md py-1 animate-fade-in">
          {items.map((item, index) => (
            <React.Fragment key={item.name}>
              {itemSeparators.includes(index) && <div className="border-t border-slate-200 w-11/12 my-1 mx-auto"></div>}
              <NavLink
                to={item.href}
                onClick={onLinkClick}
                className={({ isActive: isLinkActive }) =>
                  `block px-4 py-2 text-sm w-full rounded-md text-left ${
                    isLinkActive ? 'text-white bg-[#006C35] font-medium' : 'text-slate-600 hover:text-[#006C35] hover:bg-slate-100'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};


import { SettingsContext } from './SettingsContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const settings = React.useContext(SettingsContext);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = i18n.dir(lng);
  };
  
  const linkClass = "text-slate-700 hover:text-[#006C35] transition-colors";
  
  const services = [
    { name: t('footer.trading'), href: '/services/trading-services' },
    { name: t('footer.dewatering'), href: '/services/dewatering-services' },
    { name: t('footer.hydrojetting'), href: '/services/hydrojetting-services' },
    { name: t('footer.chemical_cleaning'), href: '/services/chemical-cleaning' },
    { name: t('footer.waste_management'), href: '/services/waste-management' },
    { name: t('footer.manpower'), href: '/services/manpower-solutions' },
    { name: t('footer.project_support'), href: '/services/project-support' }
  ];

  const certificationsAndPolicies = [
    { name: t('header.our_certifications'), href: '/certifications'},
    { name: t('header.quality_policy'), href: '/policies/quality'},
    { name: t('header.hse_policy'), href: '/policies/hse'},
    { name: t('header.environmental_policy'), href: '/policies/environmental'},
  ];


  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="bg-slate-100 text-slate-600 text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2">
            <div className="flex items-center gap-4 md:gap-6">
                <a href={`tel:${t('header.phone')}`} className="flex items-center gap-2 hover:text-[#006C35] transition-colors">
                    <span className="material-symbols-outlined text-lg">call</span>
                    <span className="hidden md:inline">{t('header.phone')}</span>
                </a>
                <a href={`mailto:${t('header.email')}`} className="flex items-center gap-2 hover:text-[#006C35] transition-colors">
                    <span className="material-symbols-outlined text-lg">email</span>
                    <span className="hidden md:inline">{t('header.email')}</span>
                </a>
            </div>
            <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-lg">language</span>
                 <button onClick={() => changeLanguage('en')} className={`px-2 py-1 rounded ${i18n.language.startsWith('en') ? 'font-semibold text-white bg-jis-green' : 'hover:text-slate-900 transition-colors'}`}>{t('header.lang_en')}</button>
                 <span className="text-slate-300">|</span>
                 <button onClick={() => changeLanguage('ar')} className={`px-2 py-1 rounded ${i18n.language === 'ar' ? 'font-semibold text-white bg-jis-green' : 'hover:text-slate-900 transition-colors'}`}>{t('header.lang_ar')}</button>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            {settings && settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.title} className="h-12 w-auto" />
            ) : (
              <div className="h-12 w-auto" />
            )}
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>
          <div className="hidden md:block">
            <Link
              to="/request-quote"
              className="bg-[#006C35] text-white font-bold py-3 px-6 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all"
            >
              {t('header.cta')}
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 max-h-[calc(100vh-128px)] overflow-y-auto">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col items-center">
            <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium w-full text-left ${isActive ? 'text-[#006C35] font-semibold' : linkClass}`}> {t('header.home')} </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium w-full text-left ${isActive ? 'text-[#006C35] font-semibold' : linkClass}`}> {t('header.about')} </NavLink>
            
            <MobileCollapsibleMenu
              title="services"
              mainLinkText={t('header.services')}
              mainLinkTo="/services"
              items={services}
              onLinkClick={closeMobileMenu}
            />

            <MobileCollapsibleMenu
              title="certifications"
              mainLinkText={t('header.certifications_policies')}
              mainLinkTo="/certifications"
              items={certificationsAndPolicies}
              onLinkClick={closeMobileMenu}
            />
            
            <NavLink to="/industries" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium w-full text-left ${isActive ? 'text-[#006C35] font-semibold' : linkClass}`}> {t('header.industries')} </NavLink>
            <NavLink to="/projects" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium w-full text-left ${isActive ? 'text-[#006C35] font-semibold' : linkClass}`}> {t('header.projects')} </NavLink>
            <NavLink to="/careers" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium w-full text-left ${isActive ? 'text-[#006C35] font-semibold' : linkClass}`}> {t('header.careers')} </NavLink>
            
             <Link
              to="/request-quote"
              onClick={closeMobileMenu}
              className="bg-[#006C35] text-white font-bold py-3 px-6 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all mt-4 w-full text-center"
            >
              {t('header.cta')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;