import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GUIDE_ARTICLES } from '../constants';

const Guides: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="pt-36 md:pt-40 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#020617] mb-4">
                        {t('guides.title')}
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        {t('guides.subtitle')}
                    </p>
                </div>

                {/* Categories Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {[
                        t('guides.cat.all'),
                        t('guides.cat.buy'),
                        t('guides.cat.sell'),
                        t('guides.cat.kpr'),
                        t('guides.cat.legal'),
                        t('guides.cat.invest'),
                        t('guides.cat.lifestyle')
                    ].map((cat, idx) => (
                        <button
                            key={idx}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${idx === 0 ? 'bg-[#020617] text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Guides Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {GUIDE_ARTICLES.map((guide) => (
                        <div
                            key={guide.id}
                            onClick={() => navigate(`/guides/${guide.id}`)}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={guide.image}
                                    alt={guide.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-[#020617]">
                                    {guide.category}
                                </span>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-[#020617] leading-snug mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                    {guide.title}
                                </h3>
                                <div className="mt-auto flex items-center text-xs text-slate-400 font-medium">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {guide.readTime}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="mt-20 bg-[#020617] rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 blur-[100px] opacity-20 pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">{t('guides.newsletterTitle')}</h2>
                        <p className="text-slate-400 mb-8">{t('guides.newsletterText')}</p>
                        <div className="flex gap-2 max-w-md mx-auto">
                            <input type="email" placeholder={t('guides.emailPlaceholder')} className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
                            <button className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-400 transition-colors">{t('guides.subscribe')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guides;
