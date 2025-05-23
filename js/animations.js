// Animation JavaScript for Khaled Elnezily Portfolio

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Particle animation for hero section
  function initParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    particles.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Animation
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
      
      particles.appendChild(particle);
    }
  }
  
  // Initialize particles if they exist
  initParticles();
  
  // Recreate particles on window resize
  window.addEventListener('resize', initParticles);
  
  // Text reveal animation
  const textReveal = document.querySelectorAll('.text-reveal');
  
  if (textReveal.length > 0) {
    textReveal.forEach(element => {
      const text = element.textContent;
      element.innerHTML = `<span>${text}</span>`;
      
      // Create observer for text reveal
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  }
  
  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroSection && heroBg) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * 0.4;
      
      heroBg.style.transform = `translateY(${translateY}px)`;
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Animate numbers (counter)
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Initialize counters
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  }
  
  // Staggered animation for grid items
  const gridItems = document.querySelectorAll('.stagger-item');
  
  if (gridItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      let delay = 0;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${delay}s`;
          entry.target.classList.add('visible');
          delay += 0.1;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    gridItems.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Cursor animation
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    // Delayed follow for dot
    setTimeout(() => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, 100);
  });
  
  // Add cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .social-link');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('cursor-active');
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('cursor-active');
    });
  });
  
  // Add cursor styles if not already present
  if (!document.querySelector('#cursor-styles')) {
    const style = document.createElement('style');
    style.id = 'cursor-styles';
    style.textContent = `
      .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: width 0.3s, height 0.3s, border-color 0.3s;
        opacity: 0.7;
      }
      
      .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: transform 0.1s;
      }
      
      .cursor-active {
        width: 60px;
        height: 60px;
        border-color: var(--accent-color);
        background-color: rgba(213, 113, 73, 0.1);
      }
      
      @media (max-width: 768px) {
        .custom-cursor, .cursor-dot {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
});
