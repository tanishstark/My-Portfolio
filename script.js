/**
 * TANISH KUMAR - PORTFOLIO INTERACTION ENGINE
 * Complete client-side functionality, particle canvas, terminal, modals & AI assistant.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initCustomCursor();
  initNavbarScroll();
  initThemeToggle();
  initTerminal();
  initSkillsFilter();
  initProjectsModal();
  initAiAssistant();
  initContactForm();
  initScrollAnimations();
  initCounterStats();
  initCopyables();
});

/* --------------------------------------------------------------------------
   1. Interactive Constellation / Particle Canvas Background
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 85);
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(139, 92, 246,';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `${this.color} 0.8)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect nodes
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  if (!textEl) return;

  const phrases = [
    'Generative AI & LLM Systems',
    'Full-Stack Web Architecture',
    'Java, DSA & Systems Design',
    'Node.js & MongoDB Services',
    'PHP & Relational MySQL Platforms'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const delayBetween = 1800;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      textEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      speed = delayBetween;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Custom Cursor Follower
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function follow() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    follower.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(follow);
  }
  follow();

  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .tab-btn, .skill-card, .project-card');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform += ' scale(1.6)';
      follower.style.borderColor = 'var(--accent-cyan)';
      follower.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.borderColor = 'rgba(139, 92, 246, 0.6)';
      follower.style.backgroundColor = 'transparent';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Navbar Scroll & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }

    // Scroll spy
    const scrollPos = window.scrollY + 200;
    document.querySelectorAll('section[id]').forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Theme Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
    showToast(`Switched to ${nextTheme} mode`, 'info');
  });

  function updateThemeIcon(theme) {
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
  }
}

/* --------------------------------------------------------------------------
   6. Interactive CLI Terminal
   -------------------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');
  const terminalBody = document.getElementById('terminal-body');

  if (!input || !history) return;

  const commands = {
    help: `Available commands:
  <span class="text-cyan">skills</span>     - List technical skill proficiencies
  <span class="text-cyan">projects</span>   - Display featured portfolio systems
  <span class="text-cyan">experience</span> - View internship & work history
  <span class="text-cyan">education</span>  - View MCA (GenAI) & BCA degree info
  <span class="text-cyan">contact</span>    - Print email, phone, location & socials
  <span class="text-cyan">whoami</span>     - Tanish Kumar profile synopsis
  <span class="text-cyan">github</span>     - Link to GitHub repository profile
  <span class="text-cyan">linkedin</span>   - Link to LinkedIn professional profile
  <span class="text-cyan">vercel</span>     - View live Vercel deployments
  <span class="text-cyan">sudo hire</span>  - Fast-track recruiter onboarding
  <span class="text-cyan">clear</span>      - Clear terminal screen`,

    whoami: `<span class="text-green">Tanish Kumar</span> - MCA Candidate Specializing in Generative AI @ SRM IST. Full-stack engineer skilled in Java, Node.js, Express, MongoDB, MySQL & PHP.`,

    skills: `<span class="text-yellow">Languages:</span> Java, JavaScript, SQL, HTML5, CSS3, Python (Basic)
<span class="text-yellow">Core CS &amp; Java:</span> Core Java, OOP, Collections, Multithreading, Streams, File Handling, DSA, DBMS, OS, Networks
<span class="text-yellow">Web &amp; Backend:</span> Node.js, Express.js, PHP, Bootstrap, REST APIs
<span class="text-yellow">Databases:</span> MySQL, MongoDB
<span class="text-yellow">AI &amp; GenAI:</span> Generative AI Fundamentals, AI/ML Basics, Prompt Pipelines
<span class="text-yellow">Tools:</span> Git, GitHub, VS Code, Vercel`,

    projects: `<span class="text-cyan">1. Travellers Villa</span> [Node.js, Express.js, MongoDB] - Full-stack solo hotel booking system with Auth, Maps API, and Admin Portal.
<span class="text-cyan">2. Book Harbor</span> [PHP, MySQL, JavaScript] - Comprehensive e-commerce bookstore with search, filters, cart, and reviews.
<span class="text-cyan">3. Synthesis GenAI Suite</span> [AI / LLM Orchestration] - Generative AI agent playground and contextual pipelines.`,

    experience: `<span class="text-green">Web Development Intern @ Academy of Skill Development / UGCPL</span> (May 2025 - July 2025)
- Developed multi-genre e-commerce platform with MySQL database integration, cart workflows, and review moderation.`,

    education: `<span class="text-purple">Master of Computer Applications (MCA)</span> | SRM Institute of Science and Technology (2026 - 2028)
  Specialization: Generative AI
<span class="text-cyan">Bachelor of Computer Applications (BCA)</span> | Sarala Birla University, Ranchi (2023 - 2026)`,

    contact: `<span class="text-cyan">Email:</span> tanishstark1234@gmail.com
<span class="text-cyan">Phone:</span> +91 9709381583
<span class="text-cyan">GitHub:</span> https://github.com/tanishstark
<span class="text-cyan">LinkedIn:</span> https://www.linkedin.com/in/tanish-kumar-7079a6412/
<span class="text-cyan">Vercel:</span> https://vercel.com/tanishstark1234-8024s-projects
<span class="text-cyan">Location:</span> Chennai, Tamil Nadu, India`,

    github: `Opening GitHub: <a href="https://github.com/tanishstark" target="_blank" class="text-cyan">https://github.com/tanishstark</a>`,
    linkedin: `Opening LinkedIn: <a href="https://www.linkedin.com/in/tanish-kumar-7079a6412/" target="_blank" class="text-cyan">https://www.linkedin.com/in/tanish-kumar-7079a6412/</a>`,
    vercel: `Opening Vercel: <a href="https://vercel.com/tanishstark1234-8024s-projects" target="_blank" class="text-cyan">https://vercel.com/tanishstark1234-8024s-projects</a>`,

    'sudo hire': `<span class="text-green">[SUCCESS]</span> Initializing interview pipeline... Tanish is ready to bring high energy, full-stack robustness, and GenAI innovation to your engineering team! Contact directly at <span class="text-cyan">tanishstark1234@gmail.com</span>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      history.innerHTML = '';
      input.value = '';
      return;
    }

    const commandEntry = document.createElement('div');
    commandEntry.className = 'terminal-entry';
    commandEntry.innerHTML = `<div class="entry-cmd"><span class="prompt-symbol">tanish@dev:~$</span> <span>${rawCmd}</span></div>`;

    const result = commands[cmd] || `<span style="color: #f87171;">Command not found: '${rawCmd}'. Type <span class="text-cyan">'help'</span> to see available commands.</span>`;

    const entryOutput = document.createElement('div');
    entryOutput.className = 'terminal-output';
    entryOutput.innerHTML = result;
    commandEntry.appendChild(entryOutput);

    history.appendChild(commandEntry);
    input.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;

    if (cmd === 'github') window.open('https://github.com/tanishstark', '_blank');
    if (cmd === 'linkedin') window.open('https://www.linkedin.com/in/tanish-kumar-7079a6412/', '_blank');
    if (cmd === 'vercel') window.open('https://vercel.com/tanishstark1234-8024s-projects', '_blank');
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
    }
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
}

/* --------------------------------------------------------------------------
   7. About Tabs
   -------------------------------------------------------------------------- */
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    const target = btn.getAttribute('data-tab');
    const pane = document.getElementById(`tab-${target}`);
    if (pane) pane.classList.add('active');
  });
});

