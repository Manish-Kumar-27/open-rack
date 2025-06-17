const express = require("express");
const router = express.Router();
const { unifiedSearch } = require("../controllers/unified.controller");

router.get("/search", unifiedSearch);

module.exports = router;
