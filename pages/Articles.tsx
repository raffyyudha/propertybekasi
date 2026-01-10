import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Articles: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setArticles(data);
        }
        setLoading(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-[1600px] mx-auto px-10">
                <div className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <span className="h-[1px] w-24 bg-emerald-500"></span>
                        <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">{t('articles.tagline')}</span>
                    </div>
                    <h2 className="text-6xl md:text-[90px] font-extrabold text-[#020617] leading-[0.85] tracking-tighter">
                        {t('articles.title1')} <br />
                        <span className="text-slate-200">{t('articles.title2')}</span>
                    </h2>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400 font-bold">{t('articles.loading')}</div>
                ) : articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {articles.map(article => (
                            <div key={article.id} className="group cursor-pointer" onClick={() => navigate(`/articles/${article.id}`)}>
                                <div className="aspect-[4/3] bg-slate-100 mb-8 overflow-hidden rounded-[2rem] relative">
                                    <img
                                        src={article.image || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200"}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{article.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span>{formatDate(article.created_at)}</span>
                                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                    <span>{t('articles.by')} {article.author || 'YeoboLand'}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#020617] leading-tight group-hover:text-emerald-500 transition-colors mb-4 line-clamp-2">
                                    {article.title}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#020617] group-hover:gap-4 transition-all">
                                    {t('articles.readArticle')}
                                    <span className="h-[1px] w-8 bg-[#020617]"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl opacity-10 font-black mb-4">{t('articles.emptyTitle')}</div>
                        <p className="text-slate-500 font-bold">{t('articles.emptyText')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Articles;
