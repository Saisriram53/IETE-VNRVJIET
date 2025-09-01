// Enhanced scripts.js — richer interactivity for the site
// Features: dynamic events, smooth scrolling, active nav, modal details, RSVP/save, toast notifications,
// sticky header, theme toggle (persisted), search/filter, countdown timer, reveal animations, circular carousel.

const events = [
  { id: 'evt-embedded', date: '2025-09-25', label: 'workshop', title: 'Embedded Systems Workshop', summary: 'Hands-on session covering microcontrollers, sensors and project building.', details: 'A full-day hands-on workshop where participants will build a small embedded project using Arduino/STM32 platforms. Materials will be provided.' },
  { id: 'evt-5g', date: '2025-10-08', label: 'talk', title: 'Technical Talk: 5G and Beyond', summary: 'Industry expert talk on evolution of wireless communications and career paths.', details: 'An invited speaker will discuss 5G use-cases and career opportunities.' },
  { id: 'evt-expo', date: '2025-11-30', label: 'expo', title: 'Project Expo', summary: 'Student project showcase — demos, posters and awards.', details: 'Showcase your projects. Winners receive prizes.' }
];

/* ---------- Circular Carousel for Panel ---------- */
let currentCarouselIndex = 0;
let carouselItems = [];

function initializeCarousel() {
  const carousel = document.getElementById('carousel-circle');
  if (!carousel) return;
  
  carouselItems = Array.from(carousel.querySelectorAll('.carousel-item'));
  const totalItems = carouselItems.length;
  
  // Position items in a circle
  carouselItems.forEach((item, index) => {
    const angle = (index / totalItems) * 2 * Math.PI;
    const radius = 180; // Distance from center
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    item.style.left = `calc(50% + ${x}px - 40px)`;
    item.style.top = `calc(50% + ${y}px - 40px)`;
    
    // Set background image
    const imageSrc = item.getAttribute('data-image');
    item.style.backgroundImage = `url('${imageSrc}')`;
    
    // Add click listener
    item.addEventListener('click', () => {
      setActiveCarouselItem(index);
    });
  });
  
  // Set initial active item
  setActiveCarouselItem(0);
  
  // Add scroll listener
  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('wheel', handleCarouselScroll);
  }
  
  // Add keyboard listener
  document.addEventListener('keydown', handleCarouselKeyboard);
}

function setActiveCarouselItem(index) {
  if (index < 0 || index >= carouselItems.length) return;
  
  // Remove active class from all items
  carouselItems.forEach(item => item.classList.remove('active'));
  
  // Add active class to current item
  carouselItems[index].classList.add('active');
  
  // Update center display
  const item = carouselItems[index];
  const centerImage = document.getElementById('center-image');
  const centerName = document.getElementById('center-name');
  const centerPosition = document.getElementById('center-position');
  const centerCategory = document.getElementById('center-category');
  
  if (centerImage) centerImage.src = item.getAttribute('data-image');
  if (centerName) centerName.textContent = item.getAttribute('data-name');
  if (centerPosition) centerPosition.textContent = item.getAttribute('data-position');
  if (centerCategory) centerCategory.textContent = item.getAttribute('data-category');
  
  currentCarouselIndex = index;
}

function rotateCarousel(direction) {
  const newIndex = currentCarouselIndex + direction;
  
  if (newIndex >= carouselItems.length) {
    setActiveCarouselItem(0);
  } else if (newIndex < 0) {
    setActiveCarouselItem(carouselItems.length - 1);
  } else {
    setActiveCarouselItem(newIndex);
  }
}

function handleCarouselScroll(event) {
  event.preventDefault();
  const direction = event.deltaY > 0 ? 1 : -1;
  rotateCarousel(direction);
}

function handleCarouselKeyboard(event) {
  if (!document.querySelector('#panel')) return; // Only on panel page
  
  switch(event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      rotateCarousel(-1);
      break;
    case 'ArrowRight':
      event.preventDefault();
      rotateCarousel(1);
      break;
  }
}

