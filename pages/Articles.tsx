
import React from 'react';

const Articles: React.FC = () => {
    const articles = [
        {
            id: 1,
            title: "Tren Investasi Properti Bekasi 2024",
            category: "Market Insight",
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200",
            date: "Oct 12, 2024"
        },
        {
            id: 2,
            title: "Smart Home: Standar Baru Hunian Mewah",
            category: "Lifestyle",
            image: "https://images.unsplash.com/photo-1558002038-109177381792?auto=format&fit=crop&q=80&w=1200",
            date: "Sep 28, 2024"
        },
        {
            id: 3,
            title: "Panduan Legalitas Properti untuk Ekspatriat",
            category: "Legal",
            image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200",
            date: "Sep 15, 2024"
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-[1600px] mx-auto px-10">
                <div className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <span className="h-[1px] w-24 bg-emerald-500"></span>
                        <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">Insights & News</span>
                    </div>
                    <h2 className="text-6xl md:text-[90px] font-extrabold text-[#020617] leading-[0.85] tracking-tighter">
                        LATEST <br />
                        <span className="text-slate-200">ARTICLES.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map(article => (
                        <div key={article.id} className="group cursor-pointer">
                            <div className="aspect-[4/3] bg-slate-100 mb-8 overflow-hidden rounded-[2rem] relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{article.category}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                <span>{article.date}</span>
                                <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                                <span>By YeoboLand</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#020617] leading-tight group-hover:text-emerald-500 transition-colors mb-4">
                                {article.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#020617] group-hover:gap-4 transition-all">
                                Read Article
                                <span className="h-[1px] w-8 bg-[#020617]"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Articles;
