
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ArticleManager: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Partial<any>>({});
    const [uploading, setUploading] = useState(false);

    // New States for Enhanced Features
    const [previewMode, setPreviewMode] = useState(false);
    const [contentUploading, setContentUploading] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setArticles(data || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileName = `article-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('article-images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('article-images')
                .getPublicUrl(fileName);

            setCurrentArticle({ ...currentArticle, image: publicUrl });
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // New Function: Insert Image directly into Content
    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setContentUploading(true);
        const file = e.target.files[0];
        const fileName = `content-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('article-images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('article-images')
                .getPublicUrl(fileName);

            // Insert HTML image tag into content
            const imgTag = `\n<img src="${publicUrl}" alt="Article Image" class="w-full rounded-xl my-6" />\n`;
            setCurrentArticle({ ...currentArticle, content: (currentArticle.content || '') + imgTag });
        } catch (error: any) {
            alert('Upload content image failed: ' + error.message);
        } finally {
            setContentUploading(false);
        }
    };

    const saveArticle = async () => {
        if (!currentArticle.title || !currentArticle.content) {
            alert('Title and Content are required');
            return;
        }

        const payload = {
            title: currentArticle.title,
            content: currentArticle.content,
            category: currentArticle.category || 'General',
            image: currentArticle.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
            author: currentArticle.author || 'Admin',
            created_at: new Date().toISOString() // Ideally update updated_at if editing
        };

        let error;
        if (isEditing && currentArticle.id) {
            const { error: updateError } = await supabase
                .from('articles')
                .update(payload)
                .eq('id', currentArticle.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('articles')
                .insert([payload]);
            error = insertError;
        }

        if (error) {
            alert('Error saving article: ' + error.message);
        } else {
            setShowModal(false);
            setCurrentArticle({});
            fetchArticles();
        }
    };

    const deleteArticle = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (error) {
            alert('Error deleting: ' + error.message);
        } else {
            fetchArticles();
        }
    };

    const openModal = (article?: any) => {
        if (article) {
            setIsEditing(true);
            setCurrentArticle(article);
        } else {
            setIsEditing(false);
            setCurrentArticle({});
        }
        setPreviewMode(false);
        setShowModal(true);
    };

    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#020617]">Manajemen Artikel</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[#020617] text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                >
                    + Buat Artikel Baru
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Image</th>
                            <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Title</th>
                            <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider">Category</th>
                            <th className="p-4 font-bold text-slate-600 text-sm uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-10 text-center">Loading...</td></tr>
                        ) : articles.length === 0 ? (
                            <tr><td colSpan={4} className="p-10 text-center text-slate-500">Belum ada artikel.</td></tr>
                        ) : (
                            articles.map(article => (
                                <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <img src={article.image || 'https://via.placeholder.com/150'} alt="" className="w-16 h-12 object-cover rounded" />
                                    </td>
                                    <td className="p-4 font-bold text-slate-800">{article.title}</td>
                                    <td className="p-4">
                                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-bold uppercase">{article.category}</span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => openModal(article)} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Edit</button>
                                        <button onClick={() => deleteArticle(article.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 shadow-2xl relative">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#020617]">{isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
                        </div>

                        <div className="p-8">
                            {/* Tabs */}
                            <div className="flex gap-4 mb-6 border-b border-gray-100">
                                <button
                                    onClick={() => setPreviewMode(false)}
                                    className={`pb-3 font-bold text-sm transition-colors relative ${!previewMode ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    Editor
                                    {!previewMode && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
                                </button>
                                <button
                                    onClick={() => setPreviewMode(true)}
                                    className={`pb-3 font-bold text-sm transition-colors relative ${previewMode ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    Preview (Tampilan Asli)
                                    {previewMode && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
                                </button>
                            </div>

                            {!previewMode ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Judul Artikel</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-lg"
                                            value={currentArticle.title || ''}
                                            onChange={e => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                            placeholder="Masukkan judul menarik..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                                            <select
                                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                                value={currentArticle.category || 'General'}
                                                onChange={e => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                                            >
                                                <option value="General">General</option>
                                                <option value="Market Insight">Market Insight</option>
                                                <option value="Lifestyle">Lifestyle</option>
                                                <option value="Legal">Legal</option>
                                                <option value="Investment">Investment</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Author</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                                value={currentArticle.author || ''}
                                                onChange={e => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                                                placeholder="Nama Penulis"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image</label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer bg-slate-50">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="article-image-upload"
                                                disabled={uploading}
                                            />
                                            <label htmlFor="article-image-upload" className="cursor-pointer block">
                                                {uploading ? (
                                                    <span className="text-emerald-500 font-bold">Uploading...</span>
                                                ) : currentArticle.image ? (
                                                    <div className="relative h-48 w-full">
                                                        <img src={currentArticle.image} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-sm" />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity text-white font-bold rounded-lg backdrop-blur-sm">Ganti Cover</div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="text-4xl text-slate-300 mb-2">🖼️</div>
                                                        <span className="text-slate-500 font-bold">Upload Cover Image</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-bold text-slate-700">Konten Artikel</label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleContentImageUpload}
                                                    className="hidden"
                                                    id="content-image-upload"
                                                    disabled={contentUploading}
                                                />
                                                <label
                                                    htmlFor="content-image-upload"
                                                    className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer transition-colors ${contentUploading ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    {contentUploading ? 'Inserting...' : 'Insert Image to Content'}
                                                </label>
                                            </div>
                                        </div>
                                        <textarea
                                            className="w-full p-5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-[400px] text-base leading-relaxed font-serif"
                                            value={currentArticle.content || ''}
                                            onChange={e => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                                            placeholder="Tulis artikel anda di sini. Gunakan tombol 'Insert Image' di kanan atas untuk menyisipkan gambar di antara paragraf..."
                                        ></textarea>
                                        <p className="text-xs text-slate-400 mt-2">*Tips: Gunakan tombol 'Insert Image' untuk menambahkan gambar pendukung di dalam artikel.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-8 rounded-xl min-h-[500px] border border-gray-100">
                                    <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm rounded-lg">
                                        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold uppercase mb-4 inline-block">{currentArticle.category || 'Category'}</span>
                                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{currentArticle.title || 'Judul Artikel'}</h1>
                                        {currentArticle.image && (
                                            <img src={currentArticle.image} className="w-full h-64 object-cover rounded-xl mb-8" alt="Cover" />
                                        )}
                                        <div
                                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{ __html: currentArticle.content || '<p>Belum ada konten...</p>' }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100 sticky bottom-0 bg-white">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={saveArticle}
                                    className="px-8 py-2.5 bg-[#020617] text-white font-bold rounded-lg hover:bg-emerald-600 shadow-lg transition-all transform active:scale-95"
                                >
                                    {isEditing ? 'Simpan & Update' : 'Publish Artikel'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleManager;
