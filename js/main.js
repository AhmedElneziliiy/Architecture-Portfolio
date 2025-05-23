// Main JavaScript for Khaled Elnezily Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });
  
  // Navigation toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.overlay');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
  
  // Close mobile menu when clicking a nav link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  const scrollThreshold = 100;
  
  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Initialize scroll position on page load
  handleScroll();
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Scroll indicator in hero section
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            if (card.classList.contains(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
        
        // Trigger AOS refresh
        AOS.refresh();
      });
    });
  }
  
  // Skill bars animation
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length > 0) {
    const animateSkills = function() {
      skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
      });
    };
    
    // Create intersection observer for skills section
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(skillsSection);
    }
  }
  
  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Particles animation for hero section
  const particles = document.querySelector('.particles');
  
  if (particles) {
    const createParticles = () => {
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
    };
    
    createParticles();
    
    // Recreate particles on window resize
    window.addEventListener('resize', createParticles);
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-30px) translateX(15px);
        }
        50% {
          transform: translateY(-10px) translateX(30px);
        }
        75% {
          transform: translateY(-25px) translateX(15px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Page transitions
  const pageTransition = document.querySelector('.page-transition');
  
  if (pageTransition) {
    // Show transition on page load
    pageTransition.classList.add('enter');
    
    // Hide transition after animation completes
    setTimeout(() => {
      pageTransition.classList.remove('enter');
    }, 700);
    
    // Handle link clicks for page transitions
    document.querySelectorAll('a[data-transition]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        
        // Show exit transition
        pageTransition.classList.add('exit');
        
        // Navigate to new page after transition
        setTimeout(() => {
          window.location.href = href;
        }, 700);
      });
    });
  }
});
