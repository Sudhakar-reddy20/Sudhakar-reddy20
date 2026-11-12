(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.querySelector('.site-preloader');
  const dismissPreloader = () => preloader?.classList.add('is-done');
  window.addEventListener('load', () => window.setTimeout(dismissPreloader, 650), { once: true });
  window.setTimeout(dismissPreloader, 2600);

  const header = document.querySelector('.site-header');
  const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelector('#year').textContent = new Date().getFullYear();

  const counters = document.querySelectorAll('[data-count]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const duration = 1100;
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-IN');
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => el.textContent = Number(el.dataset.count).toLocaleString('en-IN'));
  }

  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const base = card.classList.contains('dashboard-card') ? ' rotateY(-9deg) rotateX(5deg)' : '';
        card.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)${base}`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = card.classList.contains('dashboard-card') ? 'rotateY(-9deg) rotateX(5deg)' : '';
      });
    });
  }

  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Depth-aware scroll choreography: foreground and background move at different rates.
  if (!reduceMotion) {
    const depthNodes = document.querySelectorAll('.hero-copy,.hero-stage,.section-title,.section-copy,.expertise-card,.work-card,.tool-entry,.principle-row,.contact-heading,.contact-copy');
    let scrollQueued = false;
    const updateDepth = () => {
      const vh = window.innerHeight || 1;
      depthNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const depth = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        node.style.setProperty('--scroll-depth', depth.toFixed(3));
      });
      scrollQueued = false;
    };
    window.addEventListener('scroll', () => {
      if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateDepth); }
    }, { passive: true });
    updateDepth();
    if (window.matchMedia('(pointer:fine)').matches) {
      document.querySelectorAll('.expertise-card,.work-card,.tool-entry,.principle-row').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - .5;
          const y = (event.clientY - rect.top) / rect.height - .5;
          card.style.transform = 'perspective(1100px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 4) + 'deg) translateZ(12px)';
        });
        card.addEventListener('pointerleave', () => { card.style.transform = ''; });
      });
    }
  }

})();