/* ---------- Utilities ---------- */
function showToast(message, timeout = 2600){
  const container = document.getElementById('toast');
  if (!container) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  container.appendChild(t);
  // allow CSS transition
  requestAnimationFrame(()=> t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=> t.remove(), 300); }, timeout);
}

/* ---------- Render events ---------- */
function renderEvents(filter = 'all', search = ''){
  const grid = document.getElementById('events-grid'); if (!grid) return;
  const q = search.trim().toLowerCase();
  grid.innerHTML = '';
  const list = events.filter(ev => (filter === 'all' || ev.label === filter) && (q === '' || (ev.title+ev.summary).toLowerCase().includes(q)));
  if (list.length === 0) { grid.innerHTML = '<div class="card">No events found.</div>'; return; }
  list.forEach(ev => {
    const el = document.createElement('article'); el.className = 'event';
    el.innerHTML = `
      <div class="event-date">${formatDate(ev.date)}</div>
      <h4>${ev.title}</h4>
      <p>${ev.summary}</p>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn ghost btn-details" data-id="${ev.id}">Details</button>
        <button class="btn primary btn-rsvp" data-id="${ev.id}">RSVP</button>
      </div>
    `;
    grid.appendChild(el);
  });
  // bind buttons
  grid.querySelectorAll('.btn-details').forEach(b=> b.addEventListener('click', e=> openDetailModal(findEventById(b.dataset.id))));
  grid.querySelectorAll('.btn-rsvp').forEach(b=> b.addEventListener('click', e=> openRSVPModal(findEventById(b.dataset.id))));
}

function findEventById(id){ return events.find(e=>e.id===id); }

function formatDate(iso){ const d = new Date(iso); return d.toLocaleDateString(undefined,{day:'2-digit',month:'short',year:'numeric'}); }

/* ---------- Details modal ---------- */
const detailModal = (()=>{
  let el, titleEl, bodyEl, closeBtn;
  function init(){ el = document.getElementById('modal'); if(!el) return; titleEl = el.querySelector('.modal-title'); bodyEl = el.querySelector('.modal-body'); closeBtn = el.querySelector('.modal-close'); el.addEventListener('click', (e)=>{ if (e.target===el) close(); }); closeBtn.addEventListener('click', close); document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') close(); }); }
  function open(ev){ if(!el) return; titleEl.textContent = ev.title; bodyEl.textContent = ev.details; el.classList.add('open'); closeBtn.focus(); }
  function close(){ if(!el) return; el.classList.remove('open'); }
  return { init, open, close };
})();

function openDetailModal(ev){ detailModal.open(ev); }

/* ---------- RSVP modal (separate) ---------- */
const rsvpModal = (()=>{
  let el, form, titleEl, closeBtn;
  function init(){ el = document.getElementById('rsvp-modal'); if(!el) return; form = el.querySelector('form'); titleEl = el.querySelector('.modal-title'); closeBtn = el.querySelector('.modal-close'); el.addEventListener('click', (e)=>{ if (e.target===el) close(); }); closeBtn.addEventListener('click', close); form.addEventListener('submit', onSubmit); }
  let currentEventId = null;
  function open(ev){ if(!el) return; currentEventId = ev.id; titleEl.textContent = 'RSVP — '+ ev.title; el.classList.add('open'); el.querySelector('input[name="name"]').focus(); }
  function close(){ if(!el) return; el.classList.remove('open'); }
  function onSubmit(e){ e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); data.eventId = currentEventId; saveRSVP(data); close(); }
  return { init, open, close };
})();

function openRSVPModal(ev){ rsvpModal.open(ev); }

function saveRSVP(data){ const key = 'iete_rsvps'; const arr = JSON.parse(localStorage.getItem(key) || '[]'); arr.push({...data, timestamp: new Date().toISOString()}); localStorage.setItem(key, JSON.stringify(arr)); showToast('RSVP saved — check email for details (demo)'); }

/* ---------- Sticky header and theme toggle ---------- */
function setupStickyHeader(){ const header = document.getElementById('site-header'); if(!header) return; const offset = 60; window.addEventListener('scroll', ()=>{ if(window.scrollY>offset) header.classList.add('small'); else header.classList.remove('small'); }); }

