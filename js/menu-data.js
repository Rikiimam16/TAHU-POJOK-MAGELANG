/**
 * ====================================================================
 * DATA MENU ASLI - TAHU POJOK MAGELANG (SESUAI GOOGLE MAPS & FOTO ASLI)
 * ====================================================================
 * Data menu, harga, dan foto asli yang dikumpulkan langsung dari
 * warung legendaris Tahu Pojok Magelang (Jl. Sutopo No. 15).
 * ====================================================================
 */

const MENU_DATA = [
  // ------------------------------------------------------------------
  // 1. MENU UTAMA
  // ------------------------------------------------------------------
  {
    id: 'kt-telur',
    name: 'Kupat Tahu + Telur (Dadar / Ceplok)',
    category: 'utama',
    categoryLabel: 'Menu Utama',
    price: 23000,
    priceFormatted: 'Rp 23.000',
    badge: 'Paling Laris ⭐',
    badgeType: 'gold',
    tags: ['Best Seller', 'Favorit Pak SBY', 'Dengan Telur'],
    image: 'assets/images/kupat-tahu_telur.webp',
    description: 'Menu favorit utama pelanggan dan para tokoh nasional. Ketupat pulen, tahu Magelang goreng lembut, bakwan garing, tauge, kol mentah, dan telur dadar tebal/ceplok, disiram kuah bumbu kacang encer gurih-manis segar.'
  },
  {
    id: 'kt-biasa',
    name: 'Kupat Tahu Biasa (Original Tanpa Telur)',
    category: 'utama',
    categoryLabel: 'Menu Utama',
    price: 18000,
    priceFormatted: 'Rp 18.000',
    badge: 'Resep Asli 1942',
    badgeType: 'green',
    tags: ['Resep Asli 1942', '100% Halal', 'Vegetarian Friendly'],
    image: 'assets/images/kupat-tahu-biasa.webp',
    description: 'Porsi klasik autentik sejak masa kemerdekaan. Perpaduan kupat lembut, tahu putih goreng hangat, potongan bakwan renyah, kubis, kecambah segar, dan kuah kecap kacang racikan khas tempo dulu.'
  },
  {
    id: 'kt-jumbo',
    name: 'Kupat Tahu Porsi Jumbo',
    category: 'utama',
    categoryLabel: 'Menu Utama',
    price: 22000,
    priceFormatted: 'Rp 22.000',
    badge: 'Porsi Mantap',
    badgeType: 'warm',
    tags: ['Porsi Besar', 'Ekstra Kenyang'],
    image: 'assets/images/kupat-tahu-jumbo.webp',
    description: 'Porsi ekstra kenyang dengan potongan ketupat dan tahu goreng berlimpah bagi yang ingin santap siang lebih puas dan mantap.'
  },

  // ------------------------------------------------------------------
  // 2. LAUK & PELENGKAP
  // ------------------------------------------------------------------
  {
    id: 'aneka-gorengan',
    name: 'Aneka Gorengan (Bakwan & Tahu Goreng)',
    category: 'pelengkap',
    categoryLabel: 'Lauk & Pelengkap',
    price: 3000,
    priceFormatted: 'Rp 3.000 / biji',
    badge: 'Gorengan Meja ⭐',
    badgeType: 'gold',
    tags: ['Gorengan Meja', 'Bakwan & Tahu', 'Kriuk Gurih'],
    image: 'assets/images/gorengan.webp',
    description: 'Pilihan aneka gorengan hangat di meja seperti bakwan sayur garing renyah, tahu isi gurih, dan tempe goreng yang nikmat disantap langsung atau dicelup ke kuah bumbu kacang.'
  },
  {
    id: 'sate-udang',
    name: 'Sate Udang Goreng',
    category: 'pelengkap',
    categoryLabel: 'Lauk & Pelengkap',
    price: 5000,
    priceFormatted: 'Rp 5.000 / tusuk',
    badge: 'Pelengkap Favorit ⭐',
    badgeType: 'gold',
    tags: ['Favorit Pengunjung', 'Udang Renyah'],
    image: 'assets/images/sate-udang.webp',
    description: 'Tusukan udang segar berbalut adonan tepung berbumbu rempah gurih renyah keemasan, pendamping nomor satu saat menikmati kupat tahu.'
  },
  {
    id: 'slondok-magelang',
    name: 'Kerupuk Slondok Khas Magelang',
    category: 'pelengkap',
    categoryLabel: 'Lauk & Pelengkap',
    price: 5000,
    priceFormatted: 'Rp 5.000 / bungkus',
    badge: 'Khas Magelang ⭐',
    badgeType: 'warm',
    tags: ['Oleh-Oleh Khas', 'Kriuk Gurih'],
    image: 'assets/images/slondok.webp',
    description: 'Kerupuk slondok singkong khas Magelang berbentuk cincin renyah gurih. Camilan wajib di meja Tahu Pojok Magelang yang sangat disukai pengunjung.'
  },
  {
    id: 'kerupuk-putih',
    name: 'Kerupuk Bawang Putih / Kaleng',
    category: 'pelengkap',
    categoryLabel: 'Lauk & Pelengkap',
    price: 2000,
    priceFormatted: 'Rp 2.000 / bungkus',
    badge: 'Kriuk Meja',
    badgeType: 'warm',
    tags: ['Renyah Gurih'],
    image: 'assets/images/kerupuk.webp',
    description: 'Kerupuk kaleng putih bulat renyah pelengkap santap kupat tahu tradisional.'
  },

  // ------------------------------------------------------------------
  // 3. ANEKA MINUMAN
  // ------------------------------------------------------------------
  {
    id: 'es-tape',
    name: 'Es Tape Ketan Khas',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 7000,
    priceFormatted: 'Rp 7.000',
    badge: 'Favorit Pengunjung ⭐',
    badgeType: 'gold',
    tags: ['Menu Khas', 'Segar Alami'],
    image: 'assets/images/es-tape.webp',
    description: 'Minuman ikonik favorit para pelanggan Tahu Pojok Magelang. Olahan tape ketan manis asam alami berpadu es dingin, penetralisir sempurna setelah menikmati kupat tahu.'
  },
  {
    id: 'wedang-ronde',
    name: 'Wedang Ronde Asli',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 8000,
    priceFormatted: 'Rp 8.000',
    badge: 'Hangat Berempah',
    badgeType: 'warm',
    tags: ['Wedangan Tradisional', 'Jahe Asli'],
    image: 'assets/images/wedang-ronde.webp',
    description: 'Semangkuk wedangan hangat kuah jahe wangi dengan bulatan ronde kenyal isi kacang, kolang-kaling, dan kacang tanah sangrai. Pas untuk suasana sejuk Kota Magelang.'
  },
  {
    id: 'wedang-roti',
    name: 'Wedang Roti Tradisional',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 8000,
    priceFormatted: 'Rp 8.000',
    badge: 'Wedangan Khas',
    badgeType: 'warm',
    tags: ['Santan Gurih', 'Roti Lembut'],
    image: 'assets/images/wedang-roti.webp',
    description: 'Minuman hangat santan gurih manis berpadu potongan roti tawar lembut, kolang-kaling, dan aroma pandan wangi khas tempo dulu.'
  },
  {
    id: 'es-campur-dawet',
    name: 'Es Campur / Es Dawet',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 8000,
    priceFormatted: 'Rp 8.000',
    badge: 'Manis Segar',
    badgeType: 'green',
    tags: ['Gula Asli', 'Segar Mantap'],
    image: 'assets/images/es-campur.webp',
    description: 'Es tradisional segar dengan racikan dawet lembut, jelly, santan gurih, dan sirup gula kelapa asli khas Jawa Tengah.'
  },
  {
    id: 'es-teh-manis',
    name: 'Es Teh Manis / Teh Hangat',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 4000,
    priceFormatted: 'Rp 4.000',
    badge: 'Paling Laris',
    badgeType: 'warm',
    tags: ['Aroma Melati', 'Gula Tebu'],
    image: 'assets/images/teh-manis.webp',
    description: 'Seduhan teh melati wangi khas Jawa dengan pemanis gula tebu asli. Pilihan tepat pembilas rasa setelah bersantap.'
  },
  {
    id: 'es-teh-tawar',
    name: 'Es Teh Tawar / Teh Tawar Hangat',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    badge: 'Bebas Gula',
    badgeType: 'green',
    tags: ['Melati Alami'],
    image: 'assets/images/teh-tawar.webp',
    description: 'Seduhan daun teh melati pekat tanpa gula yang menyegarkan tenggorokan.'
  },
  {
    id: 'es-jeruk',
    name: 'Jeruk Peras (Es / Hangat)',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 5000,
    priceFormatted: 'Rp 5.000',
    badge: 'Segar & Vit C 🍊',
    badgeType: 'gold',
    tags: ['Perasan Asli'],
    image: 'assets/images/es-jeruk.webp',
    description: 'Perasan jeruk segar asli dengan rasa manis asam alami kaya vitamin C yang menyegarkan.'
  },
  {
    id: 'air-mineral',
    name: 'Air Mineral Botol',
    category: 'minuman',
    categoryLabel: 'Minuman',
    price: 4000,
    priceFormatted: 'Rp 4.000',
    badge: 'Higienis',
    badgeType: 'green',
    tags: ['Dingin / Biasa'],
    image: 'assets/images/air-mineral.webp',
    description: 'Air mineral kemasan botol higienis pilihan dingin menyegarkan atau suhu ruang.'
  }
];

// Nomor WhatsApp tujuan
const WHATSAPP_NUMBER = '6281578566127';
const WHATSAPP_DISPLAY = '0815-7856-6127';
