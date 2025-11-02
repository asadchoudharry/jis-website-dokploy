import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';
import Captcha from '../components/Captcha';
import Breadcrumbs from '../components/Breadcrumbs';
import WhatsAppLogo from '../assets/icons/WhatsAppLogo';

const RequestQuote: React.FC = () => {
    const { t } = useTranslation();
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmissionStatus('submitting');
        
        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message'),
            formType: 'Quote Request'
        };

        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form data submitted (simulation):', data);
        setSubmissionStatus('success');
        (event.target as HTMLFormElement).reset();
    };

    const breadcrumbItems = [
        { name: t('header.home'), path: '/' },
        { name: t('request_quote.title') }
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <section className="bg-slate-50">
                <PageWrapper>
                    <SectionTitle subtitle={t('request_quote.subtitle')}>
                        {t('request_quote.title')}
                    </SectionTitle>

                    <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto mt-16">
                        <div className="lg:col-span-3">
                            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-lg">
                                {submissionStatus === 'success' && (
                                    <div className="bg-green-500/10 border border-green-500 text-green-700 p-4 rounded-lg text-center mb-6">
                                        {t('form.success_message')}
                                    </div>
                                )}
                                {submissionStatus === 'error' && (
                                    <div className="bg-red-500/10 border border-red-500 text-red-700 p-4 rounded-lg text-center mb-6">
                                        {t('form.error_message')}
                                    </div>
                                )}

                                {submissionStatus !== 'success' && (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t('request_quote.form_name_label')}</label>
                                                <input id="name" name="name" type="text" required className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none" />
                                            </div>
                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">{t('request_quote.form_company_label')}</label>
                                                <input id="company" name="company" type="text" required className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t('request_quote.form_email_label')}</label>
                                                <input id="email" name="email" type="email" required className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none" />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">{t('request_quote.form_phone_label')}</label>
                                                <input id="phone" name="phone" type="tel" className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">{t('request_quote.form_service_label')}</label>
                                            <select id="service" name="service" required className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none">
                                                <option value="">{t('request_quote.form_service_placeholder')}</option>
                                                <option value="Trading Services">{t('footer.trading')}</option>
                                                <option value="Dewatering Services">{t('footer.dewatering')}</option>
                                                <option value="Hydrojetting Services">{t('footer.hydrojetting')}</option>
                                                <option value="Chemical Cleaning">{t('footer.chemical_cleaning')}</option>
                                                <option value="Waste Management">{t('footer.waste_management')}</option>
                                                <option value="Manpower Solutions">{t('footer.manpower')}</option>
                                                <option value="Project Support">{t('footer.project_support')}</option>
                                                <option value="Other">{t('request_quote.form_service_other')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">{t('request_quote.form_message_label')}</label>
                                            <textarea id="message" name="message" required rows={6} className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none"></textarea>
                                        </div>
                                        <div>
                                            <Captcha onVerify={setIsCaptchaVerified} />
                                        </div>
                                        <div>
                                            <button type="submit" disabled={!isCaptchaVerified || submissionStatus === 'submitting'} className="w-full bg-[#006C35] text-white font-bold py-3 px-8 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all text-lg disabled:bg-slate-400 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                                                {submissionStatus === 'submitting' && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                                                {submissionStatus === 'submitting' ? t('form.submitting') : t('request_quote.form_submit')}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                        <aside className="lg:col-span-2">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('request_quote.direct_contact_title')}</h3>
                            <p className="text-slate-600 mb-6">{t('request_quote.direct_contact_subtitle')}</p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-[#006C35] text-4xl">email</span>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-xl">{t('request_quote.email_title')}</h4>
                                        <a href={`mailto:${t('header.email')}`} className="text-slate-700 hover:underline hover:text-[#006C35]">{t('header.email')}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-[#006C35] text-4xl">call</span>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-xl">{t('request_quote.call_title')}</h4>
                                        <a href={`tel:${t('header.phone')}`} className="text-slate-700 hover:underline hover:text-[#006C35]">{t('header.phone')}</a>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-4">
                                    <WhatsAppLogo className="h-10 w-10 text-[#25D366] flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-xl">{t('request_quote.whatsapp_title')}</h4>
                                        <a href={`https://wa.me/${(t('header.phone') as string).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline hover:text-[#006C35]">{t('header.phone')}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-[#006C35] text-4xl">location_on</span>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-xl">{t('request_quote.visit_title')}</h4>
                                        <p className="text-slate-700">{t('contact.location_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </PageWrapper>
            </section>
        </>
    );
};

export default RequestQuote;