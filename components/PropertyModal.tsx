
import React, { useState } from 'react';
import { Property } from '../types';
import { WHATSAPP_NUMBER, BRAND_NAME } from '../constants';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const handleWhatsApp = () => {
    const message = `Halo Yeoboland, saya ingin konsultasi lebih lanjut tentang properti "${property.title}" di ${property.location}. Mohon infonya.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-5xl h-[90vh] md:h-[600px] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-3/5 bg-gray-100 h-72 md:h-full relative shrink-0">
          <div className="h-full relative flex flex-col">
            <div className="flex-grow relative">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            {property.images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto bg-black/20 absolute bottom-0 left-0 right-0 backdrop-blur-sm">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-60'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col md:overflow-y-auto md:h-full bg-white">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{property.type}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-1">{property.title}</h2>
            <p className="text-gray-500 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {property.location}
            </p>
          </div>

          <div className="text-3xl font-black text-blue-600 mb-8">
            {formatCurrency(property.price)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Luas Tanah</div>
              <div className="text-lg font-bold">{property.landArea} m²</div>
            </div>
            {property.buildingArea > 0 && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Luas Bangunan</div>
                <div className="text-lg font-bold">{property.buildingArea} m²</div>
              </div>
            )}
            {property.bedrooms && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Kamar Tidur</div>
                <div className="text-lg font-bold">{property.bedrooms}</div>
              </div>
            )}
            {property.bathrooms && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Kamar Mandi</div>
                <div className="text-lg font-bold">{property.bathrooms}</div>
              </div>
            )}
            {property.floors && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Jumlah Lantai</div>
                <div className="text-lg font-bold">{property.floors}</div>
              </div>
            )}
            {property.carport && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Carport</div>
                <div className="text-lg font-bold">{property.carport} Mobil</div>
              </div>
            )}
            {property.electricity && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Listrik</div>
                <div className="text-lg font-bold">{property.electricity} Watt</div>
              </div>
            )}
            {property.water && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Sumber Air</div>
                <div className="text-lg font-bold">{property.water}</div>
              </div>
            )}
            {property.orientation && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Arah Hadap</div>
                <div className="text-lg font-bold">{property.orientation}</div>
              </div>
            )}
            {property.certificate && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Legalitas</div>
                <div className="text-lg font-bold">{property.certificate}</div>
              </div>
            )}
            {property.furniture && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Kondisi</div>
                <div className="text-lg font-bold">{property.furniture}</div>
              </div>
            )}
            {property.yearBuilt && (
              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Tahun Bangun</div>
                <div className="text-lg font-bold">{property.yearBuilt}</div>
              </div>
            )}
          </div>

          <div className="mb-10">
            <h3 className="font-bold text-gray-800 mb-3">Deskripsi Properti</h3>
            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div className="mt-auto space-y-3">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">Y</div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">Agen Terverifikasi</p>
                <p className="font-bold text-gray-800">{BRAND_NAME} Official</p>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-100 transition-all"
            >
              Hubungi via WhatsApp
            </button>
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Ditangani langsung oleh Yeoboland
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