/* --------------------------------------------------------------------------
   8. Skills Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. Project Deep Dive Modal
   -------------------------------------------------------------------------- */
function initProjectsModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');

  const projectData = {
    'travellers-villa': {
      title: 'Travellers Villa - Full-Stack Hotel Booking Platform',
      category: 'Solo Full-Stack Web Application',
      image: 'assets/travellers_villa.jpg',
      overview: 'Travellers Villa is an end-to-end hotel booking platform built from scratch as a solo project. It provides an intuitive portal for travelers to discover villas and resorts, explore geo-locations on an interactive map, make reservations, and submit verified reviews.',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Map API (Leaflet/Mapbox)', 'JWT Auth', 'EJS/Vanilla JS', 'RESTful Architecture'],
      features: [
        'Secure user authentication (Registration, Login/Logout, Session & JWT management).',
        'Hotel booking cart and checkout reservation lifecycle.',
        'Interactive Map API integration for geospatial hotel location discovery.',
        'Comprehensive Admin Panel for hotel listings, inventory, and dynamic pricing control.',
        'Strict role-based authorization ensuring only listing owners or admins can modify hotels/delete reviews.'
      ],
      codeSnippet: `// Role-based Authorization Middleware for Hotel Management
module.exports.isListingOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing not found.');
    return res.redirect('/listings');
  }
  if (!listing.owner.equals(req.user._id) && !req.user.isAdmin) {
    req.flash('error', 'Unauthorized: You do not possess permission for this listing.');
    return res.redirect(\`/listings/\${id}\`);
  }
  next();
};`
    },
    'book-harbor': {
      title: 'Book Harbor - Multi-Genre E-Commerce Platform',
      category: 'E-Commerce Platform & Relational Architecture',
      image: 'assets/book_harbor.jpg',
      overview: 'Book Harbor is a complete online bookstore developed using PHP and MySQL. It features extensive catalog categorization, live dynamic search, multi-genre filtering, cart management, ordering pipelines, and customer feedback mechanisms.',
      techStack: ['PHP', 'MySQL', 'JavaScript (ES6)', 'HTML5 / CSS3', 'Bootstrap', 'Relational Schema Design'],
      features: [
        'Instant multi-genre catalog filtering and real-time live search query processing.',
        'Dynamic category, author, and book specification landing pages.',
        'Cart persistence, order placement flow, and customer purchase logs.',
        'Interactive review and 5-star rating submission system.',
        'Normalized relational MySQL database architecture with high data integrity.'
      ],
      codeSnippet: `<?php
// Filter books by genre and availability with PDO prepared queries
function fetchBooksByGenre($pdo, $genreId, $limit = 20) {
  $stmt = $pdo->prepare("
    SELECT b.id, b.title, b.author, b.price, b.rating, b.cover_img, g.name AS genre_name
    FROM books b
    JOIN genres g ON b.genre_id = g.id
    WHERE (:genreId = 0 OR b.genre_id = :genreId) AND b.stock > 0
    ORDER BY b.rating DESC
    LIMIT :limit
  ");
  $stmt->bindValue(':genreId', $genreId, PDO::PARAM_INT);
  $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>`
    },
    'genai-suite': {
      title: 'Synthesis GenAI Suite - Intelligent Agent Orchestration',
      category: 'Generative AI Specialization Project',
      image: 'assets/genai_showcase.jpg',
      overview: 'Synthesizing coursework from the MCA Generative AI specialization at SRM IST, this platform showcases prompt engineering pipelines, LLM multi-model querying, context-augmented assistant workflows, and token analytics.',
      techStack: ['Generative AI Fundamentals', 'Python / JavaScript', 'LLM API Bridges', 'Prompt Engineering', 'Vector Embeddings Concept'],
      features: [
        'Real-time prompt playground with temperature, top_p, and token parameters tuning.',
        'Contextual AI coding assistant capable of generating boilerplate solutions.',
        'Multi-model fallback routing and latency monitoring dashboards.',
        'Integration patterns for connecting LLMs to modern full-stack web architectures.'
      ],
      codeSnippet: `// GenAI Contextual Pipeline Query Dispatcher
async function queryGenAiAssistant(prompt, context) {
  const payload = {
    systemPrompt: "You are Tanish Kumar's AI Portfolio Assistant, representing his MCA GenAI expertise.",
    userPrompt: prompt,
    contextMetadata: context,
    temperature: 0.7,
    maxTokens: 512
  };
  const response = await fetch('/api/genai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await response.json();
}`
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-header-section">
          <span class="project-category">${data.category}</span>
          <h2>${data.title}</h2>
        </div>
        <img src="${data.image}" alt="${data.title}" class="modal-img-preview" />
        
        <div class="modal-nav-tabs">
          <button class="modal-tab-btn active" data-modtab="overview">Overview &amp; Features</button>
          <button class="modal-tab-btn" data-modtab="code">Code Architecture</button>
          <button class="modal-tab-btn" data-modtab="tech">Tech Stack</button>
        </div>

        <div class="modal-tab-pane active" id="modtab-overview">
          <p style="margin-bottom: 1rem;">${data.overview}</p>
          <h4 style="color: var(--text-main); margin: 1rem 0 0.5rem 0;">Key Feature Implementations:</h4>
          <ul class="feature-list">
            ${data.features.map((f) => `<li><i class="fa-solid fa-check text-cyan"></i> ${f}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-tab-pane" id="modtab-code">
          <p>Production snippet highlighting core logic &amp; architectural patterns:</p>
          <pre class="code-snippet-box"><code>${escapeHtml(data.codeSnippet)}</code></pre>
        </div>

        <div class="modal-tab-pane" id="modtab-tech">
          <p style="margin-bottom: 0.75rem;">Technologies and libraries powering this application:</p>
          <div class="project-tech-tags" style="border-top: none; padding-top: 0;">
            ${data.techStack.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
          <a href="https://github.com/tanishstark" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View GitHub Repo
          </a>
        </div>
      `;

      // Modal inner tab listeners
      modalBody.querySelectorAll('.modal-tab-btn').forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {
          modalBody.querySelectorAll('.modal-tab-btn').forEach((b) => b.classList.remove('active'));
          modalBody.querySelectorAll('.modal-tab-pane').forEach((p) => p.classList.remove('active'));
          tabBtn.classList.add('active');
          const tabName = tabBtn.getAttribute('data-modtab');
          const pane = modalBody.querySelector(`#modtab-${tabName}`);
          if (pane) pane.classList.add('active');
        });
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

/* --------------------------------------------------------------------------
   10. Interactive GenAI Career Assistant Demo
   -------------------------------------------------------------------------- */
function initAiAssistant() {
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('ai-chat-messages');
  const suggestions = document.querySelectorAll('.ai-suggest-btn');

  if (!form || !input || !messages) return;

  const knowledgeBase = [
    {
      keywords: ['backend', 'node', 'express', 'java', 'php', 'server'],
      response: "Tanish has strong backend engineering capabilities across Node.js, Express.js, and Core Java. He has built RESTful APIs, JWT/session authentication, role-based authorization, and integrated relational MySQL and NoSQL MongoDB databases."
    },
    {
      keywords: ['travellers villa', 'hotel', 'hotel booking', 'villa'],
      response: "Travellers Villa is Tanish's solo full-stack project built with Node.js, Express, and MongoDB. It features complete user authentication, interactive Map API integration for geospatial resort locating, admin dashboard for inventory/pricing, and authorization-guarded reviews."
    },
    {
      keywords: ['book harbor', 'book', 'ecommerce', 'e-commerce', 'php', 'mysql'],
      response: "Book Harbor is an e-commerce platform built with PHP, MySQL, and JavaScript. It features multi-genre filtering, real-time live search, cart functionality, and order processing with relational schema integration."
    },
    {
      keywords: ['education', 'degree', 'mca', 'bca', 'srm', 'sarala birla', 'college'],
      response: "Tanish is currently pursuing an MCA (Master of Computer Applications) with a specialization in Generative AI at SRM Institute of Science and Technology (2026-2028). He previously completed his BCA from Sarala Birla University, Ranchi (2023-2026)."
    },
    {
      keywords: ['skills', 'stack', 'languages', 'tech', 'python'],
      response: "Tanish's skill set includes: Java, JavaScript, SQL, HTML/CSS, Python (Basic), Node.js, Express.js, PHP, MySQL, MongoDB, Generative AI fundamentals, Git/GitHub, VS Code, and Vercel cloud deployment."
    },
    {
      keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'linkedin', 'github', 'vercel'],
      response: "You can reach Tanish directly via Email at tanishstark1234@gmail.com, Phone at +91 9709381583, or connect on GitHub (github.com/tanishstark) and LinkedIn (linkedin.com/in/tanish-kumar-7079a6412)."
    }
  ];

  function getBotResponse(userQuery) {
    const query = userQuery.toLowerCase();
    for (const item of knowledgeBase) {
      if (item.keywords.some((k) => query.includes(k))) {
        return item.response;
      }
    }
    return `Tanish Kumar is a high-energy Full-Stack Developer and MCA GenAI Candidate skilled in Java, Node.js, Express, MongoDB, MySQL, and AI pipelines. Feel free to explore his featured projects above or reach out at tanishstark1234@gmail.com!`;
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;

    if (sender === 'bot') {
      // Simulate typing stream
      let i = 0;
      bubble.textContent = '';
      const interval = setInterval(() => {
        bubble.textContent += text.charAt(i);
        i++;
        messages.scrollTop = messages.scrollHeight;
        if (i >= text.length) clearInterval(interval);
      }, 14);
    } else {
      bubble.textContent = text;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendMessage('user', query);
    input.value = '';

    setTimeout(() => {
      const reply = getBotResponse(query);
      appendMessage('bot', reply);
    }, 400);
  });

  suggestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      appendMessage('user', prompt);
      setTimeout(() => {
        const reply = getBotResponse(prompt);
        appendMessage('bot', reply);
      }, 400);
    });
  });
}

/* --------------------------------------------------------------------------
   11. Contact Form & Mailto Trigger
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'info');
      return;
    }

    const mailtoLink = `mailto:tanishstark1234@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject} - From ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoLink;
    showToast('Redirecting to your mail client...', 'success');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   12. Copy to Clipboard Utility
   -------------------------------------------------------------------------- */
function initCopyables() {
  document.querySelectorAll('.copyable').forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy') || el.textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`, 'success');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   13. Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   14. Counter Stats
   -------------------------------------------------------------------------- */
function initCounterStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((num) => {
            const target = parseInt(num.getAttribute('data-count'), 10);
            let current = 0;
            const duration = 1500;
            const step = Math.max(1, Math.floor(target / (duration / 25)));

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                num.textContent = target;
                clearInterval(timer);
              } else {
                num.textContent = current;
              }
            }, 25);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsGrid = document.querySelector('.quick-stats-grid');
  if (statsGrid) observer.observe(statsGrid);
}

/* --------------------------------------------------------------------------
   15. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.about-card, .terminal-card, .skill-card, .project-card, .timeline-content, .highlight-box, .contact-info-panel, .contact-form-panel'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
