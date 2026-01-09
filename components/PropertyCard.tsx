
import React from 'react';
import { Property, PropertyType } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const formatPrice = (price: number) => {
  if (price >= 1000000000) return `Rp ${(price / 1000000000).toFixed(1)} Miliar`.replace('.', ',');
  if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(0)} Juta`;
  return `Rp ${price.toLocaleString('id-ID')}`;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Halo Yeoboland, saya tertarik dengan: ${property.title}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-[40px] overflow-hidden card-reveal cursor-pointer flex flex-col border border-slate-100"
    >
      {/* Cinematic Surface */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover img-scale"
        />

        {/* High-End Badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="bg-white/95 backdrop-blur-md text-[#020617] text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
            {property.type}
          </span>
          {property.isFeatured && (
            <span className="bg-[#020617] text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
              Exclusive
            </span>
          )}
        </div>

        {/* Floating Price */}
        <div className="absolute bottom-6 left-6">
          <div className="bg-white px-5 py-2.5 rounded-2xl shadow-xl flex flex-col">
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">Price Guide</span>
            <span className="text-xl font-extrabold text-[#020617] tracking-tight">{formatPrice(property.price)}</span>
          </div>
        </div>
      </div>

      {/* Content Architecture */}
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-extrabold text-[#020617] mb-3 leading-tight tracking-tight line-clamp-2 min-h-[4rem] group-hover:text-emerald-600 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest mb-10">
          <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="truncate">{property.location}</span>
        </div>

        {/* Technical Specification Matrix */}
        <div className="grid grid-cols-3 gap-6 py-8 border-t border-slate-50 mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest mb-1.5">Area</span>
            <span className="text-base font-extrabold text-[#020617]">{property.landArea} <span className="text-[10px] text-slate-400 font-medium">m²</span></span>
          </div>
          <div className="flex flex-col border-x border-slate-50 px-6">
            <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest mb-1.5">Build</span>
            <span className="text-base font-extrabold text-[#020617]">{property.buildingArea || '-'} <span className="text-[10px] text-slate-400 font-medium">m²</span></span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest mb-1.5">Beds</span>
            <span className="text-base font-extrabold text-[#020617]">{property.bedrooms || '-'}</span>
          </div>
        </div>

        {/* Final CTA Action */}
        <div className="mt-2">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#020617] hover:bg-black text-white font-black text-[10px] uppercase tracking-widest py-5 rounded-[22px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl"
          >
            Konsultasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
