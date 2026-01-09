import React from 'react';
import { Property } from '../types';

interface CompactPropertyCardProps {
    property: Property;
    onClick: () => void;
}

const formatPriceCompact = (price: number) => {
    if (price >= 1000000000) return `Rp ${(price / 1000000000).toFixed(1)} Miliar`.replace('.', ',');
    if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(0)} Juta`;
    return `Rp ${price.toLocaleString('id-ID')}`;
};

const CompactPropertyCard: React.FC<CompactPropertyCardProps> = ({ property, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] bg-slate-100">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                {property.isPromo && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                        Promo
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col flex-grow">
                <div className="mb-1">
                    <span className="text-blue-700 font-bold text-base block">
                        {formatPriceCompact(property.price)}
                    </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug mb-1 min-h-[2.5em]">
                    {property.title}
                </h3>

                <div className="text-xs text-slate-500 mb-3 truncate">
                    {property.location}
                </div>

                {/* Specs Row */}
                <div className="mt-auto flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
                    {property.bedrooms && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            {property.bedrooms}
                        </div>
                    )}
                    {property.bathrooms && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {property.bathrooms}
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <span className="text-slate-400">LT:</span> {property.landArea}m²
                    </div>
                    {property.buildingArea > 0 && (
                        <div className="flex items-center gap-1">
                            <span className="text-slate-400">LB:</span> {property.buildingArea}m²
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompactPropertyCard;
