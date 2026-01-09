
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Property, PropertyType } from '../../types';
import { convertImageToWebP } from '../../utils/imageConverter';

const PropertyManager: React.FC = () => {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProperty, setCurrentProperty] = useState<Partial<any>>({});
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching properties:', error);
        } else {
            setProperties(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus properti ini?')) return;

        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Gagal menghapus properti: ' + error.message);
        } else {
            fetchProperties();
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!currentProperty.title || !currentProperty.price) {
            alert('Judul dan Harga wajib diisi');
            return;
        }

        const payload = {
            title: currentProperty.title,
            price: Number(currentProperty.price),
            location: currentProperty.location,
            type: currentProperty.type,
            land_area: Number(currentProperty.land_area || currentProperty.landArea || 0),
            building_area: Number(currentProperty.building_area || currentProperty.buildingArea || 0),
            bedrooms: Number(currentProperty.bedrooms || 0),
            bathrooms: Number(currentProperty.bathrooms || 0),
            images: currentProperty.images || [],
            description: currentProperty.description,
            floors: Number(currentProperty.floors || 1),
            carport: Number(currentProperty.carport || 0),
            electricity: Number(currentProperty.electricity || 1300),
            water: currentProperty.water,
            orientation: currentProperty.orientation,
            certificate: currentProperty.certificate,
            furniture: currentProperty.furniture,
            year_built: Number(currentProperty.year_built || currentProperty.yearBuilt || new Date().getFullYear()),
            is_featured: currentProperty.is_featured || false,
            is_promo: currentProperty.is_promo || false,
            map_url: currentProperty.mapUrl || currentProperty.map_url,
            nearby_access: currentProperty.nearbyAccess || currentProperty.nearby_access
        };

        // Remove undefined keys
        // (Supabase ignores extra keys usually but good to be clean)

        let error;
        if (isEditing && currentProperty.id) {
            const { error: updateError } = await supabase
                .from('properties')
                .update(payload)
                .eq('id', currentProperty.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('properties')
                .insert([payload]);
            error = insertError;
        }

        if (error) {
            alert('Gagal menyimpan: ' + error.message);
        } else {
            setShowModal(false);
            fetchProperties();
            setCurrentProperty({});
        }
    };

    const openModal = (property?: any) => {
        if (property) {
            setIsEditing(true);
            setCurrentProperty(property);
        } else {
            setIsEditing(false);
            setCurrentProperty({
                type: 'Rumah',
                images: [],
                is_featured: false,
                is_promo: false
            });
        }
        setShowModal(true);
    };

    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#020617]">Manajemen Properti</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[#020617] text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                >
                    + Tambah Properti
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Property</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Type</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Price (Rp)</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Status</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading data...</td></tr>
                            ) : properties.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada properti.</td></tr>
                            ) : (
                                properties.map((prop) => (
                                    <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 flex gap-4 items-center">
                                            {prop.images && prop.images[0] ? (
                                                <img src={prop.images[0]} alt={prop.title} className="w-16 h-16 object-cover rounded-lg" />
                                            ) : (
                                                <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400">No Img</div>
                                            )}
                                            <div>
                                                <div className="font-bold text-[#020617]">{prop.title}</div>
                                                <div className="text-xs text-slate-400">{prop.location}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase">{prop.type}</span>
                                        </td>
                                        <td className="p-4 font-mono font-medium text-emerald-600">
                                            {new Intl.NumberFormat('id-ID').format(prop.price)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                {prop.is_promo && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-bold uppercase">Promo</span>}
                                                {prop.is_featured && <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-1 rounded font-bold uppercase">Featured</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => openModal(prop)} className="text-blue-600 hover:underline text-sm font-bold mr-4">Edit</button>
                                            <button onClick={() => handleDelete(prop.id)} className="text-red-500 hover:underline text-sm font-bold">Hapus</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold">{isEditing ? 'Edit Properti' : 'Tambah Properti Baru'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Judul Properti</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    value={currentProperty.title || ''}
                                    onChange={e => setCurrentProperty({ ...currentProperty, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Harga (Rp)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    value={currentProperty.price || ''}
                                    onChange={e => setCurrentProperty({ ...currentProperty, price: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    value={currentProperty.location || ''}
                                    onChange={e => setCurrentProperty({ ...currentProperty, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tipe Properti</label>
                                <select
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    value={currentProperty.type || 'Rumah'}
                                    onChange={e => setCurrentProperty({ ...currentProperty, type: e.target.value })}
                                >
                                    <option value="Rumah">Rumah</option>
                                    <option value="Ruko">Ruko</option>
                                    <option value="Tanah">Tanah</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Gudang">Gudang</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Luas Tanah (m²)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-slate-200 rounded-lg"
                                        value={currentProperty.land_area || currentProperty.landArea || 0}
                                        onChange={e => setCurrentProperty({ ...currentProperty, land_area: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Luas Bangunan (m²)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-slate-200 rounded-lg"
                                        value={currentProperty.building_area || currentProperty.buildingArea || 0}
                                        onChange={e => setCurrentProperty({ ...currentProperty, building_area: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Kamar Tidur</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-slate-200 rounded-lg"
                                        value={currentProperty.bedrooms || 0}
                                        onChange={e => setCurrentProperty({ ...currentProperty, bedrooms: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Kamar Mandi</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 border border-slate-200 rounded-lg"
                                        value={currentProperty.bathrooms || 0}
                                        onChange={e => setCurrentProperty({ ...currentProperty, bathrooms: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Detailed Info Section */}
                            <div className="col-span-2 border-t border-slate-100 pt-4 mt-2">
                                <h3 className="font-bold text-slate-800 mb-4">Informasi Detail</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Jumlah Lantai</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.floors || ''}
                                            onChange={e => setCurrentProperty({ ...currentProperty, floors: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Kapasitas Carport</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.carport || ''}
                                            onChange={e => setCurrentProperty({ ...currentProperty, carport: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Listrik (Watt)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.electricity || ''}
                                            onChange={e => setCurrentProperty({ ...currentProperty, electricity: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Tahun Bangun</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.year_built || currentProperty.yearBuilt || ''}
                                            onChange={e => setCurrentProperty({ ...currentProperty, year_built: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Sumber Air</label>
                                        <select
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.water || 'PDAM'}
                                            onChange={e => setCurrentProperty({ ...currentProperty, water: e.target.value })}
                                        >
                                            <option value="PDAM">PDAM</option>
                                            <option value="Jetpump">Air Tanah / Jetpump</option>
                                            <option value="Both">PDAM & Jetpump</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Arah Hadap</label>
                                        <select
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.orientation || 'Utara'}
                                            onChange={e => setCurrentProperty({ ...currentProperty, orientation: e.target.value })}
                                        >
                                            <option value="Utara">Utara</option>
                                            <option value="Selatan">Selatan</option>
                                            <option value="Timur">Timur</option>
                                            <option value="Barat">Barat</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Sertifikat</label>
                                        <select
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.certificate || 'SHM'}
                                            onChange={e => setCurrentProperty({ ...currentProperty, certificate: e.target.value })}
                                        >
                                            <option value="SHM">SHM (Hak Milik)</option>
                                            <option value="HGB">HGB (Guna Bangunan)</option>
                                            <option value="Hak Pakai">Hak Pakai</option>
                                            <option value="Strata Title">Strata Title</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Perabotan</label>
                                        <select
                                            className="w-full p-2 border border-slate-200 rounded text-sm"
                                            value={currentProperty.furniture || 'Unfurnished'}
                                            onChange={e => setCurrentProperty({ ...currentProperty, furniture: e.target.value })}
                                        >
                                            <option value="Unfurnished">Unfurnished</option>
                                            <option value="Semi Furnished">Semi Furnished</option>
                                            <option value="Full Furnished">Full Furnished</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Google Maps Embed URL</label>
                                    <input
                                        type="text"
                                        value={currentProperty.mapUrl || (currentProperty as any).map_url || ''}
                                        onChange={(e) => setCurrentProperty({ ...currentProperty, mapUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="https://www.google.com/maps/embed?..."
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Paste link dari menu 'Embed a map' di Google Maps</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Akses Terdekat</label>
                                    <textarea
                                        value={currentProperty.nearbyAccess || (currentProperty as any).nearby_access || ''}
                                        onChange={(e) => setCurrentProperty({ ...currentProperty, nearbyAccess: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                                        rows={3}
                                        placeholder="Contoh:&#10;Stasiun KRL Cicayur: 2.5km&#10;Aeon Mall: 5km"
                                    />
                                </div>
                            </div>

                            {/* Handling Images - simplified for now with text input for URLs or basic array logic */}
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Foto Properti</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={async (e) => {
                                            if (!e.target.files || e.target.files.length === 0) return;

                                            setUploading(true);
                                            const newImages = [...(currentProperty.images || [])];

                                            for (let i = 0; i < e.target.files.length; i++) {
                                                const originalFile = e.target.files[i];
                                                let fileToUpload = originalFile;

                                                // Convert to WebP if it's an image
                                                if (originalFile.type.startsWith('image/')) {
                                                    try {
                                                        fileToUpload = await convertImageToWebP(originalFile);
                                                        console.log(`Converted ${originalFile.name} to WebP`);
                                                    } catch (err) {
                                                        console.error('WebP conversion failed, falling back to original', err);
                                                    }
                                                }

                                                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`; // Ensure extension is webp (or consistent)
                                                const filePath = `${fileName}`;

                                                const { error: uploadError } = await supabase.storage
                                                    .from('property-images')
                                                    .upload(filePath, fileToUpload);

                                                if (uploadError) {
                                                    alert(`Gagal upload ${fileToUpload.name}: ${uploadError.message}`);
                                                } else {
                                                    const { data: { publicUrl } } = supabase.storage
                                                        .from('property-images')
                                                        .getPublicUrl(filePath);
                                                    newImages.push(publicUrl);
                                                }
                                            }

                                            setCurrentProperty({ ...currentProperty, images: newImages });
                                            setUploading(false);
                                        }}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer block">
                                        {uploading ? (
                                            <span className="text-emerald-500 font-bold">Mengupload...</span>
                                        ) : (
                                            <>
                                                <div className="text-4xl text-slate-300 mb-2">📷</div>
                                                <span className="text-slate-500 font-bold">Klik untuk Pilih Foto</span>
                                                <p className="text-xs text-slate-400 mt-1">Bisa pilih banyak foto sekaligus. Max 2MB per foto.</p>
                                            </>
                                        )}
                                    </label>
                                </div>

                                {currentProperty.images && currentProperty.images.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                        {currentProperty.images.map((img: string, idx: number) => (
                                            <div key={idx} className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden">
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImgs = currentProperty.images.filter((_: any, i: number) => i !== idx);
                                                        setCurrentProperty({ ...currentProperty, images: newImgs });
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                                {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1">Cover</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi</label>
                                <textarea
                                    className="w-full p-3 border border-slate-200 rounded-lg h-32"
                                    value={currentProperty.description || ''}
                                    onChange={e => setCurrentProperty({ ...currentProperty, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="col-span-2 flex gap-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                                        checked={currentProperty.is_promo || false}
                                        onChange={e => setCurrentProperty({ ...currentProperty, is_promo: e.target.checked })}
                                    />
                                    <span className="font-bold text-slate-700">Set sebagai PROMO (Special Offers)</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                                        checked={currentProperty.is_featured || false}
                                        onChange={e => setCurrentProperty({ ...currentProperty, is_featured: e.target.checked })}
                                    />
                                    <span className="font-bold text-slate-700">Featured Property (Home)</span>
                                </label>
                            </div>

                            <div className="col-span-2 pt-6 border-t border-slate-100 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#020617] text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg"
                                >
                                    Simpan Properti
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyManager;
