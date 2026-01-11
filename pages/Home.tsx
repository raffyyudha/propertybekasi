
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Property, SearchFilters } from '../types';
// import { MOCK_PROPERTIES } from '../constants'; // Deprecated
import { supabase } from '../lib/supabaseClient';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import CompactPropertyCard from '../components/CompactPropertyCard';
import StoryFeed from '../components/StoryFeed';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
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
            <section id="selected-portfolio" className="max-w-[1600px] mx-auto px-4 md:px-10 pt-0 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-32 gap-10 hidden"></div>

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
                        <h3 className="text-xl md:text-3xl font-extrabold text-[#020617] mb-6 tracking-tight">{t('home.emptyCatalog')}</h3>
                        <p className="text-slate-400 font-medium max-w-md mx-auto leading-relaxed mb-12 px-4">
                            {t('home.emptyDescription')}
                        </p>
                        <button
                            onClick={() => setFilters({ query: '', type: '', minPrice: '', maxPrice: '' })}
                            className="bg-[#020617] text-white font-black text-[10px] uppercase tracking-widest px-14 py-6 rounded-full shadow-2xl transition-all active:scale-95"
                        >
                            {t('home.showAll')}
                        </button>
                    </div>
                )}
            </section>

        </>
    );
};

export default Home;
