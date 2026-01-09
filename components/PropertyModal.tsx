
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
        <div className="w-full md:w-2/5 flex flex-col bg-white h-full relative">
          <div className="overflow-y-auto flex-1 p-6 md:p-8 custom-scrollbar">

            {/* Header Info */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{property.type}</span>
                {(property.certificate || (property as any).certificate) && <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{property.certificate || (property as any).certificate}</span>}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{property.title}</h2>
              <div className="flex items-center text-gray-500 text-sm font-medium mb-4">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {property.location}
              </div>

              <div className="mt-2">
                <div className="text-3xl font-black text-gray-900">
                  {formatCurrency(property.price)}
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">
                  Cicilan mulai ~{formatCurrency(Math.floor(property.price * 0.006)).replace('Rp', 'Rp ')} / bulan
                </div>
              </div>
            </div>

            {/* Key Specs Row */}
            <div className="grid grid-cols-4 gap-2 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-center">
                <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">LT</div>
                <div className="font-bold text-gray-800">{property.landArea || (property as any).land_area || 0}m²</div>
              </div>
              <div className="text-center border-l border-gray-200">
                <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">LB</div>
                <div className="font-bold text-gray-800">{property.buildingArea || (property as any).building_area || 0}m²</div>
              </div>
              <div className="text-center border-l border-gray-200">
                <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">KT</div>
                <div className="font-bold text-gray-800">{property.bedrooms}</div>
              </div>
              <div className="text-center border-l border-gray-200">
                <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">KM</div>
                <div className="font-bold text-gray-800">{property.bathrooms}</div>
              </div>
            </div>

            {/* Detail List */}
            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4 border-l-4 border-emerald-500 pl-3">Detail Properti</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Tipe Properti</span>
                  <span className="font-semibold text-gray-900">{property.type}</span>
                </div>
                {property.floors && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Jumlah Lantai</span>
                    <span className="font-semibold text-gray-900">{property.floors}</span>
                  </div>
                )}
                {property.electricity && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Daya Listrik</span>
                    <span className="font-semibold text-gray-900">{property.electricity} Watt</span>
                  </div>
                )}
                {property.water && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Sumber Air</span>
                    <span className="font-semibold text-gray-900">{property.water}</span>
                  </div>
                )}
                {property.orientation && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Arah Hadap</span>
                    <span className="font-semibold text-gray-900">{property.orientation}</span>
                  </div>
                )}
                {property.furniture && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Perabotan</span>
                    <span className="font-semibold text-gray-900">{property.furniture}</span>
                  </div>
                )}
                {(property.yearBuilt || (property as any).year_built) && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Tahun Bangun</span>
                    <span className="font-semibold text-gray-900">{property.yearBuilt || (property as any).year_built}</span>
                  </div>
                )}
                {property.carport && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Carport</span>
                    <span className="font-semibold text-gray-900">{property.carport} Mobil</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mortgage Calculator Simulator */}
            <div className="mb-8 p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 36v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                Simulasi KPR
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-blue-800">
                  <span>Harga Properti</span>
                  <span className="font-bold">{formatCurrency(property.price)}</span>
                </div>
                <div className="flex justify-between items-center text-blue-800">
                  <span>Uang Muka (20%)</span>
                  <span className="font-bold">{formatCurrency(property.price * 0.2)}</span>
                </div>
                <div className="flex justify-between items-center text-blue-800">
                  <span>Bunga (Est. 8%)</span>
                  <span className="font-bold">8% / tahun</span>
                </div>
                <div className="h-px bg-blue-200 my-2"></div>
                <div className="flex justify-between items-center text-lg font-black text-blue-700">
                  <span>Angsuran per Bulan</span>
                  <span>~ {formatCurrency(Math.floor(property.price * 0.006))}</span>
                </div>
                <p className="text-[10px] text-blue-400 mt-2">*Hanya estimasi (Tenor 15 thn). Hubungi kami untuk hitungan akurat.</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-3 border-l-4 border-emerald-500 pl-3">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {property.description}
              </p>
            </div>

          </div>

          {/* Fixed Bottom Action Bar */}
          <div className="p-4 border-t border-gray-100 bg-white z-10 sticky bottom-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#020617] rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">Y</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-emerald-600 uppercase">Official Listing</p>
                <p className="font-bold text-gray-900 text-sm truncate">{BRAND_NAME}</p>
              </div>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.667-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              <span>Chat WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
