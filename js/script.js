/**
 * ====================================================================
 * SCRIPT JAVASCRIPT UTAMA - TAHU POJOK MAGELANG
 * ====================================================================
 * Mengelola interaktivitas:
 * 1. Render Menu Dinamis dari MENU_DATA (js/menu-data.js)
 * 2. Filter Kategori Interaktif
 * 3. Pencarian Menu Live Search
 * 4. Generator Pesan Pemesanan WhatsApp
 * 5. Fallback Gambar Otomatis (Anti-Broken Image)
 * 6. Sticky Navbar & Mobile Drawer
 * 7. Salin Alamat & Toast Notification
 * 8. Back to Top Button
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Komponen
  initMenuCatalog();
  initNavbar();
  initNavSpy();
  initScrollEffects();
  initAddressCopy();
  initBackToTop();
});

/**
 * --------------------------------------------------------------------
 * 1. PENGELOLAAN KATALOG MENU (RENDER, FILTER, SEARCH)
 * --------------------------------------------------------------------
 */
let currentCategory = 'all';
let searchKeyword = '';

function initMenuCatalog() {
  const menuContainer = document.getElementById('menu-items-grid');
  const searchInput = document.getElementById('menu-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!menuContainer || typeof MENU_DATA === 'undefined') return;

  // Update angka badge jumlah menu di tombol filter
  updateCategoryCounts();

  // Render awal semua menu
  renderMenuGrid();

  // Event Listener: Filter Kategori
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      renderMenuGrid();
    });
  });

  // Event Listener: Live Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.trim().toLowerCase();
      if (searchClearBtn) {
        searchClearBtn.style.display = searchKeyword.length > 0 ? 'block' : 'none';
      }
      renderMenuGrid();
    });
  }

  // Event Listener: Clear Search
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchKeyword = '';
      searchClearBtn.style.display = 'none';
      searchInput.focus();
      renderMenuGrid();
    });
  }
}

/**
 * Menghitung jumlah item per kategori dan menampilkannya pada pill filter
 */
