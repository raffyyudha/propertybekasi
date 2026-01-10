
import React, { useEffect, useState } from 'react';
import { PropertyType, SearchFilters, Story } from '../types';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  filters: SearchFilters;
  onSearch: (filters: Partial<SearchFilters>) => void;
}

const Hero: React.FC<HeroProps> = ({ filters, onSearch }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Mock data if DB is empty 
  const MOCK_STORIES: Story[] = [
    {
      id: 'mock-1',
      title: 'Promo Merdeka 45%',
      image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      link_url: '/special-offers',
      display_order: 1,
      is_active: true
    },
    {
      id: 'mock-2',
      title: 'Cluster Baru 2025',
      image_url: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=1200',
      link_url: '/property/1',
      display_order: 2,
      is_active: true
    },
    {
      id: 'mock-3',
      title: 'Legalitas Aman',
      image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      link_url: 'https://images.unsplash.com/photo-1512915922610-182180353c80?auto=format&fit=crop&q=80&w=1200',
      display_order: 3,
      is_active: true
    }
  ];

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
        setStories(MOCK_STORIES);
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

  const currentStory = stories[currentIndex] || MOCK_STORIES[0];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden">
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


        </div>

        {/* Visual Architectural Column (SLIDESHOW) */}
        <div className="lg:col-span-4 block relative reveal-up mt-10 lg:mt-0" style={{ animationDelay: '0.6s' }}>

          {/* Main Masked Slideshow Container */}
          <div className="relative z-10 architect-mask overflow-hidden aspect-[3/4.5] shadow-3xl bg-slate-200 group cursor-pointer" onClick={() => currentStory.link_url && navigate(currentStory.link_url)} >
            {/* Slides */}
            {stories.map((story, idx) => (
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
            ))}

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
