
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        properties: 0,
        promos: 0,
        messages: 0 // Placeholder
    });
    const [loading, setLoading] = useState(true);
    const [runningText, setRunningText] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchStats();
        fetchRunningText();
    }, []);

    const fetchRunningText = async () => {
        const { data } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'running_text')
            .single();

        if (data) {
            setRunningText(data.value);
        }
    };

    const updateRunningText = async () => {
        setSaving(true);
        try {
            // Check if exists first to decide insert or update (upsert is better but let's be explicit or use upsert)
            const { error } = await supabase
                .from('site_settings')
                .upsert({ key: 'running_text', value: runningText }, { onConflict: 'key' });

            if (error) throw error;
            alert('Running text updated!');
        } catch (err) {
            console.error(err);
            alert('Failed to update running text');
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { count: propertyCount } = await supabase
                .from('properties')
                .select('*', { count: 'exact', head: true });

            const { count: promoCount } = await supabase
                .from('properties')
                .select('*', { count: 'exact', head: true })
                .eq('is_promo', true);

            setStats({
                properties: propertyCount || 0,
                promos: promoCount || 0,
                messages: 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10">Loading stats...</div>;

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-[#020617] mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Properti</div>
                    <div className="text-4xl font-black text-[#020617]">{stats.properties}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-emerald-600 text-sm font-bold uppercase tracking-wider mb-2">Promo Aktif</div>
                    <div className="text-4xl font-black text-emerald-600">{stats.promos}</div>
                </div>
                {/* Placeholder for future features */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 opacity-50">
                    <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Pesan Masuk (Coming Soon)</div>
                    <div className="text-4xl font-black text-slate-300">-</div>
                </div>
            </div>

            {/* Running Text Management */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
                <h2 className="text-xl font-bold mb-4">Running Text Header</h2>
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        value={runningText}
                        onChange={(e) => setRunningText(e.target.value)}
                        className="flex-1 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Masukkan teks berjalan disini..."
                    />
                    <button
                        onClick={updateRunningText}
                        disabled={saving}
                        className="px-6 py-3 bg-[#020617] text-white font-bold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>

            {/* Quick Actions or Recent Activity could go here */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold mb-4">Quick Start</h2>
                <p className="text-slate-500 mb-6">Selamat datang di Admin Dashboard Yeobo Land. Gunakan menu di sebelah kiri untuk mengelola konten website.</p>
                <div className="flex gap-4">
                    <a href="/admin/properties" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                        Tambah Properti Baru
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
