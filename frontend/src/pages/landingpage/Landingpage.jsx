import React, { useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";
import { FiBookOpen, FiUsers, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const aboutCards = [
  {
    icon: <FiBookOpen size={48} color="#32b8c6" />,
    title: "Why We Built It",
    text: "To democratize access to knowledge and empower readers everywhere.",
  },
  {
    icon:  <FiUsers size={48} color="#32b8c6" />,
    title: "Who It's For",
    text: "For learners, educators, and book lovers seeking a seamless digital reading experience.",
  },
  {
    icon:  <FiStar size={48} color="#32b8c6" />,
    title: "What Makes Us Unique",
    text: "Intuitive interface, robust features, and a focus on community-driven discovery.",
  },
];

function useAnimateOnScroll(ref, animationClass) {
  useEffect(() => {
    const node = ref.current;
    const handleScroll = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 50;
      node.classList.toggle(animationClass, isVisible);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, animationClass]);
}

const LandingPage = () => {
  const aboutRef = useRef(null);
  const loginRef = useRef(null);

  useAnimateOnScroll(aboutRef, styles["lp-fade-in-up"]);
  useAnimateOnScroll(loginRef, styles["lp-fade-in-up"]);

  useEffect(() => {
    const hero = document.querySelector(`.${styles["lp-hero-content"]}`);
    const scrollBar = document.getElementById("scroll-bar");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.2}px)`;
      }

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const percent = (scrollY / maxScroll) * 100;
      scrollBar.style.width = `${percent}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className={styles["lp-scroll-indicator"]} id="scroll-bar"></div>

      {/* Hero Section */}
      <section className={styles["lp-hero-section"]}>
        <div className={`${styles["lp-hero-content"]} ${styles["lp-hero-parallax"]}`}>
          <h1 className={styles["lp-hero-title"]}>Your Digital Library Universe</h1>
          <div className={styles["lp-hero-subtitle"]}>
            Democratizing access to knowledge through innovative digital reading experiences
          </div>
          <p className={styles["lp-hero-description"]}>
            Combining cutting-edge technology with a passion for reading to create the most intuitive digital library experience.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles["lp-about-section"]}>
        <div className={styles["lp-about-header"]}>
          <h2 className={styles["lp-section-title"]}>About Us</h2>
          <p className={styles["lp-section-subtitle"]}>
            Discover what drives us and how we're redefining digital reading for everyone.
          </p>
        </div>
        <div className={styles["lp-about-grid"]} ref={aboutRef}>
          {aboutCards.map((card, idx) => (
            <div className={styles["lp-about-card"]} key={idx}>
              <div className={styles["lp-about-icon"]}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Login Placeholder */}
      <section className={styles["lp-login-section"]}>
        <div className={styles["lp-login-card"]} ref={loginRef}>
          <div className={styles["lp-login-title"]}>Login</div>
          <div className={styles["lp-login-description"]}>
           Join Us to access millions of books for free and expand your knowledge <br/>             
           Login to access your personal library universe.
          </div>   
          <div className="btn-2-style">
          <a  href="/home">
          <button className={styles["lp-btn-outline"]} > 
            Login 
          </button>
          </a>
          <button className={styles["lp-btn-outline"]} > 
            SignUp 
          </button>
          <a  href="/home"> <br />
          <button className={styles["lp-btn-outline"]} > 
            Start Reading 
          </button>
          </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
