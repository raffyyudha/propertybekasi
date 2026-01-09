import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BRAND_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchType, setSearchType] = useState('Dijual');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery, 'Type:', searchType);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#020617] rounded-full flex items-center justify-center">
              <span className="text-white font-extrabold text-xs italic">Y</span>
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className={`text-lg font-extrabold tracking-tighter leading-none ${scrolled ? 'text-[#020617]' : 'text-[#020617]'}`}>
                {BRAND_NAME}
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#10B981]">Alfazza Prestige</span>
            </div>
            {/* Mobile Logo Text if name hidden on mobile */}
            <div className="flex flex-col md:hidden">
              <span className="text-lg font-extrabold tracking-tighter leading-none text-[#020617]">
                {BRAND_NAME}
              </span>
            </div>
          </Link>

          {/* Central Search Bar - Rumah123 Style */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
            <form onSubmit={handleSearch} className="flex w-full bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden group focus-within:ring-2 focus-within:ring-blue-600 transition-all h-12">
              <div className="relative border-r border-slate-200 bg-slate-50">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="appearance-none bg-transparent py-0 pl-4 pr-10 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer hover:bg-slate-100 h-full"
                >
                  <option value="Dijual">Dijual</option>
                  <option value="Disewa">Disewa</option>
                  <option value="Baru">Baru</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Lokasi, keyword, area, project, developer"
                className="flex-1 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-8 font-bold text-sm transition-colors">
                Cari
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6 text-xs font-bold">
            <Link to="/articles" className={`hidden md:block hover:text-blue-600 transition-colors uppercase tracking-wider ${scrolled ? 'text-slate-600' : 'text-slate-600'}`}>
              Artikel
            </Link>

            <button
              onClick={() => navigate('/special-offers')}
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-slate-300 rounded overflow-hidden hover:border-slate-400 bg-white transition-all text-slate-700 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              <span>Penawaran Khusus</span>
            </button>

            <div
              onClick={() => navigate('/guides')}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors text-slate-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              <span className="hidden sm:inline">Panduan</span>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="hidden lg:block bg-[#020617] text-white px-5 py-2.5 rounded hover:bg-black transition-all shadow-lg active:scale-95 ml-2"
            >
              Kontak Kami
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>

        {/* Mobile Search - Visible only on mobile below header */}
        <div className="lg:hidden w-full px-4 pb-4 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm mt-3 pt-2">
          <form onSubmit={handleSearch} className="flex w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lokasi..."
              className="flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
            />
            <button type="submit" className="px-4 text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-white">
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#020617] rounded-full flex items-center justify-center">
                  <span className="text-white font-extrabold text-xs italic">Y</span>
                </div>
                <span className="text-lg font-extrabold tracking-tighter leading-none text-[#020617]">{BRAND_NAME}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full"
              >
                <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex flex-col gap-6 text-xl font-bold text-[#020617]">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="border-b border-slate-100 pb-4">Home</Link>
              <Link to="/articles" onClick={() => setMobileMenuOpen(false)} className="border-b border-slate-100 pb-4">Artikel</Link>
              <Link to="/special-offers" onClick={() => setMobileMenuOpen(false)} className="border-b border-slate-100 pb-4">Penawaran Khusus</Link>
              <Link to="/guides" onClick={() => setMobileMenuOpen(false)} className="border-b border-slate-100 pb-4">Panduan</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="border-b border-slate-100 pb-4">Kontak Kami</Link>
            </div>

            <div className="mt-auto">
              <p className="text-sm text-slate-400 text-center mb-4">© 2024 Yeobo Land. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
