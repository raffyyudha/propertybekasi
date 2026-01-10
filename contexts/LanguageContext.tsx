import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    id: {
        // Navbar
        'nav.home': 'Beranda',
        'nav.profile': 'Profil',
        'nav.product': 'Produk',
        'nav.material': 'Material',
        'nav.contact': 'Hubungi Kami',
        'nav.portfolio': 'Portofolio & Testimoni',
        'nav.articles': 'Artikel',
        'nav.specialOffers': 'Penawaran Khusus',
        'nav.guides': 'Panduan',
        'nav.settings': 'Pengaturan',
        'nav.language': 'Bahasa',

        // Hero
        'hero.newStandard': 'STANDAR BARU',
        'hero.architecting': 'MEMBANGUN',
        'hero.dreams': 'IMPIAN',
        'hero.inBekasi': 'DI BEKASI',
        'hero.legalRisk': 'Tingkat Risiko Legal',
        'hero.promo': 'Promo Merdeka 45%',
        'hero.cluster': 'Cluster Baru 2025',
        'hero.legalSafe': 'Legalitas Aman',
        'hero.viewDetail': 'Lihat Detail',
        'hero.description': 'Kami tidak sekadar menjual unit; kami mengkurasi ekosistem hunian kelas atas dengan standar legalitas dan arsitektur tanpa kompromi.',

        // Contact Section
        'contact.label': 'Hubungi Kami',
        'contact.heading': 'HUBUNGI KAMI SEKARANG.',
        'contact.subheading': 'Siap memiliki aset properti premium kelas dunia? Konsultasikan kebutuhan investasi Anda dengan tim ahli kami.',
        'contact.callUs': 'Telepon Kami',
        'contact.emailUs': 'Email Kami',
        'contact.fullName': 'Nama Lengkap',
        'contact.whatsappNumber': 'Nomor WhatsApp',
        'contact.message': 'Pesan',
        'contact.namePlaceholder': 'Nama Anda',
        'contact.messagePlaceholder': 'Saya tertarik dengan...',
        'contact.sendMessage': 'Kirim Pesan',

        // Home
        'home.emptyCatalog': 'Katalog Tidak Tersedia',
        'home.emptyDescription': 'Inventaris eksklusif kami untuk kriteria ini sedang kosong. Silakan reset filter pencarian Anda.',
        'home.showAll': 'Tampilkan Semua Unit',
        'home.platinumStandard': 'The Platinum Standard',
        'home.beyondTitle1': 'MELAMPAUI',
        'home.beyondTitle2': 'SEBUAH',
        'home.beyondTitle3': 'TRANSAKSI.',
        'home.beyondDescription': 'Layanan kami melampaui jual-beli. Kami adalah konsultan strategis yang memastikan aset Anda memiliki nilai investasi jangka panjang yang aman.',
        'home.feature1Title': 'Kepatuhan Presisi',
        'home.feature1Desc': 'Audit legalitas menyeluruh untuk setiap sertifikat, IMB, dan PBB sebelum dipublikasikan.',
        'home.feature2Title': 'Layanan Concierge',
        'home.feature2Desc': 'Layanan penjemputan survei dan pendampingan notaris pribadi untuk kenyamanan Anda.',
        'home.feature3Title': 'Market Intelligence',
        'home.feature3Desc': 'Analisis data realtime tren harga properti Bekasi untuk keputusan investasi akurat.',

        // Footer
        'footer.description': 'Mitra terpercaya Anda dalam menemukan hunian premium dan aset investasi bernilai tinggi di Bekasi dan sekitarnya. Prioritas kami adalah keamanan legalitas dan kepuasan Anda.',
        'footer.property': 'Properti',
        'footer.house': 'Rumah Dijual',
        'footer.shophouse': 'Ruko Premium',
        'footer.land': 'Tanah Kavling',
        'footer.warehouse': 'Gudang Industri',
        'footer.favoriteArea': 'Area Favorit',
        'footer.contactUs': 'Hubungi Kami',
        'footer.office': 'Kantor',
        'footer.whatsapp': 'WhatsApp',
        'footer.email': 'Email',
        'footer.terms': 'Syarat & Ketentuan',
        'footer.privacy': 'Kebijakan Privasi',
        'footer.disclaimer': 'Disclaimer',
        'footer.rights': 'All Rights Reserved.',

        // General
        'search.placeholder': 'Cari lokasi...',
        'search.search': 'Cari',

        // WhatsApp Messages (Templates)
        'wa.kpr': 'Halo *{brand}*, saya tertarik dengan simulasi KPR untuk properti *"{title}"* (ID: {id}). Harga {price}, DP {dp}%, Tenor {tenor} tahun. Mohon infonya.',
        'wa.visit': 'Halo *{brand}*, saya ingin menjadwalkan kunjungan ke *"{title}"* (ID: {id}) pada tanggal {date}. Catatan: {note}',
        'wa.general': 'Halo *{brand}*, saya tertarik dengan properti *"{title}"* (ID: {id}) di {location}. Mohon info detailnya.',

        // Property Cards & Floater
        'card.billion': 'Miliar',
        'card.million': 'Juta',
        'card.promo': 'Promo',
        'card.exclusive': 'Eksklusif',
        'card.priceGuide': 'Panduan Harga',
        'card.area': 'Luas',
        'card.build': 'Bangunan',
        'card.beds': 'K.Tidur',
        'card.consult': 'Konsultasi Sekarang',
        'floater.contactAdmin': 'Hubungi Admin',
        'floater.waMessage': 'Halo Yeoboland, saya tertarik konsultasi properti.',
        'card.waMessage': 'Halo Yeoboland, saya tertarik dengan: {title}.',
    },
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.profile': 'Profile',
        'nav.product': 'Product',
        'nav.material': 'Material',
        'nav.contact': 'Contact Us',
        'nav.portfolio': 'Portfolio & Testimonials',
        'nav.articles': 'Articles',
        'nav.specialOffers': 'Special Offers',
        'nav.guides': 'Guides',
        'nav.settings': 'Settings',
        'nav.language': 'Language',

        // Hero
        'hero.newStandard': 'THE NEW STANDARD',
        'hero.architecting': 'ARCHITECTING',
        'hero.dreams': 'DREAMS',
        'hero.inBekasi': 'IN BEKASI',
        'hero.legalRisk': 'Legal Risk Rate',
        'hero.promo': 'Independence Promo 45%',
        'hero.cluster': 'New Cluster 2025',
        'hero.legalSafe': 'Legal Safety',
        'hero.viewDetail': 'View Detail',
        'hero.description': 'We don\'t just sell units; we curate high-end residential ecosystems with uncompromising legality and architectural standards.',

        // Contact Section
        'contact.label': 'Contact Us',
        'contact.heading': 'CONTACT US NOW.',
        'contact.subheading': 'Ready to own world-class premium property assets? Consult your investment needs with our expert team.',
        'contact.callUs': 'Call Us',
        'contact.emailUs': 'Email Us',
        'contact.fullName': 'Full Name',
        'contact.whatsappNumber': 'WhatsApp Number',
        'contact.message': 'Message',
        'contact.namePlaceholder': 'Your Name',
        'contact.messagePlaceholder': 'I am interested in...',
        'contact.sendMessage': 'Send Message',

        // Footer
        'footer.description': 'Your trusted partner in finding premium housing and high-value investment assets in Bekasi and surrounding areas. Our priority is legal security and your satisfaction.',
        'footer.property': 'Property',
        'footer.house': 'House for Sale',
        'footer.shophouse': 'Premium Shophouse',
        'footer.land': 'Land Plot',
        'footer.warehouse': 'Industrial Warehouse',
        'footer.favoriteArea': 'Favorite Areas',
        'footer.contactUs': 'Contact Us',
        'footer.office': 'Office',
        'footer.whatsapp': 'WhatsApp',
        'footer.email': 'Email',
        'footer.terms': 'Terms & Conditions',
        'footer.privacy': 'Privacy Policy',
        'footer.disclaimer': 'Disclaimer',
        'footer.rights': 'All Rights Reserved.',

        // Home
        'home.emptyCatalog': 'Catalog Unavailable',
        'home.emptyDescription': 'Our exclusive inventory for these criteria is currently empty. Please reset your search filters.',
        'home.showAll': 'Show All Units',
        'home.platinumStandard': 'The Platinum Standard',
        'home.beyondTitle1': 'BEYOND',
        'home.beyondTitle2': 'THE',
        'home.beyondTitle3': 'TRANSACTION.',
        'home.beyondDescription': 'Our service goes beyond buying and selling. We are strategic consultants ensuring your assets have secure long-term investment value.',
        'home.feature1Title': 'Precision Compliance',
        'home.feature1Desc': 'Thorough legal audit for every certificate, IMB, and PBB before publication.',
        'home.feature2Title': 'White-Glove Concierge',
        'home.feature2Desc': 'Survey pickup service and personal notary assistance for your convenience.',
        'home.feature3Title': 'Market Intelligence',
        'home.feature3Desc': 'Real-time data analysis on property price trends in Bekasi for accurate investment decisions.',

        // General
        'search.placeholder': 'Search location...',
        'search.search': 'Search',

        // WhatsApp Messages (Templates)
        'wa.kpr': 'Hello *{brand}*, I am interested in mortgage simulation for property *"{title}"* (ID: {id}). Price {price}, DP {dp}%, Tenor {tenor} years. Please provide info.',
        'wa.visit': 'Hello *{brand}*, I would like to schedule a visit to *"{title}"* (ID: {id}) on {date}. Note: {note}',
        'wa.general': 'Hello *{brand}*, I am interested in property *"{title}"* (ID: {id}) in {location}. Please provide details.',

        // Property Cards & Floater
        'card.billion': 'Billion',
        'card.million': 'Million',
        'card.promo': 'Promo',
        'card.exclusive': 'Exclusive',
        'card.priceGuide': 'Price Guide',
        'card.area': 'Area',
        'card.build': 'Build',
        'card.beds': 'Beds',
        'card.consult': 'Consult Now',
        'floater.contactAdmin': 'Contact Admin',
        'floater.waMessage': 'Hello Yeoboland, I am interested in property consultation.',
        'card.waMessage': 'Hello Yeoboland, I am interested in: {title}.',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('id');

    const t = (key: string) => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
