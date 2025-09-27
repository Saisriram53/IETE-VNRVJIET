// Enhanced scripts.js — richer interactivity for the site
// Features: dynamic events, smooth scrolling, active nav, modal details, RSVP/save, toast notifications,
// sticky header, theme toggle (persisted), search/filter, countdown timer, reveal animations, circular carousel.

const events = [
  { id: 'evt-fest', date: '2025-09-15', label: 'expo', title: 'Department Fest - Electroverse', summary: 'A celebration of innovation and technology for all branches. Join us for a variety of technical and fun events!', details: 'A celebration of innovation and technology for all branches. Join us for a variety of technical and fun events!' },
  { id: 'evt-vlsi', date: '2025-09-18', label: 'workshop', title: 'VLSI Workshop', summary: 'Hands-on workshop on VLSI design and applications. Open to all students interested in electronics and chip design.', details: 'Hands-on workshop on VLSI design and applications. Open to all students interested in electronics and chip design.' },
  { id: 'evt-career', date: '2025-09-20', label: 'talk', title: 'Career Guidance', summary: 'Interactive session with passed out seniors sharing career tips, industry insights, and guidance for your future.', details: 'Interactive session with passed out seniors sharing career tips, industry insights, and guidance for your future.' },
  { id: 'evt-hackathon', date: '2025-09-22', label: 'expo', title: '24h Hackathon', summary: 'Compete in a 24-hour hackathon in both software and hardware domains. Open to all branches. Showcase your skills and creativity!', details: 'Compete in a 24-hour hackathon in both software and hardware domains. Open to all branches. Showcase your skills and creativity!' },
  { id: 'evt-quiz', date: '2025-09-25', label: 'expo', title: 'Tech Quiz', summary: 'Feed your curiosity with our tech quiz. Test your knowledge and win exciting prizes!', details: 'Feed your curiosity with our tech quiz. Test your knowledge and win exciting prizes!' },
  { id: 'evt-fun', date: '2025-09-28', label: 'expo', title: 'Fun Events', summary: 'Enjoy activities like Treasure Hunt, Meme Contest, and more! Relax and have fun with your friends.', details: 'Enjoy activities like Treasure Hunt, Meme Contest, and more! Relax and have fun with your friends.' }
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

/* ---------- Notification Banner System ---------- */
const NotificationSystem = {
  // Configuration for notifications
  notifications: [
    // Example notifications - replace with real data
    {
      id: 'urgent-2025-01',
      type: 'urgent',
      title: 'Important: Workshop Registration Deadline Extended',
      message: 'VLSI Workshop registration deadline extended to September 30th. Limited seats available!',
      link: { text: 'Register Now', url: 'events.html' },
      active: true,
      showUntil: '2025-09-30'
    },
    {
      id: 'info-2025-02', 
      type: 'info',
      title: 'New Event Added',
      message: 'Career Guidance session with alumni on October 5th. Free for all students.',
      link: { text: 'View Details', url: 'events.html' },
      active: true,
      showUntil: '2025-10-05'
    }
  ],

  init() {
    this.createNotificationContainer();
    this.showActiveNotifications();
  },

  createNotificationContainer() {
    if (document.getElementById('notification-container')) return;
    
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  },

  showActiveNotifications() {
    const container = document.getElementById('notification-container');
    const now = new Date().toISOString().split('T')[0];
    
    this.notifications.forEach(notification => {
      if (!notification.active || notification.showUntil < now) return;
      if (this.isDismissed(notification.id)) return;
      
      this.createNotificationBanner(notification, container);
    });
  },

  createNotificationBanner(notification, container) {
    const banner = document.createElement('div');
    banner.className = `notification-banner notification-${notification.type}`;
    banner.style.cssText = `
      background: ${notification.type === 'urgent' ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 'linear-gradient(135deg, #0077be, #005fa3)'};
      color: white;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transform: translateY(-100%);
      transition: transform 0.3s ease;
      pointer-events: auto;
      position: relative;
    `;

    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
        <div style="font-size: 18px;">
          ${notification.type === 'urgent' ? '🚨' : 'ℹ️'}
        </div>
        <div>
          <strong>${notification.title}</strong>
          <div style="margin-top: 4px; opacity: 0.9;">${notification.message}</div>
        </div>
        ${notification.link ? `
          <a href="${notification.link.url}" style="
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            border: 1px solid rgba(255,255,255,0.3);
            transition: all 0.2s ease;
          " onmouseover="this.style.background='rgba(255,255,255,0.3)'"
             onmouseout="this.style.background='rgba(255,255,255,0.2)'"
          >${notification.link.text}</a>
        ` : ''}
      </div>
      <button onclick="NotificationSystem.dismissNotification('${notification.id}', this.parentElement)" 
              style="
                background: none; 
                border: none; 
                color: white; 
                font-size: 20px; 
                cursor: pointer; 
                padding: 0 5px; 
                opacity: 0.7;
                transition: opacity 0.2s ease;
              "
              onmouseover="this.style.opacity='1'"
              onmouseout="this.style.opacity='0.7'"
              title="Dismiss notification">×</button>
    `;

    container.appendChild(banner);
    
    // Animate in
    requestAnimationFrame(() => {
      banner.style.transform = 'translateY(0)';
    });

    // Auto-dismiss after 10 seconds for info notifications
    if (notification.type === 'info') {
      setTimeout(() => {
        if (banner.parentElement) {
          this.dismissNotification(notification.id, banner);
        }
      }, 10000);
    }
  },

  dismissNotification(id, element) {
    // Mark as dismissed in localStorage
    const dismissedNotifications = JSON.parse(localStorage.getItem('dismissedNotifications') || '[]');
    if (!dismissedNotifications.includes(id)) {
      dismissedNotifications.push(id);
      localStorage.setItem('dismissedNotifications', JSON.stringify(dismissedNotifications));
    }

    // Animate out and remove
    element.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
    }, 300);
  },

  isDismissed(id) {
    const dismissedNotifications = JSON.parse(localStorage.getItem('dismissedNotifications') || '[]');
    return dismissedNotifications.includes(id);
  },

  // Method to add new notification (for admin use)
  addNotification(notification) {
    notification.id = `notification-${Date.now()}`;
    this.notifications.unshift(notification);
    this.showActiveNotifications();
  }
};

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

/* ---------- About stats updater (sync from events) ---------- */
function updateAboutStatsFromEvents(){
  // Only run on About page where stats exist
  const statsGrid = document.querySelector('.stats-grid');
  if (!statsGrid) return;

  // Count events by label from the global events array
  const counts = events.reduce((acc, ev)=>{
    const key = (ev.label || 'other').toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Map labels to human-readable stat labels on About page
  const labelMap = {
    workshop: 'Workshops Held',
    talk: 'Industry Talks'
  };

  // Update counters for workshops and talks only (leave Active Members untouched)
  const statBlocks = Array.from(statsGrid.querySelectorAll('.stat'));
  statBlocks.forEach(block => {
    const labelEl = block.querySelector('.stat-label');
    const valueEl = block.querySelector('.stat-value');
    if (!labelEl || !valueEl) return;
    const label = labelEl.textContent.trim();

    // Find which event label this stat corresponds to
    const match = Object.entries(labelMap).find(([, human]) => human === label);
    if (!match) return; // skip Active Members or other stats

    const [eventKey] = match;
    const newVal = counts[eventKey] || 0;
    // Set data-target for counter animation and reset current text if zero
    valueEl.setAttribute('data-target', String(newVal));
    // If current text is greater than new target, reset to 0 to let animation grow up
    const cur = parseInt(valueEl.textContent.replace(/[^0-9]/g,''),10) || 0;
    if (cur !== newVal) {
      valueEl.textContent = '0';
    }
  });
}

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

/* ---------- Realistic Star Field with Parallax Effect ---------- */
class StarField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.mouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.animationId = null;
    this.time = 0;
    
    this.config = {
      starCount: 200,
      layers: [
        { count: 60, speed: 0.2, size: [0.8, 1.5], opacity: [0.4, 0.7], parallaxSpeed: 0.1 },
        { count: 80, speed: 0.4, size: [1.2, 2.5], opacity: [0.6, 0.9], parallaxSpeed: 0.3 },
        { count: 60, speed: 0.8, size: [2, 4], opacity: [0.8, 1], parallaxSpeed: 0.5 }
      ],
      starColors: [
        'rgba(255, 255, 255, ',
        'rgba(255, 248, 220, ',
        'rgba(135, 206, 235, ',
        'rgba(255, 182, 193, ',
        'rgba(255, 255, 224, '
      ],
      shootingStarChance: 0.002,
      twinkleSpeed: 0.02
    };
    
    this.setupCanvas();
    this.createStars();
    this.bindEvents();
    this.animate();
  }
  
  setupCanvas() {
    const updateSize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.createStars(); // Recreate stars when resizing
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
  }
  
  createStars() {
    this.stars = [];
    
    this.config.layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const baseSize = layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]);
        this.stars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          originalX: Math.random() * this.canvas.width,
          originalY: Math.random() * this.canvas.height,
          size: baseSize,
          baseSize: baseSize,
          layer: layerIndex,
          speed: layer.speed,
          parallaxSpeed: layer.parallaxSpeed,
          color: this.config.starColors[Math.floor(Math.random() * this.config.starColors.length)],
          opacity: layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]),
          baseOpacity: layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: this.config.twinkleSpeed * (0.8 + Math.random() * 0.4)
        });
      }
    });
  }
  
  createShootingStar() {
    const side = Math.random() < 0.5 ? 'left' : 'top';
    let startX, startY, endX, endY;
    
    if (side === 'left') {
      startX = -50;
      startY = Math.random() * this.canvas.height * 0.6;
      endX = this.canvas.width + 50;
      endY = startY + Math.random() * 200 + 100;
    } else {
      startX = Math.random() * this.canvas.width * 0.6;
      startY = -50;
      endX = startX + Math.random() * 200 + 100;
      endY = this.canvas.height + 50;
    }
    
    this.shootingStars.push({
      x: startX,
      y: startY,
      endX: endX,
      endY: endY,
      progress: 0,
      speed: 0.015 + Math.random() * 0.01,
      size: 1 + Math.random() * 2,
      tailLength: 30 + Math.random() * 20,
      opacity: 0.8 + Math.random() * 0.2
    });
  }
  
  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Track scroll position for parallax
    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset;
    });
  }
  
  updateStars() {
    this.time += 0.016; // ~60fps
    
    this.stars.forEach(star => {
      // Twinkling effect
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.3;
      star.opacity = Math.max(0.2, star.baseOpacity + twinkle);
      star.size = star.baseSize * (1 + twinkle * 0.2);
      
      // Parallax effect based on scroll and mouse
      const mouseInfluenceX = (this.mouse.x - this.canvas.width / 2) * star.parallaxSpeed * 0.0002;
      const mouseInfluenceY = (this.mouse.y - this.canvas.height / 2) * star.parallaxSpeed * 0.0002;
      const scrollInfluence = this.scrollY * star.parallaxSpeed * 0.0005;
      
      star.x = star.originalX + mouseInfluenceX * this.canvas.width - scrollInfluence;
      star.y = star.originalY + mouseInfluenceY * this.canvas.height + scrollInfluence * 0.5;
      
      // Wrap around screen
      if (star.x < -10) star.x = this.canvas.width + 10;
      if (star.x > this.canvas.width + 10) star.x = -10;
      if (star.y < -10) star.y = this.canvas.height + 10;
      if (star.y > this.canvas.height + 10) star.y = -10;
    });
    
    // Update shooting stars
    this.shootingStars = this.shootingStars.filter(shootingStar => {
      shootingStar.progress += shootingStar.speed;
      shootingStar.x = shootingStar.x + (shootingStar.endX - shootingStar.x) * shootingStar.speed;
      shootingStar.y = shootingStar.y + (shootingStar.endY - shootingStar.y) * shootingStar.speed;
      return shootingStar.progress < 1;
    });
    
    // Randomly create shooting stars
    if (Math.random() < this.config.shootingStarChance) {
      this.createShootingStar();
    }
  }
  
  drawStar(star) {
    this.ctx.save();
    
    // Create realistic star shape with cross pattern
    const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
    gradient.addColorStop(0, star.color + star.opacity + ')');
    gradient.addColorStop(0.8, star.color + (star.opacity * 0.3) + ')');
    gradient.addColorStop(1, star.color + '0)');
    
    this.ctx.fillStyle = gradient;
    
    // Draw star core
    this.ctx.beginPath();
    this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Draw star spikes for larger stars
    if (star.size > 1.5) {
      this.ctx.strokeStyle = star.color + (star.opacity * 0.8) + ')';
      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      
      // Horizontal spike
      this.ctx.moveTo(star.x - star.size * 2, star.y);
      this.ctx.lineTo(star.x + star.size * 2, star.y);
      
      // Vertical spike
      this.ctx.moveTo(star.x, star.y - star.size * 2);
      this.ctx.lineTo(star.x, star.y + star.size * 2);
      
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
  
  drawShootingStar(shootingStar) {
    this.ctx.save();
    
    const gradient = this.ctx.createLinearGradient(
      shootingStar.x - shootingStar.tailLength,
      shootingStar.y - shootingStar.tailLength,
      shootingStar.x,
      shootingStar.y
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.7, `rgba(255, 255, 255, ${shootingStar.opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.opacity})`);
    
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = shootingStar.size;
    this.ctx.lineCap = 'round';
    
    this.ctx.beginPath();
    this.ctx.moveTo(shootingStar.x - shootingStar.tailLength, shootingStar.y - shootingStar.tailLength);
    this.ctx.lineTo(shootingStar.x, shootingStar.y);
    this.ctx.stroke();
    
    // Draw bright head
    this.ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(shootingStar.x, shootingStar.y, shootingStar.size, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  animate() {
    // Create subtle dark background
    this.ctx.fillStyle = 'rgba(5, 10, 25, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateStars();
    
    // Draw stars by layers (back to front)
    this.config.layers.forEach((_, layerIndex) => {
      this.stars
        .filter(star => star.layer === layerIndex)
        .forEach(star => this.drawStar(star));
    });
    
    // Draw shooting stars on top
    this.shootingStars.forEach(shootingStar => this.drawShootingStar(shootingStar));
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

function initStarField() {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'star-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background: transparent;
  `;
  
  // Insert as first child of body
  document.body.insertBefore(canvas, document.body.firstChild);
  
  // Initialize star field system
  const starField = new StarField(canvas);
  
  // Store reference for cleanup
  window.starField = starField;
}

/* ---------- Advanced Gallery Functions ---------- */

/* ---------- Init ---------- */
window.addEventListener('DOMContentLoaded', ()=>{
  initStarField(); // Initialize realistic star field background
  NotificationSystem.init(); // Initialize notification system
  renderEvents();
  updateAboutStatsFromEvents();
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
