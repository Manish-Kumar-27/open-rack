const express = require("express");
const router = express.Router();
const { searchBooks } = require("../controllers/book.controller");

router.get("/search", searchBooks); // /api/books/search?q=...

module.exports = router;
