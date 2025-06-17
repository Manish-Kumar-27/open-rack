import React from "react";
import "./BookCard.css";

const BookCard = ({ title, author, cover, genre, onResume }) => {
  return (
    <div
      className="book-card simple"
      >
    
      <img
        className="book-cover"
        src={cover || "https://via.placeholder.com/80x120?text=Book"}
        alt={`${title} cover`}
      />

      <h3 className="book-title">{title}</h3>

      {genre && <span className="book-genre">{genre}</span>}

      <p className="book-author">by {author}</p>

      <button className="resume-button" onClick={onResume}>
        Resume
      </button>
    </div>
  );
};

export default BookCard;
