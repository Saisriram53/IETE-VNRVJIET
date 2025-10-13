// Enhanced scripts.js — richer interactivity for the site
// Features: dynamic events, smooth scrolling, active nav, modal details, RSVP/save, toast notifications,
// sticky header, theme toggle (persisted), search/filter, countdown timer, reveal animations, circular carousel.

// Mobile Navigation Menu
(function() {
  'use strict';
  
  // Initialize mobile menu when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (!hamburger || !mainNav) {
      console.error('Mobile menu elements not found');
      return;
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
})();

// Security enhancements
(function() {
  'use strict';
  
  // HTTPS enforcement (for production)
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
  }
  
  // Content Security Policy helper
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  
  // Make sanitizeHTML available globally
  window.sanitizeHTML = sanitizeHTML;
  
  // Disable right-click context menu on production
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    document.addEventListener('contextmenu', e => e.preventDefault());
  }
})();

const events = [
  {
    id: 'electroverse-main',
    date: '2025-10-22',
    label: 'expo',
    title: 'ELECTROVERSE - Department Fest of ECE',
    summary: 'The flagship 3-day department fest by IETE Student Chapter featuring hackathons, workshops, competitions, and technical events from Oct 22-24, 2025.',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdVEWfS5Zl4HoBJcSG-t0X2fdG-On6XvR1T5TLD4gsBUjIcAw/viewform?usp=dialog',
    details: `
      <div class="event-details">
        <h3>🎉 ELECTROVERSE - Department Fest of ECE</h3>
        <p><strong>Organized by:</strong> IETE Student Chapter</p>
        <p><strong>Duration:</strong> 3 Days (22-24 October 2025)</p>
        <p><strong>Objective:</strong> Enhance awareness about IETE chapter and kickstart the legacy of our department fest</p>
        
        <div style="margin: 20px 0; padding: 15px; background: rgba(0, 83, 156, 0.1); border-left: 4px solid var(--accent); border-radius: 8px;">
          <p style="margin: 0; font-weight: 600;">📋 Get your ELECTROVERSE Pass!</p>
          <p style="margin: 8px 0 0 0; font-size: 0.95em;">Register for the fest pass to access all events throughout the 3-day celebration.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdVEWfS5Zl4HoBJcSG-t0X2fdG-On6XvR1T5TLD4gsBUjIcAw/viewform?usp=dialog" target="_blank" class="btn btn-primary" style="display: inline-block; margin-top: 12px; padding: 12px 24px; background: var(--accent); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">🎫 Register for Fest Pass</a>
        </div>
        
        <h4>📅 Event Schedule Overview:</h4>
        <ul>
          <li><strong>Day 1 (Oct 22):</strong> Inauguration, Arduino Workshop, Quiz Round 1 & Entertainment</li>
          <li><strong>Day 2 (Oct 23):</strong> 24hr HackVerse begins, Treasure Hunt, Quiz Round 2</li>
          <li><strong>Day 3 (Oct 24):</strong> Career Guidance, TechRGue Debate, Gaming, Valedictory</li>
        </ul>
        
        <h4>🌟 Major Events Under ELECTROVERSE:</h4>
        <ul>
          <li>Inauguration Ceremony - Oct 22, 9:30 AM</li>
          <li>Arduino Workshop with TinkerCAD - Oct 22, 11:00 AM</li>
          <li>Think-a-Bit (Tech Quiz) - Round 1 (Oct 22), Round 2 (Oct 23)</li>
          <li>HackVerse (24hr Hackathon) - Oct 23-24</li>
          <li>TechRGue (Tech Debate) - Oct 24</li>
          <li>Career Guidance Workshop - Oct 24</li>
          <li>Treasure Hunt - Oct 23</li>
          <li>Gaming Tournament - Oct 24</li>
          <li>Online Meme Contest - Throughout the fest</li>
          <li>Valedictory Ceremony - Oct 24, 3:40 PM</li>
        </ul>
        
        <p style="margin-top: 20px; font-style: italic; color: var(--muted);">Note: Individual event registrations are available below. The fest pass gives you access to attend all events.</p>
      </div>
    `
  },
  {
    id: 'day1-inauguration',
    date: '2025-10-22',
    label: 'ceremony',
    title: 'Inauguration Ceremony',
    summary: 'Official opening ceremony of ELECTROVERSE 2025 - Department Fest of ECE.',
    details: `
      <div class="event-details">
        <h3>🎊 Inauguration Ceremony</h3>
        <p><strong>Date:</strong> October 22, 2025 (Day 1)</p>
        <p><strong>Time:</strong> 9:30 AM - 11:00 AM</p>
        <p><strong>Duration:</strong> 1.5 hours</p>
        
        <p>Join us for the grand opening of ELECTROVERSE 2025! The ceremony will officially launch our 3-day department fest with speeches from dignitaries, overview of events, and the lighting of the ceremonial lamp.</p>
      </div>
    `
  },
  {
    id: 'arduino-workshop',
    date: '2025-10-22',
    label: 'workshop',
    title: 'Arduino Workshop with TinkerCAD',
    summary: 'Comprehensive hands-on workshop covering Arduino basics with TinkerCAD simulation - Theory and practical sessions.',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc1D39oG2nxRu9WzPyOYW9-QOgOuVz3iICr9K4iXJL5mv5jYw/viewform?usp=dialog',
    details: `
      <div class="event-details">
        <h3>🔧 Arduino Workshop with TinkerCAD</h3>
        <p><strong>Date:</strong> October 22, 2025 (Day 1)</p>
        <p><strong>Session 1 (Theory):</strong> 11:00 AM - 1:00 PM</p>
        <p><strong>Session 2 (Hands-on):</strong> 1:40 PM - 2:40 PM</p>
        
        <div style="margin: 20px 0;">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc1D39oG2nxRu9WzPyOYW9-QOgOuVz3iICr9K4iXJL5mv5jYw/viewform?usp=dialog" target="_blank" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; background: var(--accent); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">📝 Register Now</a>
        </div>
        
        <h4>📋 Session 1: Theory + Demonstrations (11:00 AM – 1:00 PM)</h4>
        <ul>
          <li><strong>11:00 – 11:10 AM:</strong> Welcome & Introduction</li>
          <li><strong>11:10 – 11:50 AM:</strong> Basics of Circuits in Tinkercad
            <ul>
              <li>Interface overview</li>
              <li>Demo: LED + resistor, switch, series/parallel LEDs</li>
            </ul>
          </li>
          <li><strong>11:50 – 12:50 PM:</strong> Arduino in Tinkercad
            <ul>
              <li>Introduction to Arduino UNO</li>
              <li>Demo 1: Blink LED</li>
              <li>Demo 2: Traffic light simulation</li>
              <li>Demo 3: LDR-based street light</li>
            </ul>
          </li>
          <li><strong>12:50 – 1:00 PM:</strong> Q&A Session</li>
        </ul>
        
        <h4>🛠️ Session 2: Hands-On Practice (1:40 PM – 2:40 PM)</h4>
        <ul>
          <li><strong>1:40 – 2:30 PM:</strong> Group Project (50 mins)
            <ul>
              <li>Build a Smart Traffic Light System in Tinkercad using Arduino</li>
              <li>Trainers guide groups as they work</li>
            </ul>
          </li>
          <li><strong>2:30 – 2:40 PM:</strong> Wrap-Up
            <ul>
              <li>Groups showcase their circuits</li>
              <li>Trainers summarize learning & thank participants</li>
            </ul>
          </li>
        </ul>
      </div>
    `
  },
  {
    id: 'hackverse-24hr',
    date: '2025-10-23',
    label: 'hackathon',
    title: 'HackVerse - 24hr Hackathon',
    summary: 'The ultimate 24-hour hackathon challenge spanning Day 2 and Day 3 with multiple rounds, presentations, and jury evaluation.',
    details: `
      <div class="event-details">
        <h3>💻 HackVerse - 24hr Hackathon</h3>
        <p><strong>Duration:</strong> 24 hours continuous</p>
        <p><strong>Start:</strong> October 23, 2025 at 10:00 AM (Day 2)</p>
        <p><strong>End:</strong> October 24, 2025 at 1:00 PM (Day 3)</p>
        
        <h4>📝 Pre-Event Activities:</h4>
        <ul>
          <li><strong>Oct 12-18:</strong> Online submission of PPTs for chosen Problem Statements</li>
          <li><strong>Oct 20:</strong> Shortlisting of top teams by Student Jury</li>
        </ul>
        
        <h4>🚀 Day 2 Schedule (Oct 23):</h4>
        <ul>
          <li><strong>9:00 AM:</strong> Offline Registration (ID Card, room allocation, confirmation)</li>
          <li><strong>10:00 AM:</strong> 🎯 Hackathon Officially Begins</li>
          <li><strong>12:00 PM:</strong> Round 1 Presentation (Progress review by seniors)</li>
          <li><strong>1:00 - 1:40 PM:</strong> Lunch Break</li>
          <li><strong>1:40 - 6:00 PM:</strong> Intensive Work Hours (volunteers available for support)</li>
          <li><strong>6:00 - 6:30 PM:</strong> Snack Break</li>
          <li><strong>6:30 - 8:30 PM:</strong> Round 2 Presentation (Progress review)</li>
          <li><strong>8:30 - 10:00 PM:</strong> Dinner</li>
          <li><strong>10:30 PM - 12:00 AM:</strong> 🎭 BlindFold Pictionary Fun Event</li>
        </ul>
        
        <h4>🌙 Day 3 Schedule (Oct 24):</h4>
        <ul>
          <li><strong>12:00 AM onwards:</strong> Resume Work</li>
          <li><strong>2:30 - 3:30 AM:</strong> Fun Activity (keep participants active)</li>
          <li><strong>6:30 - 8:00 AM:</strong> Fresh Up & Breakfast</li>
          <li><strong>8:00 - 10:00 AM:</strong> Final Fine-tuning</li>
          <li><strong>10:00 AM:</strong> ⏰ Hackathon Ends</li>
          <li><strong>10:00 AM - 1:00 PM:</strong> 🏆 Final Jury Round</li>
        </ul>
      </div>
    `
  },
  {
    id: 'think-a-bit-quiz',
    date: '2025-10-22',
    label: 'competition',
    title: 'Think-a-Bit (Tech Quiz)',
    summary: 'Two-round technical quiz competition testing knowledge in Technology, Entertainment, Sports, and General Knowledge.',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeX9mrtObyv4N8Iq-Z1hKxObJJFQDx_05S8Rl6cHYe98KBelQ/viewform?usp=dialog',
    details: `
      <div class="event-details">
        <h3>🧠 Think-a-Bit (Tech Quiz Competition)</h3>
        <p><strong>Round 1:</strong> October 22, 2025 (Day 1) - 2:40 PM - 4:40 PM</p>
        <p><strong>Round 2:</strong> October 23, 2025 (Day 2) - 1:40 PM - 4:40 PM</p>
        <p><strong>Team Size:</strong> 3-4 members per team</p>
        
        <div style="margin: 20px 0;">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeX9mrtObyv4N8Iq-Z1hKxObJJFQDx_05S8Rl6cHYe98KBelQ/viewform?usp=dialog" target="_blank" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; background: var(--accent); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">📝 Register for Quiz</a>
        </div>
        
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
          <li><strong>Round Robin</strong>
            <ul>
              <li>20 seconds per question</li>
              <li>+1 for correct, 0 for incorrect</li>
              <li>Questions rotate clockwise if passed</li>
            </ul>
          </li>
          
          <li><strong>Rapid Fire</strong>
            <ul>
              <li>5 questions per team, 10 seconds each</li>
              <li>+2 for correct, 0 for incorrect</li>
            </ul>
          </li>
          
          <li><strong>Bonus Round</strong>
            <ul>
              <li>4 multi-part questions</li>
              <li>+3 all correct, +2 partial, -1 incorrect</li>
            </ul>
          </li>
          
          <li><strong>Buzzer Round</strong>
            <ul>
              <li>10 questions, 10 seconds each</li>
              <li>+1 correct, -1 incorrect</li>
              <li>First to buzz gets to answer</li>
            </ul>
          </li>
        </ol>
        
        <p><strong>Tie-Breaker:</strong> Higher Bonus Round score, then more Buzzer Round correct answers</p>
      </div>
    `
  },
  {
    id: 'techrogue-debate',
    date: '2025-10-24',
    label: 'competition',
    title: 'TechRGue (Tech Debate)',
    summary: 'Technical debate competition where participants argue for or against technology-related statements.',
    details: `
      <div class="event-details">
        <h3>🗣️ TechRGue (Tech Debate Competition)</h3>
        <p><strong>Date:</strong> October 24, 2025 (Day 3)</p>
        <p><strong>Time:</strong> 1:40 PM - 3:40 PM (Simultaneous with Gaming)</p>
        
        <h4>📋 Registration Process:</h4>
        <ul>
          <li>Choose one tech-related statement from provided list</li>
          <li>Select your stance: Supporting OR Opposing</li>
          <li>Teams/pairs formed based on topic and stance</li>
        </ul>
        
        <h4>👥 Judging Panel:</h4>
        <ul>
          <li><strong>Technical Judge:</strong> Faculty member (technical evaluation)</li>
          <li><strong>Communication Judge:</strong> English/Language faculty (delivery assessment)</li>
        </ul>
        
        <h4>🎯 Evaluation Criteria:</h4>
        <ul>
          <li><strong>Technical Understanding:</strong> Depth of knowledge on the topic</li>
          <li><strong>Communication & Delivery:</strong> Clarity, confidence, presentation skills</li>
          <li><strong>Relevance & Logic:</strong> Argument structure and reasoning</li>
        </ul>
        
        <h4>📋 Registration Form Fields:</h4>
        <ul>
          <li>Name, Year, Branch & Section</li>
          <li>Mobile Number</li>
          <li>Topic selection from statement list</li>
          <li>Stance preference (For/Against)</li>
          <li>Queries/Doubts section</li>
        </ul>
        
        <p><strong>🏆 Results:</strong> Winners selected by judges based on consolidated scores, certificates/prizes awarded</p>
      </div>
    `
  },
  {
    id: 'career-guidance',
    date: '2025-10-24',
    label: 'workshop',
    title: 'Career Guidance Workshop',
    summary: 'Professional guidance session with industry experts and alumni sharing career insights and opportunities.',
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSe7sXqW8o1LOKHKNehpOh9wEcHRrI2YNd3SYolpaHYVdSRINg/viewform?usp=dialog',
    details: `
      <div class="event-details">
        <h3>🎯 Career Guidance Workshop</h3>
        <p><strong>Date:</strong> October 24, 2025 (Day 3)</p>
        <p><strong>Time:</strong> 10:00 AM - 1:00 PM</p>
        <p><strong>Duration:</strong> 3 hours</p>
        
        <div style="margin: 20px 0;">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7sXqW8o1LOKHKNehpOh9wEcHRrI2YNd3SYolpaHYVdSRINg/viewform?usp=dialog" target="_blank" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; background: var(--accent); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">📝 Register for Career Guidance</a>
        </div>
        
        <p>Interactive session featuring industry professionals and successful alumni sharing valuable career insights, tips, and guidance for your future in electronics and communication engineering.</p>
        
        <h4>🎤 What to Expect:</h4>
        <ul>
          <li>Industry trends and opportunities</li>
          <li>Career paths in ECE</li>
          <li>Skills development guidance</li>
          <li>Interview preparation tips</li>
          <li>Higher studies advice</li>
          <li>Networking opportunities</li>
          <li>Q&A with experts</li>
        </ul>
        
        <p><strong>Speakers:</strong> Industry professionals, successful alumni, and career counselors</p>
      </div>
    `
  },
  {
    id: 'meme-contest',
    date: '2025-10-22',
    label: 'competition',
    title: 'Online Meme Contest',
    summary: 'Creative online meme competition focusing on core domain topics with multiple submission formats.',
    details: `
      <div class="event-details">
        <h3>😂 Online Meme Contest</h3>
        <p><strong>Duration:</strong> Throughout the fest (submit anytime)</p>
        <p><strong>Submission:</strong> Via Google Form</p>
        <p><strong>Open to:</strong> Everyone</p>
        
        <h4>📋 Contest Categories:</h4>
        
        <div class="contest-category">
          <h5>🖼️ ONLINE MEME CONTEST</h5>
          <ul>
            <li><strong>Format:</strong> Image or Video</li>
            <li><strong>Theme:</strong> Core domain topics (ECE/Technology)</li>
            <li><strong>Submission:</strong> Google Form upload</li>
          </ul>
        </div>
        
        <div class="contest-category">
          <h5>🎵 SONG OR MOVIE GUESSING</h5>
          <p>Light-hearted activity during breaks between main events to keep audience engaged.</p>
        </div>
        
        <div class="contest-category">
          <h5>🎭 MEME BACK (Feedback Activity)</h5>
          <ul>
            <li>Optional add-on in feedback Google Form</li>
            <li>Express feedback using meme dialogues</li>
            <li>Upload short clips of meme-based feedback</li>
          </ul>
        </div>
        
        <h4>📜 Contest Rules:</h4>
        <ul>
          <li><strong>Content Focus:</strong> Core domain topics only</li>
          <li><strong>Language:</strong> No adult (18+) language allowed</li>
          <li><strong>Respect:</strong> Content must not offend management</li>
          <li><strong>Originality:</strong> Original creations preferred</li>
        </ul>
        
        <p><strong>🏆 Judging:</strong> Based on creativity, relevance to domain, and humor quotient</p>
      </div>
    `
  },
  {
    id: 'treasure-hunt',
    date: '2025-10-23',
    label: 'competition',
    title: 'Treasure Hunt',
    summary: 'Exciting campus-wide treasure hunt running simultaneously with Think-a-Bit Round 2.',
    details: `
      <div class="event-details">
        <h3>🗺️ Treasure Hunt</h3>
        <p><strong>Date:</strong> October 23, 2025 (Day 2)</p>
        <p><strong>Time:</strong> 1:40 PM - 4:40 PM</p>
        <p><strong>Format:</strong> Simultaneous with Think-a-Bit Round 2</p>
        
        <p>Navigate through exciting clues and challenges across the campus in this thrilling treasure hunt adventure. Work as a team to solve puzzles, find hidden objects, and reach the final treasure!</p>
        
        <h4>🎯 Hunt Features:</h4>
        <ul>
          <li>Multiple clue stations across campus</li>
          <li>Technical and logical puzzles</li>
          <li>Team-based challenges</li>
          <li>Time-bound excitement</li>
          <li>Surprise elements at each stage</li>
        </ul>
        
        <p><strong>Team Size:</strong> 3-4 members recommended</p>
        <p><strong>🏆 Prizes:</strong> Exciting rewards for fastest and most creative teams</p>
      </div>
    `
  },
  {
    id: 'gaming-event',
    date: '2025-10-24',
    label: 'entertainment',
    title: 'Gaming Tournament',
    summary: 'Competitive gaming tournament running alongside TechRGue debate competition.',
    details: `
      <div class="event-details">
        <h3>🎮 Gaming Tournament</h3>
        <p><strong>Date:</strong> October 24, 2025 (Day 3)</p>
        <p><strong>Time:</strong> 1:40 PM - 3:40 PM</p>
        <p><strong>Format:</strong> Simultaneous with TechRGue</p>
        
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
      </div>
    `
  },
  {
    id: 'valedictory',
    date: '2025-10-24',
    label: 'ceremony',
    title: 'Valedictory Ceremony',
    summary: 'Grand closing ceremony of ELECTROVERSE 2025 with prize distribution and closing remarks.',
    details: `
      <div class="event-details">
        <h3>🏆 Valedictory Ceremony</h3>
        <p><strong>Date:</strong> October 24, 2025 (Day 3)</p>
        <p><strong>Time:</strong> 3:40 PM - 5:00 PM</p>
        <p><strong>Duration:</strong> 1 hour 20 minutes</p>
        
        <p>Join us for the grand finale of ELECTROVERSE 2025! Celebrate the success of our 3-day department fest with prize distribution, recognition of winners, and closing remarks.</p>
        
        <h4>🎊 Ceremony Highlights:</h4>
        <ul>
          <li>Prize distribution for all competitions</li>
          <li>Recognition of outstanding participants</li>
          <li>Vote of thanks</li>
          <li>Closing remarks by dignitaries</li>
          <li>Group photographs</li>
          <li>Feedback collection</li>
        </ul>
        
        <p><strong>🎉 Celebration:</strong> A fitting end to an amazing 3-day journey of learning, competition, and fun!</p>
      </div>
    `
  }
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
    
    // Check if event has a registration link
    const registerButton = ev.registrationLink 
      ? `<a href="${ev.registrationLink}" target="_blank" class="btn primary" style="text-decoration: none;">Register</a>`
      : `<button class="btn primary btn-rsvp" data-id="${ev.id}">Register</button>`;
    
    el.innerHTML = `
      <h4>${ev.title}</h4>
      <p>${ev.summary}</p>
      <div style="margin-top:12px;">
        ${registerButton}
      </div>
    `;
    grid.appendChild(el);
  });
  // bind register buttons only
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
  function open(ev){ if(!el) return; currentEventId = ev.id; titleEl.textContent = 'Register — '+ ev.title; el.classList.add('open'); el.querySelector('input[name="name"]').focus(); }
  function close(){ if(!el) return; el.classList.remove('open'); }
  function onSubmit(e){ e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); data.eventId = currentEventId; saveRSVP(data); close(); }
  return { init, open, close };
})();

function openRSVPModal(ev){ rsvpModal.open(ev); }

function saveRSVP(data){ const key = 'iete_rsvps'; const arr = JSON.parse(localStorage.getItem(key) || '[]'); arr.push({...data, timestamp: new Date().toISOString()}); localStorage.setItem(key, JSON.stringify(arr)); showToast('Registration saved — check email for details (demo)'); }

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

// ========================================
// MOBILE MENU TOGGLE FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (mobileMenuToggle && mainNav) {
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (mainNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on window resize to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
