
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GUIDE_ARTICLES } from '../constants';

const GuideDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const guide = GUIDE_ARTICLES.find(g => g.id === Number(id));

    if (!guide) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Artikel Tidak Ditemukan</h2>
                <button
                    onClick={() => navigate('/guides')}
                    className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                >
                    Kembali ke Panduan
                </button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-40 min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative h-[400px] w-full bg-slate-900 mb-10 md:mb-20">
                <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 inline-block">
                            {guide.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                            {guide.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                {guide.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {guide.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {guide.readTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-6 md:px-10">
                <div
                    className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-emerald-500 hover:prose-a:text-emerald-600"
                    dangerouslySetInnerHTML={{ __html: guide.content || '<p>Konten artikel sedang disiapkan. Silakan hubungi kami untuk informasi lebih lanjut.</p>' }}
                />

                <div className="mt-20 pt-10 border-t border-slate-200">
                    <h3 className="text-2xl font-bold mb-6">Bagikan Artikel Ini</h3>
                    <div className="flex gap-4">
                        {['Facebook', 'Twitter', 'WhatsApp', 'LinkedIn'].map((social) => (
                            <button key={social} className="px-6 py-3 rounded-full border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm">
                                {social}
                            </button>
                        ))}
                    </div>
                </div>
            </article>

            {/* Related Articles */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 mt-32">
                <h2 className="text-3xl font-bold mb-10 text-slate-900">Artikel Terkait</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {GUIDE_ARTICLES.filter(g => g.id !== guide.id).slice(0, 3).map(related => (
                        <div
                            key={related.id}
                            onClick={() => navigate(`/guides/${related.id}`)}
                            className="cursor-pointer group"
                        >
                            <div className="aspect-video rounded-xl overflow-hidden mb-4">
                                <img src={related.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={related.title} />
                            </div>
                            <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">{related.title}</h4>
                            <p className="text-sm text-slate-500">{related.date} • {related.readTime}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => navigate('/guides')}
                        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Daftar Panduan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuideDetail;
