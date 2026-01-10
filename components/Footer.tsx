
import React from 'react';
import { BRAND_NAME, COMPANY_NAME } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#020617] text-slate-300 relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute -top-[50%] -left-[20%] w-[800px] h-[800px] rounded-full bg-emerald-500 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600 blur-[100px]"></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-10 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="w-48 h-24">
              <img src="/Logo PNG Putih (1).png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" }, // FB
                { icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" }, // IG
                { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" } // Twitter
              ].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all duration-300 text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns (2 cols each) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-sm uppercase tracking-widest border-b border-white/10 pb-4 inline-block">{t('footer.property')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> {t('footer.house')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> {t('footer.shophouse')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> {t('footer.land')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> {t('footer.warehouse')}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-sm uppercase tracking-widest border-b border-white/10 pb-4 inline-block">{t('footer.favoriteArea')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> Harapan Indah</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> Jakarta Garden City</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> Summarecon</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all"></span> Grand Wisata</a></li>
            </ul>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3" id="kontak">
            <h4 className="font-bold text-white mb-8 text-sm uppercase tracking-widest border-b border-white/10 pb-4 inline-block">{t('footer.contactUs')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">{t('footer.office')}</span>
                  <span className="text-white font-medium">Bekasi, Jawa Barat, Indonesia</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">{t('footer.whatsapp')}</span>
                  <span className="text-white font-medium text-lg">+62 899 9765 777</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">{t('footer.email')}</span>
                  <span className="text-white font-medium">yeobolandpropertindo@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2024 {COMPANY_NAME}. <span className="hidden md:inline">|</span> {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.disclaimer')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
