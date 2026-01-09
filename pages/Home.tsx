
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Property, SearchFilters } from '../types';
// import { MOCK_PROPERTIES } from '../constants'; // Deprecated
import { supabase } from '../lib/supabaseClient';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import CompactPropertyCard from '../components/CompactPropertyCard';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filters, setFilters] = useState<SearchFilters>({
        query: '',
        type: '',
        minPrice: '',
        maxPrice: ''
    });
    // const [selectedProperty, setSelectedProperty] = useState<Property | null>(null); // Removed
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q') || '';
        const type = params.get('type') || '';
        if (q || type) {
            setFilters(prev => ({ ...prev, query: q, type: type }));
            // Auto-scroll to results on search
            const section = document.getElementById('selected-portfolio');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.search]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            // Map DB columns (snake_case) to Frontend Type (camelCase)
            const mapped: Property[] = data.map((d: any) => ({
                id: d.id,
                title: d.title,
                price: Number(d.price),
                location: d.location,
                type: d.type,
                landArea: d.land_area,
                buildingArea: d.building_area,
                bedrooms: d.bedrooms,
                bathrooms: d.bathrooms,
                images: d.images || [],
                description: d.description,
                isFeatured: d.is_featured,
                isPromo: d.is_promo,
                floors: d.floors,
                carport: d.carport,
                electricity: d.electricity,
                water: d.water,
                orientation: d.orientation,
                certificate: d.certificate,
                furniture: d.furniture,
                yearBuilt: d.year_built,
                mapUrl: d.map_url,
                nearbyAccess: d.nearby_access
            }));
            setProperties(mapped);
        }
    };

    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
            const queryTerms = filters.query.toLowerCase().trim().split(/\s+/);
            const searchableText = `
                ${p.title} 
                ${p.location} 
                ${p.description} 
                ${p.type} 
                ${p.nearbyAccess || ''}
            `.toLowerCase();

            // Check if ALL search terms are present in the searchable text (AND logic)
            // or if the query is empty
            const matchQuery = queryTerms.length === 0 || queryTerms.every(term => searchableText.includes(term));

            const matchType = filters.type ? p.type === filters.type : true;
            const matchMaxPrice = filters.maxPrice ? p.price <= parseInt(filters.maxPrice) : true;
            return matchQuery && matchType && matchMaxPrice;
        });
    }, [filters, properties]);

    const handleSearch = (newFilters: Partial<SearchFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        // Also scroll on manual search from hero
        setTimeout(() => {
            const section = document.getElementById('selected-portfolio');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <>
            <Hero onSearch={handleSearch} filters={filters} />

            {/* Curated Collection Section */}
            <section id="selected-portfolio" className="max-w-[1600px] mx-auto px-4 md:px-10 py-16 md:py-40">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-32 gap-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-6 mb-6 md:mb-10">
                            <span className="h-[1px] w-24 bg-emerald-500"></span>
                            <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">Prime Inventory</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-[90px] font-extrabold text-[#020617] leading-[0.85] tracking-tighter">
                            SELECTED <br />
                            <span className="text-slate-200">PORTFOLIO.</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-end gap-6">
                        {/* New CTA Button */}
                        <button
                            onClick={() => navigate('/special-offers')}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#020617] to-[#1e293b] text-white rounded-full font-bold uppercase tracking-wider text-xs overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <span className="relative z-10">Lihat Penawaran Khusus</span>
                            <svg className="w-4 h-4 text-emerald-400 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>

                        <div className="flex flex-col items-end">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Total Listings</div>
                            <div className="text-6xl font-extrabold text-[#020617] tabular-nums">{filteredProperties.length}</div>
                        </div>
                    </div>
                </div>

                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProperties.map(property => (
                            <CompactPropertyCard
                                key={property.id}
                                property={property}
                                onClick={() => navigate(`/property/${property.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 md:py-40 text-center bg-slate-50 architect-mask border-thin border-slate-100">
                        <div className="text-6xl md:text-[120px] font-black opacity-5 mb-8">EMPTY</div>
                        <h3 className="text-xl md:text-3xl font-extrabold text-[#020617] mb-6 tracking-tight">Katalog Tidak Tersedia</h3>
                        <p className="text-slate-400 font-medium max-w-md mx-auto leading-relaxed mb-12 px-4">
                            Inventory eksklusif kami untuk kriteria ini sedang kosong. Silakan atur ulang filter pencarian Anda.
                        </p>
                        <button
                            onClick={() => setFilters({ query: '', type: '', minPrice: '', maxPrice: '' })}
                            className="bg-[#020617] text-white font-black text-[10px] uppercase tracking-widest px-14 py-6 rounded-full shadow-2xl transition-all active:scale-95"
                        >
                            Tampilkan Semua Unit
                        </button>
                    </div>
                )}
            </section>

            {/* Expertise: The Platinum Standard (Beyond The Sale) */}
            <section className="bg-[#020617] py-20 md:py-40 text-white relative overflow-hidden">
                {/* Architectural Blueprint Lines Decor */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="grid grid-cols-12 h-full">
                        {[...Array(12)].map((_, i) => <div key={i} className="border-r border-white h-full"></div>)}
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-4 md:px-10 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-start mb-20 md:mb-40">
                        <div>
                            <div className="flex items-center gap-6 mb-8 md:mb-12">
                                <span className="h-[1px] w-20 bg-emerald-500"></span>
                                <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">The Platinum Standard</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl md:text-[110px] font-extrabold leading-[0.85] tracking-tighter mb-10 md:mb-16">
                                BEYOND <br />
                                THE <span className="text-slate-600">TRANSACTION.</span>
                            </h2>
                            <p className="text-2xl text-slate-400 font-medium max-w-xl leading-relaxed">
                                Layanan kami melampaui jual-beli. Kami adalah konsultan strategis yang memastikan aset Anda memiliki nilai investasi jangka panjang yang aman.
                            </p>
                        </div>
                        <div className="relative pt-20">
                            <div className="architect-mask overflow-hidden aspect-[4/3] bg-slate-800 group shadow-3xl">
                                <img
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                                    alt="Expertise"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-emerald-500/20 architect-mask -z-10 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Expertise Feature Grid */}
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                id: '01',
                                title: 'Precision Compliance',
                                desc: 'Audit hukum menyeluruh untuk setiap sertifikat, IMB, dan PBB sebelum dipublikasikan.',
                                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                            },
                            {
                                id: '02',
                                title: 'White-Glove Concierge',
                                desc: 'Layanan penjemputan survei dan pendampingan notaris personal untuk kenyamanan Anda.',
                                icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
                            },
                            {
                                id: '03',
                                title: 'Market Intelligence',
                                desc: 'Analisis data real-time mengenai tren harga properti di Bekasi untuk keputusan investasi tepat.',
                                icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                            }
                        ].map((item) => (
                            <div key={item.id} className="group p-12 bg-white/5 backdrop-blur-3xl rounded-[60px] border border-white/5 hover:bg-emerald-500 hover:border-emerald-400 transition-all duration-700 relative overflow-hidden">
                                <div className="absolute top-10 right-10 text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">{item.id}</div>
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors">
                                    <svg className="w-7 h-7 text-white group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} /></svg>
                                </div>
                                <h4 className="text-3xl font-extrabold mb-6 tracking-tight group-hover:text-white">{item.title}</h4>
                                <p className="text-slate-400 font-medium leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