function setupThemeToggle(){ const btn = document.getElementById('theme-toggle'); if(!btn) return; const key = 'site_theme'; const apply = (t)=>{ if(t==='light'){ document.documentElement.style.setProperty('--bg','#f7f9fc'); document.documentElement.style.setProperty('--card','#fff'); document.documentElement.style.setProperty('--muted','#445'); document.documentElement.style.setProperty('--accent','#00539C'); btn.textContent='🌞'; } else { document.documentElement.style.removeProperty('--bg'); document.documentElement.style.removeProperty('--card'); document.documentElement.style.removeProperty('--muted'); document.documentElement.style.removeProperty('--accent'); btn.textContent='🌗'; } }; const saved = localStorage.getItem(key) || 'dark'; apply(saved); btn.addEventListener('click', ()=>{ const cur = localStorage.getItem(key) || 'dark'; const next = cur==='dark' ? 'light' : 'dark'; localStorage.setItem(key, next); apply(next); showToast('Theme: '+ next); }); }

/* ---------- Search & filter ---------- */
function setupEventControls(){ const search = document.getElementById('events-search'); const filter = document.getElementById('events-filter'); if(!search || !filter) return; const apply = ()=> renderEvents(filter.value, search.value); search.addEventListener('input', apply); filter.addEventListener('change', apply); }

/* ---------- Countdown ---------- */
function setupCountdown(){ const el = document.getElementById('countdown'); if(!el) return; function getNext(){ const now = Date.now(); const future = events.map(e=> new Date(e.date).getTime()).filter(t=>t>now).sort((a,b)=>a-b)[0]; return future || null; }
  function tick(){ const next = getNext(); if(!next) { el.textContent = 'No upcoming events'; return; } const diff = next - Date.now(); if(diff<=0) { el.textContent = 'Starting now'; return; } const days = Math.floor(diff/86400000); const hrs = Math.floor((diff%86400000)/3600000); const mins = Math.floor((diff%3600000)/60000); const secs = Math.floor((diff%60000)/1000); el.textContent = `Next event in — ${days}d ${hrs}h ${mins}m ${secs}s`; }
  tick(); setInterval(tick,1000);
}

/* ---------- Smooth scroll & active nav ---------- */
function setupSmoothScroll(){ document.querySelectorAll('a[href^="#"]').forEach(a=> a.addEventListener('click', (e)=>{ const href = a.getAttribute('href'); if(href==='#') return; const target = document.querySelector(href); if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); history.replaceState(null,'',href); } })); }

