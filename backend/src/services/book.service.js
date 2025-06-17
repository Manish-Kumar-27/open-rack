const axios = require("axios");

exports.searchBooksFromOpenLibrary = async (query) => {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;

  const { data } = await axios.get(url);
  const books = data.docs.map((doc) => ({
    title: doc.title,
    author: doc.author_name?.[0] || "Unknown",
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    firstPublishYear: doc.first_publish_year,
    openLibraryId: doc.key, // e.g., "/works/OL45883W"
    readUrl: `https://openlibrary.org${doc.key}`,
  }));

  return books;
};
