const { getTrendingBooks } = require("../services/trending.service");

exports.fetchTrendingBooks = async (req, res) => {
  try {
    const books = await getTrendingBooks();
    res.json(books);
  } catch (err) {
    console.error("Trending fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch trending books" });
  }
};
