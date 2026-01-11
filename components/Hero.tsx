
import React, { useEffect, useState } from 'react';
import { PropertyType, SearchFilters, Story } from '../types';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  filters: SearchFilters;
  onSearch: (filters: Partial<SearchFilters>) => void;
}

const Hero: React.FC<HeroProps> = ({ filters, onSearch }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setStories(data);
      } else {
        setStories([]);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    if (stories.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [stories]);

  const currentStory = stories[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center pt-72 md:pt-36 pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-2/5 h-screen bg-slate-50 -z-10 architect-mask translate-x-1/4 -translate-y-1/4 rotate-12"></div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 w-full grid lg:grid-cols-12 gap-10 items-center">

        {/* Visual Architectural Column (SLIDESHOW) - Swapped to 1st Position */}
        <div className="lg:col-span-4 block relative reveal-up" style={{ animationDelay: '0s' }}>

          {/* Main Story Container - PERFECT SQUARE */}
          <div className="relative z-10 rounded-2xl overflow-hidden aspect-square shadow-3xl bg-slate-200 group cursor-pointer" onClick={() => currentStory?.link_url && navigate(currentStory.link_url)} >
            {/* Slides */}
            {stories.length > 0 ? (
              stories.map((story, idx) => (
                <div
                  key={story.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={story.image_url}
                    className="w-full h-full object-cover transition-transform duration-[4000ms] ease-linear scale-110 group-hover:scale-100"
                    alt={story.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent"></div>

                  {/* Story Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    {story.title && (
                      <div className="text-white font-black text-2xl md:text-3xl leading-tight mb-2 opacity-0 animate-[fadeUp_0.5s_0.3s_forwards]">
                        {story.title}
                      </div>
                    )}
                    {story.link_url && (
                      <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest opacity-0 animate-[fadeUp_0.5s_0.5s_forwards]">
                        Lihat Detail <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Empty State - Just a placeholder background or logo if desired
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-300 font-black text-2xl italic">Y</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons - Always visible */}
            {stories.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length); }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#020617] transition-all z-30"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % stories.length); }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#020617] transition-all z-30"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}

            {/* Navigation Dots (Optional) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Floating Credibility Marker - FULL SQUARE PERFECT BOX */}
          <div className="absolute top-20 right-4 lg:-right-12 z-20 bg-white aspect-square w-[180px] flex flex-col items-center justify-center shadow-2xl border border-slate-50">
            <div className="text-5xl font-black text-[#020617] tracking-tighter mb-1">0%</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center px-4">{t('hero.legalRisk')}</div>
          </div>
        </div>

        {/* Editorial Text Column - Swapped to 2nd Position */}
        <div className="lg:col-span-8 relative z-20 pt-10 md:pt-0 mt-0 lg:mt-0">
          <div className="reveal-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-6xl md:text-[90px] lg:text-[120px] xl:text-[140px] font-extrabold text-display mb-0 md:mb-12 text-[#020617] leading-[0.9] tracking-tight mt-0">
              {t('hero.architecting')} <br />
              <span className="text-slate-200">{t('hero.dreams')}</span> {t('hero.inBekasi')} <span className="text-emerald-500">.</span>
            </h1>
          </div>

          <div className="max-w-xl reveal-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed mb-0 md:mb-16 border-l-2 border-emerald-500 pl-6 md:pl-8 mt-4 md:mt-0">
              {t('hero.description')}
            </p>
          </div>



        </div>

      </div>

      {/* Vertical Decorative Label */}
      <div className="absolute left-10 bottom-20 hidden xl:block origin-left -rotate-90">
        <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-200">YEOBOLAND ALFAZZA PRESTIGE © 2024</span>
      </div>

      <style>{`
          @keyframes fadeUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
          }
      `}</style>
    </section>
  );
};

export default Hero;
