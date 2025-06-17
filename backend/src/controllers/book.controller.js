const { searchBooksFromOpenLibrary } = require("../services/book.service");

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const books = await searchBooksFromOpenLibrary(q);
    res.json(books);
  } catch (error) {
    console.error("Open Library Search Error:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
};
