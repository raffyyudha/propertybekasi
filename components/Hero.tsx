
import React from 'react';
import { PropertyType, SearchFilters } from '../types';

interface HeroProps {
  filters: SearchFilters;
  onSearch: (filters: Partial<SearchFilters>) => void;
}

const Hero: React.FC<HeroProps> = ({ filters, onSearch }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-2/5 h-screen bg-slate-50 -z-10 architect-mask translate-x-1/4 -translate-y-1/4 rotate-12"></div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 w-full grid lg:grid-cols-12 gap-10 items-center">

        {/* Editorial Text Column */}
        <div className="lg:col-span-8 relative z-20 pt-10 md:pt-0">
          <div className="reveal-up">
            <div className="flex items-center gap-4 mb-6 md:mb-10">
              <span className="h-[1px] w-8 md:w-12 bg-[#020617]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">The New Standard</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-[90px] lg:text-[120px] xl:text-[140px] font-extrabold text-display mb-6 md:mb-12 text-[#020617] leading-[0.9] tracking-tight">
              ARCHITECTING <br />
              <span className="text-slate-200">DREAMS</span> IN <br />
              BEKASI<span className="text-emerald-500">.</span>
            </h1>
          </div>

          <div className="max-w-xl reveal-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed mb-10 md:mb-16 border-l-2 border-emerald-500 pl-6 md:pl-8">
              Kami tidak sekadar menjual unit; kami mengkurasi ekosistem hunian kelas atas dengan standar legalitas dan arsitektur tanpa kompromi.
            </p>
          </div>

          {/* Masterpiece Command Capsule */}
          <div className="reveal-up" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex flex-col md:flex-row items-center bg-white p-3 rounded-[30px] md:rounded-[40px] shadow-[0_48px_100px_-20px_rgba(2,6,23,0.15)] border border-slate-100 group w-full md:w-auto">
              <div className="flex items-center px-4 md:px-8 py-3 md:py-0 border-b md:border-b-0 md:border-r border-slate-50 w-full md:min-w-[300px]">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4 group-focus-within:bg-emerald-50 transition-colors shrink-0">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input
                  type="text"
                  placeholder="Nama Proyek atau Lokasi..."
                  className="w-full bg-transparent text-sm md:text-base font-bold placeholder-slate-300 focus:outline-none"
                  value={filters.query}
                  onChange={(e) => onSearch({ query: e.target.value })}
                />
              </div>

              <div className="px-4 md:px-10 py-3 md:py-0 flex items-center gap-4 w-full md:w-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 shrink-0">Tipe</span>
                <select
                  className="bg-transparent font-black text-sm uppercase tracking-wider text-[#020617] appearance-none focus:outline-none cursor-pointer w-full md:w-auto"
                  value={filters.type}
                  onChange={(e) => onSearch({ type: e.target.value })}
                >
                  <option value="">Semua</option>
                  {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <button className="w-full md:w-auto bg-[#020617] text-white font-black text-[11px] uppercase tracking-[0.3em] px-8 md:px-14 py-4 md:py-6 rounded-full hover:bg-black hover:scale-[1.02] transition-all active:scale-95 shadow-2xl mt-2 md:mt-0">
                Explore Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Visual Architectural Column */}
        <div className="lg:col-span-4 block relative reveal-up mt-10 lg:mt-0" style={{ animationDelay: '0.6s' }}>
          <div className="relative z-10 architect-mask overflow-hidden aspect-[3/4.5] shadow-3xl bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Luxury Architecture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent"></div>
          </div>

          {/* Floating Credibility Marker */}
          <div className="absolute top-20 -right-12 z-20 bg-white p-10 architect-mask shadow-2xl border border-slate-50 rotate-6">
            <div className="text-4xl font-black text-[#020617] tracking-tighter mb-1">0%</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Legal Risk Rate</div>
          </div>
        </div>
      </div>

      {/* Vertical Decorative Label */}
      <div className="absolute left-10 bottom-20 hidden xl:block origin-left -rotate-90">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-200">YEOBOLAND ALFAZZA PRESTIGE © 2024</span>
      </div>
    </section>
  );
};

export default Hero;
