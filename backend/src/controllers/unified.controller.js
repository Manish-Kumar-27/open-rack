const { searchBooksFromOpenLibrary } = require("../services/book.service");
const { searchArchiveBooks } = require("../services/archive.service");
const { searchGutenbergBooks } = require("../services/gutenberg.service"); // ✅ NEW

exports.unifiedSearch = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query param 'q'" });

  try {
    const [openLibrary, archive, gutenberg] = await Promise.all([
      searchBooksFromOpenLibrary(q),
      searchArchiveBooks(q),
      searchGutenbergBooks(q), // ✅ NEW
    ]);

    const results = [
      ...openLibrary.map((book) => ({ ...book, source: "OpenLibrary" })),
      ...archive.map((book) => ({ ...book, source: "InternetArchive" })),
      ...gutenberg, // already tagged
    ];

    // Filter for readable books
    const readable = results.filter(
      (book) =>
        book.readUrl || (book.downloadUrl && /\.(pdf|epub|html?)$/i.test(book.downloadUrl))
    );

    res.json(readable);
  } catch (err) {
    console.error("Unified Search Error:", err.message);
    res.status(500).json({ error: "Unified search failed" });
  }
};
