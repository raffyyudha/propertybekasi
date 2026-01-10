import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Story } from '../types';
import { useNavigate } from 'react-router-dom';

const StoryFeed: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Mock data for immediate preview if DB is empty
    const MOCK_STORIES: Story[] = [
        {
            id: 'mock-1',
            title: 'Promo Merdeka 45%',
            image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=1000',
            link_url: '/special-offers',
            display_order: 1,
            is_active: true
        },
        {
            id: 'mock-2',
            title: 'New Cluster 2024',
            image_url: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80&w=600&h=1000',
            link_url: '/property/1',
            display_order: 2,
            is_active: true
        },
        {
            id: 'mock-3',
            title: 'Legalitas Terjamin',
            image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600&h=1000',
            link_url: '',
            display_order: 3,
            is_active: true
        },
        {
            id: 'mock-4',
            title: 'Cicilan Ringan',
            image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=1000',
            link_url: '/contact',
            display_order: 4,
            is_active: true
        },
        {
            id: 'mock-5',
            title: 'Lokasi Strategis',
            image_url: 'https://images.unsplash.com/photo-1512915922610-182180353c80?auto=format&fit=crop&q=80&w=600&h=1000',
            link_url: '',
            display_order: 5,
            is_active: true
        }
    ];

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        const { data, error } = await supabase
            .from('stories')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (data && data.length > 0) {
            setStories(data);
        } else {
            // Fallback to mock data if no data from DB (or table missing)
            setStories(MOCK_STORIES);
        }
    };

    // Auto-Scroll: Interval based snap with pause on hover
    useEffect(() => {
        if (stories.length === 0) return;

        const interval = setInterval(() => {
            // Check if user is hovering hover the container
            if (scrollRef.current && !scrollRef.current.matches(':hover')) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
                const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;

                if (isEnd) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll by roughly one item width + gap
                    // Mobile width 180, Desktop 240. Gap 16.
                    const scrollAmount = window.innerWidth < 768 ? 200 : 260;
                    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 seconds per slide

        return () => clearInterval(interval);
    }, [stories]);

    if (stories.length === 0) return null;

    return (
        <div className="w-full bg-slate-50 py-6 border-b border-slate-200">
            <div className="max-w-[1600px] mx-auto px-4 md:px-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-black tracking-widest uppercase text-slate-500">Highlights</span>
                </div>

                {/* Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            onClick={() => story.link_url && navigate(story.link_url)}
                            className="flex-none w-[180px] md:w-[240px] aspect-[9/16] relative rounded-2xl overflow-hidden shadow-lg snap-center cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                        >
                            <img
                                src={story.image_url}
                                alt={story.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                            {/* Animation Indicators (mock) */}
                            <div className="absolute top-2 left-2 right-2 flex gap-1">
                                <div className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-full animate-[loading_3s_linear_infinite]"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                {story.title && (
                                    <h3 className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-md mb-2">
                                        {story.title}
                                    </h3>
                                )}
                                {story.link_url && (
                                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Lihat Detail <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default StoryFeed;