function updateCategoryCounts() {
  const counts = {
    all: MENU_DATA.length,
    utama: 0,
    pelengkap: 0,
    minuman: 0
  };

  MENU_DATA.forEach(item => {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    const cat = btn.getAttribute('data-category');
    const badge = btn.querySelector('.filter-count');
    if (badge && counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

/**
 * Render kartu menu berdasarkan kategori & pencarian aktif
 */
function renderMenuGrid() {
  const menuContainer = document.getElementById('menu-items-grid');
  if (!menuContainer) return;

  // Filter data
  const filtered = MENU_DATA.filter(item => {
    const matchCategory = (currentCategory === 'all') || (item.category === currentCategory);
    const matchSearch = !searchKeyword || 
      item.name.toLowerCase().includes(searchKeyword) ||
      item.description.toLowerCase().includes(searchKeyword) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchKeyword)));

    return matchCategory && matchSearch;
  });

  // Kosongkan container
  menuContainer.innerHTML = '';

  // Jika tidak ada menu yang cocok
  if (filtered.length === 0) {
    menuContainer.innerHTML = `
      <div class="menu-empty-state">
        <div class="empty-icon"><i class="fa-solid fa-utensils"></i></div>
        <h3 class="empty-title">Menu Tidak Ditemukan</h3>
        <p class="empty-desc">Tidak ada menu yang sesuai dengan kata kunci "${escapeHtml(searchKeyword)}". Silakan coba kata kunci lain.</p>
        <button class="btn btn-primary" onclick="resetSearchFilter()">
          <i class="fa-solid fa-rotate-left"></i> Tampilkan Semua Menu
        </button>
      </div>
    `;
    return;
  }

  // Buat HTML untuk setiap menu
  filtered.forEach(item => {
    const waMessage = `Halo Tahu Pojok Magelang, saya ingin memesan / menanyakan menu: *${item.name}* (${item.priceFormatted}). Apakah masih tersedia?`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // Render tag badges
    const tagsHtml = (item.tags || []).map(tag => `<span class="menu-tag">${tag}</span>`).join('');

    // Badge tipe warna
    const badgeClass = item.badgeType || 'gold';

    const card = document.createElement('article');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-img-wrap">
        <span class="card-badge ${badgeClass}">${item.badge}</span>
        <img 
          src="${item.image}" 
          alt="${escapeHtml(item.name)}" 
          class="menu-img"
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          onerror="handleMenuImageError(this, '${escapeHtml(item.name)}')"
        >
      </div>
      <div class="menu-card-body">
        <div class="menu-header-row">
          <h3 class="menu-item-name">${escapeHtml(item.name)}</h3>
          <span class="menu-item-price">${item.priceFormatted}</span>
        </div>
        <p class="menu-item-desc">${escapeHtml(item.description)}</p>
        <div class="menu-tags-list">
          ${tagsHtml}
        </div>
        <div class="menu-card-action">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-wa">
            <i class="fa-brands fa-whatsapp"></i> Pesan via WhatsApp
          </a>
        </div>
      </div>
    `;
    menuContainer.appendChild(card);
  });
}

/**
 * Reset pencarian & filter
 */
window.resetSearchFilter = function() {
  const searchInput = document.getElementById('menu-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const allFilterBtn = document.querySelector('.filter-btn[data-category="all"]');

  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.style.display = 'none';
  searchKeyword = '';
  currentCategory = 'all';

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (allFilterBtn) allFilterBtn.classList.add('active');

  renderMenuGrid();
};

/**
 * Fallback jika file gambar gagal dimuat (Anti-broken-image)
 * Menghasilkan SVG Data-URI berkualitas dengan palet khas Tahu Pojok Magelang
 */
window.handleMenuImageError = function(imgElement, itemName) {
  // Cegah recursive looping jika data-uri pun gagal
  imgElement.onerror = null;

  const width = 600;
  const height = 450;
  const safeName = (itemName || 'Kupat Tahu').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4A2C18"/>
          <stop offset="50%" stop-color="#321C0E"/>
          <stop offset="100%" stop-color="#211208"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
      <rect x="20" y="20" width="${width-40}" height="${height-40}" rx="16" fill="none" stroke="#C59B27" stroke-width="2" stroke-opacity="0.6"/>
      
      <!-- Piring Ilustrasi -->
      <circle cx="${width/2}" cy="${height/2 - 25}" r="110" fill="#F4EFEA" stroke="#C59B27" stroke-width="4"/>
      <circle cx="${width/2}" cy="${height/2 - 25}" r="92" fill="#5A351C"/>
      
      <!-- Tahu Keemasan -->
      <rect x="${width/2 - 50}" y="${height/2 - 55}" width="42" height="36" rx="6" fill="#D4A732"/>
      <rect x="${width/2 + 8}" y="${height/2 - 60}" width="44" height="40" rx="6" fill="#D4A732"/>
      <rect x="${width/2 - 25}" y="${height/2 - 10}" width="46" height="38" rx="6" fill="#B88628"/>
      
      <!-- Taburan Daun Seledri -->
      <circle cx="${width/2 - 20}" cy="${height/2 - 35}" r="5" fill="#2E5A36"/>
      <circle cx="${width/2 + 25}" cy="${height/2 - 25}" r="5" fill="#2E5A36"/>
      <circle cx="${width/2}" cy="${height/2 + 10}" r="5" fill="#2E5A36"/>

      <!-- Teks Keterangan -->
      <text x="${width/2}" y="${height - 75}" font-family="sans-serif" font-weight="bold" font-size="22" fill="#FFFFFF" text-anchor="middle">
        ${safeName}
      </text>
      <text x="${width/2}" y="${height - 45}" font-family="sans-serif" font-size="14" fill="#E2D4C5" text-anchor="middle">
        Tahu Pojok Magelang
      </text>
    </svg>
  `;

  imgElement.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
};

/**
 * --------------------------------------------------------------------
 * 2. NAVBAR (MOBILE DRAWER)
 * --------------------------------------------------------------------
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Menu Mobile
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
      const isExpanded = toggleBtn.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Tutup drawer ketika nav link diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Tutup jika klik di luar navbar
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }
}

/**
 * Update link aktif di Navbar menggunakan IntersectionObserver native (Zero Reflow)
 * Berjalan asinkron tanpa membebani thread utama saat scroll mobile
 */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const linkMap = new Map();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap.set(href.slice(1), link);
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          const targetLink = linkMap.get(sectionId);
          if (targetLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            targetLink.classList.add('active');
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
}

/**
 * --------------------------------------------------------------------
 * 3. EFEK SCROLL RINGAN & HEMAT SUMBER DAYA (rAF THROTTLED)
 * --------------------------------------------------------------------
 * Mengontrol kelas navbar 'scrolled' dan tombol 'back-to-top' dengan efisien.
 * Menggunakan requestAnimationFrame dan dirty-checking untuk mencegah layout thrashing.
 */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const backBtn = document.getElementById('back-to-top-btn');

  let isTicking = false;
  let isNavbarScrolled = false;
  let isBackBtnVisible = false;

  const onScroll = () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;

        // Sticky Navbar Effect (hanya mutasi DOM jika boolean berubah)
        const shouldScroll = y > 40;
        if (shouldScroll !== isNavbarScrolled) {
          isNavbarScrolled = shouldScroll;
          navbar?.classList.toggle('scrolled', isNavbarScrolled);
        }

        // Back to top Button (hanya mutasi DOM jika boolean berubah)
        if (backBtn) {
          const shouldShowBack = y > 450;
          if (shouldShowBack !== isBackBtnVisible) {
            isBackBtnVisible = shouldShowBack;
            backBtn.classList.toggle('visible', isBackBtnVisible);
          }
        }

        isTicking = false;
      });
      isTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * --------------------------------------------------------------------
 * 4. FITUR SALIN ALAMAT & TOAST NOTIFIKASI
 * --------------------------------------------------------------------
 */
function initAddressCopy() {
  const copyBtn = document.getElementById('btn-copy-address');
  const fullAddress = 'Jl. Sutopo No. 15, Cacaban, Kec. Magelang Tengah, Kota Magelang, Jawa Tengah 56121';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullAddress);
      } else {
        // Fallback untuk browser lama
        const textArea = document.createElement('textarea');
        textArea.value = fullAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      showToast('Alamat Tahu Pojok Magelang berhasil disalin!');
    } catch (err) {
      showToast('Gagal menyalin alamat secara otomatis.');
    }
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${escapeHtml(message)}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/**
 * --------------------------------------------------------------------
 * 5. BACK TO TOP BUTTON CLICK
 * --------------------------------------------------------------------
 */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top-btn');
  if (!backBtn) return;

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Helper: Escape HTML string untuk keamanan XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
