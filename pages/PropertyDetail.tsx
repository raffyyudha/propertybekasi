import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabaseClient';
import { Property } from '../types';
import { WHATSAPP_NUMBER, BRAND_NAME } from '../constants';

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const openLightbox = (index: number) => {
        setActiveImage(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (property) {
            setActiveImage((prev) => (prev + 1) % property.images.length);
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (property) {
            setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
        }
    };

    // Swipe Handling for Mobile Lightbox
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        }
        if (isRightSwipe) {
            prevImage();
        }
    };

    // KPR Calculator State
    const [dpPercentage, setDpPercentage] = useState(10);
    const [tenor, setTenor] = useState(15);
    const [interestRate, setInterestRate] = useState(8);

    // Appointment State
    const [visitDate, setVisitDate] = useState('');
    const [visitNote, setVisitNote] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;
            const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
            if (data && !error) {
                // Map snake_case to Property interface
                const mapped: Property = {
                    ...data,
                    landArea: data.land_area || data.landArea,
                    buildingArea: data.building_area || data.buildingArea,
                    yearBuilt: data.year_built || data.yearBuilt,
                    mapUrl: data.map_url || data.mapUrl,
                    nearbyAccess: data.nearby_access || data.nearbyAccess,
                    electricity: data.electricity,
                    water: data.water,
                    floors: data.floors,
                    carport: data.carport,
                    orientation: data.orientation,
                    furniture: data.furniture,
                    certificate: data.certificate,
                    price: Number(data.price),
                    isFeatured: data.is_featured,
                    isPromo: data.is_promo,
                };
                setProperty(mapped);
            }
            setLoading(false);
        };
        fetchProperty();
    }, [id]);

    const formatCurrency = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

    const calculateKPR = () => {
        if (!property) return 0;
        const dpAmount = property.price * (dpPercentage / 100);
        const loanAmount = property.price - dpAmount;
        const monthlyRate = (interestRate / 100) / 12;
        const months = tenor * 12;
        const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        return Math.round(monthlyPayment);
    };

    const handleWhatsApp = (type: 'kpr' | 'visit' | 'general') => {
        if (!property) return;
        let message = '';

        // Helper to replace placeholders
        const replaceParams = (text: string, params: Record<string, string | number>) => {
            let res = text;
            for (const [key, value] of Object.entries(params)) {
                res = res.replace(`{${key}}`, String(value));
            }
            return res;
        };

        if (type === 'kpr') {
            const template = t('wa.kpr');
            message = replaceParams(template, {
                brand: BRAND_NAME,
                title: property.title,
                id: property.id,
                price: formatCurrency(property.price),
                dp: dpPercentage,
                tenor: tenor
            });
        } else if (type === 'visit') {
            const template = t('wa.visit');
            message = replaceParams(template, {
                brand: BRAND_NAME,
                title: property.title,
                id: property.id,
                date: visitDate || 'Not specified',
                note: visitNote || '-',
            });
        } else {
            const template = t('wa.general');
            message = replaceParams(template, {
                brand: BRAND_NAME,
                title: property.title,
                id: property.id,
                location: property.location,
            });
        }
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    };

    /**
     * Otomatis mengkonversi link Google Maps biasa/pendek menjadi format Embed
     */
    const getSmartMapUrl = (inputUrl: string) => {
        if (!inputUrl) return '';

        let cleanUrl = inputUrl;
        // 0. Cleanup iframe tags
        if (inputUrl.includes('<iframe')) {
            const srcMatch = inputUrl.match(/src="([^"]+)"/);
            if (srcMatch) cleanUrl = srcMatch[1];
        }

        // 1. Direct Embed Support
        if (cleanUrl.includes('/embed') || cleanUrl.includes('output=embed')) {
            return cleanUrl;
        }

        // 2. Coordinate Extraction (Most Reliable)
        const coordsMatch = cleanUrl.match(/@(-?[\d\.]+),(-?[\d\.]+)/);
        if (coordsMatch) {
            const lat = coordsMatch[1];
            const lng = coordsMatch[2];
            return `https://maps.google.com/maps?q=${lat},${lng}&hl=id&z=14&output=embed`;
        }

        // 3. Search Query Extraction via 'q' param
        if (cleanUrl.includes('?q=')) {
            const query = cleanUrl.split('?q=')[1].split('&')[0];
            return `https://maps.google.com/maps?q=${query}&hl=id&z=14&output=embed`;
        }

        // 4. Place Name via path
        if (cleanUrl.includes('/maps/place/')) {
            const parts = cleanUrl.split('/maps/place/');
            if (parts[1]) {
                let query = parts[1].split('/')[0];
                query = query.replace(/\+/g, ' ');
                return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=id&z=14&output=embed`;
            }
        }

        // 5. Short Link / Unknown - DO NOT TRY TO EMBED blindly.
        // Returning the original URL signals 'isEmbeddable = false', triggering the fallback button.
        return cleanUrl;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;
    if (!property) return null;

    const embedUrl = getSmartMapUrl(property.mapUrl);
    // Strict check: It is only embeddable if our function successfully converted it to an embed URL.
    const isEmbeddable = embedUrl.includes('output=embed') || embedUrl.includes('/embed');

    return (
        <div className="pt-28 pb-20 min-h-screen bg-white text-[#333]">
            {/* Back Button */}
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-6 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">Kembali</span>
                </button>
            </div>


            {/* Gallery Section */}
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
                    {/* Main Image */}
                    <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
                        <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                        <div className="absolute top-4 left-4 flex gap-2">
                            {property.isFeatured && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">{t('prop.hotDeals')}</span>}
                            <span className="bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded uppercase border border-gray-200">{property.type}</span>
                        </div>

                        {/* Mobile Photo Count Indicator - Only visible on Mobile */}
                        {property.images.length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm md:hidden flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                1/{property.images.length}
                            </div>
                        )}
                    </div>
                    {/* Side Images */}
                    {property.images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden cursor-pointer group hidden md:block" onClick={() => openLightbox(idx + 1)}>
                            <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={`Side ${idx}`} />
                            {idx === 3 && property.images.length > 5 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                                    +{property.images.length - 5} {t('prop.morePhotos')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column (Details) */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Title & Address */}
                        <div className="border-b border-gray-100 pb-8">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{property.title}</h1>
                            <div className="flex items-start text-gray-500 text-sm md:text-base">
                                <svg className="w-5 h-5 mr-2 mt-0.5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {property.location}
                            </div>
                        </div>

                        {/* Icons/Specs Bar - Like Pashouses */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-gray-100">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">{property.landArea} m²</span>
                                <span className="text-sm text-gray-500">{t('prop.landArea')}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">{property.buildingArea} m²</span>
                                <span className="text-sm text-gray-500">{t('prop.buildingArea')}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">{property.bathrooms}</span>
                                <span className="text-sm text-gray-500">{t('prop.bathrooms')}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">{property.bedrooms}</span>
                                <span className="text-sm text-gray-500">{t('prop.bedrooms')}</span>
                            </div>
                        </div>

                        {/* Benefits Grid */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-xl text-gray-900">{t('prop.benefits')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <div>
                                        <p className="font-bold text-gray-900">{t('prop.benefit1Title')}</p>
                                        <p className="text-xs text-gray-500">{t('prop.benefit1Desc')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <div>
                                        <p className="font-bold text-gray-900">{t('prop.benefit2Title')}</p>
                                        <p className="text-xs text-gray-500">{t('prop.benefit2Desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Accordion Style Details */}
                        <div className="space-y-8">
                            {/* Spesifikasi Bangunan */}
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-4">{t('prop.buildingSpec')}</h3>
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.floors')}</span> <span className="font-medium text-gray-900">{property.floors || '-'}</span></div>
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.yearBuilt')}</span> <span className="font-medium text-gray-900">{property.yearBuilt || '-'}</span></div>
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.maidBath')}</span> <span className="font-medium text-gray-900">-</span></div>
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.maidBed')}</span> <span className="font-medium text-gray-900">-</span></div>
                                </div>
                            </div>

                            {/* Spesifikasi Tambahan */}
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-4">{t('prop.additionalSpec')}</h3>
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.electricity')}</span> <span className="font-medium text-gray-900">{property.electricity} Watt</span></div>
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.water')}</span> <span className="font-medium text-gray-900">{property.water || '-'}</span></div>
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.orientation')}</span> <span className="font-medium text-gray-900">{property.orientation || '-'}</span></div>
                                    <div className="text-sm"><span className="text-gray-500 block mb-1">{t('prop.certificate')}</span> <span className="font-medium text-gray-900">{property.certificate || '-'}</span></div>
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-4">{t('prop.description')}</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                    {property.description}
                                </p>
                            </div>

                            {/* KPR Calculator */}
                            <div className="bg-white border rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-xl text-gray-900 mb-6">{t('prop.kprCalculator')}</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900">{t('prop.propertyPrice')}</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(property.price)}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-full">
                                            <label className="text-xs text-gray-500 mb-1 block">{t('prop.dp')}</label>
                                            <div className="flex border rounded-lg overflow-hidden">
                                                <input type="number" value={dpPercentage} onChange={e => setDpPercentage(Number(e.target.value))} className="w-16 px-3 py-2 text-center text-sm font-bold border-r outline-none" />
                                                <div className="flex-1 bg-gray-50 px-3 py-2 text-sm text-gray-500 flex items-center justify-between">
                                                    <span>%</span>
                                                    <span className="font-bold text-gray-900">{formatCurrency(property.price * (dpPercentage / 100))}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label className="text-xs text-gray-500 mb-1 block">{t('prop.tenor')}</label>
                                            <select value={tenor} onChange={e => setTenor(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm font-bold outline-none bg-white">
                                                {[5, 10, 15, 20, 25].map(t_val => <option key={t_val} value={t_val}>{t_val} {t('prop.years')}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-orange-50 rounded-lg p-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('prop.estimatedInstallment')}</p>
                                        <p className="text-xl font-bold text-orange-600">{formatCurrency(calculateKPR()).replace(',00', '')}<span className="text-xs font-normal text-gray-500 ml-1">{t('prop.perMonth')}</span></p>
                                    </div>
                                    <button onClick={() => handleWhatsApp('kpr')} className="text-orange-600 text-sm font-bold border border-orange-600 rounded-lg px-4 py-2 hover:bg-orange-50">{t('prop.simulationDetail')}</button>
                                </div>
                            </div>

                            {/* Location Map */}
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-4">{t('prop.location')}</h3>
                                <div className="rounded-xl overflow-hidden h-[300px] bg-gray-100 relative">
                                    {property.mapUrl ? (
                                        isEmbeddable ? (
                                            <iframe
                                                src={embedUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-center p-6">
                                                <p className="text-gray-500 mb-4 text-sm">Pratinjau peta tidak tersedia untuk link pendek.</p>
                                                <a
                                                    href={property.mapUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="bg-white border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                                >
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    Buka di Google Maps
                                                </a>
                                            </div>
                                        )
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">{t('prop.mapUnavailable')}</div>
                                    )}
                                </div>
                            </div>

                            {/* Nearby Access */}
                            {property.nearbyAccess && (
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-4 border-b pb-4">{t('prop.nearbyAccess')}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {property.nearbyAccess.split('\n').map((access, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                                <span className="text-sm text-gray-600">{access}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reviews Section Placeholder - as per screenshot */}
                            <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-6">{t('prop.reviews')}</h3>
                                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">{t('prop.noReviews')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky Sidebar) */}
                    <div className="lg:col-span-4 ps-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Price Card */}
                            <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-6 border border-gray-100">
                                <p className="text-sm font-bold text-gray-500 mb-1">{t('prop.price')}</p>
                                <h2 className="text-3xl font-bold text-orange-600 mb-1">{formatCurrency(property.price)}</h2>
                                <p className="text-xs text-gray-400 mb-6">{t('prop.installmentStart')} {formatCurrency(Math.floor(property.price * 0.0055)).split(',')[0]}{t('prop.perMonth')}</p>

                                <div className="text-[10px] text-gray-500 bg-gray-50 p-2 rounded mb-6 flex gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {t('prop.freeFees')}
                                </div>

                                <button
                                    onClick={() => handleWhatsApp('general')}
                                    className="w-full bg-[#D85628] hover:bg-[#c24b22] text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all mb-4"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    {t('prop.contactUs')}
                                </button>
                            </div>

                            {/* Visit Scheduler Card */}
                            <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4">{t('prop.scheduleVisit')}</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">{t('prop.pickDate')}</label>
                                        <input
                                            type="date"
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500"
                                            value={visitDate}
                                            onChange={(e) => setVisitDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1 block">{t('prop.note')}</label>
                                        <textarea
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500"
                                            placeholder={t('prop.notePlaceholder')}
                                            rows={2}
                                            value={visitNote}
                                            onChange={(e) => setVisitNote(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button
                                        onClick={() => handleWhatsApp('visit')}
                                        className="w-full bg-white border border-[#D85628] text-[#D85628] font-bold py-3 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {t('prop.scheduleButton')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 touch-none"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Close Button - Enhanced */}
                    <button onClick={closeLightbox} className="absolute top-6 right-6 z-[110] p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm">
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <button onClick={prevImage} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2 md:p-4 hover:bg-white/10 rounded-full transition-all bg-black/20 backdrop-blur-sm md:bg-transparent">
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button onClick={nextImage} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2 md:p-4 hover:bg-white/10 rounded-full transition-all bg-black/20 backdrop-blur-sm md:bg-transparent">
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Mobile Tap Areas - Adjusted to not cover close button */}
                    <div className="absolute inset-y-20 left-0 w-1/4 z-40 md:hidden" onClick={prevImage} />
                    <div className="absolute inset-y-20 right-0 w-1/4 z-40 md:hidden" onClick={nextImage} />

                    <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center pointer-events-none">
                        <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                            <img
                                src={property.images[activeImage]}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                alt={`Gallery ${activeImage + 1}`}
                            />
                        </div>
                        <div className="mt-6 flex gap-2 overflow-x-auto max-w-full pb-2 px-2 scrollbar-none pointer-events-auto w-full justify-center">
                            {property.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setActiveImage(idx); }}
                                    className={`relative flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-orange-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                                </button>
                            ))}
                        </div>
                        <div className="text-white/80 font-medium text-sm mt-4 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            {activeImage + 1} / {property.images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetail;
