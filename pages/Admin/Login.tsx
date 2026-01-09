
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error, data } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                if (data.user) {
                    setMessage("Akun berhasil dibuat! Silakan login.");
                    setIsSignUp(false);
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/admin');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-[#020617] uppercase tracking-widest mb-2">
                        {isSignUp ? 'Buat Akun Admin' : 'Yeobo Admin'}
                    </h1>
                    <p className="text-slate-500">
                        {isSignUp ? 'Daftarkan akun baru untuk mengelola konten' : 'Masuk untuk mengelola konten'}
                    </p>
                </div>

                {message && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm font-bold">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="admin@yeoboland.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#020617] text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Memproses...' : (isSignUp ? 'DAFTAR SEKARANG' : 'LOGIN DASHBOARD')}
                    </button>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                                setMessage(null);
                            }}
                            className="text-sm text-slate-500 hover:text-emerald-600 font-bold transition-colors"
                        >
                            {isSignUp ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar disini'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
