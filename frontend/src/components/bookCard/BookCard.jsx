import React from "react";
import "./BookCard.css";

const BookCard = ({ title, author, cover, genre, progress = 0, onResume }) => {
  return (
    <div
      className="book-card simple"
      style={{ "--progress-width": `${progress}%` }}
    >
      <img
        className="book-cover"
        src={cover || "https://via.placeholder.com/80x120?text=Book"}
        alt={`${title} cover`}
      />

      <h3 className="book-title">{title}</h3>

      {genre && <span className="book-genre">{genre}</span>}

      <p className="book-author">by {author}</p>

      <div className="book-progress-bar">
        <div className="book-progress"></div>
      </div>

      <button className="resume-button" onClick={onResume}>
        Resume
      </button>
    </div>
  );
};

export default BookCard;
