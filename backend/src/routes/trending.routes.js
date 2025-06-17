const express = require("express");
const router = express.Router();
const { fetchTrendingBooks } = require("../controllers/trending.controller");

router.get("/", fetchTrendingBooks);

module.exports = router;
