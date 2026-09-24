/**
 * VOLTFORGE STUDIO — Pure JavaScript Interactivity (Zero External Libraries)
 * Handlers for infinite sliding marquee, interactive modal dialogs,
 * portfolio category filtering, consultation quote calculator, and navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Theme / Brightness mode toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-contrast-mode');
      const isWarm = document.body.classList.contains('light-contrast-mode');
      themeToggleBtn.title = isWarm ? 'Switch to Dark Mode' : 'Switch to Warm Glow Mode';
    });
  }

  // 2. Mobile Menu Drawer
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    }
    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Sliding Marquee Pause / Play Control
  const marqueeTrack = document.getElementById('marqueeTrack');
  const pauseMarqueeBtn = document.getElementById('pauseMarqueeBtn');
  let isPaused = false;

  if (pauseMarqueeBtn && marqueeTrack) {
    pauseMarqueeBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        marqueeTrack.classList.add('paused');
        pauseMarqueeBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg> Play Slide
        `;
      } else {
        marqueeTrack.classList.remove('paused');
        pauseMarqueeBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg> Pause
        `;
      }
    });

    // Pause on hover
    marqueeTrack.addEventListener('mouseenter', () => {
      if (!isPaused) marqueeTrack.classList.add('paused');
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      if (!isPaused) marqueeTrack.classList.remove('paused');
    });
  }

  // 4. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-cinematic');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Generic Modal System (Project Case Studies, Services, Blog Posts)
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(htmlContent) {
    if (modalBody && modalOverlay) {
      modalBody.innerHTML = htmlContent;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Service Detail Modals
  const serviceDetails = {
    'web-design': {
      title: 'Web Design & Engineering for Electrical Businesses',
      num: '/ 01',
      desc: 'We do not build generic template sites. Every electrical website we engineer is designed for maximum speed, commercial credibility, and frictionless quote acquisition.',
      features: [
        'Custom visual identity and bespoke dark/light theme systems for electrical contractors',
        'Built for lightning-fast sub-second loading (Google Core Web Vitals 98+ score)',
        'Interactive quote request funnels and service dispatch widgets',
        'Full compliance with electrical safety board credentials and trade license displays',
        'Integrated commercial tender file upload portals for architects and GCs'
      ],
      timeline: '3 - 6 Weeks delivery',
      tech: 'Semantic HTML5, CSS Grid/Flexbox, TypeScript, Headless CMS integration'
    },
    'ui-ux': {
      title: 'UI/UX Design & Electrical Client Portals',
      num: '/ 02',
      desc: 'Designing specialized software interfaces, solar payback estimators, technician dispatch consoles, and frictionless customer booking flows.',
      features: [
        'Interactive solar panel production & utility bill savings calculator',
        'Digital electrical inspection checklists and customer sign-off portals',
        'Intuitive emergency 24/7 service booking with live technician proximity',
        'Customer dashboard for multi-property commercial facility managers'
      ],
      timeline: '2 - 4 Weeks delivery',
      tech: 'Figma prototypes, design systems, micro-interactions, responsive tokens'
    },
    'app-dev': {
      title: 'App Development for Electrical Businesses',
      num: '/ 03',
      desc: 'Custom iOS, Android, and Progressive Web Applications tailored for electricians in the field, dispatchers, and commercial maintenance contracts.',
      features: [
        'Technician field companion with offline wiring schematics and job notes',
        'Automated barcode/QR scanning for electrical inventory and breaker panels',
        'Push notifications for emergency dispatch and work order status',
        'Seamless sync with QuickBooks, ServiceTitan, and custom enterprise databases'
      ],
      timeline: '6 - 10 Weeks delivery',
      tech: 'PWA, Offline-first IndexedDB, Secure API sync, Cross-platform Web Apps'
    },
    'seo': {
      title: 'SEO & Local Search Dominance for Electricians',
      num: '/ 04',
      desc: 'Be the first contractor commercial builders and homeowners call when emergencies or high-value contracts arise.',
      features: [
        'Local 3-Pack Google Maps optimization for regional service radiuses',
        'Targeting high-intent search queries ("commercial electrical contractor", "emergency electrician")',
        'Schema.org Electrician markup, JSON-LD structured data for rich snippet stars',
        'Automated 5-star Google review generation workflows'
      ],
      timeline: 'Ongoing monthly execution & sprint audits',
      tech: 'Technical SEO audits, Schema structured data, localized landing architectures'
    }
  };

  document.querySelectorAll('[data-service-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sId = btn.getAttribute('data-service-id');
      const s = serviceDetails[sId];
      if (!s) return;

      const featList = s.features.map(f => `
        <li style="font-size:0.925rem; color:#dedede; display:flex; align-items:flex-start; gap:10px; margin-bottom:10px;">
          <span style="color:#ff5500; font-weight:bold; font-size:1.1rem; line-height:1;">•</span> ${f}
        </li>
      `).join('');

      const content = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div>
            <span class="kicker">${s.num} SERVICE DEEP DIVE</span>
            <h2 style="font-size:clamp(1.6rem, 2.8vw, 2.4rem); font-weight:800; letter-spacing:-0.03em; color:#fff; line-height:1.2; margin-bottom:12px;">${s.title}</h2>
            <p style="font-size:1.05rem; color:#a3a3a3; line-height:1.6;">${s.desc}</p>
          </div>

          <div style="background:#141414; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:24px;">
            <h4 style="font-size:0.95rem; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:16px;">What We Deliver</h4>
            <ul style="list-style:none; padding:0; margin:0;">
              ${featList}
            </ul>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; font-size:0.875rem;">
            <div style="background:#111; padding:14px 18px; border-radius:8px; border:1px solid rgba(255,255,255,0.06);">
              <span style="color:#666; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:4px;">Typical Timeline</span>
              <strong style="color:#fff;">${s.timeline}</strong>
            </div>
            <div style="background:#111; padding:14px 18px; border-radius:8px; border:1px solid rgba(255,255,255,0.06);">
              <span style="color:#666; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:4px;">Core Technology</span>
              <strong style="color:#fff;">${s.tech}</strong>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:8px;">
            <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" class="btn-primary">Book Discovery Call →</a>
          </div>
        </div>
      `;
      openModal(content);
    });
  });

  // Sector Card Modal
  document.querySelectorAll('.sector-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.sector-title').innerText;
      const badge = card.querySelector('.sector-badge').innerText;
      const desc = card.querySelector('.sector-desc').innerText;
      const img = card.querySelector('.card-bg-img').src;

      const content = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div class="kicker">${badge} · ELECTRICAL SECTOR</div>
          <h2 style="font-size:2.2rem; font-weight:800; letter-spacing:-0.03em; color:#fff; line-height:1.15;">${title}</h2>
          
          <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); max-height:300px;">
            <img src="${img}" alt="${title}" style="width:100%; height:100%; object-fit:cover;">
          </div>

          <p style="font-size:1.05rem; color:#dedede; line-height:1.6;">${desc}</p>

          <div style="background:#141414; padding:20px; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
            <h4 style="color:#ff5500; font-size:0.9rem; font-weight:700; margin-bottom:8px;">Proven Growth Strategy for this Sector:</h4>
            <p style="font-size:0.875rem; color:#a3a3a3; line-height:1.5;">We focus on high-ticket customer acquisition, verified safety badges, live emergency response routing, and commercial tender conversion architecture.</p>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:12px;">
            <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" class="btn-primary">Start a Project in this Sector →</a>
          </div>
        </div>
      `;
      openModal(content);
    });
  });

  // Blog Article Reader Modal
  const blogArticles = {
    'solar-calc': {
      title: 'How an Interactive Solar Calculator Doubled Inbound Deals for Solar Contractors',
      meta: 'SOLAR ENERGY · 28.08.2026',
      img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop',
      body: `
        <p style="margin-bottom:16px;">When commercial and residential clients consider solar energy, their primary hesitation is not whether solar works—it is financial transparency: <em>"How many years until breakeven, and what is my actual monthly bill offset?"</em></p>
        <p style="margin-bottom:16px;">Traditional contractor websites forced visitors into static contact forms that produced low conversion rates (under 1.8%). By engineering an interactive, real-time roof solar estimator that inputs roof square footage and average monthly kilowatt usage, our solar contractor partners saw qualified inbound inquiries increase by 114% in the first 90 days.</p>
        <h4 style="color:#fff; margin:20px 0 10px; font-size:1.1rem;">Key Takeaways for Solar Installers:</h4>
        <ul style="color:#a3a3a3; margin-left:20px; margin-bottom:16px; line-height:1.6;">
          <li>Give instant estimates before asking for personal phone numbers.</li>
          <li>Display local utility incentive rates and federal ITC credits dynamically.</li>
          <li>Embed battery storage add-on toggles (Tesla Powerwall / Enphase) to boost average ticket size.</li>
        </ul>
      `
    },
    'rebrand-when': {
      title: 'Rebranding Electrical Contractors: When It Multiplies Value vs. When It Fails',
      meta: 'BRAND STRATEGY · 20.06.2026',
      img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop',
      body: `
        <p style="margin-bottom:16px;">Many electrical business owners believe rebranding simply means ordering new van wraps and a fresh logo. However, a cosmetic refresh without positioning engineering often produces zero lift in commercial revenue.</p>
        <p style="margin-bottom:16px;">A strategic rebrand is required when an electrical contractor has outgrown residential service calls and wishes to land 6-figure general contractor subcontracts, institutional tenders, and multi-facility industrial maintenance contracts.</p>
        <p style="margin-bottom:16px;">We analyze case studies from 12+ German and American electrical firms that transitioned their brand authority from "one-man van" to "enterprise electrical partner".</p>
      `
    },
    'web-award': {
      title: 'VoltForge Named Best Technical Portfolio at Trade Web Awards 2026',
      meta: 'AGENCY NEWS · 14.06.2026',
      img: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=800&auto=format&fit=crop',
      body: `
        <p style="margin-bottom:16px;">VoltForge Studio was recognized as the Top Digital Agency for Industrial and Electrical Trades at the 2026 Webcraft Summit.</p>
        <p style="margin-bottom:16px;">Judges commended our zero-bloat approach: hand-crafted CSS architectures, 100% Core Web Vitals scores, and deep domain understanding of master electricians, PV engineers, and high-voltage specialists.</p>
        <p style="margin-bottom:16px;">Thank you to all our contractor clients who trust us with their digital flagship!</p>
      `
    }
  };

  document.querySelectorAll('[data-blog-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const bId = card.getAttribute('data-blog-id');
      const article = blogArticles[bId];
      if (!article) return;

      const content = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div class="kicker">${article.meta}</div>
          <h2 style="font-size:clamp(1.6rem, 2.8vw, 2.2rem); font-weight:800; letter-spacing:-0.03em; color:#fff; line-height:1.2;">${article.title}</h2>
          
          <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); max-height:280px;">
            <img src="${article.img}" alt="${article.title}" style="width:100%; height:100%; object-fit:cover;">
          </div>

          <div style="font-size:0.95rem; color:#dedede; line-height:1.7;">
            ${article.body}
          </div>

          <div style="padding-top:16px; border-top:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.8rem; color:#666;">Published by VoltForge Editorial</span>
            <button onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" class="pill-btn-white" style="font-size:0.8rem; padding:8px 18px;">Close Story</button>
          </div>
        </div>
      `;
      openModal(content);
    });
  });

  // 6. Contact Form Submission & Toast
  const contactForm = document.getElementById('electricalContactForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (toastNotice && toastMessage) {
      toastMessage.innerText = msg;
      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 5000);
    }
  }

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;

    // 1. Loading UI state
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg> Transmitting Proposal Request...
    `;
    submitBtn.disabled = true;

    // 2. Gather checkboxes cleanly
    const selectedServices = Array.from(contactForm.querySelectorAll('input[name="services"]:checked')).map(el => el.value);

    // 3. Create a clean JSON object structure (Required by FormSubmit's AJAX endpoint)
    const payload = {
      name: document.getElementById('contactName')?.value || '',
      company: document.getElementById('companyName')?.value || '',
      email: document.getElementById('contactEmail')?.value || '',
      phone: document.getElementById('contactPhone')?.value || '',
      budget: document.getElementById('projectBudget')?.value || '',
      details: document.getElementById('projectDetails')?.value || '',
      services: selectedServices.join(', ')
    };

    // 4. Force transmission explicitly to your absolute destination URL
    fetch('https://formsubmit.co/ajax/nedu@skyloftstudio.online', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload) // Must be a JSON string
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('API transmission error response');
    })
    .then(data => {
      // 5. Success State UI
      submitBtn.innerHTML = `✓ Inquiry Received!`;
      submitBtn.style.backgroundColor = '#10b981';

      const clientName = payload.name || 'partner';
      if (typeof showToast === 'function') {
        showToast(`Thank you, ${clientName}! Your electrical business project inquiry was transmitted. Marcus will review your project and reply within 4 hours.`);
      } else {
        alert(`Thank you, ${clientName}! Your inquiry was transmitted.`);
      }

      // Reset form after short reading window
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch(error => {
      console.error('Submission Details:', error);
      alert('Transmission failed. Check your network connection or console logs.');
      
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.disabled = false;
    });
  });
}

  
  

  // Add simple spin keyframe dynamically if needed
  if (!document.getElementById('spinStyle')) {
    const style = document.createElement('style');
    style.id = 'spinStyle';
    style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  // 7. Search button overlay simulation
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchHtml = `
        <div>
          <div class="kicker">Quick Navigation & Search</div>
          <h3 style="font-size:1.5rem; font-weight:700; color:#fff; margin-bottom:16px;">Find Electrical Work & Services</h3>
          <input type="text" id="searchInput" placeholder="Type: 'Solar', 'Commercial', 'App Dev', 'SEO'..." style="width:100%; background:#141414; border:1px solid #ff5500; border-radius:8px; padding:14px 18px; color:#fff; font-size:1rem; outline:none; margin-bottom:20px;">
          <div style="display:flex; flex-direction:column; gap:10px;">
            <a href="#services" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" style="padding:12px; background:#181818; border-radius:8px; font-size:0.9rem; color:#dedede; display:flex; justify-content:space-between;">
              <span>⚡ Web Design & UI/UX for Electrical Contractors</span>
              <span style="color:#ff5500;">Go →</span>
            </a>
            <a href="#works" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" style="padding:12px; background:#181818; border-radius:8px; font-size:0.9rem; color:#dedede; display:flex; justify-content:space-between;">
              <span>📁 Case Studies: Apex Volt, Lumina Solar, Gridline</span>
              <span style="color:#ff5500;">Go →</span>
            </a>
            <a href="#sectors" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" style="padding:12px; background:#181818; border-radius:8px; font-size:0.9rem; color:#dedede; display:flex; justify-content:space-between;">
              <span>🏢 Electrical Business Sectors Attended</span>
              <span style="color:#ff5500;">Go →</span>
            </a>
            <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" style="padding:12px; background:#181818; border-radius:8px; font-size:0.9rem; color:#dedede; display:flex; justify-content:space-between;">
              <span>✉️ Project Inquiry & Consultation Form</span>
              <span style="color:#ff5500;">Go →</span>
            </a>
          </div>
        </div>
      `;
      openModal(searchHtml);
      setTimeout(() => {
        document.getElementById('searchInput')?.focus();
      }, 100);
    });
  }

  // 8. Story detail link in About section
  const aboutStoryBtn = document.getElementById('aboutStoryBtn');
  if (aboutStoryBtn) {
    aboutStoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const aboutHtml = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div class="kicker">About Marcus Vance & VoltForge</div>
          <h2 style="font-size:2.2rem; font-weight:800; letter-spacing:-0.03em; color:#fff; line-height:1.15;">14 Years Building Digital Dominance for the Electrical Trades</h2>
          <p style="font-size:1rem; color:#a3a3a3; line-height:1.7;">
            Electricians and electrical contractors are the backbone of the physical world. Yet, the vast majority of electrical businesses suffer from outdated websites that misrepresent their technical mastery.
          </p>
          <p style="font-size:1rem; color:#a3a3a3; line-height:1.7;">
            At VoltForge, we combine deep industrial knowledge with high-end editorial digital design. We understand the difference between three-phase distribution, utility interconnection queues, and residential panel upgrades. We know how general contractors think when bidding tenders, and how frantic homeowners behave when breakers blow at 2 AM.
          </p>
          <div style="background:#141414; padding:20px; border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
            <h4 style="color:#fff; margin-bottom:8px; font-size:1rem;">Our Core Principles</h4>
            <ul style="color:#a3a3a3; font-size:0.9rem; line-height:1.6; margin-left:20px;">
              <li><strong>Zero Bloat:</strong> Pure, ultra-fast code that scores 98+ on Google Lighthouse.</li>
              <li><strong>Commercial Authority:</strong> Clean typography and high-voltage aesthetics that win enterprise RFPs.</li>
              <li><strong>Measurable Pipeline:</strong> Every feature is engineered to convert visitors into booked contracts.</li>
            </ul>
          </div>
          <div style="display:flex; justify-content:flex-end;">
            <a href="#contact" onclick="document.getElementById('modalOverlay').classList.remove('active'); document.body.style.overflow='';" class="btn-primary">Talk with Marcus →</a>
          </div>
        </div>
      `;
      openModal(aboutHtml);
    });
  }
});
