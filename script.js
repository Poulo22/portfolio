// ============================================
// CYBER PORTFOLIO — SCRIPT.JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initParticles();
    initTypewriter();
    initNavbar();
    initScrollSpy();
    initSkillBars();
    initProjectCards();
    initCounters();
  });
  
  // --- 1. MATRIX CANVAS EFFECT ---
  function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Caractères cyberpunk (Katakana + Latin + Chiffres)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }
    
    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00f0ff'; // Cyan
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
  
  // --- 2. PARTICLES BACKGROUND ---
  function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      createParticle(container);
    }
  }
  
  function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 5 + Math.random() * 10;
    
    particle.style.left = posX + 'vw';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    // Couleurs aléatoires (Cyan, Purple, Green)
    const colors = ['#00f0ff', '#a855f7', '#00ff88'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
  }
  
  // --- 3. TERMINAL TYPEWRITER ---
  function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    
    const commands = [
      'whoami',
      'nmap -sV -p- target.local',
      'tail -f /var/log/auth.log',
      'python3 exploit.py',
      './start_soc_dashboard.sh'
    ];
    
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
      const currentCmd = commands[cmdIndex];
      
      if (isDeleting) {
        el.textContent = currentCmd.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        el.textContent = currentCmd.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100 + Math.random() * 100;
      }
      
      if (!isDeleting && charIndex === currentCmd.length) {
        typingDelay = 2000; // Pause à la fin
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        typingDelay = 500; // Pause avant le prochain mot
      }
      
      setTimeout(type, typingDelay);
    }
    
    setTimeout(type, 1000);
  }
  
  // --- 4. NAVBAR & SCROLL REVEAL ---
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // --- 5. SCROLL SPY (Highlight nav links) ---
  function initScrollSpy() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.style.color = 'var(--text-dim)';
        if (link.getAttribute('href').includes(current)) {
          link.style.color = 'var(--cyan)';
        }
      });
    });
  }
  
  // --- 6. ANIMATE SKILL BARS ON SCROLL ---
  function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    const skillFills = document.querySelectorAll('.skill-fill');
    
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach(fill => {
            fill.classList.add('animated');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
  }
  
  // --- 7. PROJECT CARDS GLOW EFFECT ---
  function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }
  
  // --- 8. COUNTERS ANIMATION ---
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const heroSection = document.getElementById('home');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const duration = 2000;
          const step = target / (duration / 16); // 60fps
          
          let current = 0;
          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
              if (target > 50) counter.innerText += '+';
            }
          };
          updateCounter();
        });
      }
    });
    
    if (heroSection) observer.observe(heroSection);
  }