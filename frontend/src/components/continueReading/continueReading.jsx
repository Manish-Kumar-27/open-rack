import React from "react";
import "./ContinueReading.css";
import BookCard from "../bookCard/BookCard"


const ContinueReading = ({ books = [] }) => {
  const displayedBooks = books.slice(0, 10); // Limit to 10 books

  return (
    <section className="continue-section">
      <h2 className="continue-title">Continue Reading</h2>
      <div className="continue-list">
        {displayedBooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            genre={book.genre}
            cover={book.cover}
            progress={book.progress}
            onResume={() => console.log(`Resume "${book.title}"`)}
            onClick={() => console.log(`Open "${book.title}" in reader`)}
          />
        ))}
      </div>
    </section>
  );
};

export default ContinueReading;
