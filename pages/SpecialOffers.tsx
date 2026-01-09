import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Property } from '../types';
import CompactPropertyCard from '../components/CompactPropertyCard';
import PropertyModal from '../components/PropertyModal';


const SpecialOffers: React.FC = () => {
    // const promoProperties = MOCK_PROPERTIES.filter(p => p.isPromo);
    const [promoProperties, setPromoProperties] = useState<Property[]>([]);

    useEffect(() => {
        fetchPromos();
    }, []);

    const fetchPromos = async () => {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('is_promo', true)
            .order('created_at', { ascending: false });

        if (!error && data) {
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
                yearBuilt: d.year_built
            }));
            setPromoProperties(mapped);
        }
    };
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    return (
        <div className="pt-28 pb-40 min-h-screen bg-slate-50">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        Rekomendasi Sesuai Pencarianmu
                    </h1>
                    <p className="text-sm text-slate-500">
                        Properti pilihan dengan penawaran terbaik minggu ini.
                    </p>
                </div>

                {promoProperties.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {promoProperties.map(property => (
                            <CompactPropertyCard
                                key={property.id}
                                property={property}
                                onClick={() => setSelectedProperty(property)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white border border-slate-200 rounded-lg">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Promo Saat Ini</h3>
                        <p className="text-slate-500 text-sm">Silakan cek kembali nanti untuk penawaran menarik lainnya.</p>
                    </div>
                )}
            </div>

            {selectedProperty && (
                <PropertyModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                />
            )}
        </div>
    );
};

export default SpecialOffers;
