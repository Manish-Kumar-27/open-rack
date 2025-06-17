import React, { useEffect, useState, useRef } from "react";
import "./TrendingNow.css";
//import fallbackImage from "../assets/fallback-cover.png";

const TrendingNow = () => {
  const [books, setBooks] = useState([]);
  const scrollRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/trending")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Trending fetch failed", err));
  }, []);

  const scroll = (direction) => {
    const distance = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handleImgError = (e) => {
    e.target.src = fallbackImage;
  };

  // 🔄 Swipe touch handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      scroll(deltaX > 0 ? "left" : "right");
    }
  };

  return (
    <div className="trending-section">
      <div className="trending-heading-wrapper">
        <h2 className="trending-heading">📈 Trending Now</h2>
      </div>

      <div className="trending-scroll-wrapper">
        {/* ⬅️ LEFT BUTTON */}
        <button className="scroll-button-overlay left" onClick={() => scroll("left")}>
          &lt;
        </button>

        <div
          className="trending-book-list"
          ref={scrollRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {books.map((book, index) => (
            <div className="trending-card" key={index}>
              <img
                src={book.coverUrl }
                alt={book.title}
                className="trending-img"
                onError={handleImgError}
              />
              <div className="trending-content">
                <h3 className="trending-title">{book.title}</h3>
                <p className="trending-author">by {book.author}</p>
                <a
                  href={book.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trending-button"
                >
                  Read Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ➡️ RIGHT BUTTON */}
        <button className="scroll-button-overlay right" onClick={() => scroll("right")}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TrendingNow;
