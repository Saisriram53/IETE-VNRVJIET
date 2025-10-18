// ELECTROVERSE 2025 - Interactive JavaScript

// Enhanced Particle System
function createEnhancedParticles() {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 12 + 's';
    particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
    document.body.appendChild(particle);
  }
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.id = 'scrollProgress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Enhanced Custom Cursor
function initCustomCursor() {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.id = 'cursorGlow';
  document.body.appendChild(cursorGlow);
  
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX - 15 + 'px';
    cursorGlow.style.top = e.clientY - 15 + 'px';
    cursorGlow.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}

// Enhanced Animated Background
function initAnimatedBackground() {
  const animatedBg = document.createElement('div');
  animatedBg.className = 'animated-bg';
  document.body.appendChild(animatedBg);
}

// Loading Screen Controller
window.addEventListener('load', function() {
  // Initialize enhanced features
  initAnimatedBackground();
  createEnhancedParticles();
  initScrollProgress();
  initCustomCursor();
  
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    const pageContent = document.getElementById('pageContent');
    
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        if (pageContent) {
          pageContent.style.opacity = '1';
        }
      }, 500);
    }
  }, 2000);
});

// Animation and Interaction Controllers
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations and interactions
  initScrollAnimations();
  initParticleSystem();
  initTypewriterEffect();
  initFloatingElements();
  initMouseTracker();
  initButtonAnimations();
  initCountUpAnimations();
  initTiltEffect();
  initTitleGlitch();
  initEventCardInteractions();
});

// Scroll-triggered animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.section-header, .event-card, .testimonial-card, .highlight-stat');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        entry.target.style.animationDelay = Math.random() * 0.5 + 's';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Particle system for hero section
function initParticleSystem() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  
  heroSection.appendChild(particlesContainer);
  
  // Create floating particles
  for (let i = 0; i < 30; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 20;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,255,255,0.4) 100%);
    border-radius: 50%;
    left: ${x}%;
    top: 100%;
    animation: floatUp ${duration}s linear ${delay}s infinite;
  `;
  
  container.appendChild(particle);
}

// Add floating animation keyframes to CSS dynamically
const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(floatUpStyle);

// Typewriter effect for hero subtitle
function initTypewriterEffect() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.borderRight = '2px solid #FFD700';
  
  let index = 0;
  const typeSpeed = 100;
  
  function typeWriter() {
    if (index < text.length) {
      subtitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, typeSpeed);
    } else {
      // Blinking cursor effect
      setInterval(() => {
        subtitle.style.borderRight = subtitle.style.borderRight === 'none' ? '2px solid #FFD700' : 'none';
      }, 500);
    }
  }
  
  setTimeout(typeWriter, 2000); // Start after other animations
}

// Floating elements animation
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.hero-logo, .countdown-item, .hero-stat');
  
  floatingElements.forEach((element, index) => {
    const floatHeight = Math.random() * 10 + 5;
    const floatDuration = Math.random() * 2 + 2;
    
    element.style.animation += `, customFloat${index} ${floatDuration}s ease-in-out infinite alternate`;
    
    // Create unique floating animation for each element
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
      @keyframes customFloat${index} {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-${floatHeight}px) rotate(${Math.random() * 4 - 2}deg); }
      }
    `;
    document.head.appendChild(floatStyle);
  });
}

// Mouse tracking effect for hero section
function initMouseTracker() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  // Create custom cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 70%, transparent 100%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease-out;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);
  
  hero.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  hero.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    document.body.style.cursor = 'none';
  });
  
  hero.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    document.body.style.cursor = 'auto';
  });
  
  // Smooth cursor movement
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();
}

// Enhanced button animations
function initButtonAnimations() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
      
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add ripple effect keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes rippleEffect {
      0% {
        width: 0;
        height: 0;
        opacity: 1;
      }
      100% {
        width: 100px;
        height: 100px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Enhanced Count-up animation for numbers
function initCountUpAnimations() {
  const countElements = document.querySelectorAll('.stat-number, .stat-number-large');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.dataset.target) || parseInt(element.textContent);
        
        if (!isNaN(target)) {
          animateCountUp(element, 0, target, 2000);
        }
        
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  countElements.forEach(el => observer.observe(el));
}

function animateCountUp(element, start, end, duration) {
  const startTime = Date.now();
  const originalText = element.textContent;
  const hasKPlus = originalText.includes('K+');
  const hasPlus = originalText.includes('+') && !hasKPlus;
  const hasInfinity = originalText.includes('∞');
  
  if (hasInfinity) return; // Don't animate infinity symbol
  
  function updateCounter() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOut);
    
    let displayText = current.toString();
    if (hasKPlus) displayText += 'K+';
    else if (hasPlus) displayText += '+';
    
    element.textContent = displayText;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Add completion effect
      element.style.transform = 'scale(1.1)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 200);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Tilt effect for cards
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.event-item, .testimonial-card, .highlight-stat');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', handleTilt);
    element.addEventListener('mouseleave', resetTilt);
  });
}

