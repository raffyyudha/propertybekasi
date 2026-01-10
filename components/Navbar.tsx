import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BRAND_NAME } from '../constants';
import { supabase } from '../lib/supabaseClient';
import RunningText from './RunningText';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  // Default to 'Semua' so we don't accidentally filter by 'Dijual' when 'Dijual' properties don't exist as a type
  const [searchType, setSearchType] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location]);

  // Real-time suggestions fetching
  // Load default suggestions on mount
  useEffect(() => {
    const loadDefaultSuggestions = async () => {
      const { data } = await supabase
        .from('properties')
        .select('id, title, location, type')
        .order('created_at', { ascending: false })
        .limit(10);

      setSuggestions(data || []);
    };

    loadDefaultSuggestions();
  }, []);

  // Update suggestions based on search query
  useEffect(() => {
    const fetchSuggestions = async () => {
      // If no query, show all suggestions (default)
      if (!searchQuery) {
        const { data } = await supabase
          .from('properties')
          .select('id, title, location, type')
          .order('created_at', { ascending: false })
          .limit(10);
        setSuggestions(data || []);
        return;
      }

      // If query exists, filter
      const { data } = await supabase
        .from('properties')
        .select('id, title, location, type')
        .or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
        .limit(10);

      setSuggestions(data || []);
    };

    // Debounce slightly
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = overrideQuery || searchQuery;

    const params = new URLSearchParams();
    if (queryToUse) params.set('q', queryToUse);
    if (searchType && searchType !== 'Semua') params.set('type', searchType);

    navigate(`/?${params.toString()}`);
    setMobileMenuOpen(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        {/* Running Text Section */}
        <RunningText />

        <div className={`max-w-[1600px] mx-auto px-4 md:px-10 flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-40 h-16 flex items-center justify-start">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Central Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-6 relative">
            <form onSubmit={handleSearch} className="flex w-full bg-white rounded-md shadow-lg border border-slate-200 overflow-hidden group focus-within:ring-2 focus-within:ring-blue-600 transition-all h-12 z-20 relative">
              <div className="relative border-r border-slate-200 bg-slate-50 min-w-[100px]">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="appearance-none bg-transparent py-0 pl-4 pr-8 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer hover:bg-slate-100 h-full w-full"
                >
                  <option value="Semua">Semua</option>
                  <option value="Rumah">Rumah</option>
                  <option value="Ruko">Ruko</option>
                  <option value="Tanah">Tanah</option>
                  <option value="Villa">Villa</option>
                  <option value="Gudang">Gudang</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Cari lokasi, nama project..."
                className="flex-1 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                autoComplete="off"
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-8 font-bold text-sm transition-colors">
                Cari
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg border-x border-b border-gray-100 mt-0 z-10 overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                  {/* Suggestions List */}
                  {suggestions.length > 0 ? (
                    <>
                      {/* Lokasi Section */}
                      {(() => {
                        const locations = [...new Set(suggestions.map(s => s.location))];
                        return locations.length > 0 ? (
                          <>
                            <div className="text-xs font-semibold text-gray-400 px-4 py-2 bg-gray-50">Lokasi</div>
                            {locations.slice(0, 3).map((loc, idx) => (
                              <div
                                key={`loc-${idx}`}
                                onClick={() => { setSearchQuery(loc); handleSearch({} as any, loc); }}
                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-gray-50 group"
                              >
                                <div className="flex items-center gap-3">
                                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                  </svg>
                                  <span className="text-sm text-slate-800">{loc}</span>
                                </div>
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            ))}
                          </>
                        ) : null;
                      })()}

                      {/* Perumahan Section */}
                      <div className="text-xs font-semibold text-gray-400 px-4 py-2 bg-gray-50">Perumahan</div>
                      {suggestions.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSuggestionClick(item.id)}
                          className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <svg className="w-5 h-5 text-slate-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-slate-800 truncate">{item.title}</div>
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}

                      {/* Hint Message */}
                      <div className="px-4 py-3 text-xs text-slate-500 bg-slate-50 border-t">
                        Kolom searching sudah di kasih arahan sesuai listing yg di miliki
                      </div>
                    </>
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-400 italic">
                      Tidak ada properti yang cocok.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Overlay to close suggestions */}
            {showSuggestions && (
              <div className="fixed inset-0 z-0" onClick={() => setShowSuggestions(false)}></div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/articles" className={`hidden md:flex items-center hover:text-blue-600 transition-colors uppercase tracking-wider text-xs font-bold ${scrolled ? 'text-slate-600' : 'text-slate-600'}`}>
              {t('nav.articles')}
            </Link>

            <button
              onClick={() => navigate('/special-offers')}
              className="hidden md:flex items-center gap-2 px-3 py-2 border border-slate-300 rounded overflow-hidden hover:border-slate-400 bg-white transition-all text-slate-700 active:scale-95 h-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
              <span className="text-xs">{t('nav.specialOffers')}</span>
            </button>

            <button
              onClick={() => navigate('/guides')}
              className="flex items-center justify-center w-10 h-10 cursor-pointer hover:text-blue-600 transition-colors text-slate-700 hover:bg-slate-50 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </button>

            {/* Language/Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                onBlur={() => setTimeout(() => setShowSettings(false), 200)}
                className="flex items-center justify-center w-10 h-10 text-slate-700 hover:text-blue-600 transition-colors hover:bg-slate-50 rounded-full"
              >
                {language === 'id' ? (
                  <span className="text-2xl" role="img" aria-label="Indonesian Flag">🇮🇩</span>
                ) : (
                  <span className="text-2xl" role="img" aria-label="UK Flag">🇬🇧</span>
                )}
              </button>

              {showSettings && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden py-2 z-50">
                  <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('nav.settings')}</div>

                  <div className="px-4 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer" onMouseDown={() => { setLanguage('id'); setShowSettings(false); }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🇮🇩</span>
                      <span className={`text-sm font-bold ${language === 'id' ? 'text-blue-600' : 'text-slate-700'}`}>Bahasa Indonesia</span>
                    </div>
                    {language === 'id' && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                  </div>

                  <div className="px-4 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer" onMouseDown={() => { setLanguage('en'); setShowSettings(false); }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🇬🇧</span>
                      <span className={`text-sm font-bold ${language === 'en' ? 'text-blue-600' : 'text-slate-700'}`}>English</span>
                    </div>
                    {language === 'en' && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="hidden lg:flex items-center justify-center bg-[#020617] text-white px-5 h-10 rounded hover:bg-black transition-all shadow-lg active:scale-95"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>

        {/* Mobile Search - Fixed below navbar (Hidden on Property Detail) */}
        {!location.pathname.startsWith('/property/') && (
          <div className="lg:hidden fixed top-36 left-0 right-0 w-full px-4 py-4 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-md z-40">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex flex-col gap-2">
                {/* Type Selector */}
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-bold text-slate-700 bg-slate-100 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Semua">Semua Tipe</option>
                  <option value="Rumah">Rumah</option>
                  <option value="Ruko">Ruko</option>
                  <option value="Tanah">Tanah</option>
                  <option value="Villa">Villa</option>
                  <option value="Gudang">Gudang</option>
                </select>

                {/* Search Input */}
                <div className="flex w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Cari lokasi..."
                    className="flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
                  />
                  <button type="submit" className="px-4 text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </form>

              {/* Mobile Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg border border-gray-100 mt-2 max-h-[400px] overflow-y-auto z-50">
                  {/* Lokasi Section */}
                  {(() => {
                    const locations = [...new Set(suggestions.map(s => s.location))];
                    return locations.length > 0 ? (
                      <>
                        <div className="text-xs font-semibold text-gray-400 px-4 py-2 bg-gray-50">Lokasi</div>
                        {locations.slice(0, 3).map((loc, idx) => (
                          <div
                            key={`loc-${idx}`}
                            onClick={() => { setSearchQuery(loc as string); handleSearch({} as any, loc as string); setShowSuggestions(false); }}
                            className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-gray-50 active:bg-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                              </svg>
                              <span className="text-sm text-slate-800">{loc}</span>
                            </div>
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        ))}
                      </>
                    ) : null;
                  })()}

                  {/* Perumahan Section */}
                  <div className="text-xs font-semibold text-gray-400 px-4 py-2 bg-gray-50">Perumahan</div>
                  {suggestions.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => { handleSuggestionClick(item.id); setShowSuggestions(false); }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 active:bg-slate-100"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <svg className="w-5 h-5 text-slate-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">{item.title}</div>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}

                  {/* Hint Message */}
                  <div className="px-4 py-3 text-xs text-slate-500 bg-slate-50 border-t">
                    Kolom searching sudah di kasih arahan sesuai listing yg di miliki
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-white">
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
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

            {/* Mobile Menu Search Bar */}
            <form onSubmit={handleSearch} className="mb-8 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-slate-400"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </form>

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
