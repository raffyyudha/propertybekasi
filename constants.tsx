
import { Property, PropertyType } from './types';

export const WHATSAPP_NUMBER = "628999765777";
export const BRAND_NAME = "YEOBOLAND";
export const COMPANY_NAME = "PT. YEOBOLAND ALFAZZA PROPERTINDO";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Cluster Scandinavian Modern - Harapan Indah',
    price: 1550000000,
    location: 'Harapan Indah, Bekasi',
    type: PropertyType.RUMAH,
    landArea: 105,
    buildingArea: 90,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Hunian eksklusif dengan desain Scandinavian yang sedang tren. Lokasi strategis hanya 5 menit ke Living Plaza Harapan Indah.',
    isFeatured: true,
    isPromo: true
  },

  {
    id: '3',
    title: 'Warehouse Standard International - GIIC Cikarang',
    price: 12500000000,
    location: 'Cikarang, Bekasi',
    type: PropertyType.GUDANG,
    landArea: 2500,
    buildingArea: 1800,
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Fasilitas gudang modern dengan loading dock dan akses kontainer 40ft. Keamanan kawasan industri terbaik.',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Kavling Hoek Eksklusif - Grand Wisata Cluster',
    price: 4800000000,
    location: 'Grand Wisata, Bekasi',
    type: PropertyType.TANAH,
    landArea: 420,
    buildingArea: 0,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Tanah siap bangun di posisi premium hoek. Dekat dengan akses Tol Jakarta-Cikampek KM 21.',
    isFeatured: true
  },
  {
    id: '5',
    title: 'Resort Villa Private Pool - Setu Bekasi',
    price: 3750000000,
    location: 'Setu, Bekasi',
    type: PropertyType.VILLA,
    landArea: 600,
    buildingArea: 300,
    bedrooms: 4,
    bathrooms: 4,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Kombinasi hunian asri dengan kenyamanan resort bintang 5. Lengkap dengan kolam renang pribadi dan taman luas.',
    isFeatured: true,
    isPromo: true
  },
  {
    id: '6',
    title: 'Rumah Minimalis Modern - Babelan Residence',
    price: 650000000,
    location: 'Babelan, Bekasi',
    type: PropertyType.RUMAH,
    landArea: 72,
    buildingArea: 45,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Pilihan tepat untuk keluarga baru. Harga terjangkau dengan kualitas bangunan premium di Babelan.',
    isFeatured: false,
    isPromo: true
  }
];


