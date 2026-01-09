import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchArticle(id);
    }, [id]);

    const fetchArticle = async (articleId: string) => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', articleId)
            .single();

        if (!error && data) {
            setArticle(data);
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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
    );

    if (!article) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <p className="text-xl font-bold text-slate-400">Artikel tidak ditemukan.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <button
                    onClick={() => navigate('/articles')}
                    className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-emerald-500 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Articles
                </button>

                <div className="mb-6 flex items-center gap-4">
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                        {article.category}
                    </span>
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{formatDate(article.created_at)}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-[#020617] mb-8 leading-tight">
                    {article.title}
                </h1>

                <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-8">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {article.author ? article.author[0] : 'A'}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-[#020617]">By {article.author || 'YeoboLand Team'}</p>
                        <p className="text-xs text-slate-400 font-medium">Editor Choice</p>
                    </div>
                </div>

                {article.image && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <div
                    className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#020617] prose-p:text-slate-600 prose-img:rounded-2xl prose-a:text-emerald-600"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>

            </div>
        </div>
    );
};

export default ArticleDetail;