function setupActiveNav(){ const sections = Array.from(document.querySelectorAll('main > section[id]')); const navLinks = Array.from(document.querySelectorAll('.main-nav a')); function onScroll(){ const y = window.scrollY + 140; let current = sections[0]; for(const s of sections) if(s.offsetTop <= y) current = s; navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`)); } window.addEventListener('scroll', onScroll); onScroll(); }

/* ---------- Reveal on scroll (intersection) ---------- */
function setupRevealOnScroll(){ const io = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); io.unobserve(e.target); } }); },{threshold:0.12}); document.querySelectorAll('section, .event, .member').forEach(el=> io.observe(el)); }

// Enhanced reveal: apply small stagger and animate counters when they appear
function setupRevealOnScroll(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((entry, i)=>{
      if(entry.isIntersecting){
        const el = entry.target;
        // stagger child reveals
        const children = Array.from(el.querySelectorAll('.event, .member, .stat, .card'));
        children.forEach((c, idx)=>{ c.style.transitionDelay = `${idx * 80}ms`; c.classList.add('reveal'); });
        // reveal the container too
        el.classList.add('reveal');
        // animate any counters inside
        el.querySelectorAll && el.querySelectorAll('.counter').forEach(startCounter);
        io.unobserve(el);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('section, .event, .member, .stat').forEach(el=> io.observe(el));
}

// animated numeric counter
function startCounter(el){
  const target = parseInt(el.dataset.target || el.textContent || '0', 10);
  if (!target) return;
  const duration = 1400;
  const start = performance.now();
  const initial = parseInt(el.textContent.replace(/[^0-9]/g,''),10) || 0;
  function step(ts){
    const t = Math.min(1, (ts - start)/duration);
    const val = Math.floor(initial + (target - initial) * easeOutCubic(t));
    el.textContent = val;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Animated Gallery for Event Gallery ---------- */
function initializeGallery() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  
  if (!filterButtons.length || !galleryCards.length) return;
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter gallery items with animation
      galleryCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          card.classList.remove('hidden');
          // Re-animate with staggered delay
          card.style.animationDelay = `${index * 0.1}s`;
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'gallery-reveal 0.6s ease-out forwards';
          });
        } else {
          card.style.animation = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px) scale(0.9)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
      
      // Update gallery stats based on visible items
      updateGalleryStats(filter);
    });
  });
  
  // Initialize with all items visible
  updateGalleryStats('all');
}

function updateGalleryStats(filter) {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const visibleCards = Array.from(galleryCards).filter(card => {
    const category = card.getAttribute('data-category');
    return filter === 'all' || category === filter;
  });
  
  const stats = {
    all: { photos: 150, events: 12, participants: 350 },
    workshops: { photos: 65, events: 5, participants: 180 },
    talks: { photos: 45, events: 3, participants: 200 },
    projects: { photos: 30, events: 2, participants: 75 },
    social: { photos: 25, events: 2, participants: 95 }
  };
  
  const currentStats = stats[filter] || stats.all;
  
  // Animate stat numbers
  animateStatNumber('.stat-number:nth-of-type(1)', currentStats.photos);
  animateStatNumber('.stat-number:nth-of-type(2)', currentStats.events);  
  animateStatNumber('.stat-number:nth-of-type(3)', currentStats.participants);
}

function animateStatNumber(selector, target) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const duration = 1000;
  const start = parseInt(element.textContent) || 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (target - start) * easeOutCubic(progress));
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/* ---------- Gallery Card Interactions ---------- */
function setupGalleryInteractions() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const card = item.closest('.gallery-card');
      const title = card.getAttribute('data-title');
      const date = card.getAttribute('data-date');
      const category = card.getAttribute('data-category');
      
      // Create enhanced modal or toast with event details
      showToast(`📸 ${title} - ${new Date(date).toLocaleDateString()}`, 3000);
      
      // Add ripple effect
      createRippleEffect(e, item);
    });
    
    // Add 3D tilt effect on mouse move
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      item.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
}

function createRippleEffect(event, element) {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
    z-index: 100;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  // Add ripple animation keyframes if not exists
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// nav underline movement
// nav underline movement
// nav underline movement (Robust Version)
// nav underline movement
function setupNavUnderline() {
  const nav = document.getElementById('main-nav');
  const underline = document.getElementById('nav-underline');

  if (!nav || !underline) {
    console.log('Nav or underline not found', nav, underline);
    return;
  }

  console.log('Setting up nav underline for gallery page');

  function update() {
    // FIX #1: First, check if the navigation bar is actually visible.
    // If 'offsetParent' is null, it means the element has 'display: none'.
    if (nav.offsetParent === null) {
      underline.style.opacity = '0'; // Make sure the underline is hidden
      console.log('Nav not visible');
      return;
    }

    // FIX #2: Use a more reliable way to find the active link.
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);
    let activeLink = null;
    const links = nav.querySelectorAll('a[href]');
    console.log('Found links:', links.length);

    // Special case for gallery page - force gallery link to be active
    if (currentPage === 'gallery.html' || window.location.href.includes('gallery.html')) {
      activeLink = nav.querySelector('a[href="gallery.html"]');
      console.log('Gallery page detected - forcing gallery link as active:', activeLink);
    } else {
      // For other pages, find the link that matches the current page's file name.
      for (const link of links) {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
          activeLink = link;
          console.log('Found active link:', linkPage, activeLink);
          break;
        }
      }
      
      // Handle the case where the homepage could be index.html or home.html
      if ((currentPage === 'index.html' || currentPage === 'home.html' || currentPage === '') && !activeLink) {
        activeLink = nav.querySelector('a[href="index.html"]') || nav.querySelector('a[href="home.html"]');
      }

      // As a fallback, check for the bold style if the URL method fails.
      if (!activeLink) {
        activeLink = nav.querySelector('a[style*="font-weight:bold"]');
      }
    }

    if (!activeLink) {
      underline.style.opacity = '0';
      console.log('No active link found');
      return;
    }

    console.log('Active link found:', activeLink.textContent);

    const rect = activeLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const left = rect.left - navRect.left;

    // FIX #3: Only draw the underline if it has a valid, non-zero width.
    if (rect.width > 0) {
      underline.style.width = `${rect.width}px`;
      underline.style.transform = `translateX(${left}px)`;
      underline.style.opacity = '1';
      console.log('Gallery nav underline positioned:', left, rect.width);
    } else {
      underline.style.opacity = '0';
      console.log('Gallery nav underline hidden - no width');
    }
  }

  // Run the update logic at the most reliable times.
  window.addEventListener('load', update);
  window.addEventListener('resize', update);

  // A final check after a brief moment to catch any other rendering shifts.
  setTimeout(update, 150);
}
// gentle parallax on the logo card for depth
function setupParallax(){
  const card = document.querySelector('.logo-card');
  if(!card) return;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY; const t = Math.min(40, y * 0.06);
    card.style.transform = `translateY(${ -t }px)`;
  });
}

/* ---------- Advanced Gallery Functions ---------- */

/* ---------- Init ---------- */
window.addEventListener('DOMContentLoaded', ()=>{
  renderEvents();
  detailModal.init();
  rsvpModal.init();
  setupSmoothScroll();
  setupActiveNav();
  setupRevealOnScroll();
  setupStickyHeader();
  setupThemeToggle();
  setupEventControls();
  setupCountdown();
  setupParallax();
  initializeCarousel(); // Initialize carousel for panel page
  initializeGallery(); // Initialize animated gallery (legacy)
  setupGalleryInteractions(); // Setup gallery interactions (legacy)
  
  // DIRECT GALLERY UNDERLINE FIX - Override everything for gallery page
  if (window.location.href.includes('gallery.html')) {
    console.log('GALLERY PAGE DETECTED - Setting up direct underline fix');
    
    function directGalleryFix() {
      const nav = document.getElementById('main-nav');
      const underline = document.getElementById('nav-underline');
      
      if (nav && underline) {
        // Find the Gallery link directly
        const galleryLink = nav.querySelector('a[href="gallery.html"]');
        
        if (galleryLink) {
          console.log('GALLERY LINK FOUND:', galleryLink);
          
          // Get exact positioning
          const linkRect = galleryLink.getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();
          const leftPos = linkRect.left - navRect.left;
          
          console.log('POSITIONING DATA:', {
            linkLeft: linkRect.left,
            linkWidth: linkRect.width,
            navLeft: navRect.left,
            calculatedLeft: leftPos
          });
          
          // Apply styles directly and forcefully
          underline.style.cssText = `
            position: absolute;
            bottom: 6px;
            left: 0;
            height: 3px;
            width: ${linkRect.width}px;
            background: linear-gradient(90deg, var(--accent), var(--accent-2));
            border-radius: 3px;
            transform: translateX(${leftPos}px);
            transition: transform 0.28s cubic-bezier(0.2, 0.9, 0.2, 1), width 0.28s ease;
            opacity: 1 !important;
            z-index: 999 !important;
            display: block !important;
            visibility: visible !important;
            pointer-events: none;
          `;
          
          console.log('GALLERY UNDERLINE STYLE APPLIED!');
        } else {
          console.log('GALLERY LINK NOT FOUND');
        }
      } else {
        console.log('NAV OR UNDERLINE ELEMENT NOT FOUND');
      }
    }
    
    // Execute immediately and with delays
    setTimeout(directGalleryFix, 0);
    setTimeout(directGalleryFix, 100);
    setTimeout(directGalleryFix, 500);
    setTimeout(directGalleryFix, 1000);
  }
});
