import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../components/PageWrapper';
import SectionTitle from '../components/SectionTitle';

// In a real backend scenario, this would come from a database.
// Here, it acts as our knowledge base for cookie classification.
const cookieKnowledgeBase = [
  { name: 'jis_consent', provider: 'jis-saudi.com', purpose: "Stores the user's cookie consent state for the current domain.", duration: '1 Year', type: 'HTTP', category: 'necessary' },
  { name: 'i18next', provider: 'jis-saudi.com', purpose: "Stores the user's selected language preference.", duration: 'Session', type: 'HTTP', category: 'necessary' },
  { name: '_ga', provider: 'Google Analytics', purpose: 'Used to distinguish users for analytics tracking.', duration: '2 Years', type: 'HTTP', category: 'performance' },
  { name: '_gid', provider: 'Google Analytics', purpose: 'Used to distinguish users.', duration: '24 Hours', type: 'HTTP', category: 'performance' },
  { name: '_gat', provider: 'Google Analytics', purpose: 'Used to throttle request rate.', duration: '1 Minute', type: 'HTTP', category: 'performance' },
  { name: '_fbp', provider: 'Facebook', purpose: 'Used by Facebook to deliver a series of advertisement products such as real time bidding from third party advertisers.', duration: '3 Months', type: 'HTTP', category: 'targeting' },
  { name: 'IDE', provider: 'Google (DoubleClick)', purpose: 'Used by Google DoubleClick to register and report the website user\'s actions after viewing or clicking one of the advertiser\'s ads with the purpose of measuring the efficacy of an ad and to present targeted ads to the user.', duration: '1 Year', type: 'HTTP', category: 'targeting' },
];

const CookieScanner: React.FC = () => {
    const { t } = useTranslation();
    const ns = 'cookie_scanner';
    const [url, setUrl] = useState('https://www.jis-saudi.com');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleScan = () => {
        setIsLoading(true);
        setResults(null);
        // Simulate a network request and scanning process
        setTimeout(() => {
            // In a real implementation, this would be a dynamic result.
            // Here, we use our static knowledge base as the "detected" cookies.
            setResults(cookieKnowledgeBase);
            setIsLoading(false);
        }, 2500);
    };

    const generatePolicyJson = () => {
        if (!results) return '';

        const categories: any = {
            necessary: { key: 'necessary', title: t('cookie_manager.categories.necessary.title'), desc: t('cookie_manager.categories.necessary.description'), cookies: [] },
            performance: { key: 'performance', title: t('cookie_manager.categories.performance.title'), desc: t('cookie_manager.categories.performance.description'), cookies: [] },
            functional: { key: 'functional', title: t('cookie_manager.categories.functional.title'), desc: t('cookie_manager.categories.functional.description'), cookies: [] },
            targeting: { key: 'targeting', title: t('cookie_manager.categories.targeting.title'), desc: t('cookie_manager.categories.targeting.description'), cookies: [] },
        };
        
        results.forEach(cookie => {
            if (categories[cookie.category]) {
                categories[cookie.category].cookies.push({
                    name: cookie.name,
                    provider: cookie.provider,
                    purpose: cookie.purpose,
                    duration: cookie.duration,
                    type: cookie.type,
                });
            }
        });

        const jsonData = Object.values(categories).map((cat: any) => ({
            category_key: cat.key,
            category_title: cat.title,
            category_description: cat.desc,
            cookies: cat.cookies,
        }));

        return JSON.stringify(jsonData, null, 2);
    };
    
    const copyToClipboard = () => {
        const jsonString = generatePolicyJson();
        navigator.clipboard.writeText(jsonString).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const policyJson = generatePolicyJson();

    return (
        <div className="bg-slate-50">
            <PageWrapper>
                <SectionTitle subtitle={t(`${ns}.subtitle`)}>
                    {t(`${ns}.title`)}
                </SectionTitle>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-md">
                    <div className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="w-full">
                            <label htmlFor="url-input" className="block text-sm font-medium text-slate-700 mb-1">{t(`${ns}.form_label`)}</label>
                            <input
                                type="url"
                                id="url-input"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={t(`${ns}.form_placeholder`)}
                                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-[#006C35] focus:border-[#006C35] outline-none"
                            />
                        </div>
                        <button
                            onClick={handleScan}
                            disabled={isLoading}
                            className="w-full sm:w-auto flex-shrink-0 bg-[#006C35] text-white font-bold py-3 px-8 rounded-lg border-2 border-transparent hover:bg-white hover:text-[#006C35] hover:border-[#006C35] transition-all disabled:bg-slate-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                            {isLoading ? t(`${ns}.button_scanning`) : t(`${ns}.button_scan`)}
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-12">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">{t(`${ns}.results_title`)}</h3>
                    {isLoading && (
                        <div className="text-center p-8 bg-white rounded-lg border border-slate-200">
                             <div className="flex justify-center items-center gap-3 text-lg text-slate-600">
                                <span className="w-6 h-6 border-2 border-[#006C35] border-t-transparent rounded-full animate-spin"></span>
                                {t(`${ns}.button_scanning`)}
                            </div>
                        </div>
                    )}
                    
                    {!isLoading && !results && (
                        <div className="text-center p-8 bg-white rounded-lg border border-slate-200 text-slate-500">
                            {t(`${ns}.no_results`)}
                        </div>
                    )}

                    {!isLoading && results && (
                         <div className="space-y-8">
                             {Object.values(results.reduce((acc, cookie) => {
                                 acc[cookie.category] = acc[cookie.category] || { title: t(`cookie_manager.categories.${cookie.category}.title`), cookies: [] };
                                 acc[cookie.category].cookies.push(cookie);
                                 return acc;
                             }, {})).map((category: any) => (
                                <div key={category.title} className="bg-white p-6 rounded-xl border border-slate-200">
                                    <h4 className="text-xl font-bold text-slate-800 mb-4">{category.title}</h4>
                                     <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm text-left text-slate-500">
                                            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3">Name</th>
                                                    <th scope="col" className="px-4 py-3">Provider</th>
                                                    <th scope="col" className="px-4 py-3">Purpose</th>
                                                    <th scope="col" className="px-4 py-3">Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {category.cookies.map((cookie: any) => (
                                                    <tr key={cookie.name} className="border-b border-slate-200">
                                                        <td className="px-4 py-3 font-medium text-slate-900">{cookie.name}</td>
                                                        <td className="px-4 py-3">{cookie.provider}</td>
                                                        <td className="px-4 py-3">{cookie.purpose}</td>
                                                        <td className="px-4 py-3">{cookie.duration}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                             ))}

                             <div className="mt-12 bg-white p-6 rounded-xl border border-slate-200">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t(`${ns}.json_title`)}</h3>
                                <p className="text-slate-600 mb-4">{t(`${ns}.json_instructions`)}</p>
                                <div className="relative">
                                    <textarea
                                        readOnly
                                        value={policyJson}
                                        className="w-full h-96 p-4 font-mono text-sm bg-slate-900 text-slate-100 rounded-lg border border-slate-700 focus:outline-none"
                                    />
                                    <button onClick={copyToClipboard} className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-1 px-3 rounded-md transition-colors">
                                        {copySuccess ? t(`${ns}.copy_success`) : t(`${ns}.copy_button`)}
                                    </button>
                                </div>
                             </div>
                         </div>
                    )}
                </div>
            </PageWrapper>
        </div>
    );
};

export default CookieScanner;