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

  // Project Modal Data
  const projectsData = {
    'aura-banking': {
      title: 'Aura Banking App',
      tag: 'Fintech / 2024',
      image: './assets/images/aura_banking.jpg',
      description: 'A revolutionary dark-themed mobile banking and investment platform designed to make complex wealth management intuitive, real-time, and ultra-responsive. Features high-frequency market updates, encrypted transaction ledgers, and custom portfolio analytics.',
      tech: ['Figma', 'React Native', 'Tailwind CSS', 'Redux Toolkit', 'WebSockets'],
      client: 'Aura Financial Inc.'
    },
    'lumina-furniture': {
      title: 'Lumina Furniture',
      tag: 'E-Commerce / 2024',
      image: './assets/images/lumina_furniture.jpg',
      description: 'Minimalist luxury e-commerce experience crafted for architectural furniture designers. Implements dynamic 3D asset previews, seamless checkout flows, and tailored moodboard creation suites.',
      tech: ['Webflow', 'React', 'Three.js', 'Tailwind CSS', 'Stripe'],
      client: 'Lumina Atelier'
    },
    'rentalbase': {
      title: 'RentalBase',
      tag: 'SaaS Platform / 2024',
      image: './assets/images/rentalbase_mockup.jpg',
      description: 'Platform manajemen bisnis rental peralatan all-in-one. Dilengkapi dengan pemantauan ketersediaan barang, jadwal booking, transaksi otomatis, dan manajemen inventaris unit secara real-time.',
      tech: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js', 'PostgreSQL'],
      client: 'RentalBase Platform'
    },
    'void-os': {
      title: 'RentalBase',
      tag: 'SaaS Platform / 2024',
      image: './assets/images/rentalbase_mockup.jpg',
      description: 'Platform manajemen bisnis rental peralatan all-in-one. Dilengkapi dengan pemantauan ketersediaan barang, jadwal booking, transaksi otomatis, dan manajemen inventaris unit secara real-time.',
      tech: ['Laravel', 'Livewire', 'Tailwind CSS', 'Alpine.js', 'PostgreSQL'],
      client: 'RentalBase Platform'
    }
  };

  // Modal open/close logic
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  window.openProjectModal = function(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-desc').textContent = data.description;
    document.getElementById('modal-client').textContent = data.client;

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.tech.map(item => 
      `<span class="px-3 py-1 text-xs font-medium rounded-full bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">${item}</span>`
    ).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
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
