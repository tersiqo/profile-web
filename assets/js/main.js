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
      role: '📋 Assistant Project Manager',
      team: '👥 4-Member PBL Team',
      tagline: 'Mobile tournament and scrimmage management platform with real-time slot synchronization and automated payment verification.',
      github: 'https://github.com/azariaamanda/Mobile_BooyahHub.git',
      demo: '',
      client: 'Banteng Squad Esports / Polinema',
      architecture: 'Cross-Platform Mobile App + Supabase Backend',
      image: './assets/images/banteng_squad_mockup.png',
      caption: 'BooyahHub Mobile Scrim Platform Showcase',
      gallery: [
        { title: 'Device Mockup', src: './assets/images/banteng_squad_mockup.png' },
        { title: 'Home Feed', src: './assets/images/booyahhub/booyah_home.png' },
        { title: 'Scrim Directory', src: './assets/images/booyahhub/booyah_scrim_list.png' },
        { title: 'Scrim Details & Rules', src: './assets/images/booyahhub/booyah_detail_scrim.png' },
        { title: 'Session Schedule Picker', src: './assets/images/booyahhub/booyah_schedule_picker.png' },
        { title: 'Team Registration Form', src: './assets/images/booyahhub/booyah_team_registration.png' },
        { title: 'QRIS Payment & Receipt', src: './assets/images/booyahhub/booyah_payment_qris.png' },
        { title: 'Order Status Tracker', src: './assets/images/booyahhub/booyah_order_status.png' },
        { title: 'Order Details Modal', src: './assets/images/booyahhub/booyah_order_popup.png' },
        { title: 'Match Results & Kill Standings', src: './assets/images/booyahhub/booyah_match_result.png' },
        { title: 'Tournament Leaderboard', src: './assets/images/booyahhub/booyah_leaderboard.png' },
        { title: 'Admin Scrim Dashboard', src: './assets/images/booyahhub/booyah_admin_dashboard.png' },
        { title: 'Admin Participant Verification', src: './assets/images/booyahhub/booyah_admin_verification.png' },
        { title: 'Admin Scrim Management', src: './assets/images/booyahhub/booyah_admin_scrim_mgmt.png' },
        { title: 'Platform Owner Dashboard', src: './assets/images/booyahhub/booyah_owner_dashboard.png' }
      ],
      description: 'Esports communities routinely grapple with operational friction when organizing scrimmage tournaments: manual chat-based registrations prone to team slot collisions, fraudulent payment receipts, and delayed bracket updates. BooyahHub was engineered as a centralized mobile application to streamline end-to-end competitive workflows, from instantaneous slot reservation to automated leaderboards.',
      features: [
        { title: 'Real-time Slot Booking', desc: 'Instant team slot reservations powered by Supabase Realtime webhooks, eliminating concurrent booking race conditions.' },
        { title: 'Automated Payment Verification', desc: 'Secure payment receipt validation pipeline with an expedited approval flow for tournament organizers.' },
        { title: 'Live Match Schedules & Standings', desc: 'Interactive tournament directory featuring real-time bracket tracking, search filters, and historical stats.' },
        { title: 'High-Performance UI Engine', desc: 'Smooth, 60 FPS Flutter client delivering fluid micro-interactions across a wide spectrum of Android devices.' }
      ],
      contributions: [
        'Partnered with the Project Manager to govern the Project-Based Learning (PBL) lifecycle, sprint planning, and comprehensive SRS documentation.',
        'Architected Supabase backend integration with PostgreSQL database schemas, user authentication, and granular Row-Level Security (RLS) policies.',
        'Engineered real-time state synchronization logic for tournament slot allocations to prevent race conditions during high-demand scrim drops.',
        'Developed scalable Flutter frontend widgets aligned with production Figma design specifications and core user journey mappings.'
      ],
      tech: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Figma', 'REST API'],
      architectureDetails: {
        topology: [
          { step: '01', title: 'Client Interaction', desc: 'Flutter mobile client executes client-side form validation and uploads payment slips directly to Supabase Storage with cryptographic hashing.' },
          { step: '02', title: 'State & Realtime Sync', desc: 'Supabase Realtime channels broadcast tournament slot changes across concurrent mobile users via persistent WebSockets (<50ms latency).' },
          { step: '03', title: 'Database & RLS Engine', desc: 'PostgreSQL enforces strict Row-Level Security (RLS) policies. Only registered team leaders can mutate roster entries; organizers hold elevated administrative permissions.' },
          { step: '04', title: 'Automated Scoring & Standings', desc: 'Match results and kill multiplier calculations trigger atomic database functions to recalculate standings without manual spreadsheet reconciliation.' }
        ],
        databaseStrategy: 'PostgreSQL with Granular Row-Level Security (RLS). Schema is divided into normalized tables: tournaments, scrim_slots, teams, roster_members, and match_results with strict foreign key cascading.',
        tradeoffs: 'Mitigated slot-booking race conditions during high-traffic tournament drops by leveraging PostgreSQL database-level row locking (`SELECT FOR UPDATE`) within an atomic transaction rather than relying on loose client-side checks.',
        infraSpecs: [
          { label: 'Runtime', val: 'Dart / Flutter AOT (ARM64)' },
          { label: 'Backend Engine', val: 'Supabase BaaS / Edge Functions' },
          { label: 'Relational Store', val: 'PostgreSQL 15 with RLS' },
          { label: 'Sync Protocol', val: 'WebSocket / Realtime Postgres CDC' }
        ]
      }
    },
    'lab-se': {
      title: 'Polinema Software Engineering Laboratory',
      tag: 'Institutional Portal & CMS / 2025',
      role: '🛠️ Full-Stack & Database Developer',
      team: '👥 5-Member PBL Team',
      tagline: 'Official institutional portal and Content Management System (CMS) for the Software Engineering Research Center at State Polytechnic of Malang.',
      github: 'https://github.com/jsofiah/PBL-LabSE.git',
      demo: '',
      client: 'Department of Information Technology — POLINEMA',
      architecture: 'Institutional Web Portal with Relational CMS',
      image: './assets/images/lab_se_mockup.png',
      caption: 'Official Polinema Software Engineering Laboratory Portal',
      gallery: [
        { title: 'Main Showcase', src: './assets/images/lab_se_mockup.png' }
      ],
      description: 'Engineered the official institutional portal and CMS for the Software Engineering Laboratory at Polinema. The platform serves as a unified digital showcase for academic research publications, software engineering curricula roadmaps, lab equipment bookings, and the "SE Geeks" student research ecosystem.',
      features: [
        { title: 'Interactive Research Roadmap', desc: 'Structured visualization of laboratory research focuses and academic curriculum progression pathways.' },
        { title: 'Faculty Publication Directory', desc: 'Centralized indexing for scientific papers, peer-reviewed journals, patents, and faculty portfolio assets.' },
        { title: 'Facility & Inventory Management', desc: 'Administrative CMS modules to track research workstations, testing hardware, and workshop events.' },
        { title: 'Responsive Institutional Design', desc: 'Clean, accessible aesthetic built to institutional identity guidelines with sub-second page loads.' }
      ],
      contributions: [
        'Modeled comprehensive system architecture and data flow diagrams, including ERD, PDM, Use Case, and Activity specifications.',
        'Designed normalized MySQL relational database schemas and optimized indexing for publication indices and categorized articles.',
        'Implemented full-stack modules utilizing PHP, Tailwind CSS, and vanilla JavaScript for dynamic frontend interactivity.',
        'Crafted Low-Fidelity wireframes and High-Fidelity prototypes in Figma for curriculum roadmaps and facility showcases.'
      ],
      tech: ['PHP', 'Laravel', 'Tailwind CSS', 'MySQL', 'JavaScript', 'Blade', 'Figma'],
      architectureDetails: {
        topology: [
          { step: '01', title: 'Institutional Gateway', desc: 'Lightweight PHP/Laravel entry point with role-based middleware routing visitors, students, and departmental faculty to dedicated workspaces.' },
          { step: '02', title: 'Relational CMS Pipeline', desc: 'Authors submit research papers, patents, and software artifacts through a structured markdown and multi-file attachment management pipeline.' },
          { step: '03', title: 'Indexed Search & Caching', desc: 'Article queries and researcher portfolios utilize composite database indexes and query caching, maintaining sub-50ms server responses under peak campus network loads.' },
          { step: '04', title: 'Lab Asset Reservation', desc: 'Automated inventory booking system for lab workstations and hardware testing gear with date collision prevention.' }
        ],
        databaseStrategy: 'Normalized 3NF relational schema in MySQL 8.0. Strict referential integrity between faculty accounts, academic publications, research roadmap nodes, and hardware inventory logs.',
        tradeoffs: 'Opted for a modular monolith architecture rather than microservices to ensure effortless on-premise maintainability by student lab assistants, while utilizing optimized indexing to achieve sub-second TTFB.',
        infraSpecs: [
          { label: 'Runtime', val: 'PHP 8.2 Engine / Laravel' },
          { label: 'Web Server', val: 'Nginx Reverse Proxy / Apache' },
          { label: 'Relational Store', val: 'MySQL 8.0 with B-Tree Indexes' },
          { label: 'Styling & Frontend', val: 'Tailwind CSS JIT + Vanilla JS' }
        ]
      }
    },
    'rentalbase': {
      title: 'RentalBase — Multi-Tenant Equipment Rental SaaS',
      tag: 'SaaS Platform / 2026',
      role: '📋 Project Manager & Full-Stack Developer',
      team: '👥 PBL Development Team',
      tagline: 'Multi-tenant modular SaaS platform automating equipment rentals, real-time inventory tracking, and dynamic billing workflows.',
      github: 'https://github.com/tersiqo/RentalBase',
      demo: 'https://tersiqo.my.id',
      client: 'RentalBase SaaS Ecosystem',
      architecture: 'Multi-Tenant Modular Monolith with Docker',
      image: './assets/images/rentalbase_mockup.png',
      caption: 'RentalBase Desktop Workspace Mockup',
      gallery: [
        { title: 'Monitor Workspace', src: './assets/images/rentalbase_mockup.png' },
        { title: 'Admin Dashboard', src: './assets/images/rentalbase/rentalbase_dashboard.png' },
        { title: 'Official Landing Page', src: './assets/images/rentalbase/rentalbase_landing.png' },
        { title: 'Tenant Catalog', src: './assets/images/rentalbase/rentalbase_catalog.png' },
        { title: 'Product Detail & Booking', src: './assets/images/rentalbase/rentalbase_product_detail.png' },
        { title: 'Return & Penalty Modal', src: './assets/images/rentalbase/rentalbase_return_popup.png' },
        { title: 'Master Orders List', src: './assets/images/rentalbase/rentalbase_orders.png' },
        { title: 'Tenant Management', src: './assets/images/rentalbase/rentalbase_tenants.png' },
        { title: 'Tenant Onboarding', src: './assets/images/rentalbase/rentalbase_tenant_requests.png' },
        { title: 'Storefront Theme Setup', src: './assets/images/rentalbase/rentalbase_store_setup.png' },
        { title: 'Storefront Info Setup', src: './assets/images/rentalbase/rentalbase_store_info.png' },
        { title: 'Customer Order Detail', src: './assets/images/rentalbase/rentalbase_customer_order.png' },
        { title: 'Authentication & Security', src: './assets/images/rentalbase/rentalbase_login.png' },
        { title: 'Design System & Palette', src: './assets/images/rentalbase/rentalbase_style_guide.png' }
      ],
      description: 'Mid-tier equipment rental businesses suffer persistent revenue leakage due to booking overlaps, untracked late penalties, and convoluted multi-branch data isolation. RentalBase was engineered as a high-reliability, multi-tenant SaaS platform empowering rental proprietors to manage custom storefronts and backend logistics with automated inventory controls.',
      features: [
        { title: 'Multi-Tenant Architecture', desc: 'Secure data isolation between business tenants featuring custom subdomains and dynamic storefront branding.' },
        { title: 'Real-Time Unit Availability', desc: 'Interactive scheduling calendar tracking unit states (Available, Rented, Maintenance, Damaged) in real time.' },
        { title: 'Automated Late Fees & Invoicing', desc: 'Algorithmic overdue fee calculations, security deposit ledgers, and instant digital invoice generation.' },
        { title: 'Cloud-Ready Containerization', desc: 'Fully Dockerized container stack tuned for streamlined CI/CD pipelines across Render and Cloudflare.' }
      ],
      contributions: [
        'Spearheaded development lifecycle as Project Manager, orchestrating Agile sprints, task distribution, and SRS specifications.',
        'Engineered full-stack reactive web architecture leveraging Laravel and Livewire for dynamic, single-page UI updates without SPA complexity.',
        'Modeled normalized PostgreSQL schemas designed to handle high-concurrency booking transactions with ACID compliance.',
        'Authored production Dockerfiles, configured multi-stage builds, Nginx reverse proxy routing, and production deployment scripts.'
      ],
      tech: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js', 'PostgreSQL', 'Docker', 'Figma'],
      architectureDetails: {
        topology: [
          { step: '01', title: 'Subdomain Tenant Router', desc: 'Incoming HTTP requests are inspected by tenant-resolution middleware via wildcard DNS (`{tenant}.rentalbase.id`) to resolve tenant identity dynamically.' },
          { step: '02', title: 'Scoped Data Isolation', desc: 'Database connections automatically apply global tenant scopes (`tenant_id`), guaranteeing 100% data partition between independent rental business owners.' },
          { step: '03', title: 'Reactive Single-Page UX', desc: 'Laravel Livewire and Alpine.js handle dynamic inventory status changes, late fee calculations, and return modals without requiring a separate SPA frontend.' },
          { step: '04', title: 'Automated Billing Ledger', desc: 'Algorithmic calculation of deposit security, rental intervals, and automated PDF invoice generation upon return inspection.' }
        ],
        databaseStrategy: 'Multi-Tenant PostgreSQL Architecture with indexed tenant foreign keys and ACID-compliant transactional booking locks. Strict check constraints prevent concurrent bookings of identical equipment serials.',
        tradeoffs: 'Chose a single-database multi-tenant model with tenant-scoped queries over a database-per-tenant architecture, drastically lowering cloud infrastructure costs for small rental proprietors while maintaining strict software-enforced boundary isolation.',
        infraSpecs: [
          { label: 'Full-Stack Engine', val: 'Laravel 11 + Livewire 3 + Alpine.js' },
          { label: 'Containerization', val: 'Multi-Stage Dockerfile + Docker Compose' },
          { label: 'Database', val: 'PostgreSQL 16 with Tenant Scoping' },
          { label: 'Deployment & CDN', val: 'Render Cloud + Cloudflare SSL Termination' }
        ]
      }
    }
  };

  // Enhanced Modal Logic
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');

  window.openProjectModal = function(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    // Reset tab to overview on open
    if (typeof window.switchModalTab === 'function') {
      window.switchModalTab('overview');
    }

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
        <button type="button" onclick="switchModalPreview('${item.src}', '${item.title.replace(/'/g, "\\'")}')" class="group relative rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 aspect-video hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-left">
          <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute inset-0 bg-slate-950/25 group-hover:bg-transparent transition-colors"></div>
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
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 space-y-1">
          <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span class="text-blue-600 dark:text-blue-400">✦</span>
            <span>${f.title}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${f.desc}</p>
        </div>
      `).join('');
    } else {
      featuresContainer.innerHTML = '';
    }

    // Contributions
    const contribContainer = document.getElementById('modal-contributions');
    if (data.contributions && data.contributions.length > 0) {
      contribContainer.innerHTML = data.contributions.map(c => `
        <li class="leading-relaxed pl-1"><span class="text-slate-800 dark:text-slate-200">${c}</span></li>
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
      `<span class="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-2xs">${item}</span>`
    ).join('');

    // System Architecture Tab Population
    const topoContainer = document.getElementById('modal-arch-topology');
    if (topoContainer && data.architectureDetails?.topology) {
      topoContainer.innerHTML = data.architectureDetails.topology.map(step => `
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 space-y-1.5 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-200/70 dark:border-blue-800/60">${step.step}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div>
            <div class="font-bold text-xs text-slate-900 dark:text-white">${step.title}</div>
            <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1">${step.desc}</p>
          </div>
        </div>
      `).join('');
    }

    const dbEl = document.getElementById('modal-arch-database');
    if (dbEl) dbEl.textContent = data.architectureDetails?.databaseStrategy || 'Normalized relational schema with referential integrity constraints.';

    const toEl = document.getElementById('modal-arch-tradeoffs');
    if (toEl) toEl.textContent = data.architectureDetails?.tradeoffs || 'Engineered with performance optimization, transactional ACID guarantees, and sub-second latency.';

    const infraContainer = document.getElementById('modal-arch-infra');
    if (infraContainer && data.architectureDetails?.infraSpecs) {
      infraContainer.innerHTML = data.architectureDetails.infraSpecs.map(spec => `
        <div class="space-y-1">
          <span class="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">${spec.label}</span>
          <span class="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono block">${spec.val}</span>
        </div>
      `).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  // Switch Modal Tabs (Overview vs System Architecture)
  window.switchModalTab = function(tabName) {
    const isOverview = tabName === 'overview';
    const overviewTab = document.getElementById('modal-tab-overview');
    const archTab = document.getElementById('modal-tab-architecture');
    const overviewBtn = document.getElementById('tab-btn-overview');
    const archBtn = document.getElementById('tab-btn-architecture');

    if (overviewTab && archTab) {
      overviewTab.classList.toggle('hidden', !isOverview);
      archTab.classList.toggle('hidden', isOverview);
    }

    if (overviewBtn && archBtn) {
      overviewBtn.classList.toggle('active', isOverview);
      archBtn.classList.toggle('active', !isOverview);
    }
  };

  // Project Category Filter Handler
  window.filterProjects = function(category) {
    document.querySelectorAll('[data-project-filter]').forEach(btn => {
      const isActive = btn.getAttribute('data-project-filter') === category;
      btn.classList.toggle('active', isActive);
    });

    const cards = document.querySelectorAll('.project-card-item');
    cards.forEach(card => {
      const categories = (card.getAttribute('data-project-categories') || '').split(' ');
      const match = category === 'all' || categories.includes(category);

      if (match) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px) scale(0.98)';
        setTimeout(() => {
          const currentActive = document.querySelector('[data-project-filter].active')?.getAttribute('data-project-filter');
          if (currentActive === category) {
            card.style.display = 'none';
          }
        }, 280);
      }
    });

    const subgrid = document.getElementById('projects-subgrid');
    if (subgrid) {
      if (category === 'mobile') {
        setTimeout(() => {
          const currentActive = document.querySelector('[data-project-filter].active')?.getAttribute('data-project-filter');
          if (currentActive === 'mobile') subgrid.style.display = 'none';
        }, 280);
      } else {
        subgrid.style.display = '';
      }
    }
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

  // Keyboard Escape to close modal (both project modal and contact modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
      if (contactModal && !contactModal.classList.contains('hidden')) {
        window.closeContactModal();
      }
    }
  });

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
  // QUICK CONTACT & INQUIRY MODAL ENGINE
  // =========================================================
  const contactModal = document.getElementById('contact-modal');
  let currentContactPreset = 'recruitment';

  const contactPresets = {
    recruitment: {
      title: "Job Opportunity",
      subject: "[Engineering Opportunity] Software Engineer Role - Inquiry",
      message: `Hi Tersiqo,

I reviewed your portfolio and engineering case studies (specifically your work in full-stack architecture and database systems). We currently have an opening and would like to connect with you.

- Role / Scope: Software Engineer / Full-Stack Engineer
- Company / Team: 
- Work Mode: [Remote / Hybrid / Onsite]
- Target Timeline: [e.g. Immediate / Next Month]

Looking forward to hearing from you!`
    },
    freelance: {
      title: "Project / SaaS MVP",
      subject: "[Project Inquiry] Web Application & Architecture Collaboration",
      message: `Hi Tersiqo,

We are looking for a software engineer to build/architect a project with modern web standards and reliable database architecture.

- Project Concept: [Brief project overview]
- Key Deliverables: [e.g. Full-Stack MVP, REST API, Database Modeling, Dashboard]
- Target Timeline & Budget: [Estimated Timeline / Budget Range]

Let's discuss further!`
    },
    collaboration: {
      title: "Tech Exchange",
      subject: "[Tech Exchange] Discussion on Architecture & System Design",
      message: `Hi Tersiqo,

I'm reaching out after exploring your portfolio and system architecture breakdowns. I'd love to connect, exchange thoughts on software engineering practices, or discuss open-source collaboration.

- Topic / Focus: [System Design / Laravel / Database / Open Source]

Cheers!`
    }
  };

  window.openContactModal = function(presetType = 'recruitment') {
    if (!contactModal) return;
    window.setContactPreset(presetType);
    contactModal.classList.remove('hidden');
    contactModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  window.closeContactModal = function() {
    if (!contactModal) return;
    contactModal.classList.add('hidden');
    contactModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  };

  window.setContactPreset = function(presetType) {
    if (!contactPresets[presetType]) presetType = 'recruitment';
    currentContactPreset = presetType;

    // Update preset pills active state
    ['recruitment', 'freelance', 'collaboration'].forEach(type => {
      const btn = document.getElementById(`preset-btn-${type}`);
      if (btn) btn.classList.toggle('active', type === presetType);
    });

    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    if (subjectInput) subjectInput.value = contactPresets[presetType].subject;
    if (messageInput) messageInput.value = contactPresets[presetType].message;
  };

  window.resetCurrentPresetText = function() {
    const preset = contactPresets[currentContactPreset];
    if (!preset) return;
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    if (subjectInput) subjectInput.value = preset.subject;
    if (messageInput) messageInput.value = preset.message;
    if (window.showToast) window.showToast("Inquiry template reset to default.");
  };

  function getSynthesizedInquiryPayload() {
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const sender = document.getElementById('contact-sender-email')?.value.trim() || '';
    const subject = document.getElementById('contact-subject')?.value.trim() || (contactPresets[currentContactPreset] ? contactPresets[currentContactPreset].subject : "Engineering Inquiry");
    let message = document.getElementById('contact-message')?.value.trim() || (contactPresets[currentContactPreset] ? contactPresets[currentContactPreset].message : "");

    let fullBody = message;
    if (name || sender) {
      fullBody += `\n\n--------------------------------------\nSender: ${name || 'Not provided'}\nContact Info: ${sender || 'Not provided'}\nSent via: tersiqo portfolio inquiry system`;
    }
    return { name, sender, subject, body: fullBody };
  }

  window.dispatchGmailWeb = function() {
    const payload = getSynthesizedInquiryPayload();
    const emailTo = "tersiqo.alfarezel@gmail.com";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailTo)}&su=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (window.showToast) window.showToast("Opening Gmail composer in a new tab...");
  };

  window.dispatchMailto = function() {
    const payload = getSynthesizedInquiryPayload();
    const emailTo = "tersiqo.alfarezel@gmail.com";
    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.body)}`;
    window.location.href = mailtoUrl;
    if (window.showToast) window.showToast("Opening default mail application...");
  };

  window.copyFormattedInquiry = function() {
    const payload = getSynthesizedInquiryPayload();
    const formatted = `To: tersiqo.alfarezel@gmail.com\nSubject: ${payload.subject}\n\n${payload.body}`;
    navigator.clipboard.writeText(formatted).then(() => {
      if (window.showToast) window.showToast("Full inquiry copied! You can paste it into any channel.");
    }).catch(() => {
      if (window.showToast) window.showToast("Copy failed. Please copy manually from the form.");
    });
  };

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) window.closeContactModal();
    });
  }

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
