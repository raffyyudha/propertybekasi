import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Story } from '../../types';
import { convertImageToWebP } from '../../utils/imageConverter';

const StoryManager: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStory, setCurrentStory] = useState<Partial<Story>>({});
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('stories')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching stories:', error);
            // Don't show alert on initial load if table doesn't exist yet, just log
        } else {
            setStories(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Hapus story ini?')) return;

        const { error } = await supabase
            .from('stories')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Gagal menghapus: ' + error.message);
        } else {
            fetchStories();
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: currentStory.title || '',
            image_url: currentStory.image_url,
            link_url: currentStory.link_url || '',
            display_order: Number(currentStory.display_order || 0),
            is_active: currentStory.is_active !== undefined ? currentStory.is_active : true
        };

        if (!payload.image_url) {
            alert('Harus upload gambar!');
            return;
        }

        let error;
        if (isEditing && currentStory.id) {
            const { error: updateError } = await supabase
                .from('stories')
                .update(payload)
                .eq('id', currentStory.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('stories')
                .insert([payload]);
            error = insertError;
        }

        if (error) {
            alert('Gagal menyimpan: ' + error.message);
        } else {
            setShowModal(false);
            fetchStories();
            setCurrentStory({});
        }
    };

    const openModal = (story?: Story) => {
        if (story) {
            setIsEditing(true);
            setCurrentStory(story);
        } else {
            setIsEditing(false);
            setCurrentStory({
                display_order: stories.length + 1,
                is_active: true
            });
        }
        setShowModal(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const originalFile = e.target.files[0];
        let fileToUpload = originalFile;

        // Convert to WebP
        if (originalFile.type.startsWith('image/')) {
            try {
                fileToUpload = await convertImageToWebP(originalFile);
            } catch (err) {
                console.error('WebP conversion fallback', err);
            }
        }

        const fileName = `story-${Date.now()}.webp`;
        const { error: uploadError } = await supabase.storage
            .from('property-images') // Reuse bucket
            .upload(fileName, fileToUpload);

        if (uploadError) {
            alert('Upload failed: ' + uploadError.message);
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('property-images')
                .getPublicUrl(fileName);

            setCurrentStory({ ...currentStory, image_url: publicUrl });
        }
        setUploading(false);
    };

    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#020617]">Manajemen Stories/Feed</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[#020617] text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                >
                    + Tambah Story
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase">Order</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase">Image</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase">Title / Link</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase">Status</th>
                                <th className="p-4 font-bold text-slate-600 text-sm uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {stories.map((story) => (
                                <tr key={story.id} className="hover:bg-slate-50">
                                    <td className="p-4 font-mono">{story.display_order}</td>
                                    <td className="p-4">
                                        <div className="w-16 h-28 bg-slate-100 rounded overflow-hidden">
                                            <img src={story.image_url} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold">{story.title || '-'}</div>
                                        <div className="text-xs text-blue-500 truncate max-w-[200px]">{story.link_url}</div>
                                    </td>
                                    <td className="p-4">
                                        {story.is_active ?
                                            <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-xs font-bold">Active</span> :
                                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">Inactive</span>
                                        }
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => openModal(story)} className="text-blue-600 font-bold mr-4">Edit</button>
                                        <button onClick={() => handleDelete(story.id)} className="text-red-500 font-bold">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Story' : 'Tambah Story'}</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Upload Poster (Portrait 9:16)</label>
                                <input type="file" onChange={handleImageUpload} accept="image/*" className="w-full" />
                                {currentStory.image_url && (
                                    <div className="mt-2 w-24 h-40 bg-slate-100 rounded overflow-hidden mx-auto border">
                                        <img src={currentStory.image_url} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                {uploading && <p className="text-sm text-emerald-500">Uploading...</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Judul / Promo Text (Optional)</label>
                                <input
                                    className="w-full p-2 border rounded"
                                    value={currentStory.title || ''}
                                    onChange={e => setCurrentStory({ ...currentStory, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Link URL (Optional)</label>
                                <input
                                    className="w-full p-2 border rounded"
                                    placeholder="/special-offers or properties/123"
                                    value={currentStory.link_url || ''}
                                    onChange={e => setCurrentStory({ ...currentStory, link_url: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-1">Urutan</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        value={currentStory.display_order}
                                        onChange={e => setCurrentStory({ ...currentStory, display_order: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={currentStory.is_active ?? true}
                                            onChange={e => setCurrentStory({ ...currentStory, is_active: e.target.checked })}
                                        />
                                        Active
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 font-bold text-slate-500">Batal</button>
                                <button type="submit" className="px-6 py-2 bg-black text-white rounded font-bold">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryManager;
