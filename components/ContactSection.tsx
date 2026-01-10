import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactSection: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
    const { t } = useLanguage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct WhatsApp message
        const text = `Halo, saya ${formState.name}. ${formState.message}`;
        window.open(`https://wa.me/628999765777?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <section id="contact-us" className="py-24 md:py-40 bg-white relative overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-5 md:px-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div>
                        <div className="flex items-center gap-6 mb-8 md:mb-10">
                            <span className="h-[1px] w-24 bg-emerald-500"></span>
                            <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">{t('contact.label')}</span>
                        </div>
                        <h2 className="text-4xl md:text-[90px] font-extrabold text-[#020617] leading-[0.9] md:leading-[0.85] tracking-tighter mb-6 md:mb-10">
                            {t('contact.heading').split(' ')[0]} <br />
                            {t('contact.heading').split(' ')[1]} <span className="text-emerald-500">{t('contact.heading').split(' ').slice(2).join(' ')}</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-slate-500 mb-8 md:mb-12 max-w-md font-medium leading-relaxed">
                            {t('contact.subheading')}
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform p-4 rounded-2xl hover:bg-slate-50">
                                <span className="w-16 h-16 bg-[#020617] text-white flex items-center justify-center rounded-2xl shadow-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </span>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('contact.callUs')}</div>
                                    <div className="text-lg md:text-2xl font-bold">+62 899 9765 777</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform p-4 rounded-2xl hover:bg-slate-50">
                                <span className="w-16 h-16 bg-emerald-500 text-white flex items-center justify-center rounded-2xl shadow-xl group-hover:scale-110 transition-transform flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                <div className="min-w-0">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('contact.emailUs')}</div>
                                    <div className="text-lg md:text-2xl font-bold break-all">yeobolandpropertindo@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

                        <div className="mb-8">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('contact.fullName')}</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 px-6 py-5 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 font-bold transition-all placeholder:text-slate-300"
                                placeholder={t('contact.namePlaceholder')}
                                value={formState.name}
                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('contact.whatsappNumber')}</label>
                            <input
                                type="tel"
                                className="w-full bg-slate-50 px-6 py-5 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 font-bold transition-all placeholder:text-slate-300"
                                placeholder="08..."
                                value={formState.phone}
                                onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-10">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('contact.message')}</label>
                            <textarea
                                className="w-full bg-slate-50 px-6 py-5 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 font-bold transition-all h-32 resize-none placeholder:text-slate-300"
                                placeholder={t('contact.messagePlaceholder')}
                                value={formState.message}
                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#020617] text-white font-black text-sm uppercase tracking-widest py-6 rounded-xl hover:bg-emerald-500 transition-colors shadow-lg active:scale-95 transform duration-200">
                            {t('contact.sendMessage')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default ContactSection;
