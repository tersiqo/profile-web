document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu elements
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });
  }

  // Scroll Header Shadow & Active Navigation
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-sm', 'border-slate-300');
    } else {
      navbar.classList.remove('shadow-sm', 'border-slate-300');
    }
  });

  // Reveal elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Rich Project Case Study Data
  const projectsData = {
    'banteng-squad': {
      title: 'BooyahHub — Esports Scrim Platform',
      tag: 'Mobile Application / 2026',
      role: '👑 Lead Mobile Developer',
      team: '👥 4-Member Team',
      tagline: 'Platform mobile manajemen turnamen esports scrim dengan sinkronisasi slot real-time dan verifikasi pembayaran instan.',
      github: 'https://github.com/azariaamanda/Mobile_BooyahHub.git',
      demo: '',
      client: 'Banteng Squad Esports / Polinema',
      architecture: 'Cross-Platform Mobile App + Supabase Backend',
      image: './assets/images/banteng_squad_mockup.png',
      caption: 'BooyahHub Mobile Scrim Platform Showcase',
      gallery: [
        { title: 'Main Mockup', src: './assets/images/banteng_squad_mockup.png' },
        { title: 'Home & Banner', src: './assets/images/booyahhub/screen1.png' },
        { title: 'Scrim Catalog', src: './assets/images/booyahhub/screen2.png' },
        { title: 'Slot Booking Flow', src: './assets/images/booyahhub/screen3.png' },
        { title: 'Schedule & Profile', src: './assets/images/booyahhub/screen4.png' }
      ],
      description: 'Komunitas esports sering kali menghadapi kendala saat mengelola turnamen scrim: pendaftaran manual via chat yang rawan bentrok slot tim, bukti pembayaran palsu, serta pencatatan klasemen yang lambat. BooyahHub hadir sebagai platform mobile terpusat untuk mengotomatiskan seluruh alur turnamen esports dari reservasi slot hingga papan klasemen.',
      features: [
        { title: 'Real-time Slot Booking', desc: 'Sinkronisasi ketersediaan slot turnamen secara instan menggunakan Supabase Realtime, mencegah tabrakan reservasi antar tim.' },
        { title: 'Automated Payment Verification', desc: 'Validasi upload bukti transfer pembayaran dan alur persetujuan admin yang cepat.' },
        { title: 'Live Match Schedules & Standings', desc: 'Katalog turnamen interaktif dengan filter scrim terpopuler, terkini, dan riwayat pertandingan.' },
        { title: 'High-Performance UI', desc: 'Antarmuka responsif berbasis Flutter dengan performa konsisten 60fps di berbagai tipe smartphone Android.' }
      ],
      contributions: [
        'Memimpin tim pengembang beranggotakan 4 orang dalam perancangan arsitektur sistem dan pembagian modul aplikasi.',
        'Mengintegrasikan backend Supabase untuk manajemen basis data PostgreSQL, autentikasi pengguna, dan Row-Level Security (RLS).',
        'Membangun logika sinkronisasi data real-time untuk ketersediaan slot scrim agar terhindar dari kondisi race condition.',
        'Mengimplementasikan seluruh komponen antarmuka (UI/UX) di Flutter berdasarkan rancangan kustom di Figma.'
      ],
      tech: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Figma', 'REST API']
    },
    'lab-se': {
      title: 'Laboratorium Software Engineering Polinema',
      tag: 'Institutional Web & CMS / 2025',
      role: '🛠️ Full-Stack & Database Developer',
      team: '👥 5-Member PBL Team',
      tagline: 'Portal resmi dan Content Management System (CMS) pusat riset rekayasa perangkat lunak Politeknik Negeri Malang.',
      github: 'https://github.com/jsofiah/PBL-LabSE.git',
      demo: '',
      client: 'Jurusan Teknologi Informasi — POLINEMA',
      architecture: 'Institutional Web Portal with Relational CMS',
      image: './assets/images/lab_se_mockup.png',
      caption: 'Portal Resmi Lab Software Engineering Polinema',
      gallery: [
        { title: 'Main Showcase', src: './assets/images/lab_se_mockup.png' }
      ],
      description: 'Pengembangan portal web profil dan sistem manajemen konten (CMS) resmi untuk Laboratorium Software Engineering Polinema. Website ini berfungsi sebagai etalase publikasi ilmiah dosen, peta jalan (roadmap) riset rekayasa perangkat lunak, direktori artikel, reservasi fasilitas lab, serta komunitas mahasiswa SE Geeks.',
      features: [
        { title: 'Roadmap Riset Interaktif', desc: 'Visualisasi alur kurikulum dan fokus riset laboratorium yang mudah dipahami mahasiswa.' },
        { title: 'Katalog Publikasi Dosen', desc: 'Direktori artikel ilmiah, paten, dan jurnal karya dosen dan peneliti lab terintegrasi.' },
        { title: 'Manajemen Fasilitas & Galeri', desc: 'Modul CMS untuk memperbarui inventaris perangkat riset, workstation, dan dokumentasi kegiatan.' },
        { title: 'Responsive Institutional Design', desc: 'Tampilan elegan dan bersih sesuai standar branding institusi modern.' }
      ],
      contributions: [
        'Memodelkan kebutuhan sistem dan diagram alur data (ERD, PDM, Use Case Diagram, dan Activity Diagram).',
        'Mengembangkan arsitektur basis data relasional MySQL dan query relasional untuk direktori artikel dan publikasi.',
        'Membangun modul frontend dan backend menggunakan PHP, Tailwind CSS, dan JavaScript.',
        'Merancang wireframe Low-Fidelity dan High-Fidelity di Figma untuk halaman visi misi, fasilitas, dan roadmap.'
      ],
      tech: ['PHP', 'Laravel', 'Tailwind CSS', 'MySQL', 'JavaScript', 'Blade', 'Figma']
    },
    'rentalbase': {
      title: 'RentalBase — Multi-Tenant Equipment Rental SaaS',
      tag: 'SaaS Platform / 2026',
      role: '📋 Project Manager & Full-Stack Developer',
      team: '👥 PBL Development Team',
      tagline: 'Platform SaaS multi-tenant untuk otomatisasi bisnis rental kamera, peralatan studio, dan perlengkapan fisik.',
      github: 'https://github.com/tersiqo/RentalBase',
      demo: 'https://tersiqo.my.id',
      client: 'RentalBase SaaS Ecosystem',
      architecture: 'Multi-Tenant Modular Monolith with Docker',
      image: './assets/images/rentalbase/rentalbase_dashboard.png',
      caption: 'A-01: Admin Dashboard Operasional (KameraKu Studio Malang)',
      gallery: [
        { title: 'Admin Dashboard', src: './assets/images/rentalbase/rentalbase_dashboard.png' },
        { title: 'Official Landing Page', src: './assets/images/rentalbase/rentalbase_landing.png' },
        { title: 'Tenant Catalog', src: './assets/images/rentalbase/rentalbase_catalog.png' },
        { title: 'Cross-Branch Analytics', src: './assets/images/rentalbase/rentalbase_analytics.png' },
        { title: 'Orders & Return Penalty', src: './assets/images/rentalbase/rentalbase_orders.png' },
        { title: 'Desktop Setup Mockup', src: './assets/images/rentalbase_mockup.png' }
      ],
      description: 'Bisnis rental peralatan fisik skala menengah sering mengalami kerugian akibat pencatatan ketersediaan barang yang tumpang tindih, denda pengembalian yang tidak terkontrol, serta isolasi data antar cabang yang rumit. RentalBase dirancang sebagai platform SaaS multi-tenant yang memungkinkan pemilik usaha rental mengoperasikan portal toko dan dashboard operasional mandiri secara efisien.',
      features: [
        { title: 'Multi-Tenant Architecture', desc: 'Isolasi data antar penyewa bisnis dengan subdomain kustom dan konfigurasi tema toko mandiri.' },
        { title: 'Real-time Unit Availability', desc: 'Kalender booking terintegrasi untuk melacak status peralatan (Tersedia, Disewa, Dicuci, Rusak).' },
        { title: 'Automated Invoicing & Late Fees', desc: 'Perhitungan denda retur otomatis, manajemen deposit keamanan, dan cetak invoice digital.' },
        { title: 'Cloud-Ready Containerization', desc: 'Terkonfigurasi penuh dengan Docker untuk deployment instan di platform Render dan Cloudflare.' }
      ],
      contributions: [
        'Bertindak sebagai Project Manager dalam memimpin siklus hidup pengembangan sistem (Agile), perencanaan sprint, dan spesifikasi SRS.',
        'Merancang dan membangun arsitektur backend full-stack menggunakan Laravel dan komponen reaktif Livewire.',
        'Mendesain skema basis data relasional PostgreSQL yang ternormalisasi untuk menangani transaksi persewaan konkuren.',
        'Menyiapkan setup Dockerfile, konfigurasi Nginx, dan pipeline deployment ke cloud infrastructure.'
      ],
      tech: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js', 'PostgreSQL', 'Docker', 'Figma']
    },
    // Aliases
    'aura-banking': null,
    'lumina-furniture': null
  };
  projectsData['aura-banking'] = projectsData['banteng-squad'];
  projectsData['lumina-furniture'] = projectsData['lab-se'];

  // Enhanced Modal Logic
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');

  window.openProjectModal = function(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    // Header info
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-role').textContent = data.role;
    document.getElementById('modal-team').textContent = data.team;
    document.getElementById('modal-tagline').textContent = data.tagline;

    // Links
    const ghBtn = document.getElementById('modal-github');
    if (data.github) {
      ghBtn.href = data.github;
      ghBtn.classList.remove('hidden');
    } else {
      ghBtn.classList.add('hidden');
    }

    const demoBtn = document.getElementById('modal-demo');
    if (data.demo) {
      demoBtn.href = data.demo;
      demoBtn.classList.remove('hidden');
    } else {
      demoBtn.classList.add('hidden');
    }

    // Main Preview Image & Caption
    const mainImg = document.getElementById('modal-img');
    const captionEl = document.getElementById('modal-img-caption');
    mainImg.src = data.image;
    captionEl.textContent = data.caption || data.title;

    // Interactive Screenshots Gallery
    const gallerySection = document.getElementById('modal-gallery-section');
    const galleryContainer = document.getElementById('modal-gallery');
    
    if (data.gallery && data.gallery.length > 0) {
      gallerySection.classList.remove('hidden');
      galleryContainer.innerHTML = data.gallery.map((item, idx) => `
        <button type="button" onclick="switchModalPreview('${item.src}', '${item.title.replace(/'/g, "\\'")}')" class="group relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 aspect-video hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-left">
          <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors"></div>
          <span class="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-mono text-white truncate drop-shadow-sm font-semibold">${item.title}</span>
        </button>
      `).join('');
    } else {
      gallerySection.classList.add('hidden');
    }

    // Overview & Details
    document.getElementById('modal-desc').textContent = data.description;

    // Features
    const featuresContainer = document.getElementById('modal-features');
    if (data.features && data.features.length > 0) {
      featuresContainer.innerHTML = data.features.map(f => `
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div class="font-bold text-slate-900 flex items-center gap-1.5">
            <span class="text-blue-600">✦</span>
            <span>${f.title}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${f.desc}</p>
        </div>
      `).join('');
    } else {
      featuresContainer.innerHTML = '';
    }

    // Contributions
    const contribContainer = document.getElementById('modal-contributions');
    if (data.contributions && data.contributions.length > 0) {
      contribContainer.innerHTML = data.contributions.map(c => `
        <li class="leading-relaxed pl-1"><span class="text-slate-800">${c}</span></li>
      `).join('');
    } else {
      contribContainer.innerHTML = '';
    }

    // Sidebar Meta
    document.getElementById('modal-client').textContent = data.client;
    document.getElementById('modal-architecture').textContent = data.architecture;

    // Tech Chips
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.tech.map(item => 
      `<span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white text-slate-800 border border-slate-200 shadow-2xs">${item}</span>`
    ).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.switchModalPreview = function(src, caption) {
    const mainImg = document.getElementById('modal-img');
    const captionEl = document.getElementById('modal-img-caption');
    mainImg.src = src;
    captionEl.textContent = caption;
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  // Toast Notification
  window.showToast = function(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-2xl flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300';
      toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> <span id="toast-text" class="text-xs font-mono font-medium"></span>`;
      document.body.appendChild(toast);
    }
    
    document.getElementById('toast-text').textContent = message;
    toast.classList.remove('translate-y-10', 'opacity-0');
    
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
    }, 3500);
  };

  // Copy Email Functionality
  window.copyEmail = function() {
    const email = "tersiqo.alfarezel@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("Email tersiqo.alfarezel@gmail.com copied to clipboard!");
    }).catch(() => {
      showToast("Email: tersiqo.alfarezel@gmail.com");
    });
  };

  // =========================================================
  // ANTI-MAINSTREAM ANIMATIONS: CYBER DECODER & SCRAMBLE EFFECT
  // =========================================================
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________010101';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText || '';
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 22);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="text-blue-600 font-mono">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  // Trigger Scramble on elements with data-scramble
  const scrambleElements = document.querySelectorAll('[data-scramble]');
  scrambleElements.forEach((el, index) => {
    const originalText = el.getAttribute('data-scramble') || el.innerText;
    el.innerText = '';
    const fx = new TextScramble(el);
    setTimeout(() => {
      fx.setText(originalText);
    }, 250 + (index * 220));
  });

  // =========================================================
  // ANTI-MAINSTREAM ANIMATIONS: RAPID NUMERIC ODOMETER TICKER
  // =========================================================
  function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach((counter, idx) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1400; // ms
      let startTime = null;

      function updateNumber(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing curve (ease-out cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);
        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target + suffix;
        }
      }

      setTimeout(() => {
        requestAnimationFrame(updateNumber);
      }, 500 + (idx * 150));
    });
  }
  initCounters();

  // =========================================================
  // ANTI-MAINSTREAM ANIMATIONS: 3D PARALLAX TILT ON HERO PORTRAIT
  // =========================================================
  const tiltCard = document.querySelector('.tilt-card-wrapper');
  const tiltInner = document.querySelector('.tilt-card-inner');
  if (tiltCard && tiltInner) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      tiltInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltInner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
});
