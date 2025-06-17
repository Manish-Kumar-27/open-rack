const axios = require("axios");

exports.getTrendingBooks = async () => {
  const url = `https://openlibrary.org/subjects/popular.json?limit=12`;

  const { data } = await axios.get(url);
  const works = data.works || [];

  return works.map((book) => ({
    title: book.title,
    author: book.authors?.[0]?.name || "Unknown",
    coverUrl: book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
      : null,
    openLibraryId: book.key,
    readUrl: `https://openlibrary.org${book.key}`,
    source: "OpenLibrary",
  }));
};