function handleTilt(e) {
  const element = e.currentTarget;
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / centerY * -10;
  const rotateY = (x - centerX) / centerX * 10;
  
  element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
}

// Enhanced Parallax scrolling effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-bg, .particles-container, .animated-bg');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Title Glitch Effect
function initTitleGlitch() {
  const title = document.querySelector('.title-main');
  if (title) {
    title.addEventListener('click', () => {
      title.style.animation = 'none';
      title.style.animation = 'glitchEffect 0.5s infinite';
      setTimeout(() => {
        title.style.animation = 'gradientShift 3s ease-in-out infinite, textGlow 2s ease-in-out infinite alternate';
      }, 500);
    });
    
    title.addEventListener('mouseenter', () => {
      title.style.transform = 'scale(1.05)';
    });
    
    title.addEventListener('mouseleave', () => {
      title.style.transform = 'scale(1)';
    });
  }
}

// Enhanced Event Card Interactions
function initEventCardInteractions() {
  document.querySelectorAll('.event-item').forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('event-btn')) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
  });
}

// Event Details Data
const eventDetails = {
  
  quiz: {
    title: "Think-a-Bit Quiz Competition",
    content: `
      <h3>🧠 Think-a-Bit Quiz Competition</h3>
      <p><strong>Round 1:</strong> Oct 22 (Day 1) - 2:40 PM - 4:40 PM</p>
      <p><strong>Round 2:</strong> Oct 23 (Day 2) - 1:40 PM - 4:40 PM</p>
      <p><strong>Team Size:</strong> 3-4 members per team</p>
      
      <h4>📝 ROUND 1: PRELIMINARY/WRITTEN ROUND</h4>
      <p><strong>Format:</strong> Two written papers with mixed knowledge areas</p>
      <ul>
        <li><strong>Paper 1:</strong> Technology + Entertainment (30 questions)</li>
        <li><strong>Paper 2:</strong> Sports + General Knowledge (30 questions)</li>
        <li><strong>Time:</strong> 20 minutes per paper (1.5 hours total)</li>
        <li><strong>Bonus Section:</strong> 3 optional questions per paper (+2 correct, -1 incorrect)</li>
      </ul>
      
      <p><strong>Marking Scheme:</strong></p>
      <ul>
        <li>Regular questions: +1 correct, 0 incorrect</li>
        <li>Bonus questions: +2 correct, -1 incorrect</li>
      </ul>
      
      <p><strong>Qualification:</strong> Top 30% teams advance to Round 2</p>
      
      <h4>🏆 ROUND 2: FINAL/PPT ROUND</h4>
      <p>Four exciting sub-rounds testing different skills:</p>
      
      <ol>
        <li><strong>Round Robin</strong> - 20 seconds per question, +1 for correct</li>
        <li><strong>Rapid Fire</strong> - 5 questions per team, 10 seconds each, +2 for correct</li>
        <li><strong>Bonus Round</strong> - 4 multi-part questions, +3 all correct, +2 partial, -1 incorrect</li>
        <li><strong>Buzzer Round</strong> - 10 questions, 10 seconds each, +1 correct, -1 incorrect</li>
      </ol>
      
      <p><strong>🏆 Winner Determination:</strong> Cumulative score across all sub-rounds with tie-breaker rules</p>
    `
  },
  
  treasure: {
    title: "Treasure Hunt Adventure",
    content: `
      <h3>🗺️ Treasure Hunt Adventure</h3>
      <p><strong>Date:</strong> October 23, 2025 (Day 2)</p>
      <p><strong>Time:</strong> 1:40 PM - 4:40 PM</p>
      <p><strong>Format:</strong> Campus-wide adventure (simultaneous with Think-a-Bit Round 2)</p>
      
      <h4>🎯 Hunt Features:</h4>
      <ul>
        <li><strong>Multiple Clue Stations</strong>
          <ul>
            <li>Strategic locations across the entire campus</li>
            <li>QR code based clue system</li>
            <li>Progressive difficulty levels</li>
            <li>Hidden checkpoints and bonus rounds</li>
          </ul>
        </li>
        <li><strong>Technical and Logical Puzzles</strong>
          <ul>
            <li>Electronics and circuit-based challenges</li>
            <li>Programming logic problems</li>
            <li>Mathematical and analytical puzzles</li>
            <li>General knowledge questions</li>
          </ul>
        </li>
        <li><strong>Team-based Challenges</strong>
          <ul>
            <li>Collaborative problem solving</li>
            <li>Communication and coordination tests</li>
            <li>Leadership and strategy challenges</li>
            <li>Time management scenarios</li>
          </ul>
        </li>
        <li><strong>Time-bound Excitement</strong>
          <ul>
            <li>3-hour intensive adventure</li>
            <li>Real-time leaderboard updates</li>
            <li>Penalty system for wrong attempts</li>
            <li>Bonus points for creativity</li>
          </ul>
        </li>
        <li><strong>Surprise Elements</strong>
          <ul>
            <li>Mystery boxes at key locations</li>
            <li>Random challenge generators</li>
            <li>Hidden shortcuts and alternate routes</li>
            <li>Special tasks from volunteers</li>
          </ul>
        </li>
      </ul>
      
      <h4>📋 Team Requirements:</h4>
      <ul>
        <li><strong>Team Size:</strong> 3-4 members (recommended)</li>
        <li><strong>Equipment:</strong> Smartphones for QR scanning and navigation</li>
        <li><strong>Skills Needed:</strong> Problem solving, teamwork, basic technical knowledge</li>
        <li><strong>Physical Activity:</strong> Moderate campus exploration required</li>
      </ul>
      
      <h4>🏆 Exciting Rewards:</h4>
      <ul>
        <li><strong>Fastest Team:</strong> Speed completion prizes</li>
        <li><strong>Most Creative Team:</strong> Innovation and approach awards</li>
        <li><strong>Best Strategy:</strong> Efficient route planning recognition</li>
        <li><strong>Participation Certificates:</strong> For all completing teams</li>
      </ul>
      
      <p><strong>🎯 Adventure Benefits:</strong> Team building, problem solving skills, campus exploration, networking, and loads of fun memories!</p>
    `
  },
  
  meme: {
    title: "Online Meme Contest",
    content: `
      <h3>😂 Online Meme Contest</h3>
      <p><strong>Duration:</strong> Throughout the fest (submit anytime during Oct 22-24)</p>
      <p><strong>Submission:</strong> Via Google Form</p>
      <p><strong>Open to:</strong> Everyone (students, faculty, tech enthusiasts)</p>
      
      <h4>📋 Contest Categories:</h4>
      
      <div class="contest-category">
        <h5>🖼️ ONLINE MEME CONTEST</h5>
        <ul>
          <li><strong>Format:</strong> Image memes or Video memes (max 30 seconds)</li>
          <li><strong>Theme:</strong> Core domain topics (ECE/Technology/Engineering)</li>
          <li><strong>Submission:</strong> Google Form upload with high-quality files</li>
          <li><strong>Categories:</strong> Funniest, Most Creative, Most Relatable, Best Video</li>
        </ul>
      </div>
      
      <div class="contest-category">
        <h5>🎵 SONG OR MOVIE GUESSING</h5>
        <ul>
          <li>Light-hearted interactive activity during event breaks</li>
          <li>Tech-themed songs and movies</li>
          <li>Live audience participation</li>
          <li>Instant prizes for correct guesses</li>
        </ul>
      </div>
      
      <div class="contest-category">
        <h5>🎭 MEME BACK (Feedback Activity)</h5>
        <ul>
          <li>Optional creative addition to event feedback forms</li>
          <li>Express your fest experience using meme dialogues</li>
          <li>Upload short video clips (15-30 seconds)</li>
          <li>Best feedback memes get special recognition</li>
        </ul>
      </div>
      
      <h4>📜 Contest Rules and Guidelines:</h4>
      <ul>
        <li><strong>Content Focus:</strong> Must relate to ECE, technology, electronics, or engineering</li>
        <li><strong>Language Policy:</strong> No adult (18+) or inappropriate language allowed</li>
        <li><strong>Respect Guidelines:</strong> Content must not offend management, faculty, or students</li>
        <li><strong>Originality:</strong> Original creations preferred, proper credit for templates</li>
        <li><strong>Quality Standards:</strong> Clear, readable text and good image/video quality</li>
        <li><strong>Submission Limit:</strong> Maximum 3 entries per participant</li>
      </ul>
      
      <h4>🏆 Judging Criteria:</h4>
      <ul>
        <li><strong>Creativity and Originality:</strong> Unique approach and fresh ideas</li>
        <li><strong>Relevance to Domain:</strong> Connection to ECE/technology themes</li>
        <li><strong>Humor Quotient:</strong> Entertainment value and comedic timing</li>
        <li><strong>Technical Quality:</strong> Visual appeal and execution</li>
        <li><strong>Audience Appeal:</strong> Relatability to student community</li>
      </ul>
      
      <h4>🎁 Exciting Prizes:</h4>
      <ul>
        <li>Winner certificates and cash prizes</li>
        <li>Featured display during valedictory ceremony</li>
        <li>Social media promotion and recognition</li>
        <li>Special mentions in event newsletter</li>
      </ul>
      
      <p><strong>🎯 Why Participate:</strong> Showcase your creativity, win exciting prizes, get featured on social media, and add fun to the technical fest!</p>
    `
  },
  
  gaming: {
    title: "Gaming Tournament",
    content: `
      <h3>🎮 Gaming Tournament</h3>
      <p><strong>Date:</strong> October 23, 2025 (Day 2)</p>
      <p><strong>Time:</strong> 1:40 PM - 3:40 PM</p>
      
      <p>Compete in exciting gaming tournaments featuring popular games. Show off your gaming skills and compete for prizes!</p>
      
      <h4>🏆 Tournament Features:</h4>
      <ul>
        <li>Multiple gaming categories</li>
        <li>Individual and team competitions</li>
        <li>Elimination rounds</li>
        <li>Live commentary and audience participation</li>
        <li>Prizes for winners and runners-up</li>
      </ul>
      
      <p><strong>Registration:</strong> On-spot registration available</p>
      <p><strong>Equipment:</strong> Gaming setups provided</p>
    `
  }
  
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const tabBtns = document.querySelectorAll('.tab-btn');
const daySchedules = document.querySelectorAll('.day-schedule');
const eventBtns = document.querySelectorAll('.event-btn');
const modal = document.getElementById('eventModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const registrationForm = document.getElementById('registration-form');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeScheduleTabs();
  initializeEventModals();
  initializeRegistrationForm();
  initializeSmoothScrolling();
  initializeAnimations();
});

