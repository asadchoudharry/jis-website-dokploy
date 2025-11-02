import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Breadcrumbs from '../components/Breadcrumbs';
import WhatsAppLogo from '../assets/icons/WhatsAppLogo';
import FormRenderer from '../components/FormRenderer';

const ContactCard: React.FC<{ icon: string, title: string, children: React.ReactNode, href?: string }> = ({ icon, title, children, href }) => {
    const content = (
        <div className="bg-white p-8 rounded-xl border border-slate-200 h-full text-center hover:border-[#006C35] transition-colors shadow-sm hover:shadow-lg">
            <div className="flex justify-center mb-4">
                <span className="material-symbols-outlined text-[#006C35] text-5xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <div className="text-slate-700">{children}</div>
        </div>
    );
    
    const Wrapper = href ? 'a' : 'div';

    return (
        <Wrapper {...(href ? { href, className: 'block' } : {})}>
            {content}
        </Wrapper>
    );
}

const Contact: React.FC = () => {
    const { t } = useTranslation();
    
    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('contact.title') }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-slate-50">
                <PageWrapper>
                    <SectionTitle subtitle={t('contact.subtitle')}>
                        {t('contact.title')}
                    </SectionTitle>
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        <ContactCard icon="location_on" title={t('contact.location_title')}>
                            <p>{t('contact.location_desc')}</p>
                        </ContactCard>
                        <ContactCard icon="email" title={t('contact.email_title')} href={`mailto:${t('contact.email_address')}`}>
                            <p className="text-lg font-semibold hover:underline">{t('contact.email_address')}</p>
                        </ContactCard>
                        <ContactCard icon="call" title={t('contact.call_title')} href={`tel:${t('header.phone')}`}>
                            <p className="text-lg font-semibold hover:underline">{t('header.phone')}</p>
                        </ContactCard>
                        <a href={`https://wa.me/${(t('header.phone') as string).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="block">
                            <div className="bg-white p-8 rounded-xl border border-slate-200 h-full text-center hover:border-[#006C35] transition-colors shadow-sm hover:shadow-lg">
                                <div className="flex justify-center mb-4">
                                    <WhatsAppLogo className="h-12 w-12 text-[#25D366]"/>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('contact.whatsapp_title')}</h3>
                                <div className="text-slate-700">
                                     <p className="text-lg font-semibold hover:underline">{t('header.phone')}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </PageWrapper>
            </section>
            
             <section className="bg-white">
                <PageWrapper>
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t('contact.quote_form_title')}</h2>
                            <p className="text-slate-600 mb-8">{t('contact.quote_form_subtitle')}</p>
                            <FormRenderer formName="Contact Form" />
                        </div>
                        <div className="min-h-[400px]">
                             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t('contact.location_map_title')}</h2>
                             <p className="text-slate-600 mb-8">{t('contact.location_map_subtitle')}</p>
                             <div className="rounded-lg overflow-hidden border-2 border-slate-200">
                                 <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114548.25624838641!2d49.53173714937798!3d27.02947119106064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e24823b14757%3A0x70b20569762143a!2sJubail%20Industrial%20City%2C%20Jubail%20Saudi%20Arabia!5e0!3m2!1sen!2sae!4v1721862488836!5m2!1sen!2sae" 
                                    width="100%" 
                                    height="450" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={false} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Jubail Industrial Solutions Location Map"
                                ></iframe>
                             </div>
                        </div>
                    </div>
                </PageWrapper>
             </section>
        </>
    );
};

export default Contact;
