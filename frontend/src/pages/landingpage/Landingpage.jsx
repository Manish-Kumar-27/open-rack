import React, { useEffect, useRef, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const heroBgRef = useRef(null);
  const loginRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // === SCROLL ANIMATIONS ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // === PARALLAX ===
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === SCROLL PROGRESS BAR ===
  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollTotal) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === INTERACTIVE ELEMENTS ===
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
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

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div className="app">
      {/* Scroll Progress */}
      <div
        id="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #32b8c6, #8a2be2)',
          zIndex: 9999,
          transition: 'width 0.1s ease',
        }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              <span className="gradient-text">OpenRack</span>
            </h1>
            <p className="hero-subtitle">Your Digital Library Universe</p>
            <p className="hero-description">
              Democratizing access to knowledge through innovative digital
              reading experiences
            </p>
            <div className="hero-cta">
              <button
                className="btn btn--primary btn--lg pulse"
                //onClick={handleRipple}
                onClick={() => {handleRipple ,
    loginRef.current?.scrollIntoView({ behavior: 'smooth' });
  }}
              >
                Explore the Universe
              </button>
            </div>
          </div>
        </div>
        <div
          className="hero-background"
          ref={heroBgRef}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s linear',
          }}
        />
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-header fade-in-up">
            <h2 className="section-title">About OpenRack</h2>
            <p className="section-subtitle">
              Combining cutting-edge technology with a passion for reading to
              create the most intuitive digital library experience
            </p>
          </div>

          <div className="about-grid">
            {[
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                ),
                title: 'Why We Built OpenRack',
                text: 'We believe that everyone deserves access to knowledge and great literature, regardless of their location or circumstances. Our mission is to break down barriers and make reading accessible to all.',
                className: 'fade-in-left',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
                title: "Who It's For",
                text: 'Book enthusiasts, students, researchers, and lifelong learners who seek a modern, intuitive way to discover, read, and engage with digital content across all their devices.',
                className: 'fade-in-up',
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                ),
                title: 'What Makes Us Unique',
                text: 'Cross-device synchronization, interactive reading features, and an unparalleled digital reading experience.',
                className: 'fade-in-right',
              },
            ].map(({ icon, title, text, className }, idx) => (
              <div className={`about-card ${className}`} key={idx}>
                <div className="about-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          

          {/* Features */}
          <div className="features-section fade-in-up">
            <h3 className="features-title">Key Features</h3>
            <div className="features-grid">
              {[
                'Vast digital library with millions of Books',
                'Cross-device synchronization',
                'Interactive reading features',
                'Offline download capabilities',
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
      <section className="login-section" ref={loginRef}>
        <div className="container">
          <div className="login-card fade-in-up">
            <div className="login-content">
              <h3 className="login-title">Ready to Start Reading?</h3>
              <p className="login-subtitle">Login</p>
              <p className="login-description">
                We're putting the finishing touches on our authentication
                system. Soon you'll be able to access your personal library
                universe.
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
          <p className="footer-text">
            &copy; 2025 OpenRack. Expanding minds, one page at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
