const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/book.routes");
const unifiedRoutes = require("./routes/unified.routes");
const trendingRoutes = require("./routes/trending.routes");



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api", unifiedRoutes);
app.use("/api/trending", trendingRoutes);


app.get("/", (req, res) => {
  res.send("📘 ReadSphere backend (Open Library) is running");
});

module.exports = app;