export const GUIDE_ARTICLES = [
  {
    id: 1,
    category: 'Beli Properti',
    title: 'Panduan Lengkap Membeli Rumah Pertama untuk Milenial',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    readTime: '15 min baca',
    date: '12 Jan 2026',
    author: 'Sarah Johnson',
    content: `
      <p class="lead">Membeli rumah pertama adalah salah satu pencapaian finansial terbesar dalam hidup. Bagi generasi milenial dan Gen Z, tantangan ini seringkali terasa menakutkan di tengah kenaikan harga properti yang tidak sebanding dengan kenaikan pendapatan (wage stagnation). Namun, jangan khawatir. Dengan perencanaan yang matang dan strategi yang tepat, memiliki hunian impian bukanlah hal yang mustahil.</p>
      
      <p>Artikel ini akan mengupas tuntas setiap langkah yang perlu Anda tempuh, mulai dari persiapan finansial hingga serah terima kunci. Simak panduan lengkapnya berikut ini.</p>

      <h3>1. Audit Finansial: Seberapa Siap Anda?</h3>
      <p>Sebelum mulai <em>window shopping</em> properti, langkah pertama yang mutlak dilakukan adalah melihat kondisi dompet Anda. Jangan hanya tergiur promo DP 0% tanpa memperhitungkan kemampuan bayar jangka panjang.</p>
      <ul>
        <li><strong>Rasio Hutang (Debt Service Ratio):</strong> Pastikan total cicilan hutang Anda (termasuk KPR nanti, cicilan kendaraan, kartu kredit, paylater) tidak lebih dari 30-35% dari penghasilan bulanan. Bank sangat ketat soal ini.</li>
        <li><strong>Dana Darurat:</strong> Jangan habiskan semua tabungan untuk DP. Sisakan dana darurat minimal 6x pengeluaran bulanan untuk kejadian tak terduga.</li>
        <li><strong>BI Checking (SLIK OJK):</strong> Bersihkan riwayat kredit Anda. Lunasi tunggakan paylater atau kartu kredit yang macet karena ini penentu utama persetujuan KPR.</li>
      </ul>

      <h3>2. Menentukan Budget dan Lokasi (The Golden Rule)</h3>
      <p>Lokasi menentukan harga, tapi budget menentukan realita. Anda mungkin ingin tinggal di Jakarta Selatan, tapi jika budget terbatas, geserlah radar Anda ke daerah penyangga (sunrise property).</p>
      <p><strong>Tips Riset Lokasi:</strong></p>
      <ul>
        <li><strong>Akses Transportasi:</strong> Cari lokasi yang dekat dengan stasiun KRL, LRT, atau akses tol. Jarak fisik jauh tidak masalah asalkan waktu tempuh logis.</li>
        <li><strong>Fasilitas Umum:</strong> Pastikan dekat dengan rumah sakit, sekolah, dan pasar/supermarket.</li>
        <li><strong>Bebas Banjir:</strong> Ini non-negotiable. Cek lokasi saat musim hujan atau tanya warga sekitar.</li>
      </ul>

      <h3>3. Memahami Biaya-Biaya Tersembunyi (Hidden Costs)</h3>
      <p>Banyak pembeli rumah pertama kaget karena hanya menyiapkan uang DP. Padahal, ada biaya ekstra yang harus dibayar tunai di awal (prepaid costs) yang jumlahnya bisa mencapai 10-15% dari harga rumah:</p>
      <div class="bg-slate-100 p-4 rounded-lg my-4 border-l-4 border-emerald-500">
        <strong>Daftar Biaya Ekstra:</strong>
        <ul class="list-disc ml-5 mt-2">
          <li><strong>Booking Fee (Tanda Jadi):</strong> Rp 2 - 10 Juta (biasanya hangus jika batal).</li>
          <li><strong>Down Payment (DP):</strong> 10-20% dari harga rumah (bisa 0% tergantung promo bank/developer).</li>
          <li><strong>Biaya KPR:</strong> Provisi bank (1%), biaya admin, biaya appraisal.</li>
          <li><strong>Biaya Notaris & PPAT:</strong> Untuk pembuatan Akta Jual Beli (AJB) dan Balik Nama.</li>
          <li><strong>Pajak Pembeli (BPHTB):</strong> 5% x (Harga Transaksi - NPOPTKP). Ini komponen pajak terbesar!</li>
          <li><strong>Asuransi:</strong> Asuransi Jiwa dan Asuransi Kebakaran wajib untuk KPR.</li>
        </ul>
      </div>

      <h3>4. Memilih Developer dan Legalitas</h3>
      <p>Jangan membeli kucing dalam karung. Reputasi pengembang adalah jaminan keamanan investasi Anda.</p>
      <ul>
        <li><strong>Cek Legalitas Lahan:</strong> Pastikan sertifikat induk sudah pecah (split) atau minimal SHGB induk atas nama PT pengembang, bukan perorangan.</li>
        <li><strong>IMB/PBG:</strong> Pastikan Izin Mendirikan Bangunan sudah terbit untuk lokasi tersebut.</li>
        <li><strong>Track Record:</strong> Cek proyek-proyek mereka sebelumnya. Apakah serah terimanya tepat waktu? Bagaimana kualitas bangunannya setelah 5 tahun?</li>
      </ul>

      <h3>5. Proses KPR: Perang Bunga</h3>
      <p>Jangan malas membandingkan penawaran KPR dari berbagai bank. Beda bunga 1% saja bisa berarti selisih ratusan juta rupiah di total pembayaran akhir.</p>
      <p><strong>Jenis Suku Bunga:</strong></p>
      <ul>
        <li><strong>Fixed Rate (Tetap):</strong> Bunga flat selama periode tertentu (misal 5% selama 3 tahun). Cicilan stabil.</li>
        <li><strong>Floating Rate (Mengambang):</strong> Mengikuti suku bunga pasar (BI Rate) setelah masa fixed habis. Ini yang sering membuat cicilan melonjak tiba-tiba.</li>
      </ul>

      <h3>Kesimpulan</h3>
      <p>Membeli rumah butuh "nafas panjang". Jangan terburu-buru. Riset yang mendalam dan persiapan finansial yang matang akan menyelamatkan Anda dari penyesalan di masa depan. Selamat berburu rumah impian!</p>
    `
  },
  {
    id: 2,
    category: 'KPR',
    title: 'Panduan Ultimatif: Cara Menghitung Biaya KPR dan Simulasi Cicilan',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    readTime: '12 min baca',
    date: '10 Jan 2026',
    author: 'Budi Santoso',
    content: `
      <p>Mengajukan Kredit Pemilikan Rumah (KPR) seringkali menjadi satu-satunya jembatan bagi masyarakat untuk memiliki hunian. Namun, KPR bukan sekadar bayar cicilan bulanan. Ada struktur biaya kompleks yang jika tidak dipahami, bisa membuat cashflow Anda berantakan.</p>

      <h3>Bedah Komponen Biaya Awal KPR</h3>
      <p>Saat pengajuan KPR disetujui, Anda tidak langsung terima kunci. Anda harus melunasi biaya akad kredit terlebih dahulu. Berikut rinciannya:</p>

      <h4>1. Biaya Provisi (1% dari Plafon)</h4>
      <p>Ini adalah upah administrasi pencairan kredit untuk bank. Jika plafon kredit Anda Rp 500 Juta, maka biaya provisinya adalah Rp 5 Juta. Biasanya dipotong langsung dari pencairan atau bayar tunai.</p>
      
      <h4>2. Biaya Administrasi Bank</h4>
      <p>Biaya pengurusan berkas di bank. Variatif, namun biasanya di kisaran Rp 250.000 hingga Rp 1.000.000.</p>

      <h4>3. Asuransi Jiwa Kredit (Wajib)</h4>
      <p>Sangat penting. Jika debitur (peminjam) meninggal dunia selama masa cicilan, maka sisa hutang akan dilunasi oleh asuransi (coverage outstanding). Istri/anak tidak mewarisi hutang. Premi tergantung usia dan tenor, semakin tua usia debitur, semakin mahal.</p>

      <h4>4. Asuransi Kebakaran/Properti</h4>
      <p>Melindungi aset jaminan dari risiko kebakaran. Preminya relatif murah namun wajib dibayar di muka untuk masa tenor tertentu (misal 5 tahun).</p>

      <h3>Simulasi Hitungan Real (Studi Kasus)</h3>
      <div class="bg-gray-50 border p-6 rounded-xl my-6">
        <h4 class="font-bold text-lg mb-2">Kasus: Membeli Rumah Harga Rp 600 Juta</h4>
        <ul class="space-y-2">
          <li><strong>Harga Rumah:</strong> Rp 600.000.000</li>
          <li><strong>DP (10%):</strong> Rp 60.000.000 (Dibayar ke Developer)</li>
          <li><strong>Plafon KPR:</strong> Rp 540.000.000</li>
          <li><strong>Bunga:</strong> 5% Fixed 3 Tahun</li>
          <li><strong>Tenor:</strong> 20 Tahun (240 Bulan)</li>
        </ul>
        <hr class="my-4 border-gray-300"/>
        <p><strong>Rumus P.M.T (Anuitas):</strong></p>
        <p class="font-mono text-sm bg-gray-200 p-2 rounded">Cicilan = (Plafon x Bunga/12) / (1 - (1 + Bunga/12)^(-Tenor))</p>
        <p class="mt-4 font-bold text-emerald-600 text-xl">Estimasi Cicilan: ± Rp 3.563.800 / bulan</p>
        <p class="text-xs text-slate-500 mt-2">*Catatan: Ini perhitungan selama masa bunga Fixed. Saat floating (misal naik jadi 11%), cicilan bisa melonjak jadi ± Rp 5,5 Juta.</p>
      </div>

      <h3>Mengenal Jenis Suku Bunga</h3>
      <ol>
        <li><strong>Flat/Tetap (Fixed):</strong> Bunga tidak berubah. Keuntungannya kepastian bayar. Kerugiannya biasanya ratenya lebih tinggi dari bunga pasar saat itu.</li>
        <li><strong>Efektif/Mengambang (Floating):</strong> Mengikuti BI Repo Rate + Margin Bank. Jika ekonomi buruk dan bunga naik, cicilan Anda naik. Inilah risiko KPR jangka panjang.</li>
        <li><strong>Capped (Dibatasi):</strong> Bunga floating tapi ada batas atas. Misal floating Cap 10%, meski bunga pasar 15%, Anda tetap bayar 10%.</li>
      </ol>

      <h3>Tips Agar KPR Disetujui</h3>
      <ul>
        <li>Pastikan <em>Debt Service Ratio</em> (DSR) aman. Cicilan maksimal 30% gaji.</li>
        <li>Rekening koran "cantik". Usahakan ada cashflow rutin dan saldo mengendap.</li>
        <li>Jangan ambil kredit baru (motor/elektronik) saat proses pengajuan KPR (3 bulan sebelum).</li>
      </ul>
    `
  },
  {
    id: 3,
    category: 'Legalitas',
    title: 'Kupas Tuntas Legalitas: SHM, HGB, dan Hak Pakai',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    readTime: '10 min baca',
    date: '08 Jan 2026',
    author: 'Siti Aminah, S.H.',
    content: `
      <p>Dalam hukum agraria di Indonesia (UUPA No. 5 Tahun 1960), tidak semua "sertifikat" memiliki kekuatan yang sama. Salah memahami jenis sertifikat bisa berakibat fatal: aset Anda tidak bisa diwariskan, atau bahkan tanahnya diambil kembali oleh negara.</p>

      <h3>1. Sertifikat Hak Milik (SHM) - The King of Titles</h3>
      <p>Ini adalah kasta tertinggi legalitas properti di Indonesia.</p>
      <ul>
        <li><strong>Karakteristik:</strong> Hak turun-temurun, terkuat, dan terpenuh. Tidak ada batas waktu (selamanya).</li>
        <li><strong>Pemilik:</strong> HANYA Warga Negara Indonesia (WNI). WNA dan Badan Hukum (PT) tidak boleh memiliki SHM.</li>
        <li><strong>Kelebihan:</strong> Nilai jual paling tinggi (appraisal bank tinggi), bisa dijadikan jaminan hutang (Hak Tanggungan) yang paling disukai bank.</li>
        <li><strong>Kekurangan:</strong> Jika tanahnya diterlantarkan, hak ini bisa hapus.</li>
      </ul>

      <h3>2. Sertifikat Hak Guna Bangunan (HGB)</h3>
      <p>Sering ditemukan pada properti apartemen, ruko, atau perumahan yang dikelola developer (PT).</p>
      <ul>
        <li><strong>Definisi:</strong> Hak untuk mendirikan dan mempunyai bangunan di atas tanah yang bukan miliknya sendiri. Boleh di atas Tanah Negara atau Tanah Hak Pengelolaan.</li>
        <li><strong>Jangka Waktu:</strong> Terbatas! Maksimal 30 tahun, dan bisa diperpanjang 20 tahun. Total 50 tahun (bisa diperbarui lagi).</li>
        <li><strong>Pemilik:</strong> WNI dan Badan Hukum Indonesia (PT). Inilah mengapa kantor atau mall sertifikatnya HGB.</li>
        <li><strong>Penting:</strong> HGB <strong>BISA</strong> ditingkatkan menjadi SHM (Peningkatan Hak) asalkan luas tanah < 600m2 dan untuk rumah tinggal. Biayanya relatif terjangkau di BPN.</li>
      </ul>

      <h3>3. Hak Pakai</h3>
      <p>Hak untuk menggunakan tanah negara atau tanah milik orang lain.</p>
      <ul>
        <li><strong>Target:</strong> Biasanya diberikan kepada Warga Negara Asing (WNA) yang berdomisili di Indonesia (expats).</li>
        <li><strong>Jangka Waktu:</strong> Lebih pendek dari HGB.</li>
        <li><strong>Keterbatasan:</strong> Nilai jaminannya di bank sangat rendah atau bahkan ditolak.</li>
      </ul>

      <h3>4. Girik / Letter C / Petok D (Bukan Sertifikat!)</h3>
      <p>Hati-hati, ini <strong>BUKAN</strong> bukti kepemilikan hak atas tanah, melainkan hanya bukti pembayaran pajak (zaman kolonial/lama). Status hukumnya lemah.</p>
      <p><strong>Saran:</strong> Jika membeli tanah Girik, Anda wajib melakukan proses konversi sertifikat di BPN (Pendaftaran Tanah Pertama Kali) yang memakan waktu dan biaya cukup besar serta risiko sengketa tinggi.</p>

      <h3>Kesimpulan untuk Pembeli</h3>
      <p>Jika membelikan rumah tinggal (landed house), usahakan cari yang SHM atau minimal HGB yang bisa di-SHM-kan segera. Hindari membeli properti dengan status tanah sewa atau Eigendom Verponding (hukum Belanda) kecuali Anda didampingi pengacara properti yang handal.</p>
    `
  },
  {
    id: 4,
    category: 'Investasi',
    title: 'Strategi Investasi Properti Anti Rugi untuk Pemula 2026',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800',
    readTime: '10 min baca',
    date: '05 Jan 2026',
    author: 'Raymond T.',
    content: `
      <p>Properti sering disebut sebagai instrumen investasi favorit orang kaya lama. "Tanah tidak bertambah luas, tapi manusia bertambah banyak," adalah mantra klasiknya. Namun di 2026, strategi "beli lalu lupakan" sudah tidak relevan. Anda perlu strategi aktif.</p>

      <h3>Hukum Dasar: Capital Gain vs Rental Yield</h3>
      <p>Sebelum beli, tentukan tujuan Anda:</p>
      <ul>
        <li><strong>Capital Gain (Kenaikan Harga):</strong> Keuntungan didapat saat menjual kembali properti dengan harga lebih tinggi. Cocok untuk daerah berkembang (sunrise).
          <br/><em>Contoh: Beli tanah di Cikarang saat isu MRT masuk, jual 5 tahun kemudian.</em></li>
        <li><strong>Rental Yield (Sewa):</strong> Keuntungan rutin dari uang sewa. Cocok untuk daerah matang (sunset) seperti Jakarta Pusat atau dekat kampus.
          <br/><em>Rumus Yield = (Harga Sewa Setahun / Harga Properti) x 100%. Target sehat: 5-7%.</em></li>
      </ul>

      <h3>Strategi 1: Buy on Rumor, Sell on News</h3>
      <p>Masuklah ke pasar saat infrastruktur baru "direncanakan" (Rumor). Harganya masih murah. Saat infrastruktur jadi (News) dan harga melambung, itulah saatnya <em>exit strategy</em> (jual). Jangan terbalik!</p>

      <h3>Strategi 2: The BRRRR Method</h3>
      <p>Metode populer investor global: Buy, Rehab, Rent, Refinance, Repeat.</p>
      <ol>
        <li><strong>Buy:</strong> Beli properti "jelek" di lokasi bagus dengan harga di bawah pasar (Distressed Asset).</li>
        <li><strong>Rehab:</strong> Renovasi kosmetik (cat ulang, ganti fasad) untuk menaikkan nilai (Value Adding).</li>
        <li><strong>Rent:</strong> Sewakan untuk menutup cicilan bank.</li>
        <li><strong>Refinance:</strong> Ajukan penilaian ulang ke bank. Karena nilai naik setelah renovasi, bank bisa mencairkan dana segar (Top Up KPR).</li>
        <li><strong>Repeat:</strong> Gunakan dana segar tadi untuk DP properti berikutnya.</li>
      </ol>

      <h3>Kesalahan Fatal Investor Pemula</h3>
      <ul>
        <li><strong>Emosional:</strong> Membeli karena "desainnya lucu" bukan karena hitungan angkanya masuk. Ingat, Anda berinvestasi, bukan mencari rumah tinggal pribadi.</li>
        <li><strong>Over-Leverage:</strong> Hutang terlalu besar. Jika penyewa pergi (vacant), Anda tidak sanggup bayar cicilan dan aset disita bank.</li>
        <li><strong>Salah Lokasi:</strong> Membeli apartemen mewah di daerah kumuh, atau ruko mewah di jalan mati.</li>
      </ul>
    `
  },
  {
    id: 5,
    category: 'Sewa',
    title: 'Panduan Menyewa Ruko: Ceklis Wajib Sebelum Tanda Tangan',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min baca',
    date: '02 Jan 2026',
    author: 'Admin Yeobo',
    content: `
      <p>Menyewa ruko untuk usaha berbeda dengan menyewa rumah tinggal. Ada faktor komersial dan legalitas bisnis yang harus diperhatikan agar usaha Anda tidak disegel Satpol PP di tengah jalan.</p>
      
      <h3>Cek Zonasi Usaha</h3>
      <p>Ini yang paling sering luput. Pastikan ruko berada di <strong>Zona Komersial (Zona K1/K2)</strong>. Jika ruko berada di Zona Residensial (R), Anda mungkin tidak bisa mengurus Izin Usaha (NIB/OSS) untuk jenis usaha tertentu (misal bengkel atau pabrik roti).</p>

      <h3>Fisik Bangunan & Utilitas</h3>
      <ul>
        <li><strong>Daya Listrik:</strong> Usaha butuh daya besar (AC sentral, mesin kopi, komputer server). Pastikan daya cukup atau tanya biaya tambah daya (BP).</li>
        <li><strong>Air:</strong> Apakah menggunakan PDAM atau Air Tanah? Jika air tanah, cek kualitasnya (berbau/kuning?). Restoran wajib air bersih.</li>
        <li><strong>Lahan Parkir:</strong> Aturan di Bekasi cukup ketat. Rasio parkir yang buruk akan membunuh bisnis ritel Anda karena pelanggan malas mampir.</li>
      </ul>

      <h3>Perjanjian Sewa (Drafting Agreement)</h3>
      <p>Jangan pakai template standar toko buku. Tambahkan pasal krusial:</p>
      <ul>
        <li><strong>Force Majeure:</strong> Bagaimana jika terjadi pandemi lagi atau banjir besar? Apakah ada keringanan sewa?</li>
        <li><strong>Renovasi:</strong> Apakah penyewa boleh merombak sekat? Siapa pemilik partisi kaca/AC yang dipasang penyewa saat sewa berakhir? (Banyak sengketa di sini).</li>
        <li><strong>Pajak Sewa (PPh Final):</strong> PPh Pasal 4 ayat 2 sebesar 10% adalah kewajiban pemilik ruko (dipotong dari uang sewa), tapi seringkali pemilik minta "terima bersih". Sepakati siapa yang bayar 10% ini.</li>
      </ul>
    `
  },
  {
    id: 6,
    category: 'Renovasi',
    title: 'Estimasi Biaya Renovasi Rumah Standar per m2 (Update 2026)',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min baca',
    date: '28 Dec 2025',
    author: 'Arsitek Indo',
    content: `
      <p>Renovasi seringkali <em>overbudget</em>. Rumus utamanya: Selalu siapkan dana extra 20-30% dari Rencana Anggaran Biaya (RAB). Berikut acuan harga pasar untuk wilayah Jabodetabek tahun 2026.</p>

      <h3>Harga Borongan per Meter Persegi</h3>
      <ul>
        <li><strong>Renovasi Ringan (Cat, Plafon, Lantai keramik biasa):</strong> Rp 1.5 - 2.5 Juta / m2.</li>
        <li><strong>Renovasi Menengah (Nambah kamar, bongkar sekat, granit 60x60):</strong> Rp 3.5 - 4.5 Juta / m2.</li>
        <li><strong>Renovasi Mewah (Marmer, Jati, Smart home, 2 Lantai):</strong> Rp 5.5 - 8 Juta++ / m2.</li>
      </ul>

      <h3>Harga Material Utama (Indeks 2026)</h3>
      <table class="w-full border-collapse border border-slate-300 mt-4 mb-4 text-sm bg-white">
        <thead>
           <tr class="bg-slate-100">
             <th class="border border-slate-300 p-2 text-left">Material</th>
             <th class="border border-slate-300 p-2 text-right">Estimasi Harga</th>
           </tr>
        </thead>
        <tbody>
           <tr><td class="border border-slate-300 p-2">Semen (50kg)</td><td class="border border-slate-300 p-2 text-right">Rp 65.000 - 75.000</td></tr>
           <tr><td class="border border-slate-300 p-2">Pasir (1 pickup)</td><td class="border border-slate-300 p-2 text-right">Rp 300.000 - 450.000</td></tr>
           <tr><td class="border border-slate-300 p-2">Bata Ringan (per kubik)</td><td class="border border-slate-300 p-2 text-right">Rp 550.000 - 650.000</td></tr>
           <tr><td class="border border-slate-300 p-2">Cat Tembok (25kg Premium)</td><td class="border border-slate-300 p-2 text-right">Rp 1.5 - 2.2 Juta</td></tr>
        </tbody>
      </table>

      <h3>Tips Hemat Renovasi</h3>
      <ul>
        <li><strong>Pertahankan Titik Air:</strong> Memindahkan kamar mandi atau dapur itu mahal karena harus bongkar jalur pipa (plumbing). Usahakan layout toilet tetap.</li>
        <li><strong>Sistem Borong Tenaga:</strong> Anda belanja material sendiri, tukang dibayar borongan tenaga. Ini mencegah <em>mark-up</em> harga material oleh mandor, tapi capek di logistik.</li>
        <li><strong>Hindari Desain Melengkung:</strong> Dinding atau profil lengkung (curve) memakan waktu kerja 3x lipat dibanding sudut siku. <em>Time is money</em> bagi tukang.</li>
      </ul>
    `
  },
  {
    id: 7,
    category: 'Pajak',
    title: 'Panduan Pajak Properti: BPHTB, PPh, PBB, dan Nio',
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=800',
    readTime: '9 min baca',
    date: '20 Dec 2025',
    author: 'Konsultan Pajak',
    content: `
      <p>Transaksi properti adalah sasaran empuk pajak negara. Jangan sampai kaget saat di hadapan Notaris karena tiba-tiba muncul tagihan puluhan juta rupiah. Siapa bayar apa?</p>

      <h3>1. Kewajiban Penjual: PPh Final</h3>
      <p>Pajak Penghasilan (PPh) atas pengalihan hak atas tanah dan/atau bangunan.</p>
      <ul>
        <li><strong>Tarif:</strong> 2.5% dari Nilai Transaksi (atau NJOP, mana yang lebih tinggi).</li>
        <li><strong>Kapan Bayar:</strong> Sebelum tanda tangan Akta Jual Beli (AJB).</li>
        <li><strong>Rumus:</strong> 2.5% x Harga Jual.</li>
      </ul>

      <h3>2. Kewajiban Pembeli: BPHTB</h3>
      <p>Bea Perolehan Hak atas Tanah dan Bangunan. Ini pajak daerah (Pemda).</p>
      <ul>
        <li><strong>Tarif:</strong> 5% dari (Nilai Transaksi - NPOPTKP).</li>
        <li><strong>NPOPTKP:</strong> Nilai Perolehan Objek Pajak Tidak Kena Pajak. Tiap daerah beda. Di Bekasi misal Rp 60 Juta, di Jakarta bisa Rp 80 Juta - 300 Juta.</li>
        <li><strong>Simulasi:</strong> Beli rumah Rp 500 Juta di Bekasi. NPOPTKP Rp 60 Juta.<br/>
        5% x (500jt - 60jt) = 5% x 440jt = <strong>Rp 22.000.000</strong> (Wajib cash!).</li>
      </ul>

      <h3>3. PBB (Pajak Bumi Bangunan)</h3>
      <p>Pajak tahunan. Saat transaksi jual beli, penjual wajib melunasi tunggakan PBB tahun-tahun sebelumnya. Notaris akan meminta bukti lunas PBB (STTS) 5 tahun terakhir.</p>

      <h3>4. PNBP (Penerimaan Negara Bukan Pajak)</h3>
      <p>Biaya resmi di BPN untuk  Balik Nama sertifikat dan Pengecekan Sertifikat (Zoning/Sengketa). Rumusnya: (1/1000 x Nilai Tanah) + Rp 50.000.</p>
    `
  },
  {
    id: 8,
    category: 'Tips',
    title: 'Checklist Lingkungan Sehat: Jangan Beli Rumah di Sini!',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min baca',
    date: '15 Dec 2025',
    author: 'Dr. House',
    content: `
      <p>Rumah bagus bisa direnovasi, tapi lingkungan buruk itu permanen. Sebelum deal, lakukan investigasi ala detektif ke calon lingkungan rumah Anda.</p>

      <h3>The Big NO-NO (Red Flags)</h3>
      <ul>
        <li><strong>Dekat SUTET (Tegangan Tinggi):</strong> Radiasi elektromagnetik jangka panjang isu kesehatan + harga jual kembali jatuh.</li>
        <li><strong>Tusuk Sate (T-Junction) di Jalan Ramai:</strong> Bahaya kecelakaan, lampu sorot kendaraan malam hari, dan mitos fengshui (energi terlalu keras) yang membuat susah dijual lagi.</li>
        <li><strong>Dekat TPA (Pembuangan Sampah) / Kuburan:</strong> Bau, air tanah tercemar bakteri E.Coli, dan kesan seram.</li>
        <li><strong>Cekungan Banjir:</strong> Lihat got/selokan. Adakah bekas lumut atau garis air tinggi di pagar tetangga? Itu tanda bekas banjir surut.</li>
      </ul>

      <h3>Fasilitas Sosial yang Wajib Ada</h3>
      <ol>
        <li><strong>Ruang Terbuka Hijau (RTH):</strong> Taman bermain anak. Perumahan yang baik menyisihkan 30-40% lahan untuk fasos/fasum.</li>
        <li><strong>Sistem Satu Pintu (One Gate):</strong> Keamanan lebih terjamin dari maling.</li>
        <li><strong>Lebar Jalan (ROW):</strong> Minimal bisa papasan 2 mobil (ROW 6-7 meter). Jangan beli di gang senggol jika Anda punya mobil, nanti ribut sesama tetangga soal parkir.</li>
      </ol>
    `
  }
];
