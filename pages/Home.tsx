import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ParallaxBanner } from 'react-scroll-parallax';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'home';

    const servicesData = t(`${ns}.services_section.cards`, { returnObjects: true });
    const services = Array.isArray(servicesData) ? servicesData : [];

    const whyUsPointsData = t(`${ns}.why_us.points`, { returnObjects: true });
    const whyUsPoints = Array.isArray(whyUsPointsData) ? whyUsPointsData : [];
    
    const sectorsData = t(`${ns}.sectors.items`, { returnObjects: true });
    const sectors = Array.isArray(sectorsData) ? sectorsData : [];

    return (
        <main className="isolate">
            {/* New Hero Section */}
            <ParallaxBanner
              layers={[{ image: t(`${ns}.hero_new.image_url`), speed: -20 }]}
              className="h-auto min-h-screen"
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-white md:px-6 lg:px-8 text-center sm:items-start sm:text-left rtl:sm:text-right">
                  <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-black/70 via-primary/80 to-primary/30"></div>
                  <div className="absolute inset-0 z-0 opacity-10">
                      <div className="absolute -left-16 -top-16 h-48 w-48 animate-spin-slow bg-contain bg-no-repeat opacity-50 blur-sm" style={{ backgroundImage: `url('${t(`${ns}.hero_new.gear_image_url`)}')` }}></div>
                      <div className="absolute -right-20 -bottom-20 h-64 w-64 animate-spin-slower bg-contain bg-no-repeat opacity-50 blur-sm" style={{ backgroundImage: `url('${t(`${ns}.hero_new.gear_image_url`)}')` }}></div>
                      <div className="absolute -bottom-1/4 -left-1/4 h-3/4 w-3/4 bg-contain bg-no-repeat opacity-30 blur-md" style={{ backgroundImage: `url('${t(`${ns}.hero_new.gear_image_url`)}')` }}></div>
                      <div className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 bg-contain bg-no-repeat opacity-30 blur-md" style={{ backgroundImage: `url('${t(`${ns}.hero_new.gear_image_url`)}')`, transform: 'rotate(180deg)' }}></div>
                  </div>
                  <div className="z-10 flex max-w-7xl flex-col gap-4">
                      <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">{t(`${ns}.hero_new.title`)}</h1>
                      <h2 className="max-w-3xl text-base font-normal leading-normal text-white sm:text-lg">{t(`${ns}.hero_new.subtitle`)}</h2>
                      <p className="max-w-3xl text-sm text-neutral-300 sm:text-base">{t(`${ns}.hero_new.description`)}</p>
                      <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
                          <Link to="/services" className="flex h-12 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-6 text-base font-bold leading-normal tracking-wide text-white transition-all transform hover:scale-105 hover:bg-opacity-90">
                              <span className="truncate">{t(`${ns}.hero_new.cta1`)}</span>
                              <span className="material-symbols-outlined">arrow_forward</span>
                          </Link>
                          <Link to="/request-quote" className="flex h-12 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-transparent px-6 text-base font-bold leading-normal tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                              <span className="truncate">{t(`${ns}.hero_new.cta2`)}</span>
                          </Link>
                      </div>
                  </div>
              </div>
            </ParallaxBanner>

            {/* Welcome Section */}
            <section className="bg-background-light py-16 dark:bg-background-dark md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl font-black leading-tight tracking-tight text-text-dark dark:text-neutral-white">{t(`${ns}.welcome.title`)}</h2>
                            <p className="text-lg text-primary dark:text-secondary-bright-green">{t(`${ns}.welcome.description`)}</p>
                        </div>
                        <div className="w-full">
                            <div className="aspect-video w-full overflow-hidden rounded-xl">
                                <div className="h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${t(`${ns}.welcome.image_url`)}")` }} role="img" aria-label={t(`${ns}.welcome.image_alt`)}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comprehensive Services Section */}
            <section className="bg-neutral-white py-16 dark:bg-background-dark/50 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-text-dark dark:text-neutral-white">{t(`${ns}.services_section.title`)}</h2>
                        <p className="mt-4 text-lg text-primary dark:text-secondary-bright-green">{t(`${ns}.services_section.subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(service => (
                            <div key={service.title} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-background-light shadow-sm dark:border-gray-700 dark:bg-background-dark">
                                <div className="aspect-video w-full bg-cover bg-center" style={{ backgroundImage: `url("${service.image_url}")` }} role="img" aria-label={service.image_alt}></div>
                                <div className="flex flex-grow flex-col p-6">
                                    <h3 className="text-xl font-bold text-text-dark dark:text-neutral-white">{service.title}</h3>
                                    <p className="mt-2 flex-grow text-gray-600 dark:text-gray-300">{service.description}</p>
                                    <Link to={service.link} className="mt-4 inline-flex items-center gap-2 self-start font-semibold text-primary dark:text-secondary-bright-green">
                                        {t('services.learn_more')} <span className="material-symbols-outlined">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose JIS Section */}
            <section className="bg-background-light py-16 dark:bg-background-dark md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-text-dark dark:text-neutral-white">{t(`${ns}.why_us.title`)}</h2>
                        <p className="mt-4 text-lg text-primary dark:text-secondary-bright-green">{t(`${ns}.why_us.subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {whyUsPoints.map(point => (
                            <div key={point.title} className="flex flex-col items-center p-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-secondary-bright-green/20">
                                    <span className="material-symbols-outlined text-3xl text-primary dark:text-secondary-bright-green">{point.icon}</span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-text-dark dark:text-neutral-white">{point.title}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Serving Key Industrial Sectors Section */}
            <section className="bg-neutral-white py-16 dark:bg-background-dark/50 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-text-dark dark:text-neutral-white">{t(`${ns}.sectors.title`)}</h2>
                        <p className="mt-4 text-lg text-primary dark:text-secondary-bright-green">{t(`${ns}.sectors.subtitle`)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
                        {sectors.map(sector => (
                            <div key={sector.title} className={`flex flex-col items-center rounded-lg p-4 text-center transition-all hover:bg-primary/5 dark:hover:bg-secondary-bright-green/10 ${sector.span ? 'col-span-2 sm:col-span-1' : ''}`}>
                                <span className="material-symbols-outlined text-5xl text-primary dark:text-secondary-bright-green">{sector.icon}</span>
                                <p className="mt-2 font-semibold text-text-dark dark:text-neutral-white">{sector.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link to="/industries" className="font-bold text-primary hover:underline dark:text-secondary-bright-green">{t(`${ns}.sectors.cta`)}</Link>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-primary dark:bg-background-dark/80">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-8 rounded-xl bg-primary p-10 text-center dark:bg-background-dark md:flex-row md:text-left rtl:md:text-right">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-black text-white">{t(`${ns}.final_cta_new.title`)}</h2>
                            <p className="mt-2 text-lg text-neutral-200">{t(`${ns}.final_cta_new.subtitle`)}</p>
                        </div>
                        <div className="flex flex-shrink-0 flex-col gap-4 sm:flex-row">
                            <Link to="/request-quote" className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-accent-gold px-6 text-base font-bold leading-normal tracking-wide text-text-dark transition-transform hover:scale-105">
                                <span className="truncate">{t(`${ns}.final_cta_new.cta1`)}</span>
                            </Link>
                            <Link to="/contact" className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-neutral-white/20 px-6 text-base font-bold leading-normal tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-neutral-white/30">
                                <span className="truncate">{t(`${ns}.final_cta_new.cta2`)}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;