// Navigation Functions
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Schedule Tabs
function initializeScheduleTabs() {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      
      // Update active tab
      tabBtns.forEach(tab => tab.classList.remove('active'));
      btn.classList.add('active');
      
      // Update active schedule
      daySchedules.forEach(schedule => {
        schedule.classList.remove('active');
        if (schedule.id === day) {
          schedule.classList.add('active');
        }
      });
    });
  });
}

// Event Modals
function initializeEventModals() {
  eventBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const eventKey = btn.dataset.event;
      const eventData = eventDetails[eventKey];
      
      if (eventData) {
        modalBody.innerHTML = eventData.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Registration Form
function initializeRegistrationForm() {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(registrationForm);
    const registrationData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      year: formData.get('year'),
      branch: formData.get('branch'),
      events: formData.getAll('events'),
      timestamp: new Date().toISOString()
    };

    // Validate form
    if (!registrationData.name || !registrationData.email || !registrationData.phone || 
        !registrationData.year || !registrationData.branch) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }

    if (registrationData.events.length === 0) {
      showToast('Please select at least one event!', 'error');
      return;
    }

    // Simulate registration (in real app, send to server)
    setTimeout(() => {
      // Save to localStorage
      const registrations = JSON.parse(localStorage.getItem('electroverse_registrations') || '[]');
      registrations.push(registrationData);
      localStorage.setItem('electroverse_registrations', JSON.stringify(registrations));
      
      // Show success message
      showToast('Registration successful! Check your email for confirmation.', 'success');
      
      // Reset form
      registrationForm.reset();
      
      // Scroll to top of form
      document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  });
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toastMessage = toast.querySelector('.toast-message');
  const toastIcon = toast.querySelector('.toast-icon');
  
  toastMessage.textContent = message;
  
  if (type === 'success') {
    toast.style.background = 'var(--success-color)';
    toastIcon.textContent = '✅';
  } else if (type === 'error') {
    toast.style.background = 'var(--error-color)';
    toastIcon.textContent = '❌';
  }
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Animations
function initializeAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.event-item, .timeline-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Counter animation for stats
  const animateCounters = () => {
    document.querySelectorAll('.stat-number').forEach(counter => {
      const target = counter.textContent;
      const isNumber = !isNaN(target);
      
      if (isNumber) {
        const targetNumber = parseInt(target);
        let current = 0;
        const increment = targetNumber / 50;
        
        const updateCounter = () => {
          if (current < targetNumber) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      }
    });
  };

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
}

// Utility Functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// Performance optimizations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add debounced scroll listener for performance
window.addEventListener('scroll', debounce(() => {
  // Any scroll-based animations or effects can go here
}, 100));

// Preload images for better performance
function preloadImages() {
  const imageUrls = [
    '../assets/iete-logo.jpeg',
    '../assets/vnrvjiet-logo.png'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Call preload on load
window.addEventListener('load', preloadImages);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateEmail,
    validatePhone,
    formatDate,
    debounce
  };
}
