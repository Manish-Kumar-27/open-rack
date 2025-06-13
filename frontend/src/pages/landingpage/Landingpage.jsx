import React, { useEffect } from 'react';
import './LandingPage.css';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  useEffect(() => {
    // === SCROLL ANIMATIONS ===
    const initScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
      });
    };

    // === INTERACTIVE ELEMENTS ===
    const initInteractiveElements = () => {
      const buttons = document.querySelectorAll('.btn');

      buttons.forEach(button => {
        button.addEventListener('click', function (e) {
          if (this.disabled) return;

          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;

          this.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });

      // hover effects
      document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.transform = 'translateX(10px)');
        item.addEventListener('mouseleave', () => item.style.transform = 'translateX(0)');
      });

      document.querySelectorAll('.about-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.style.boxShadow = '0 20px 40px rgba(50, 184, 198, 0.2)');
        card.addEventListener('mouseleave', () => card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)');
      });
    };

    // === PARALLAX ===
    const initParallax = () => {
      let ticking = false;
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.hero-background').forEach(el => {
          el.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
        ticking = false;
      };
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };
      window.addEventListener('scroll', requestTick);
    };

    // === SCROLL PROGRESS ===
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        if (!inThrottle) {
          func.apply(this, arguments);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const initScrollProgress = () => {
      const progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #32b8c6, #8a2be2);
        z-index: 9999;
        transition: width 0.1s ease;
      `;
      document.body.appendChild(progressBar);

      const updateProgress = throttle(() => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        progressBar.style.width = scrollProgress + '%';
      }, 10);

      window.addEventListener('scroll', updateProgress);
    };

    initScrollAnimations();
    initInteractiveElements();
    initParallax();
    initScrollProgress();
  }, []);

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              <span className="gradient-text">OpenRack</span>
            </h1>
            <p className="hero-subtitle">Your Digital Library Universe</p>
            <p className="hero-description">
              Democratizing access to knowledge through innovative digital reading experiences
            </p>
            <div className="hero-cta">
              <button className="btn btn--primary btn--lg pulse">Explore the Universe</button>
            </div>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* About Us */}
      <section className="about-section">
        <div className="container">
          <div className="about-header fade-in-up">
            <h2 className="section-title">About OpenRack</h2>
            <p className="section-subtitle">
              Combining cutting-edge technology with a passion for reading to create the most intuitive digital library experience
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card fade-in-left">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3>Why We Built OpenRack</h3>
              <p>We believe that everyone deserves access to knowledge and great literature, regardless of their location or circumstances. Our mission is to break down barriers and make reading accessible to all.</p>
            </div>

            <div className="about-card fade-in-up">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Who It's For</h3>
              <p>Book enthusiasts, students, researchers, and lifelong learners who seek a modern, intuitive way to discover, read, and engage with digital content across all their devices.</p>
            </div>

            <div className="about-card fade-in-right">
              <div className="about-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3>What Makes Us Unique</h3>
              <p> cross-device synchronization, interactive reading features, and an unparalleled digital reading experience.</p>
            </div>
          </div>

          {/* Features */}
          <div className="features-section fade-in-up">
            <h3 className="features-title">Key Features</h3>
            <div className="features-grid">
              {[
                "Vast digital library with millions of Books",
                "Cross-device synchronization",
                "Interactive reading features",
                "Offline download capabilities",
              ].map((feature, idx) => (
                <div className="feature-item" key={idx}>
                  <span className="feature-check">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <div className="container">
          <div className="login-card fade-in-up">
            <div className="login-content">
              <h3 className="login-title">Ready to Start Reading?</h3>
              <p className="login-subtitle">Login</p>
              <p className="login-description">
                We're putting the finishing touches on our authentication system. Soon you'll be able to access your personal library universe.
              </p>
              <button className="btn btn--outline btn--lg" disabled>
                <span className="btn-text">Login</span>
                <span className="coming-soon">Coming Soon</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">&copy; 2025 OpenRack. Expanding minds, one page at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
